/**
 * Extrai as versoes web da marca a partir de imagens/Logo.pdf.
 *
 * POR QUE PNG E NAO SVG
 * As nove paginas do PDF nao sao vetor: cada uma contem uma imagem rasterizada
 * recortada por mascara (5 paths, todos de clip). Exportar SVG gera arquivos de
 * 0,6 a 1,4 MB com o mesmo raster embutido em base64 — pior que um PNG. Por
 * isso geramos PNG transparente em alta resolucao.
 *
 * COMO A TRANSPARENCIA E OBTIDA
 * As paginas tem fundo solido desenhado (branco nas 1-6, preto nas 7-9), entao
 * nao basta renderizar com alpha. Derivamos o alpha da luminancia e depois
 * desfazemos a composicao sobre o fundo (un-premultiply), o que preserva as
 * bordas suavizadas sem deixar franja branca ou preta.
 *
 * O dourado e um degrade e sua luminancia varia, entao seu alpha nao pode vir
 * da propria luminancia. Como as versoes dourada e preta tem exatamente a mesma
 * geometria (conferido: deslocamento 0x0), usamos a mascara da versao preta.
 *
 * O Logo.pdf original nunca e alterado.
 *
 * Rodar com: npm run logo
 */
import * as mupdf from "mupdf";
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const PDF = path.join("imagens", "Logo.pdf");
const OUT = path.join("public", "marca");
const ESCALA = 4; // 810pt * 4 = 3240px, proximo do raster nativo (3375px)

const doc = mupdf.Document.openDocument(readFileSync(PDF), "application/pdf");

/** Renderiza uma pagina (base 0) como RGB cru. */
async function paginaCrua(indice) {
  const pix = doc
    .loadPage(indice)
    .toPixmap(mupdf.Matrix.scale(ESCALA, ESCALA), mupdf.ColorSpace.DeviceRGB, false, true);
  return sharp(Buffer.from(pix.asPNG())).raw().toBuffer({ resolveWithObject: true });
}

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/**
 * Monta RGBA com fundo removido.
 *
 * @param corPagina    pagina que fornece a cor
 * @param mascaraPagina pagina que fornece o recorte (a preta, para o dourado)
 * @param fundoClaro   true quando a arte esta sobre branco
 */
async function recortar(corPagina, mascaraPagina, fundoClaro) {
  const cor = await paginaCrua(corPagina);
  const msk = mascaraPagina === corPagina ? cor : await paginaCrua(mascaraPagina);
  const { width, height, channels } = cor.info;

  const saida = Buffer.alloc(width * height * 4);
  let x0 = width, y0 = height, x1 = -1, y1 = -1;

  for (let i = 0, px = 0; px < width * height; px++, i += 4) {
    const o = px * channels;
    const Lm = lum(msk.data[o], msk.data[o + 1], msk.data[o + 2]);

    // alpha: quanto a arte se afasta do fundo
    const a = fundoClaro ? 1 - Lm / 255 : Lm / 255;

    if (a <= 0.004) {
      saida[i] = saida[i + 1] = saida[i + 2] = saida[i + 3] = 0;
      continue;
    }

    // desfaz a composicao sobre o fundo para recuperar a cor real da borda
    const base = fundoClaro ? 255 : 0;
    for (let c = 0; c < 3; c++) {
      const v = (cor.data[o + c] - (1 - a) * base) / a;
      saida[i + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
    saida[i + 3] = Math.round(a * 255);

    const x = px % width;
    const y = (px / width) | 0;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  return {
    buffer: saida,
    width,
    height,
    // caixa do conteudo, para cortar a margem vazia da pagina
    recorte: { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 },
  };
}

async function gerar({ arquivo, cor, mascara, fundoClaro, largura }) {
  const { buffer, width, height, recorte } = await recortar(cor, mascara, fundoClaro);
  const png = await sharp(buffer, { raw: { width, height, channels: 4 } })
    .extract(recorte)
    .resize({ width: largura, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(path.join(OUT, arquivo), png);
  const m = await sharp(png).metadata();
  console.log(
    `${arquivo.padEnd(30)} ${String(m.width).padStart(4)}x${String(m.height).padEnd(4)} ${(png.length / 1024).toFixed(0).padStart(4)}KB`
  );
  return png;
}

mkdirSync(OUT, { recursive: true });

// Indices base 0: 0 vert.ouro 1 horiz.ouro 2 simb.ouro 3 simb.preto
//                4 horiz.preta 5 vert.preta 6 simb.branco 7 horiz.branca 8 vert.branca
const SIMBOLO_OURO = 2, SIMBOLO_PRETO = 3, SIMBOLO_BRANCO = 6;
const HORIZ_OURO = 1, HORIZ_PRETA = 4, HORIZ_BRANCA = 7;

await gerar({ arquivo: "logo-simbolo-dourado.png", cor: SIMBOLO_OURO, mascara: SIMBOLO_PRETO, fundoClaro: true, largura: 640 });
await gerar({ arquivo: "logo-simbolo-preto.png", cor: SIMBOLO_PRETO, mascara: SIMBOLO_PRETO, fundoClaro: true, largura: 640 });
await gerar({ arquivo: "logo-simbolo-branco.png", cor: SIMBOLO_BRANCO, mascara: SIMBOLO_BRANCO, fundoClaro: false, largura: 640 });
await gerar({ arquivo: "logo-horizontal-dourada.png", cor: HORIZ_OURO, mascara: HORIZ_PRETA, fundoClaro: true, largura: 1400 });
await gerar({ arquivo: "logo-horizontal-preta.png", cor: HORIZ_PRETA, mascara: HORIZ_PRETA, fundoClaro: true, largura: 1400 });
await gerar({ arquivo: "logo-horizontal-branca.png", cor: HORIZ_BRANCA, mascara: HORIZ_BRANCA, fundoClaro: false, largura: 1400 });

// Icones do site, gerados a partir do simbolo dourado
const simbolo = readFileSync(path.join(OUT, "logo-simbolo-dourado.png"));
for (const [destino, tamanho] of [
  [path.join("src", "app", "icon.png"), 64],
  [path.join("src", "app", "apple-icon.png"), 180],
]) {
  await sharp(simbolo)
    .resize(tamanho, tamanho, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.round(tamanho * 0.08), bottom: Math.round(tamanho * 0.08),
      left: Math.round(tamanho * 0.08), right: Math.round(tamanho * 0.08),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(tamanho, tamanho)
    .png()
    .toFile(destino);
  console.log(`${destino.padEnd(30)} ${tamanho}x${tamanho}`);
}

console.log(`\nOriginal preservado: ${PDF}`);

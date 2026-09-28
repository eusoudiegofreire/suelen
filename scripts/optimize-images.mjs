/**
 * Gera as versoes otimizadas (WebP) usadas pelo site a partir dos originais.
 *
 * Origem:  imagens/            (originais, nunca sao modificados)
 * Destino: public/fotos/       (WebP redimensionado)
 * Saida:   src/data/images.ts  (manifesto com dimensoes reais + blur placeholder)
 *
 * Rodar com:  npm run images
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const SRC = "imagens";
const OUT = path.join("public", "fotos");

/**
 * `crop` e opcional e usa fracoes da imagem ja rotacionada (0-1).
 * Serve para gerar um enquadramento diferente a partir da mesma foto.
 */
const JOBS = [
  // Versao com o fundo do estudio reeditado pelo cliente para acompanhar o
  // creme da pagina. O original sem edicao continua em suelen-paranho-01.jpeg.
  { key: "heroSuelen", file: "suelen-paranho-01-editada.png", out: "suelen-hero-2.webp", width: 1400 },
  { key: "suelenFullFace", file: "suelen-paranho-02.jpeg", out: "suelen-full-face.webp", width: 1300 },
  {
    key: "suelenSobre",
    file: "suelen-paranho-02.jpeg",
    out: "suelen-sobre.webp",
    width: 1200,
    crop: { left: 0.264, top: 0.13, width: 0.504, height: 0.42 },
  },
  { key: "ambienteEntrada", file: "ambiente-entrada.jpeg", out: "ambiente-entrada.webp", width: 1100 },
  { key: "ambienteSala", file: "ambiente-sala-dra.jpeg", out: "ambiente-sala-dra.webp", width: 1700 },

  { key: "resultadoFullFace01", file: "resultado-full-face-01.jpg", out: "resultado-full-face-01.webp", width: 1100 },
  { key: "resultadoFullFace02", file: "resultado-full-face-02.jpg", out: "resultado-full-face-02.webp", width: 1100 },
  { key: "resultadoFullFace03", file: "resultado-full-face-03.jpg", out: "resultado-full-face-03.webp", width: 1100 },
  { key: "resultadoFullFace04", file: "resultado-full-face-04.jpg", out: "resultado-full-face-04.webp", width: 1100 },
  { key: "resultadoFullFace05", file: "resultado-full-face-05.jpg", out: "resultado-full-face-05.webp", width: 1100 },
  { key: "resultadoToxina", file: "resultado-toxina-botulinica.jpg", out: "resultado-toxina-botulinica.webp", width: 1100 },
  { key: "resultadoLabial", file: "resultado-preenchimento-labial.jpg", out: "resultado-preenchimento-labial.webp", width: 1100 },

  { key: "depoimento01", file: "depoimento-01.jpeg", out: "depoimento-01.webp", width: 720 },
  { key: "depoimento02", file: "depoimento-02.jpeg", out: "depoimento-02.webp", width: 720 },
  { key: "depoimento03", file: "depoimento-03.jpeg", out: "depoimento-03.webp", width: 720 },
  { key: "depoimento04", file: "depoimento-04.jpeg", out: "depoimento-04.webp", width: 720 },
  { key: "depoimento05", file: "depoimento-05.jpeg", out: "depoimento-05.webp", width: 720 },
];

mkdirSync(OUT, { recursive: true });

const manifest = {};

for (const job of JOBS) {
  const srcPath = path.join(SRC, job.file);
  let pipeline = sharp(srcPath).rotate();

  const meta = await pipeline.metadata();
  const W = meta.autoOrient?.width ?? meta.width;
  const H = meta.autoOrient?.height ?? meta.height;

  if (job.crop) {
    pipeline = pipeline.extract({
      left: Math.round(W * job.crop.left),
      top: Math.round(H * job.crop.top),
      width: Math.round(W * job.crop.width),
      height: Math.round(H * job.crop.height),
    });
  }

  // withoutEnlargement: nunca aumenta uma imagem pequena (os depoimentos ja sao 720px)
  const buffer = await pipeline
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  writeFileSync(path.join(OUT, job.out), buffer);
  const final = await sharp(buffer).metadata();

  // placeholder minusculo embutido no HTML, evita "flash" durante o carregamento
  const blur = await sharp(buffer).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();

  manifest[job.key] = {
    src: `/fotos/${job.out}`,
    width: final.width,
    height: final.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };

  console.log(
    `${job.out.padEnd(34)} ${String(final.width).padStart(4)}x${String(final.height).padEnd(4)} ${(buffer.length / 1024).toFixed(0).padStart(4)}KB`
  );
}

const ts = `// GERADO AUTOMATICAMENTE por scripts/optimize-images.mjs — nao edite a mao.
// Rode \`npm run images\` para regenerar a partir dos originais em imagens/.

export type FotoOtimizada = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const fotos = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, FotoOtimizada>;
`;

mkdirSync(path.join("src", "data"), { recursive: true });
writeFileSync(path.join("src", "data", "images.ts"), ts);
console.log(`\nManifesto: src/data/images.ts (${Object.keys(manifest).length} imagens)`);

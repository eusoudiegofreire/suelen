"use client";

import { useEffect, useRef } from "react";

/**
 * Fios dourados — campo de particulas que desenham rastros finos, como fios
 * de seda, sobre o grafite das secoes escuras.
 *
 * Adaptado do "Flow Field" do ThreeUI (MIT, (c) 2026 Meng To —
 * github.com/MengTO/threeui). Mudancas em relacao ao original:
 * - paleta trocada pelo dourado da logo e um toque de rose;
 * - o rastro desbota para o grafite do site (#272321), nao para o preto;
 * - o canvas ocupa so a secao, e nao a janela inteira;
 * - so anima enquanto a secao esta visivel e a aba esta aberta;
 * - menos particulas no celular;
 * - com "reduzir movimento", desenha um quadro parado e nao anima.
 */

// Grafite do site, em RGB, para o rastro sumir no fundo certo.
const FUNDO = { r: 39, g: 35, b: 33 };

// Dourado da logo (#c19638), brilho (#d8b05a), derivado escuro e rose.
const PALETA = [
  { r: 138, g: 106, b: 34 },
  { r: 193, g: 150, b: 56 },
  { r: 216, g: 176, b: 90 },
  { r: 232, g: 205, b: 150 },
  { r: 232, g: 216, b: 209 },
  { r: 193, g: 150, b: 56 },
];

export function FiosDourados({
  densidade = 1,
  intensidade = 1,
  className = "",
}: {
  /** Multiplica o numero de particulas. */
  densidade?: number;
  /** Multiplica a opacidade dos fios. Abaixo de 1 deixa mais discreto. */
  intensidade?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ruido = criarRuido(42);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let W = 0;
    let H = 0;
    let particulas: Particula[] = [];
    let tempo = 0;
    let quadro = 0;
    let visivel = false;

    const preencher = () => {
      ctx.fillStyle = `rgb(${FUNDO.r},${FUNDO.g},${FUNDO.b})`;
      ctx.fillRect(0, 0, W, H);
    };

    const medir = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      preencher();

      // Quantidade proporcional a area, com teto — no celular fica bem menor.
      const area = (W * H) / (1440 * 900);
      const total = Math.round(Math.min(2200, Math.max(500, 2200 * area)) * densidade);
      particulas = Array.from({ length: total }, () => nova(W, H));
    };

    const passo = () => {
      // Desbota o quadro anterior: e isso que cria o rastro.
      ctx.fillStyle = `rgba(${FUNDO.r},${FUNDO.g},${FUNDO.b},0.035)`;
      ctx.fillRect(0, 0, W, H);
      tempo += 0.0007;

      const escala = 0.0022;
      for (const p of particulas) {
        const nx = p.x * escala;
        const ny = p.y * escala;
        const angulo = ruido(nx, ny, tempo) * Math.PI * 2;
        const tom = ruido(nx * 1.5 + 100, ny * 1.5 + 100, tempo * 0.5);

        const px = p.x;
        const py = p.y;
        p.x += Math.cos(angulo) * p.vel;
        p.y += Math.sin(angulo) * p.vel;

        const c = cor(tom);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${c.r | 0},${c.g | 0},${c.b | 0},${(p.alfa * intensidade).toFixed(3)})`;
        ctx.lineWidth = p.espessura;
        ctx.stroke();

        if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
        }
      }
    };

    const animar = () => {
      passo();
      quadro = requestAnimationFrame(animar);
    };

    const iniciar = () => {
      if (quieto || quadro || !visivel || document.hidden) return;
      quadro = requestAnimationFrame(animar);
    };

    const parar = () => {
      cancelAnimationFrame(quadro);
      quadro = 0;
    };

    medir();

    // Sem movimento: avanca o campo algumas centenas de passos de uma vez
    // para ja ter os fios desenhados, e para por ai.
    if (quieto) for (let i = 0; i < 260; i++) passo();

    const io = new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;
        if (visivel) iniciar();
        else parar();
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(canvas);

    const aoMudarAba = () => (document.hidden ? parar() : iniciar());
    document.addEventListener("visibilitychange", aoMudarAba);

    // Redimensiona so quando a largura muda: no celular, a barra de endereco
    // muda a altura o tempo todo e nao vale reiniciar o desenho por isso.
    let larguraAnterior = W;
    const ro = new ResizeObserver(() => {
      const largura = Math.round(canvas.getBoundingClientRect().width);
      if (largura === larguraAnterior) return;
      larguraAnterior = largura;
      medir();
      if (quieto) for (let i = 0; i < 260; i++) passo();
    });
    ro.observe(canvas);

    return () => {
      parar();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", aoMudarAba);
    };
  }, [densidade, intensidade]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

/* -------------------------------------------------------------------------- */

type Particula = { x: number; y: number; vel: number; alfa: number; espessura: number };

function nova(W: number, H: number): Particula {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vel: 0.45 + Math.random() * 1.05,
    alfa: 0.12 + Math.random() * 0.45,
    espessura: 0.4 + Math.random() * 1.1,
  };
}

function cor(n: number) {
  const t = Math.min(1, Math.max(0, (n + 1) / 2)) * (PALETA.length - 1);
  const i = Math.floor(t);
  const f = t - i;
  const a = PALETA[Math.min(i, PALETA.length - 1)];
  const b = PALETA[Math.min(i + 1, PALETA.length - 1)];
  return { r: a.r + (b.r - a.r) * f, g: a.g + (b.g - a.g) * f, b: a.b + (b.b - a.b) * f };
}

/**
 * Ruido simplex 3D compacto (Stefan Gustavson), o mesmo usado no original,
 * reduzido ao que o campo precisa.
 */
function criarRuido(semente: number) {
  const grad = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
  ];
  const perm = new Uint8Array(512);
  const mod12 = new Uint8Array(512);
  const p = new Uint8Array(256);
  let s = semente;
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    mod12[i] = perm[i] % 12;
  }

  const F3 = 1 / 3;
  const G3 = 1 / 6;

  return function ruido(x: number, y: number, z: number) {
    const k = (x + y + z) * F3;
    const i = Math.floor(x + k);
    const j = Math.floor(y + k);
    const l = Math.floor(z + k);
    const t = (i + j + l) * G3;
    const x0 = x - (i - t);
    const y0 = y - (j - t);
    const z0 = z - (l - t);

    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const cantos = [
      [x0, y0, z0, 0, 0, 0],
      [x0 - i1 + G3, y0 - j1 + G3, z0 - k1 + G3, i1, j1, k1],
      [x0 - i2 + 2 * G3, y0 - j2 + 2 * G3, z0 - k2 + 2 * G3, i2, j2, k2],
      [x0 - 1 + 3 * G3, y0 - 1 + 3 * G3, z0 - 1 + 3 * G3, 1, 1, 1],
    ];

    const ii = i & 255;
    const jj = j & 255;
    const ll = l & 255;
    let soma = 0;
    for (const [cx, cy, cz, di, dj, dk] of cantos) {
      let a = 0.6 - cx * cx - cy * cy - cz * cz;
      if (a < 0) continue;
      a *= a;
      const g = grad[mod12[ii + di + perm[jj + dj + perm[ll + dk]]]];
      soma += a * a * (g[0] * cx + g[1] * cy + g[2] * cz);
    }
    return 32 * soma;
  };
}

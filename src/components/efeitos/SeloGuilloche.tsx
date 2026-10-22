"use client";

import { useEffect, useRef } from "react";

/**
 * Roseta guilhoche — o desenho de linhas entrelacadas das cedulas e dos
 * certificados gravados, aqui em dourado. A roseta do meio gira devagar,
 * como no torno de gravacao.
 *
 * Adaptado do "Engraved Certificate" do ThreeUI (MIT, (c) 2026 Meng To —
 * github.com/MengTO/threeui). Do original ficaram as curvas (rosetas
 * epitrocoides e a faixa ondulada do aro); sairam a moldura do certificado,
 * a troca automatica de padrao e os textos. A tinta verde virou o dourado
 * da marca.
 */

type Tom = "claro" | "escuro";

const TINTA: Record<Tom, string> = {
  claro: "138,106,34", // dourado escuro, legivel sobre o marfim
  escuro: "216,176,90", // brilho da logo, sobre o grafite
};

const TAU = Math.PI * 2;

export function SeloGuilloche({
  tom = "claro",
  comFundo = true,
  opacidade = 1,
  className = "",
}: {
  /** "claro" para fundo marfim, "escuro" para fundo grafite. */
  tom?: Tom;
  /** Disco marfim por tras das linhas, para o selo se destacar sobre foto. */
  comFundo?: boolean;
  /** Multiplica a opacidade das linhas — use baixo para ornamento de fundo. */
  opacidade?: number;
  className?: string;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const fixo = useRef<HTMLCanvasElement>(null);
  const giro = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = caixa.current;
    const cF = fixo.current;
    const cG = giro.current;
    const ctxF = cF?.getContext("2d");
    const ctxG = cG?.getContext("2d");
    if (!el || !cF || !cG || !ctxF || !ctxG) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tinta = (a: number) => `rgba(${TINTA[tom]},${(a * opacidade).toFixed(3)})`;
    let fase = 0;
    let timer = 0;
    let visivel = false;

    const ajustar = (c: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const lado = el.clientWidth;
      const s = Math.min(window.devicePixelRatio || 1, 2);
      const px = Math.max(2, Math.round(lado * s));
      if (c.width !== px) {
        c.width = px;
        c.height = px;
      }
      ctx.setTransform(s, 0, 0, s, 0, 0);
      ctx.clearRect(0, 0, lado, lado);
      return lado;
    };

    const desenharFixo = () => {
      const lado = ajustar(cF, ctxF);
      if (!lado) return;
      const c = lado / 2;
      const R = lado / 2;
      const pequeno = R < 110;
      // Abaixo de ~140px de diametro as linhas se fundem numa mancha; menos
      // voltas e traco mais leve mantem o desenho legivel.
      const mini = R < 70;

      if (comFundo) {
        const g = ctxF.createRadialGradient(c, c, R * 0.06, c, c, R);
        g.addColorStop(0, "rgba(250,246,238,0.97)");
        g.addColorStop(0.86, "rgba(247,243,237,0.95)");
        g.addColorStop(1, "rgba(247,243,237,0.9)");
        ctxF.fillStyle = g;
        ctxF.beginPath();
        ctxF.arc(c, c, R, 0, TAU);
        ctxF.fill();
      }

      // Aro: faixa ondulada entre dois filetes
      const aro = trilho(circulo(c, c, R * 0.93, 640), pequeno ? 420 : 620);
      faixa(ctxF, aro, { amp: R * 0.036, ondas: mini ? 36 : 60, K: mini ? 3 : 7, cor: tinta(0.42), lw: 0.5 });
      filete(ctxF, aro, -R * 0.036 - 1.6, tinta(0.5), 0.6);
      filete(ctxF, aro, R * 0.036 + 1.6, tinta(0.42), 0.5);

      // Roseta externa e roseta interna, girando em sentidos opostos
      roseta(ctxF, c, c, {
        A: R * 0.655, d: R * 0.215, m: mini ? 7 : 11, n: mini ? 16 : pequeno ? 40 : 58, pts: pequeno ? 320 : 470,
        cor: tinta(mini ? 0.55 : 0.5), lw: mini ? 0.45 : 0.5, encolhe: 0.035, fase: 0.2,
      });
      roseta(ctxF, c, c, {
        A: R * 0.335, d: R * 0.115, m: mini ? 13 : 19, n: mini ? 12 : pequeno ? 30 : 44, pts: pequeno ? 260 : 380,
        cor: tinta(mini ? 0.5 : 0.46), lw: mini ? 0.45 : 0.5, dir: -1, encolhe: 0.05, fase: 0.9,
      });

      // Centro
      ctxF.beginPath();
      ctxF.arc(c, c, R * 0.075, 0, TAU);
      if (comFundo) {
        ctxF.fillStyle = "rgba(250,246,238,0.95)";
        ctxF.fill();
      }
      ctxF.lineWidth = 0.6;
      ctxF.strokeStyle = tinta(0.5);
      ctxF.stroke();
    };

    const desenharGiro = () => {
      const lado = ajustar(cG, ctxG);
      if (!lado) return;
      const c = lado / 2;
      const R = lado / 2;
      const pequeno = R < 110;
      const mini = R < 70;
      roseta(ctxG, c, c, {
        A: R * 0.515, d: R * 0.165, m: mini ? 9 : 14, n: mini ? 10 : pequeno ? 22 : 34, pts: pequeno ? 220 : 320,
        cor: tinta(0.36), lw: 0.5, encolhe: 0.03, fase,
      });
    };

    const tique = () => {
      timer = 0;
      fase = (fase + 0.012) % TAU;
      desenharGiro();
      agendar();
    };
    const agendar = () => {
      if (timer || quieto || !visivel || document.hidden) return;
      timer = window.setTimeout(tique, 90);
    };
    const parar = () => {
      clearTimeout(timer);
      timer = 0;
    };

    desenharFixo();
    desenharGiro();

    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) agendar();
      else parar();
    });
    io.observe(el);

    const ro = new ResizeObserver(() => {
      desenharFixo();
      desenharGiro();
    });
    ro.observe(el);

    const aba = () => (document.hidden ? parar() : agendar());
    document.addEventListener("visibilitychange", aba);

    return () => {
      parar();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", aba);
    };
  }, [tom, comFundo, opacidade]);

  return (
    <div
      ref={caixa}
      aria-hidden="true"
      className={`aspect-square ${/\babsolute\b/.test(className) ? "" : "relative"} ${className}`}
    >
      <canvas ref={fixo} className="absolute inset-0 h-full w-full" />
      <canvas ref={giro} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Geometria — mesma matematica do original                                    */
/* -------------------------------------------------------------------------- */

type Ponto = [number, number];
type PontoTrilho = [number, number, number, number]; // x, y, normal x, normal y

function circulo(cx: number, cy: number, r: number, amostras: number): Ponto[] {
  return Array.from({ length: amostras }, (_, i) => {
    const th = (i / amostras) * TAU;
    return [cx + Math.cos(th) * r, cy + Math.sin(th) * r];
  });
}

/** Reamostra um contorno fechado em M pontos igualmente espacados, com a normal. */
function trilho(pts: Ponto[], M: number): PontoTrilho[] {
  const n = pts.length;
  const acum = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n];
    const q = pts[i - 1];
    acum[i] = acum[i - 1] + Math.hypot(p[0] - q[0], p[1] - q[1]);
  }
  const L = acum[n];
  const out: PontoTrilho[] = new Array(M);
  let j = 0;
  for (let i = 0; i < M; i++) {
    const alvo = (i / M) * L;
    while (j < n - 1 && acum[j + 1] < alvo) j++;
    const seg = acum[j + 1] - acum[j] || 1;
    const u = (alvo - acum[j]) / seg;
    const p = pts[j];
    const q = pts[(j + 1) % n];
    out[i] = [
      p[0] + (q[0] - p[0]) * u,
      p[1] + (q[1] - p[1]) * u,
      (q[1] - p[1]) / seg,
      -(q[0] - p[0]) / seg,
    ];
  }
  return out;
}

function faixa(
  ctx: CanvasRenderingContext2D,
  r: PontoTrilho[],
  o: { amp: number; ondas: number; K: number; cor: string; lw: number }
) {
  const M = r.length;
  ctx.lineWidth = o.lw;
  ctx.strokeStyle = o.cor;
  ctx.beginPath();
  for (let k = 0; k < o.K; k++) {
    const ph = (k / o.K) * TAU;
    for (let i = 0; i <= M; i++) {
      const p = r[i % M];
      const off = o.amp * Math.sin(o.ondas * ((i % M) / M) * TAU + ph);
      const x = p[0] + p[2] * off;
      const y = p[1] + p[3] * off;
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
  }
  ctx.stroke();
}

function filete(ctx: CanvasRenderingContext2D, r: PontoTrilho[], off: number, cor: string, lw: number) {
  const M = r.length;
  ctx.lineWidth = lw;
  ctx.strokeStyle = cor;
  ctx.beginPath();
  for (let i = 0; i <= M; i++) {
    const p = r[i % M];
    const x = p[0] + p[2] * off;
    const y = p[1] + p[3] * off;
    if (i) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  }
  ctx.stroke();
}

function roseta(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  o: {
    A: number; d: number; m: number; n: number; pts: number;
    cor: string; lw: number; dir?: number; encolhe?: number; fase?: number;
  }
) {
  const dir = o.dir ?? 1;
  const encolhe = o.encolhe ?? 0.06;
  ctx.lineWidth = o.lw;
  ctx.strokeStyle = o.cor;
  ctx.lineJoin = "round";
  ctx.beginPath();
  for (let k = 0; k < o.n; k++) {
    const f = k / o.n;
    const phi = (o.fase ?? 0) + dir * f * TAU;
    const a = o.A * (1 - encolhe * f);
    for (let i = 0; i <= o.pts; i++) {
      const t = (i / o.pts) * TAU;
      const x = cx + a * Math.cos(t) + o.d * Math.cos(o.m * t + phi);
      const y = cy + a * Math.sin(t) - o.d * Math.sin(o.m * t + phi);
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
  }
  ctx.stroke();
}

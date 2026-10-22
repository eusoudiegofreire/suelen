"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Lightbox, useLightbox, type ItemGaleria } from "../ui/Lightbox";

/**
 * Trilho de fotos em perspectiva: a foto em foco vem para frente e as
 * vizinhas recuam, inclinadas, dos dois lados. No computador o trilho segue
 * o mouse; no celular, o deslizar do dedo. Clicar na foto em foco amplia.
 *
 * Adaptado do "Character Filmstrip" do ThreeUI (MIT, (c) 2026 Meng To —
 * github.com/MengTO/threeui). Mantive a conta de posicao, profundidade e
 * inclinacao de cada cartao. Mudancas: cores e tipografia da marca; a roda
 * do mouse nao e mais capturada (a pagina continua rolando normalmente); no
 * celular o trilho continua horizontal e o toque vertical rola a pagina;
 * setas so funcionam com o trilho em foco; botoes de anterior/proximo; e
 * a animacao para fora da tela e respeita "reduzir movimento".
 */

/** Com poucas fotos o laco fica visivel; repetimos ate ter pelo menos 9. */
const MINIMO_NO_TRILHO = 9;

export function GaleriaFilmstrip({
  itens,
  legenda = "Resultados ampliados",
}: {
  itens: readonly ItemGaleria[];
  legenda?: string;
}) {
  const n = itens.length;
  const repeticoes = Math.max(1, Math.ceil(MINIMO_NO_TRILHO / n));
  const total = n * repeticoes;

  const palco = useRef<HTMLDivElement>(null);
  const cartoes = useRef<(HTMLButtonElement | null)[]>([]);
  const estado = useRef({ fase: 0, alvo: 0, base: 0, px: 0, py: 0, ativo: false, ultimo: 0 });
  const [emFoco, setEmFoco] = useState(0);
  const { indice, abrir, fechar, mover } = useLightbox(n);

  const maisProximo = useCallback(
    () => ((Math.round(estado.current.fase) % total) + total) % total,
    [total]
  );

  const irPara = useCallback(
    (i: number) => {
      const s = estado.current;
      let delta = i - maisProximo();
      if (delta > total / 2) delta -= total;
      if (delta < -total / 2) delta += total;
      s.base += delta;
      s.alvo = s.base;
      s.ativo = false;
      s.ultimo = performance.now();
    },
    [maisProximo, total]
  );

  const passo = useCallback(
    (d: number) => {
      const s = estado.current;
      s.base = Math.round(s.base) + d;
      s.alvo = s.base;
      s.ativo = false;
      s.ultimo = performance.now();
    },
    []
  );

  useEffect(() => {
    const el = palco.current;
    if (!el) return;
    const s = estado.current;
    s.ultimo = performance.now();

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let quadro = 0;
    let anterior = performance.now();
    let focoAnterior = -1;

    // Toque: arrasto horizontal muda a foto; o vertical continua rolando.
    let arrasto: { x: number; base: number } | null = null;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (e.pointerType === "mouse") {
        const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
        const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
        s.px = nx;
        s.py = ny;
        s.ativo = true;
        s.alvo = s.base + nx * 2.4;
        s.ultimo = performance.now();
        el.style.setProperty("--luz-x", `${(nx + 1) * 50}%`);
      } else if (arrasto) {
        const dx = e.clientX - arrasto.x;
        s.alvo = arrasto.base - dx / Math.max(90, r.width * 0.32);
        s.ultimo = performance.now();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      arrasto = { x: e.clientX, base: s.base };
    };
    const onUp = () => {
      if (!arrasto) return;
      s.base = Math.round(s.alvo);
      s.alvo = s.base;
      arrasto = null;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return onUp();
      s.ativo = false;
      s.px = 0;
      s.py = 0;
      s.alvo = s.base;
      el.style.setProperty("--luz-x", "50%");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onLeave);

    const desenhar = (agora: number) => {
      const dt = Math.min(32, agora - anterior);
      anterior = agora;
      const suave = quieto ? 1 : 1 - Math.pow(0.002, dt / 1000);

      // Parado por um tempo: o trilho balanca devagar sozinho.
      if (!quieto && !s.ativo && !arrasto && agora - s.ultimo > 4200) {
        const parado = agora - s.ultimo - 4200;
        s.alvo = s.base + Math.sin(parado * 0.00036) * 1.4;
      }

      s.fase += (s.alvo - s.fase) * suave;
      const largura = el.clientWidth;
      const compacto = largura < 640;
      const espaco = compacto
        ? Math.max(70, largura * 0.27)
        : Math.min(176, Math.max(118, largura * 0.13));

      cartoes.current.forEach((c, i) => {
        if (!c) return;
        let d = i - s.fase;
        while (d > total / 2) d -= total;
        while (d < -total / 2) d += total;
        const dist = Math.abs(d);
        const foco = Math.exp(-dist * dist * 1.28);
        const lado = Math.max(0, 1 - dist / 5);
        const sentido = Math.sign(d);

        const x = d * espaco;
        const y = dist * 8 + s.py * foco * 10;
        const z = foco * 145 - dist * 148;
        const escala = 0.54 + lado * 0.15 + foco * 0.54;
        const rx = -s.py * foco * 3.5;
        const ry = -sentido * (dist > 0.2 ? 14 + Math.min(dist, 3) * 5 : 0) + s.px * foco * 3;
        const rz = d * 0.7;

        c.style.setProperty("--foco", foco.toFixed(3));
        c.style.zIndex = String(Math.round(1000 - dist * 100));
        c.style.opacity = String(Math.max(0, Math.min(1, lado * 0.8 + foco * 0.2 + (dist < 0.5 ? 0.2 : 0))));
        c.style.filter = `blur(${(Math.max(0, dist - 1.5) * 0.4).toFixed(2)}px)`;
        c.style.transform =
          `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) ` +
          `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) scale(${escala.toFixed(3)})`;
      });

      const atual = maisProximo();
      if (atual !== focoAnterior) {
        focoAnterior = atual;
        setEmFoco(atual % n);
      }

      quadro = requestAnimationFrame(desenhar);
    };

    const iniciar = () => {
      if (!quadro) {
        anterior = performance.now();
        quadro = requestAnimationFrame(desenhar);
      }
    };
    const parar = () => {
      cancelAnimationFrame(quadro);
      quadro = 0;
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? iniciar() : parar()), {
      rootMargin: "100px 0px",
    });
    io.observe(el);
    // Primeiro quadro na hora, para nao aparecer empilhado antes de rolar.
    desenhar(performance.now());
    parar();

    return () => {
      parar();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [maisProximo, n, total]);

  const onTeclado = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); passo(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); passo(-1); }
  };

  return (
    <div>
      <div
        ref={palco}
        role="group"
        aria-roledescription="carrossel"
        aria-label="Registros de planejamento Full Face"
        onKeyDown={onTeclado}
        className="filmstrip-palco relative h-[27rem] overflow-hidden border border-line sm:h-[32rem] lg:h-[34rem]"
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {Array.from({ length: total }, (_, i) => {
            const item = itens[i % n];
            const real = i % n;
            const copia = i >= n;
            return (
              <button
                key={i}
                ref={(el) => {
                  cartoes.current[i] = el;
                }}
                type="button"
                tabIndex={copia ? -1 : 0}
                aria-hidden={copia || undefined}
                aria-label={`Registro ${real + 1} de ${n}. Ampliar imagem.`}
                onFocus={() => irPara(i)}
                onClick={(e) => {
                  if (maisProximo() === i) abrir(real, e.currentTarget);
                  else irPara(i);
                }}
                className="filmstrip-cartao absolute top-1/2 left-1/2 w-[clamp(9.5rem,40vw,11.5rem)] cursor-pointer sm:w-[clamp(11rem,16vw,14rem)]"
              >
                <span className="relative block aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={item.foto.src}
                    width={item.foto.width}
                    height={item.foto.height}
                    blurDataURL={item.foto.blurDataURL}
                    placeholder="blur"
                    sizes="(min-width: 640px) 16rem, 46vw"
                    alt={copia ? "" : item.alt}
                    draggable={false}
                    className="filmstrip-foto h-full w-full object-cover"
                  />
                </span>
                <span className="mt-[7px] flex items-center gap-3 bg-ink px-3 py-2.5 text-left">
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-light/70 font-display text-[0.8rem] text-gold-light"
                  >
                    {String(real + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate font-display text-[0.92rem] text-ivory">
                      Full Face
                    </span>
                    <span className="mt-0.5 hidden truncate text-[0.58rem] sm:block tracking-[0.16em] text-gold-light uppercase">
                      Registro autorizado
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controles e posicao */}
      <div className="mt-6 flex items-center justify-between gap-6">
        <p aria-live="polite" className="text-[0.82rem] tracking-[0.14em] text-ink-muted uppercase">
          Registro {String(emFoco + 1).padStart(2, "0")}
          <span className="text-gold-deep"> / {String(n).padStart(2, "0")}</span>
          <span className="ml-3 hidden normal-case tracking-normal sm:inline">
            · Clique na foto em destaque para ampliar
          </span>
        </p>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => passo(-1)}
            aria-label="Registro anterior"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold-deep"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
              <path d="M12 4.5 6.5 10l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => passo(1)}
            aria-label="Próximo registro"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold-deep"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
              <path d="m8 4.5 5.5 5.5L8 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <Lightbox itens={itens} indice={indice} onFechar={fechar} onMover={mover} legenda={legenda} />
    </div>
  );
}

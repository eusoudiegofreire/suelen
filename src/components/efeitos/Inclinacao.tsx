"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Inclina o conteudo em 3D acompanhando o mouse, com um reflexo de luz
 * suave que segue o cursor — como uma fotografia impressa sendo inclinada
 * na mao.
 *
 * Baseado no plano de arrasto dos cartoes do "Koi Studies" do ThreeUI
 * (MIT, (c) 2026 Meng To — github.com/MengTO/threeui): mesma perspectiva
 * (900px), mesmas variaveis --tilt-x/--tilt-y e mesma curva de retorno.
 *
 * So age com mouse. No toque e com "reduzir movimento", fica parado.
 */
export function Inclinacao({
  children,
  maximo = 5,
  className = "",
}: {
  children: ReactNode;
  /** Inclinacao maxima em graus. */
  maximo?: number;
  className?: string;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const plano = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = caixa.current;
    const pl = plano.current;
    if (!el || !pl) return;
    const pode =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pode) return;

    let quadro = 0;
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        pl.style.setProperty("--tilt-x", `${(-ny * maximo * 2).toFixed(2)}deg`);
        pl.style.setProperty("--tilt-y", `${(nx * maximo * 2).toFixed(2)}deg`);
        pl.style.setProperty("--luz-x", `${((nx + 0.5) * 100).toFixed(1)}%`);
        pl.style.setProperty("--luz-y", `${((ny + 0.5) * 100).toFixed(1)}%`);
        pl.style.setProperty("--luz", "1");
      });
    };
    const soltar = () => {
      cancelAnimationFrame(quadro);
      pl.style.setProperty("--tilt-x", "0deg");
      pl.style.setProperty("--tilt-y", "0deg");
      pl.style.setProperty("--luz", "0");
    };

    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", soltar);
    return () => {
      cancelAnimationFrame(quadro);
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", soltar);
    };
  }, [maximo]);

  return (
    <div ref={caixa} className={`[perspective:900px] ${className}`}>
      <div ref={plano} className="inclinacao-plano relative">
        {children}
        <span aria-hidden="true" className="inclinacao-luz" />
      </div>
    </div>
  );
}

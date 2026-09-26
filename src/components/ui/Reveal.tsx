"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Revela o conteudo com um deslocamento curto quando ele entra na tela.
 *
 * O estado inicial (invisivel) vive no CSS, dentro de uma media query
 * `prefers-reduced-motion: no-preference` — assim, quem pede menos movimento
 * recebe o conteudo ja visivel mesmo que o JavaScript nao rode.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sem suporte a IntersectionObserver, ou com movimento reduzido, o
    // conteudo aparece na hora em vez de esperar um evento que nao vira.
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto || !("IntersectionObserver" in window)) {
      el.dataset.revealed = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

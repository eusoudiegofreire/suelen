"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FotoOtimizada } from "@/data/images";

export type ItemGaleria = { foto: FotoOtimizada; alt: string };

/**
 * Ampliacao de imagem em <dialog> nativo — a prisao de foco e o fechamento
 * com Esc vem do proprio elemento, sem biblioteca externa.
 *
 * Navegacao por teclado: setas esquerda/direita. Os botoes sao reais, com
 * area de toque de 48px, e a posicao atual e anunciada via aria-live.
 */
export function Lightbox({
  itens,
  indice,
  onFechar,
  onMover,
  legenda,
}: {
  itens: readonly ItemGaleria[];
  /** `null` mantem o dialogo fechado. */
  indice: number | null;
  onFechar: () => void;
  onMover: (passo: number) => void;
  legenda?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const total = itens.length;

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (indice !== null && !dlg.open) dlg.showModal();
    if (indice === null && dlg.open) dlg.close();
  }, [indice]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); onMover(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); onMover(-1); }
    },
    [onMover]
  );

  useEffect(() => {
    if (indice === null) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [indice, onKey]);

  const atual = indice === null ? null : itens[indice];

  return (
    <dialog
      ref={ref}
      onClose={onFechar}
      aria-label={legenda ?? "Imagem ampliada"}
      className="m-auto max-h-[94dvh] w-[min(94vw,54rem)] bg-transparent p-0 backdrop:bg-ink/88 backdrop:backdrop-blur-sm"
    >
      {atual && (
        <div className="flex max-h-[94dvh] flex-col gap-3 p-1">
          <div className="flex items-center justify-between gap-4 text-ivory">
            <p aria-live="polite" className="text-[0.8rem] tracking-[0.12em] uppercase">
              {indice! + 1} / {total}
            </p>
            <button
              type="button"
              onClick={onFechar}
              aria-label="Fechar imagem ampliada"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory/15 focus-visible:outline-ivory"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <Image
            src={atual.foto.src}
            width={atual.foto.width}
            height={atual.foto.height}
            sizes="(min-width: 1024px) 54rem, 94vw"
            alt={atual.alt}
            className="max-h-[70dvh] w-full rounded-[2px] object-contain"
          />

          {total > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onMover(-1)}
                aria-label="Imagem anterior"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory/15"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                  <path d="M12 4.5 6.5 10l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onMover(1)}
                aria-label="Próxima imagem"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory/15"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                  <path d="m8 4.5 5.5 5.5L8 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

/**
 * Estado compartilhado pelas galerias que abrem a ampliacao.
 * Guarda o botao que disparou a abertura para devolver o foco no fechamento.
 */
export function useLightbox(total: number) {
  const gatilho = useRef<HTMLButtonElement | null>(null);
  const [indice, setIndice] = useState<number | null>(null);

  const abrir = (i: number, el: HTMLButtonElement) => {
    gatilho.current = el;
    setIndice(i);
  };

  const fechar = useCallback(() => {
    setIndice(null);
    gatilho.current?.focus();
  }, []);

  const mover = useCallback(
    (passo: number) =>
      setIndice((i) => (i === null ? i : (i + passo + total) % total)),
    [total]
  );

  return { indice, abrir, fechar, mover };
}

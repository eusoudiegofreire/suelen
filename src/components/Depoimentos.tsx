"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { depoimentos } from "@/data/content";
import { Eyebrow, Section } from "./ui/Primitives";
import { Lightbox, useLightbox } from "./ui/Lightbox";
import { Reveal } from "./ui/Reveal";

/**
 * Carrossel de prints reais. Os prints sao imagens de texto, entao nunca sao
 * cortados: cada slide respeita a proporcao original e pode ser ampliado.
 * Sem autoplay — a navegacao e sempre do visitante.
 */
export function Depoimentos() {
  const trilhoRef = useRef<HTMLUListElement>(null);
  const [ativo, setAtivo] = useState(0);
  const { indice, abrir, fechar, mover } = useLightbox(depoimentos.length);

  // Acompanha qual slide esta centralizado, para marcar o indicador.
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.slide);
          if (!Number.isNaN(i)) setAtivo(i);
        }
      },
      { root: trilho, threshold: 0.6 }
    );

    for (const li of trilho.querySelectorAll("[data-slide]")) io.observe(li);
    return () => io.disconnect();
  }, []);

  const irPara = useCallback((i: number) => {
    const trilho = trilhoRef.current;
    const alvo = trilho?.querySelector<HTMLElement>(`[data-slide="${i}"]`);
    if (!trilho || !alvo) return;
    trilho.scrollTo({
      left: alvo.offsetLeft - trilho.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const passo = useCallback(
    (delta: number) => {
      const proximo = Math.min(Math.max(ativo + delta, 0), depoimentos.length - 1);
      irPara(proximo);
    },
    [ativo, irPara]
  );

  return (
    <Section tone="sand" labelledBy="depoimentos-titulo">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow>Depoimentos</Eyebrow>
          <h2
            id="depoimentos-titulo"
            className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
          >
            Experiências de quem já foi atendida
          </h2>
        </div>

        {/* Controles do carrossel */}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => passo(-1)}
            disabled={ativo === 0}
            aria-label="Depoimento anterior"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
              <path d="M12 4.5 6.5 10l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => passo(1)}
            disabled={ativo === depoimentos.length - 1}
            aria-label="Próximo depoimento"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
              <path d="m8 4.5 5.5 5.5L8 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Reveal>

      <Reveal delay={90}>
        <ul
          ref={trilhoRef}
          // tabIndex permite rolar o carrossel com o teclado
          tabIndex={0}
          aria-label="Prints de mensagens enviadas por pacientes"
          className="scroll-x mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-5"
        >
          {depoimentos.map((item, i) => (
            <li
              key={item.foto.src}
              data-slide={i}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
            >
              <button
                type="button"
                onClick={(e) => abrir(i, e.currentTarget)}
                aria-label={`Ampliar depoimento ${i + 1} de ${depoimentos.length}`}
                className="block w-full cursor-zoom-in border border-line bg-shell p-3 transition-colors hover:border-gold-bright"
              >
                <Image
                  src={item.foto.src}
                  width={item.foto.width}
                  height={item.foto.height}
                  blurDataURL={item.foto.blurDataURL}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
                  alt={item.alt}
                  className="h-auto w-full object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Indicadores — também servem de atalho para cada slide */}
      <div className="mt-1 flex justify-center gap-2.5">
        {depoimentos.map((item, i) => (
          <button
            key={item.foto.src}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para o depoimento ${i + 1}`}
            aria-current={i === ativo}
            className="group flex h-10 w-6 items-center justify-center"
          >
            <span
              className={`block h-[3px] w-full transition-colors duration-300 ${
                i === ativo ? "bg-gold" : "bg-line group-hover:bg-gold-bright/60"
              }`}
            />
          </button>
        ))}
      </div>

      <Lightbox
        itens={depoimentos}
        indice={indice}
        onFechar={fechar}
        onMover={mover}
        legenda="Depoimento ampliado"
      />
    </Section>
  );
}

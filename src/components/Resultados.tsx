"use client";

import Image from "next/image";
import { AVISO_RESULTADOS, resultados } from "@/data/content";
import { Eyebrow, Section } from "./ui/Primitives";
import { Lightbox, useLightbox } from "./ui/Lightbox";
import { Reveal } from "./ui/Reveal";

export function Resultados() {
  const { indice, abrir, fechar, mover } = useLightbox(resultados.length);

  return (
    <Section id="resultados" tone="ivory" labelledBy="resultados-titulo">
      <Reveal className="max-w-2xl">
        <Eyebrow>Resultados</Eyebrow>
        <h2
          id="resultados-titulo"
          className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
        >
          Planejamento individual, resultados únicos
        </h2>
        <p className="mt-5 text-ink-soft">
          Conheça alguns resultados reais e autorizados de pacientes atendidos
          pelo Instituto Suelen Paranhos.
        </p>
      </Reveal>

      {/* Todas as imagens ficam visiveis; ampliar e um extra, nao um requisito */}
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {resultados.map((item, i) => (
          <Reveal as="li" key={item.foto.src} delay={Math.min(i * 45, 200)}>
            <button
              type="button"
              onClick={(e) => abrir(i, e.currentTarget)}
              aria-label={`Ampliar imagem ${i + 1} de ${resultados.length}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden border border-line bg-sand"
            >
              <span className="block aspect-[4/5]">
                <Image
                  src={item.foto.src}
                  width={item.foto.width}
                  height={item.foto.height}
                  blurDataURL={item.foto.blurDataURL}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 46vw"
                  alt={item.alt}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M13.2 13.2 17 17M9 6.8v4.4M6.8 9h4.4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl border-l-2 border-line pl-5 text-[0.85rem] leading-relaxed text-ink-muted">
        {AVISO_RESULTADOS}
      </p>

      <Lightbox
        itens={resultados}
        indice={indice}
        onFechar={fechar}
        onMover={mover}
        legenda="Resultados ampliados"
      />
    </Section>
  );
}

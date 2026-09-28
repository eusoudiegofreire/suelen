import Image from "next/image";
import { fotos } from "@/data/images";
import { beneficiosFullFace } from "@/data/content";
import { Eyebrow, Section, WhatsappCta } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

export function FullFace() {
  return (
    <Section id="full-face" tone="ink" labelledBy="full-face-titulo">
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Texto */}
        <div>
          <Reveal>
            <Eyebrow tone="dark">Planejamento Full Face</Eyebrow>
            <h2
              id="full-face-titulo"
              className="mt-6 text-[1.9rem] sm:text-4xl lg:text-[2.9rem]"
            >
              Seu rosto avaliado como um todo
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-6 space-y-5 text-ivory/78">
            <p>
              O Full Face é um planejamento completo da face. Em vez de olhar
              apenas para uma queixa isolada, a avaliação considera a relação
              entre as diferentes regiões do rosto.
            </p>
            <p>
              A partir dessa análise, a Dra. Suelen identifica quais
              procedimentos podem contribuir para a harmonia, o contorno e o
              cuidado com os sinais do envelhecimento, sempre de acordo com as
              necessidades de cada paciente.
            </p>
          </Reveal>

          {/* Benefícios */}
          <Reveal delay={140}>
            <ul className="mt-10 grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {beneficiosFullFace.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-ivory/12 py-3.5 text-[0.95rem] text-ivory/90"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-light"
                  >
                    <path
                      d="m2.5 8.5 3.5 3.5 7.5-8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            <blockquote className="mt-10 font-display text-[1.35rem] leading-snug text-gold-light sm:text-[1.6rem]">
              Full Face não significa fazer tudo. Significa avaliar o rosto por
              completo para definir o que realmente faz sentido para você.
            </blockquote>

            <div className="mt-9">
              <WhatsappCta
                variant="onDark"
                message="Olá! Conheci o site da Dra. Suelen Paranho e gostaria de agendar uma avaliação Full Face."
              >
                Agendar avaliação Full Face
              </WhatsappCta>
            </div>
          </Reveal>
        </div>

        {/* Foto */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 hidden h-full w-full border border-gold-light/35 sm:block"
          />
          <Image
            src={fotos.suelenFullFace.src}
            width={fotos.suelenFullFace.width}
            height={fotos.suelenFullFace.height}
            blurDataURL={fotos.suelenFullFace.blurDataURL}
            placeholder="blur"
            sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 85vw"
            alt="Dra. Suelen Paranho em ambiente de estúdio, sentada, vestindo traje social."
            className="relative h-auto w-full"
          />
        </Reveal>
      </div>
    </Section>
  );
}

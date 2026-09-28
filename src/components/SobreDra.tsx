import Image from "next/image";
import { siteConfig } from "@/config/site";
import { fotos } from "@/data/images";
import { Eyebrow, Section } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

export function SobreDra() {
  return (
    <Section id="sobre" tone="ivory" labelledBy="sobre-titulo">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Retrato */}
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 hidden h-full w-full border border-gold/45 sm:block"
          />
          <Image
            src={fotos.suelenSobre.src}
            width={fotos.suelenSobre.width}
            height={fotos.suelenSobre.height}
            blurDataURL={fotos.suelenSobre.blurDataURL}
            placeholder="blur"
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 55vw, 85vw"
            alt="Dra. Suelen Paranho, retrato em plano aproximado."
            className="relative h-auto w-full object-cover"
          />
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal>
            <Eyebrow>Sobre a profissional</Eyebrow>
            <h2
              id="sobre-titulo"
              className="mt-6 text-[1.9rem] sm:text-4xl lg:text-[2.8rem]"
            >
              {siteConfig.professional.name}
            </h2>

            <p className="mt-4 border-l-2 border-gold pl-5 text-[0.95rem] leading-relaxed text-ink-muted">
              {siteConfig.professional.title}
              <br />
              {siteConfig.professional.registry}
            </p>
          </Reveal>

          <Reveal delay={90} className="mt-7 space-y-5 text-ink-soft">
            <p>
              A Dra. Suelen trabalha com uma visão individualizada da estética
              facial. Sua abordagem começa pela escuta e pela avaliação completa
              de cada paciente.
            </p>
            <p>
              Seu objetivo é planejar procedimentos que cuidem e harmonizem as
              características do rosto sem apagar aquilo que torna cada pessoa
              única.
            </p>
            <p>
              Para ela, naturalidade significa planejar e executar cada etapa
              respeitando a anatomia, os objetivos e a identidade do paciente.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

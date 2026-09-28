import { etapas } from "@/data/content";
import { Eyebrow, Section } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

export function ComoFunciona() {
  return (
    <Section tone="ivory" labelledBy="como-funciona-titulo">
      <Reveal className="max-w-2xl">
        <Eyebrow>Passo a passo</Eyebrow>
        <h2
          id="como-funciona-titulo"
          className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
        >
          Como funciona o atendimento
        </h2>
      </Reveal>

      <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {etapas.map((etapa, i) => (
          <Reveal as="li" key={etapa.titulo} delay={Math.min(i * 80, 260)}>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="font-display text-[2.6rem] leading-none text-gold/55"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>
            <h3 className="mt-5 font-display text-[1.3rem] leading-tight text-ink">
              {etapa.titulo}
            </h3>
            <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-soft">
              {etapa.texto}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

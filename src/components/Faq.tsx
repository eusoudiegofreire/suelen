import { faq } from "@/data/content";
import { Eyebrow, Section } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

/**
 * Acordeao em <details>/<summary> nativos: abre e fecha pelo teclado, e
 * anunciado corretamente por leitores de tela e funciona mesmo sem JavaScript.
 */
export function Faq() {
  return (
    <Section id="duvidas" tone="ivory" labelledBy="faq-titulo">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2
            id="faq-titulo"
            className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.5rem]"
          >
            Perguntas que recebemos com frequência
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <div className="border-t border-line">
            {faq.map((item) => (
              <details
                key={item.pergunta}
                name="faq"
                className="group border-b border-line"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left font-display text-[1.12rem] leading-snug text-ink transition-colors hover:text-gold sm:text-[1.22rem] [&::-webkit-details-marker]:hidden">
                  {item.pergunta}
                  <span
                    aria-hidden="true"
                    className="relative mt-1 h-3.5 w-3.5 shrink-0 text-gold-bright"
                  >
                    <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 rotate-90 bg-current transition-transform duration-300 group-open:rotate-0" />
                  </span>
                </summary>
                <p className="pr-8 pb-5 text-[0.96rem] leading-relaxed text-ink-soft">
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import { Eyebrow, Section, WhatsappCta } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

export function Condicoes() {
  return (
    <Section tone="sand" labelledBy="condicoes-titulo">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Condições</Eyebrow>
          <h2
            id="condicoes-titulo"
            className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.5rem]"
          >
            Um planejamento que também considera as suas possibilidades
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <div className="space-y-5 text-ink-soft">
            <p>
              O Instituto trabalha com pagamento à vista e parcelamento no
              cartão.
            </p>
            <p>
              Quando o planejamento envolve mais de um procedimento, também pode
              existir a possibilidade de organizar o tratamento em etapas,
              conforme a indicação profissional e as possibilidades de cada
              paciente.
            </p>
            <p>
              O valor da avaliação e as condições disponíveis são informados pela
              equipe pelo WhatsApp.
            </p>
          </div>

          <div className="mt-9">
            <WhatsappCta
              variant="outline"
              message="Olá! Conheci o Instituto pelo site e gostaria de consultar a disponibilidade e as condições."
            >
              Consultar disponibilidade e condições
            </WhatsappCta>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

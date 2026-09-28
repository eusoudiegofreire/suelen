import { Section } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

export function Identificacao() {
  return (
    <Section tone="sand" labelledBy="identificacao-titulo">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <h2
            id="identificacao-titulo"
            className="text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
          >
            Você não precisa escolher um procedimento antes de ser avaliada
          </h2>
        </Reveal>

        <Reveal delay={90} className="space-y-5 text-ink-soft">
          <p>
            Talvez você queira suavizar linhas de expressão, melhorar o contorno
            facial, cuidar da qualidade da pele ou ajustar alguma característica
            que incomoda.
          </p>
          <p>
            Mas isso não significa que você precise chegar à clínica sabendo
            exatamente qual procedimento realizar.
          </p>
          <p>
            Durante a avaliação, a Dra. Suelen escuta o que você deseja, analisa
            sua face e explica quais possibilidades podem ser consideradas para o
            seu caso.
          </p>

          <blockquote className="mt-9 border-l-2 border-gold pl-6 font-display text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            O primeiro passo não é escolher um procedimento. É entender o que
            realmente faz sentido para você.
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}

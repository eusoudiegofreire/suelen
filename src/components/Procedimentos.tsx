import { procedimentos } from "@/data/content";
import { Eyebrow, Section, WhatsappCta } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

/**
 * Sem fotos de banco e sem icones decorativos: cada procedimento e apresentado
 * por tipografia e um filete dourado, a mesma linguagem das etiquetas de secao.
 */
export function Procedimentos() {
  return (
    <Section id="procedimentos" tone="ivory" labelledBy="procedimentos-titulo">
      <Reveal className="max-w-2xl">
        <Eyebrow>Procedimentos</Eyebrow>
        <h2
          id="procedimentos-titulo"
          className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
        >
          Cuidados definidos de acordo com a sua avaliação
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {procedimentos.map((proc, i) => (
          <Reveal
            as="li"
            key={proc.nome}
            delay={Math.min(i * 55, 220)}
            className="flex flex-col bg-ivory p-7 transition-colors duration-300 hover:bg-sand lg:p-8"
          >
            <span aria-hidden="true" className="rule" />
            <h3 className="mt-5 font-display text-[1.3rem] leading-tight text-ink">
              {proc.nome}
            </h3>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft">
              {proc.texto}
            </p>
          </Reveal>
        ))}

        {/* Fecha a grade sem deixar celula vazia: 7 cards + esta nota fecham
            4 linhas em 2 colunas e 3 linhas em 3 colunas. */}
        <Reveal
          as="li"
          delay={240}
          className="flex flex-col justify-center bg-sand p-7 lg:col-span-2 lg:p-8"
        >
          <p className="font-display text-[1.25rem] leading-snug text-ink">
            A indicação depende sempre da avaliação presencial.
          </p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
            Nenhum procedimento é indicado sem que a Dra. Suelen analise suas
            características e seus objetivos.
          </p>
        </Reveal>
      </ul>

      <Reveal delay={120} className="mt-12 flex justify-center">
        <WhatsappCta message="Olá! Conheci o Instituto pelo site e gostaria de agendar uma avaliação para saber qual procedimento é indicado para mim.">
          Quero saber qual procedimento é indicado para mim
        </WhatsappCta>
      </Reveal>
    </Section>
  );
}

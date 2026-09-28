import Image from "next/image";
import { fotos } from "@/data/images";
import { diferenciais } from "@/data/content";
import { Eyebrow, Section } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

export function Diferenciais() {
  return (
    <Section tone="sand" labelledBy="diferenciais-titulo">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Texto */}
        <div>
          <Reveal>
            <Eyebrow>Por que escolher a Dra. Suelen Paranhos</Eyebrow>
            <h2
              id="diferenciais-titulo"
              className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.5rem]"
            >
              Cada rosto tem uma estrutura, uma história e necessidades
              diferentes
            </h2>
            <p className="mt-6 text-ink-soft">
              Por isso, o atendimento não segue um modelo igual para todas as
              pessoas. Antes de indicar qualquer procedimento, a Dra. Suelen
              conversa com você, procura entender seus objetivos e realiza uma
              avaliação detalhada da face.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <ul className="mt-9">
              {diferenciais.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 border-b border-line py-3.5 text-[0.95rem] text-ink last:border-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1 w-1 shrink-0 rotate-45 bg-gold"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Composição com as duas fotos reais do espaço */}
        <Reveal delay={120} className="relative">
          {/* A composicao fica centrada ate o tablet e preenche a coluna no
              desktop, para nao sobrar espaco morto ao lado das fotos. */}
          <figure className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
            <Image
              src={fotos.ambienteEntrada.src}
              width={fotos.ambienteEntrada.width}
              height={fotos.ambienteEntrada.height}
              blurDataURL={fotos.ambienteEntrada.blurDataURL}
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 72vw"
              alt="Recepção da clínica da Dra. Suelen Paranhos, com balcão em mármore e letreiro dourado na parede."
              className="h-auto w-[82%] object-cover"
            />

            <Image
              src={fotos.ambienteSala.src}
              width={fotos.ambienteSala.width}
              height={fotos.ambienteSala.height}
              blurDataURL={fotos.ambienteSala.blurDataURL}
              placeholder="blur"
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 28vw, 52vw"
              alt="Sala de atendimento, com mesa branca, cadeiras e letreiro da Dra. Suelen Paranhos."
              className="absolute right-0 bottom-8 h-auto w-[58%] border-4 border-sand object-cover"
            />
            <figcaption className="sr-only">
              Recepção e sala de atendimento da Dra. Suelen Paranhos, em
              Ariquemes - RO.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}

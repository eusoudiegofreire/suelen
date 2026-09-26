import Image from "next/image";
import { siteConfig } from "@/config/site";
import { fotos } from "@/data/images";
import { WhatsappCta } from "./ui/Primitives";
import { Monogram } from "./ui/Monogram";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden bg-ivory pt-28 pb-16 sm:pt-32 md:pt-36 md:pb-24"
    >
      {/* Campo de luz quente atras da foto, no lugar de um gradiente colorido */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(201,174,116,0.16),transparent_68%)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Texto */}
        <div className="max-w-xl">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span aria-hidden="true" className="rule" />
            Harmonização Orofacial em Ariquemes–RO
          </p>

          <h1
            id="hero-titulo"
            className="mt-6 text-[2.05rem] leading-[1.14] sm:text-5xl lg:text-[3.4rem]"
          >
            Um planejamento facial pensado para você, com{" "}
            <em className="font-normal text-gold not-italic">naturalidade</em> e
            respeito à sua identidade
          </h1>

          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft">
            No Instituto Suelen Paranhos, seu rosto é avaliado como um todo para
            definir quais cuidados e procedimentos realmente fazem sentido para
            suas características e seus objetivos.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <WhatsappCta>Agendar minha avaliação</WhatsappCta>
            <a
              href="#full-face"
              className="inline-flex min-h-13 items-center justify-center gap-2 px-2 text-[0.95rem] font-medium text-ink underline decoration-line underline-offset-[6px] transition-colors hover:decoration-gold sm:px-4"
            >
              Conhecer o Full Face
            </a>
          </div>

          {/* Assinatura profissional */}
          <div className="mt-10 flex items-start gap-3.5 border-t border-line pt-6">
            <Monogram className="mt-0.5 h-8 w-8 shrink-0 text-gold-bright" />
            <p className="text-[0.86rem] leading-relaxed text-ink-muted">
              <span className="font-medium text-ink">
                {siteConfig.professional.name}
              </span>
              <br />
              {siteConfig.professional.title} — {siteConfig.professional.registry}
            </p>
          </div>
        </div>

        {/* Retrato */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Moldura deslocada, detalhe editorial discreto */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 hidden h-full w-full border border-gold-bright/35 sm:block"
          />
          <Image
            src={fotos.heroSuelen.src}
            width={fotos.heroSuelen.width}
            height={fotos.heroSuelen.height}
            blurDataURL={fotos.heroSuelen.blurDataURL}
            placeholder="blur"
            preload
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 90vw"
            alt="Retrato da Dra. Suelen Paranhos, cirurgiã-dentista responsável pelo Instituto."
            className="relative h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

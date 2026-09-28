import Image from "next/image";
import { siteConfig, whatsappUrl } from "@/config/site";
import { fotos } from "@/data/images";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden bg-ivory"
    >
      {/* Luz quente muito suave saindo da area da fotografia. Fica atras de
          tudo e nunca cobre o rosto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-18%] right-[-14%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(232,216,209,0.55),rgba(247,243,237,0)_66%)]"
      />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-12">
        {/* 52% conteudo / 48% fotografia */}
        <div className="grid items-center gap-14 pt-28 pb-20 sm:pt-32 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:pt-32 lg:pb-14 lg:min-h-[clamp(700px,100svh,880px)] xl:gap-16">
          {/* ----------------------------------------------------------------
              Conteudo
              ---------------------------------------------------------------- */}
          <div className="min-w-0 max-w-[40rem] lg:max-w-none lg:pr-6">
            <p className="flex items-center gap-3.5">
              <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gold" />
              <span className="text-[0.7rem] font-medium tracking-[0.2em] text-gold-deep uppercase sm:text-[0.76rem] sm:tracking-[0.24em]">
                Harmonização Orofacial em Ariquemes–RO
              </span>
            </p>

            <h1
              id="hero-titulo"
              className="mt-7 text-[2.25rem] leading-[1.06] font-medium tracking-[-0.02em] text-ink min-[380px]:text-[2.4rem] sm:text-[2.85rem] lg:mt-8 lg:text-[2.35rem] lg:leading-[1.04] xl:text-[clamp(3rem,-1.375rem+5.47vw,3.9rem)]"
            >
              Um planejamento facial pensado para você, com{" "}
              <span className="text-wine">naturalidade e respeito</span> à sua
              identidade
            </h1>

            <p className="mt-7 max-w-[34rem] text-[1.06rem] leading-[1.72] text-ink-soft sm:text-[1.12rem] lg:mt-8 lg:text-[1.18rem]">
              Seu rosto é avaliado como um todo para definir quais cuidados e
              procedimentos realmente fazem sentido para suas características e
              seus objetivos.
            </p>

            <div className="mt-9 flex flex-col flex-wrap items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6 lg:mt-10">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[3.5rem] items-center justify-center gap-3 rounded-full bg-wine px-8 text-[1rem] font-medium whitespace-nowrap text-white shadow-[0_14px_30px_-14px_rgba(139,38,61,0.65)] transition-colors duration-300 hover:bg-wine-deep lg:px-9"
              >
                Agendar minha avaliação
                <Seta />
              </a>

              <a
                href="#full-face"
                className="group inline-flex min-h-[3.5rem] items-center justify-center gap-2.5 text-[1rem] font-medium whitespace-nowrap text-ink transition-colors duration-300 hover:text-wine sm:justify-start"
              >
                <span className="border-b border-[var(--color-hairline)] pb-1 transition-colors duration-300 group-hover:border-wine">
                  Conhecer o Full Face
                </span>
                <Seta />
              </a>
            </div>

            {/* Assinatura profissional */}
            <p className="mt-11 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[var(--color-hairline)] pt-6 text-[0.86rem] text-ink-muted lg:mt-12">
              <span className="font-medium text-ink">
                {siteConfig.professional.name}
              </span>
              <Ponto />
              <span>{siteConfig.professional.titleShort}</span>
              <Ponto />
              <span>{siteConfig.professional.registry}</span>
            </p>
          </div>

          {/* ----------------------------------------------------------------
              Fotografia
              ---------------------------------------------------------------- */}
          <div className="relative mx-auto w-full min-w-0 max-w-[26rem] sm:max-w-[30rem] lg:mr-0 lg:ml-auto lg:max-w-[700px]">
            {/* Forma organica em rose, deslocada atras da foto. Nao e moldura:
                nao tem borda e nao acompanha o contorno da imagem. */}
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-8 -bottom-16 -left-12 rounded-[58%_42%_46%_54%/44%_56%_44%_56%] bg-rose/75 sm:-right-12 sm:-bottom-20 sm:-left-16"
            />

            {/* Curva dourada fina, so nas bordas — passa por tras da foto e
                nunca cruza o rosto. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 400"
              fill="none"
              preserveAspectRatio="none"
              className="pointer-events-none absolute top-14 -bottom-14 -left-12 hidden w-24 lg:block"
            >
              <path
                d="M92 6C26 104 26 292 90 394"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>

            <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_42px_90px_-38px_rgba(39,35,33,0.45)] lg:rounded-[2rem]">
              <Image
                src={fotos.heroSuelen.src}
                width={fotos.heroSuelen.width}
                height={fotos.heroSuelen.height}
                blurDataURL={fotos.heroSuelen.blurDataURL}
                placeholder="blur"
                preload
                sizes="(min-width: 1024px) 700px, (min-width: 640px) 60vw, 92vw"
                alt="Retrato da Dra. Suelen Paranhos, cirurgiã-dentista."
                className="aspect-[4/5] h-full w-full object-cover object-[50%_18%] lg:aspect-[7/8]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Seta() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M4 10h11M11 5.5 15.5 10 11 14.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Ponto() {
  return <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />;
}

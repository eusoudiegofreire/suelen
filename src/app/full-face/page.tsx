import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/config/site";
import { fotos } from "@/data/images";
import {
  AVISO_RESULTADOS,
  beneficiosFullFace,
  etapas,
  procedimentos,
} from "@/data/content";
import {
  MENSAGEM_FULL_FACE,
  apoiosHero,
  comparacao,
  faqFullFace,
  queixas,
  regioesAvaliadas,
  resultadosFullFace,
} from "@/data/full-face";
import { Marca } from "@/components/ui/Marca";
import { Eyebrow, Section, WhatsappCta, WhatsappGlyph } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Resultados } from "@/components/Resultados";
import { Depoimentos } from "@/components/Depoimentos";
import { FloatingCta } from "@/components/FloatingCta";
import { MetaPixel } from "@/components/MetaPixel";
import { RastreioWhatsapp } from "@/components/RastreioWhatsapp";

const TITULO = `Full Face em Ariquemes | ${siteConfig.name}`;
const DESCRICAO =
  "Planejamento Full Face com a Dra. Suelen Paranho em Ariquemes–RO: avaliação do rosto como um todo para definir o que realmente faz sentido para você, com naturalidade e equilíbrio.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/full-face" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${siteConfig.url}/full-face`,
    siteName: siteConfig.name,
    title: TITULO,
    description: DESCRICAO,
    images: [
      {
        url: fotos.suelenFullFace.src,
        width: fotos.suelenFullFace.width,
        height: fotos.suelenFullFace.height,
        alt: `${siteConfig.professional.name} — Planejamento Full Face`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: [fotos.suelenFullFace.src],
  },
};

export default function FullFacePage() {
  return (
    <>
      {/* Pagina de anuncio: pixel + evento de contato nos botoes do WhatsApp */}
      <MetaPixel />
      <RastreioWhatsapp local="full-face" />

      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-[2px] focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
      >
        Ir para o conteúdo
      </a>

      <Topo />

      <main id="conteudo">
        <Abertura />
        <Identificacao />
        <OQueE />
        <OQueAvaliamos />
        <Procedimentos />
        <Resultados
          itens={resultadosFullFace}
          titulo="Planejamentos Full Face realizados pela Dra. Suelen"
          texto="Registros reais e autorizados de pacientes que passaram pela avaliação e pelo planejamento Full Face."
        />
        <Depoimentos />
        <SobreDra />
        <ComoFunciona />
        <Duvidas />
        <Fechamento />
      </main>

      <Rodape />
      <FloatingCta message={MENSAGEM_FULL_FACE} label="Agendar avaliação Full Face" />
    </>
  );
}

/* ==========================================================================
   Topo — so a marca e o botao. Sem menu: a pagina tem um unico caminho.
   ========================================================================== */
function Topo() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-hairline)] bg-ivory/92 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${siteConfig.name} — ir para a página principal`}
        >
          <Marca />
        </Link>

        <a
          href={whatsappUrl(MENSAGEM_FULL_FACE)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-12 items-center gap-2.5 rounded-full border border-wine/45 px-5 text-[0.92rem] font-medium whitespace-nowrap text-wine transition-colors duration-300 hover:bg-wine hover:text-white sm:inline-flex"
        >
          <WhatsappGlyph className="h-4.5 w-4.5" />
          Agendar avaliação
        </a>
      </div>
    </header>
  );
}

/* ==========================================================================
   1. Abertura
   ========================================================================== */
function Abertura() {
  return (
    <section
      aria-labelledby="ff-titulo"
      className="relative overflow-hidden bg-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20%] right-[-16%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(232,216,209,0.6),rgba(247,243,237,0)_66%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-12 pb-20 sm:px-8 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pt-14 lg:pb-24">
        <div className="min-w-0">
          <p className="flex items-center gap-3.5">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gold" />
            <span className="text-[0.7rem] font-medium tracking-[0.2em] text-gold-deep uppercase sm:text-[0.76rem] sm:tracking-[0.24em]">
              Planejamento Full Face · Ariquemes–RO
            </span>
          </p>

          <h1
            id="ff-titulo"
            className="mt-7 text-[2.2rem] leading-[1.06] font-medium tracking-[-0.02em] text-ink min-[380px]:text-[2.4rem] sm:text-[2.9rem] lg:text-[3.25rem] xl:text-[3.6rem]"
          >
            Seu rosto planejado por inteiro, com{" "}
            <span className="text-wine">naturalidade e equilíbrio</span>
          </h1>

          <p className="mt-7 max-w-[34rem] text-[1.06rem] leading-[1.72] text-ink-soft sm:text-[1.14rem]">
            No Full Face, a Dra. Suelen avalia a face como um todo antes de
            indicar qualquer procedimento. Assim, você trata o que realmente
            faz sentido para as suas características, sem perder aquilo que
            torna o seu rosto seu.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={whatsappUrl(MENSAGEM_FULL_FACE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[3.5rem] items-center justify-center gap-3 rounded-full bg-wine px-8 text-[1rem] font-medium whitespace-nowrap text-white shadow-[0_14px_30px_-14px_rgba(139,38,61,0.65)] transition-colors duration-300 hover:bg-wine-deep"
            >
              <WhatsappGlyph className="h-5 w-5" />
              Quero minha avaliação Full Face
            </a>

            <a
              href="#o-que-e"
              className="group inline-flex min-h-[3.5rem] items-center justify-center gap-2.5 text-[1rem] font-medium whitespace-nowrap text-ink transition-colors duration-300 hover:text-wine sm:justify-start"
            >
              <span className="border-b border-[var(--color-hairline)] pb-1 transition-colors duration-300 group-hover:border-wine">
                Entender como funciona
              </span>
            </a>
          </div>

          <ul className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {apoiosHero.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[0.9rem] text-ink-soft"
              >
                <Check className="text-gold-deep" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[var(--color-hairline)] pt-6 text-[0.86rem] text-ink-muted">
            <span className="font-medium text-ink">
              {siteConfig.professional.name}
            </span>
            <Ponto />
            <span>{siteConfig.professional.titleShort}</span>
            <Ponto />
            <span>{siteConfig.professional.registry}</span>
          </p>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[24rem] sm:max-w-[28rem] lg:mr-0 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-8 -right-6 -bottom-12 -left-10 rounded-[58%_42%_46%_54%/44%_56%_44%_56%] bg-rose/75 sm:-right-10 sm:-left-14"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_42px_90px_-38px_rgba(39,35,33,0.45)]">
            <Image
              src={fotos.suelenFullFace.src}
              width={fotos.suelenFullFace.width}
              height={fotos.suelenFullFace.height}
              blurDataURL={fotos.suelenFullFace.blurDataURL}
              placeholder="blur"
              preload
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 60vw, 92vw"
              alt="Dra. Suelen Paranho em ambiente de estúdio, sentada, vestindo traje social."
              className="aspect-[4/5] h-full w-full object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   2. Identificacao — a pessoa se reconhece
   ========================================================================== */
function Identificacao() {
  return (
    <Section tone="sand" labelledBy="ff-queixas-titulo">
      <Reveal className="max-w-2xl">
        <Eyebrow>Talvez seja o seu caso</Eyebrow>
        <h2
          id="ff-queixas-titulo"
          className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
        >
          Você se olha no espelho e sente que algo mudou?
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {queixas.map((item, i) => (
          <Reveal
            as="li"
            key={item}
            delay={Math.min(i * 50, 220)}
            className="flex gap-4 border border-line bg-shell p-6"
          >
            <span
              aria-hidden="true"
              className="font-display text-[1.6rem] leading-none text-gold"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[0.98rem] leading-relaxed text-ink">{item}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120}>
        <blockquote className="mt-12 max-w-3xl border-l-2 border-gold pl-6 font-display text-[1.3rem] leading-snug text-ink sm:text-[1.55rem]">
          Você não precisa chegar sabendo qual procedimento fazer. O primeiro
          passo é entender o que realmente faz sentido para o seu rosto.
        </blockquote>
      </Reveal>
    </Section>
  );
}

/* ==========================================================================
   3. O que e o Full Face + comparacao
   ========================================================================== */
function OQueE() {
  return (
    <Section id="o-que-e" tone="ink" labelledBy="ff-oque-titulo">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow tone="dark">O que é o Full Face</Eyebrow>
          <h2
            id="ff-oque-titulo"
            className="mt-6 text-[1.9rem] sm:text-4xl lg:text-[2.8rem]"
          >
            Seu rosto avaliado como um todo
          </h2>
          <div className="mt-6 space-y-5 text-ivory/78">
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
          </div>
          <blockquote className="mt-9 font-display text-[1.3rem] leading-snug text-gold-light sm:text-[1.5rem]">
            Full Face não significa fazer tudo. Significa avaliar o rosto por
            completo para definir o que realmente faz sentido para você.
          </blockquote>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-ivory/15 p-6 sm:p-7">
              <p className="eyebrow text-ivory/60">Procedimentos isolados</p>
              <ul className="mt-5 space-y-3.5">
                {comparacao.isolado.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] text-ivory/70"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.7rem] h-px w-3 shrink-0 bg-ivory/40"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-gold-light/50 bg-ivory/[0.04] p-6 sm:p-7">
              <p className="eyebrow text-gold-light">Planejamento Full Face</p>
              <ul className="mt-5 space-y-3.5">
                {comparacao.fullFace.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] text-ivory"
                  >
                    <Check className="mt-1 text-gold-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {beneficiosFullFace.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-ivory/12 py-3.5 text-[0.95rem] text-ivory/90"
              >
                <Check className="mt-1 text-gold-light" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <WhatsappCta variant="onDark" message={MENSAGEM_FULL_FACE}>
              Agendar minha avaliação Full Face
            </WhatsappCta>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ==========================================================================
   4. O que a avaliacao observa
   ========================================================================== */
function OQueAvaliamos() {
  return (
    <Section tone="ivory" labelledBy="ff-avaliacao-titulo">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Na avaliação</Eyebrow>
          <h2
            id="ff-avaliacao-titulo"
            className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
          >
            O que a Dra. Suelen observa no seu rosto
          </h2>
          <p className="mt-5 text-ink-soft">
            A avaliação é presencial e individualizada. Começa pela escuta do
            que você deseja e segue com a análise da face, para que o
            planejamento seja feito para você, e não a partir de um modelo
            pronto.
          </p>
        </Reveal>

        <ol className="border-t border-line">
          {regioesAvaliadas.map((item, i) => (
            <Reveal
              as="li"
              key={item.titulo}
              delay={Math.min(i * 60, 240)}
              className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-7 sm:grid-cols-[4rem_1fr]"
            >
              <span
                aria-hidden="true"
                className="font-display text-[2rem] leading-none text-gold/60"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[1.3rem] leading-tight text-ink">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-soft">
                  {item.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ==========================================================================
   5. Procedimentos que podem compor o planejamento
   ========================================================================== */
function Procedimentos() {
  return (
    <Section tone="sand" labelledBy="ff-procedimentos-titulo">
      <Reveal className="max-w-2xl">
        <Eyebrow>Possibilidades</Eyebrow>
        <h2
          id="ff-procedimentos-titulo"
          className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
        >
          Procedimentos que podem fazer parte do seu planejamento
        </h2>
        <p className="mt-5 text-ink-soft">
          Não existe um pacote fixo. Depois da avaliação, a Dra. Suelen explica
          quais destes cuidados são indicados para o seu caso e em que ordem
          faz sentido realizá-los.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {procedimentos.map((p, i) => (
          <Reveal
            as="li"
            key={p.nome}
            delay={Math.min(i * 45, 220)}
            className="bg-shell p-7"
          >
            <h3 className="font-display text-[1.25rem] leading-tight text-ink">
              {p.nome}
            </h3>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft">
              {p.texto}
            </p>
          </Reveal>
        ))}
        {/* Fecha a grade de 3 colunas com um convite em vez de um vazio */}
        <li className="flex flex-col justify-center bg-ink p-7 text-ivory on-dark lg:col-span-2">
          <p className="font-display text-[1.25rem] leading-snug">
            Não sabe por onde começar? É exatamente para isso que existe a
            avaliação.
          </p>
          <a
            href={whatsappUrl(MENSAGEM_FULL_FACE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2.5 self-start text-[0.95rem] font-medium text-gold-light underline decoration-gold-light/40 underline-offset-4 transition-colors hover:decoration-gold-light"
          >
            <WhatsappGlyph className="h-4.5 w-4.5" />
            Falar com a equipe
          </a>
        </li>
      </ul>

      <p className="mt-8 max-w-2xl border-l-2 border-line pl-5 text-[0.85rem] leading-relaxed text-ink-muted">
        {AVISO_RESULTADOS}
      </p>
    </Section>
  );
}

/* ==========================================================================
   6. Sobre a Dra.
   ========================================================================== */
function SobreDra() {
  return (
    <Section tone="ivory" labelledBy="ff-sobre-titulo">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
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

        <div>
          <Reveal>
            <Eyebrow>Quem faz o seu planejamento</Eyebrow>
            <h2
              id="ff-sobre-titulo"
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

/* ==========================================================================
   7. Como funciona + condicoes
   ========================================================================== */
function ComoFunciona() {
  return (
    <Section tone="sand" labelledBy="ff-etapas-titulo">
      <Reveal className="max-w-2xl">
        <Eyebrow>Passo a passo</Eyebrow>
        <h2
          id="ff-etapas-titulo"
          className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
        >
          Do primeiro contato ao seu planejamento
        </h2>
      </Reveal>

      <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {etapas.map((etapa, i) => (
          <Reveal as="li" key={etapa.titulo} delay={Math.min(i * 80, 260)}>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="font-display text-[2.6rem] leading-none text-gold/60"
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

      <Reveal
        delay={120}
        className="mt-14 grid gap-8 border border-line bg-shell p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"
      >
        <div>
          <h3 className="font-display text-[1.45rem] leading-tight text-ink sm:text-[1.7rem]">
            Um planejamento que cabe no seu momento
          </h3>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Pagamento à vista ou parcelado no cartão. Quando o planejamento
            envolve mais de um procedimento, ele pode ser organizado em
            etapas. O valor da avaliação e as condições são informados pela
            equipe no WhatsApp.
          </p>
        </div>
        <WhatsappCta message={MENSAGEM_FULL_FACE}>
          Consultar condições
        </WhatsappCta>
      </Reveal>
    </Section>
  );
}

/* ==========================================================================
   8. Duvidas
   ========================================================================== */
function Duvidas() {
  return (
    <Section id="duvidas" tone="ivory" labelledBy="ff-faq-titulo">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2
            id="ff-faq-titulo"
            className="mt-6 text-[1.75rem] sm:text-4xl lg:text-[2.5rem]"
          >
            O que você precisa saber sobre o Full Face
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <div className="border-t border-line">
            {faqFullFace.map((item) => (
              <details
                key={item.pergunta}
                name="faq-full-face"
                className="group border-b border-line"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left font-display text-[1.12rem] leading-snug text-ink transition-colors hover:text-wine sm:text-[1.22rem] [&::-webkit-details-marker]:hidden">
                  {item.pergunta}
                  <span
                    aria-hidden="true"
                    className="relative mt-1 h-3.5 w-3.5 shrink-0 text-gold"
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

/* ==========================================================================
   9. Fechamento — id="agendar" faz o botao flutuante sair de cena aqui
   ========================================================================== */
function Fechamento() {
  return (
    <Section id="agendar" tone="ink" labelledBy="ff-cta-titulo">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Image
          src="/marca/logo-simbolo-branco.png"
          width={640}
          height={575}
          alt=""
          aria-hidden="true"
          className="mx-auto h-20 w-auto sm:h-24"
        />
        <h2
          id="ff-cta-titulo"
          className="mt-8 text-[1.9rem] leading-[1.15] sm:text-4xl lg:text-[2.9rem]"
        >
          Descubra o que realmente faz sentido para o seu rosto
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-ivory/78">
          Agende sua avaliação Full Face presencial em Ariquemes e saia com um
          planejamento feito para as suas características e os seus objetivos.
        </p>
        <div className="mt-9 flex justify-center">
          <WhatsappCta variant="onDark" message={MENSAGEM_FULL_FACE}>
            Agendar minha avaliação Full Face
          </WhatsappCta>
        </div>
        <p className="mt-5 text-[0.85rem] text-ivory/60">
          Atendimento pelo WhatsApp com a equipe da clínica.
        </p>
      </Reveal>
    </Section>
  );
}

/* ==========================================================================
   Rodape minimo
   ========================================================================== */
function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ivory px-5 pt-12 pb-28 sm:px-8 md:pb-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Marca />
          <p className="mt-5 text-[0.9rem] leading-relaxed text-ink-soft">
            {siteConfig.professional.title}
            <br />
            {siteConfig.professional.registry} · Atendimento presencial em{" "}
            {siteConfig.address.label}
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-[0.92rem] text-ink-soft underline decoration-[var(--color-hairline)] underline-offset-4 transition-colors hover:text-wine hover:decoration-wine"
        >
          Conhecer o site completo
        </Link>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col gap-2 border-t border-line pt-6 text-[0.8rem] text-ink-muted sm:flex-row sm:justify-between">
        <p>
          © {ano} {siteConfig.name}. Todos os direitos reservados.
        </p>
        <p>
          As informações desta página têm caráter informativo e não substituem
          uma avaliação presencial.
        </p>
      </div>
    </footer>
  );
}

/* ==========================================================================
   Pecas pequenas
   ========================================================================== */
function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 ${className}`}
    >
      <path
        d="m2.5 8.5 3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Ponto() {
  return <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { garantiasCursoVip } from "@/data/curso-vip";
import { Marca } from "@/components/ui/Marca";
import { MetaPixel } from "@/components/MetaPixel";
import { FormularioCursoVip } from "./FormularioCursoVip";

const TITULO = `Curso VIP | ${siteConfig.name}`;
const DESCRICAO = `Responda a três perguntas rápidas e converse com a equipe da ${siteConfig.name} sobre o Curso VIP.`;

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/curso-vip" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${siteConfig.url}/curso-vip`,
    siteName: siteConfig.name,
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: { card: "summary", title: TITULO, description: DESCRICAO },
};

export default function CursoVipPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-ivory lg:flex-row">
      {/* Rastreamento so nesta pagina: e ela que recebe trafego de anuncio */}
      <MetaPixel />

      {/* ==================================================================
          Apresentacao — 42% no desktop, bloco compacto no celular
          ================================================================== */}
      <aside className="relative flex flex-col justify-between overflow-hidden bg-sand px-6 pt-7 pb-8 sm:px-10 lg:w-[42%] lg:px-12 lg:py-12 xl:px-16">
        {/* Forma organica discreta, a mesma linguagem do Hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 h-[30rem] w-[30rem] rounded-[58%_42%_46%_54%/44%_56%_44%_56%] bg-rose/45"
        />

        <div className="relative">
          <Link
            href="/"
            className="inline-block rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
            aria-label={`${siteConfig.name} — voltar para a página principal`}
          >
            <Marca />
          </Link>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <p className="flex items-center gap-3.5">
            <span aria-hidden="true" className="h-px w-9 shrink-0 bg-gold" />
            <span className="text-[0.72rem] font-medium tracking-[0.24em] text-wine uppercase">
              Curso VIP
            </span>
          </p>

          <h1 className="mt-5 font-display text-[1.9rem] leading-[1.1] font-medium tracking-[-0.015em] text-ink sm:text-[2.3rem] lg:text-[2.6rem] xl:text-[2.9rem]">
            Quero participar do Curso VIP
          </h1>

          <p className="mt-5 max-w-[30rem] text-[1.02rem] leading-[1.7] text-ink-soft lg:text-[1.08rem]">
            Responda a 3 perguntas rápidas para verificarmos se o curso é
            compatível com o seu momento profissional.
          </p>
        </div>

        {/* Indicadores de apoio — nada aqui afirma vaga, data, preco ou carga */}
        <ul className="relative mt-7 flex flex-wrap gap-x-5 gap-y-2 lg:mt-0 lg:flex-col lg:gap-y-3.5">
          {garantiasCursoVip.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[0.88rem] text-ink-soft"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-gold-deep"
              >
                <path
                  d="m2.5 8.5 3.5 3.5 7.5-8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* ==================================================================
          Formulario — 58% no desktop
          ================================================================== */}
      <main className="flex flex-1 flex-col justify-between px-5 pt-8 pb-8 sm:px-10 lg:px-12 lg:py-12 xl:px-20">
        <div className="mx-auto flex w-full max-w-[34rem] flex-1 flex-col justify-center">
          <FormularioCursoVip />
        </div>

        {/* ----------------------------------------------------------------
            Rodape minimo
            ---------------------------------------------------------------- */}
        <footer className="mx-auto mt-12 w-full max-w-[34rem] border-t border-[var(--color-hairline)] pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.8rem] text-ink-soft">
            <p>
              <span className="font-medium text-ink">
                {siteConfig.professional.name}
              </span>
              {" · "}
              {siteConfig.tagline}
              {" · "}
              {siteConfig.address.city} – {siteConfig.address.state}
              {" · "}
              {siteConfig.professional.registry}
            </p>
            <Link
              href="/"
              className="inline-flex min-h-9 items-center rounded-[4px] underline decoration-[var(--color-hairline)] underline-offset-4 transition-colors hover:text-wine hover:decoration-wine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
            >
              Voltar ao site
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

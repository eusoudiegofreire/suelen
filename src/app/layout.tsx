import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

/* Duas familias: uma serifada com carater para titulos, uma neutra e muito
   legivel para texto corrido e botoes. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const TITULO =
  "Full Face e Harmonização Orofacial em Ariquemes | Instituto Suelen Paranhos";
const DESCRICAO =
  "Avaliação facial individualizada, Full Face e procedimentos de harmonização orofacial com a Dra. Suelen Paranhos em Ariquemes–RO.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: TITULO,
  description: DESCRICAO,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.professional.name }],
  keywords: [
    "harmonização orofacial",
    "full face",
    "Ariquemes",
    "Rondônia",
    "estética facial",
    "toxina botulínica",
    "preenchimento labial",
    "Instituto Suelen Paranhos",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: TITULO,
    description: DESCRICAO,
    images: [
      {
        url: "/fotos/suelen-hero.webp",
        width: 1400,
        height: 2100,
        alt: `${siteConfig.professional.name} — ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: ["/fotos/suelen-hero.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
};

/**
 * Dados estruturados. Apenas informacoes confirmadas pelo Instituto:
 * nao ha telefone, horario de funcionamento, avaliacoes, faixa de preco
 * nem logradouro, porque esses dados ainda nao foram informados.
 */
function dadosEstruturados() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "Dentist"],
        "@id": `${siteConfig.url}/#instituto`,
        name: siteConfig.name,
        description: DESCRICAO,
        url: siteConfig.url,
        image: `${siteConfig.url}/fotos/suelen-hero.webp`,
        medicalSpecialty: "Dentistry",
        areaServed: {
          "@type": "City",
          name: siteConfig.address.city,
          containedInPlace: {
            "@type": "State",
            name: "Rondônia",
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.state,
          addressCountry: siteConfig.address.country,
        },
        employee: { "@id": `${siteConfig.url}/#profissional` },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#profissional`,
        name: siteConfig.professional.name,
        jobTitle: "Cirurgiã-Dentista",
        knowsAbout: "Harmonização Orofacial",
        identifier: siteConfig.professional.registry,
        worksFor: { "@id": `${siteConfig.url}/#instituto` },
      },
    ],
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Sem JavaScript nao ha scroll reveal, entao o conteudo precisa
            aparecer imediatamente — caso contrario a pagina ficaria em branco. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>[data-reveal]{opacity:1!important;transform:none!important}</style>`,
          }}
        />
      </head>
      <body className="min-h-dvh">
        {children}
        <script
          type="application/ld+json"
          // conteudo proprio e estatico, montado a partir de src/config/site.ts
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados()) }}
        />
      </body>
    </html>
  );
}

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Identificacao } from "@/components/Identificacao";
import { FullFace } from "@/components/FullFace";
import { Procedimentos } from "@/components/Procedimentos";
import { Diferenciais } from "@/components/Diferenciais";
import { SobreDra } from "@/components/SobreDra";
import { Resultados } from "@/components/Resultados";
import { Depoimentos } from "@/components/Depoimentos";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Condicoes } from "@/components/Condicoes";
import { Faq } from "@/components/Faq";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";
import { FloatingCta } from "@/components/FloatingCta";

export default function Home() {
  return (
    <>
      {/* Atalho para quem navega por teclado */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-[2px] focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
      >
        Ir para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Identificacao />
        <FullFace />
        <Procedimentos />
        <Diferenciais />
        <SobreDra />
        <Resultados />
        <Depoimentos />
        <ComoFunciona />
        <Condicoes />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <FloatingCta />
    </>
  );
}

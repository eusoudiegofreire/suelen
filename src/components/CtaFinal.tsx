import { siteConfig } from "@/config/site";
import { Section, WhatsappCta } from "./ui/Primitives";
import Image from "next/image";
import { Reveal } from "./ui/Reveal";

export function CtaFinal() {
  return (
    <Section id="agendar" tone="ink" labelledBy="cta-final-titulo">
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
          id="cta-final-titulo"
          className="mt-8 text-[1.9rem] leading-[1.15] sm:text-4xl lg:text-[2.9rem]"
        >
          O primeiro passo é entender o que realmente faz sentido para o seu
          rosto
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-ivory/78">
          Agende uma avaliação presencial para conversar sobre seus objetivos e
          receber um planejamento individualizado.
        </p>

        <div className="mt-9 flex justify-center">
          <WhatsappCta variant="onDark">Agendar minha avaliação</WhatsappCta>
        </div>

        {/* Reapresentação das informações oficiais */}
        <div className="mx-auto mt-14 max-w-md border-t border-ivory/15 pt-8">
          <p className="font-display text-[1.15rem] text-ivory">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-[0.85rem] tracking-[0.14em] text-gold-light uppercase">
            {siteConfig.address.city} – {siteConfig.address.state}
          </p>
          <p className="mt-4 text-[0.88rem] leading-relaxed text-ivory/70">
            {siteConfig.professional.title}
            <br />
            {siteConfig.professional.registry}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

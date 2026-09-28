import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * Assinatura da marca: simbolo oficial extraido de imagens/Logo.pdf mais o
 * nome escrito em HTML.
 *
 * A grafia correta do sobrenome e "Paranho", sem "s" no final — confirmada
 * pelo cliente e coerente com a logo. O nome fica em HTML (e nao na versao
 * textual do PDF) para escalar bem e permanecer selecionavel e legivel por
 * leitor de tela; as versoes logo-horizontal-*.png estao em public/marca/ e
 * podem ser usadas quando um bloco de imagem unica for preferivel.
 */
export function Marca({
  tone = "light",
  className = "",
}: {
  /** "dark" = sobre fundo escuro. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const escuro = tone === "dark";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image
        src={escuro ? "/marca/logo-simbolo-branco.png" : "/marca/logo-simbolo-dourado.png"}
        width={640}
        height={575}
        alt=""
        aria-hidden="true"
        loading="eager"
        className="h-12 w-auto shrink-0 sm:h-14"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.02rem] leading-none font-medium tracking-[0.01em] sm:text-[1.15rem] ${
            escuro ? "text-ivory" : "text-ink"
          }`}
        >
          {siteConfig.name}
        </span>
        <span
          className={`mt-1.5 text-[0.62rem] font-medium tracking-[0.24em] uppercase sm:text-[0.66rem] ${
            escuro ? "text-gold-light" : "text-gold-deep"
          }`}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </span>
  );
}

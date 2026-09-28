import type { ReactNode } from "react";
import { whatsappUrl } from "@/config/site";

/* -------------------------------------------------------------------------
   Etiqueta de secao — filete dourado + caps espacadas.
   ------------------------------------------------------------------------- */
export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${
        tone === "dark" ? "text-gold-light" : "text-gold-deep"
      }`}
    >
      <span
        aria-hidden="true"
        className={`rule ${tone === "dark" ? "bg-gold-light" : ""}`}
      />
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------
   Botao de WhatsApp. Todos os CTAs do site passam por aqui, para que o
   numero exista em um unico lugar (src/config/site.ts).
   ------------------------------------------------------------------------- */
export function WhatsappCta({
  children,
  message,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  /** Mensagem propria deste botao. Quando omitida, usa a do site. */
  message?: string;
  variant?: "solid" | "outline" | "onDark";
  className?: string;
}) {
  const base =
    "group inline-flex min-h-13 items-center justify-center gap-2.5 px-7 py-3.5 text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 rounded-[2px]";

  const variants = {
    solid: "bg-wine text-white hover:bg-wine-deep",
    outline: "border border-wine/45 text-wine hover:bg-wine hover:text-white",
    onDark: "bg-ivory text-wine hover:bg-white",
  } as const;

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowRight />
    </a>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
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

/* -------------------------------------------------------------------------
   Icone do WhatsApp. lucide-react nao traz mais icones de marca, entao o
   caminho fica embutido aqui.
   ------------------------------------------------------------------------- */
export function WhatsappGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.25-8.25Zm-2.53 4.4c-.15 0-.4.06-.61.28-.21.22-.8.79-.8 1.92s.82 2.23.94 2.38c.11.15 1.6 2.44 3.88 3.42.54.23.96.37 1.29.48.54.17 1.04.15 1.43.09.44-.07 1.34-.55 1.53-1.08.19-.53.19-.98.13-1.08-.06-.1-.21-.15-.43-.27-.22-.11-1.34-.66-1.54-.73-.21-.08-.36-.12-.51.11-.15.22-.58.73-.72.88-.13.15-.26.17-.49.06-.22-.11-.95-.35-1.81-1.12a6.78 6.78 0 0 1-1.25-1.56c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.08-.15.04-.28-.02-.39-.06-.11-.5-1.23-.7-1.68-.18-.44-.37-.38-.5-.39h-.43Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Casca de secao — largura, respiro vertical e fundo padronizados.
   ------------------------------------------------------------------------- */
export function Section({
  id,
  children,
  tone = "ivory",
  className = "",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  tone?: "ivory" | "sand" | "ink" | "shell";
  className?: string;
  labelledBy?: string;
}) {
  const tones = {
    ivory: "bg-ivory text-ink",
    sand: "bg-sand text-ink",
    shell: "bg-shell text-ink",
    ink: "bg-ink text-ivory on-dark",
  } as const;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} px-5 py-20 sm:px-8 md:py-28 lg:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

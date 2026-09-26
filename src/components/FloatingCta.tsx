"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/config/site";
import { WhatsappGlyph } from "./ui/Primitives";

/**
 * CTA fixo no rodape do celular.
 *
 * Para nao cobrir conteudo, ele so aparece depois que o visitante passa do
 * Hero e desaparece assim que o CTA final entra na tela — que ja traz o mesmo
 * botao. O rodape tambem reserva um respiro extra embaixo no mobile.
 *
 * Quando a ampliacao de imagem esta aberta, o <dialog> nativo sobe para a top
 * layer e fica naturalmente acima deste botao.
 */
export function FloatingCta() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const fim = document.getElementById("agendar");
    let passouDoHero = window.scrollY > 560;
    let chegouAoFim = false;
    let descendo = false;
    let anterior = window.scrollY;
    let parado: ReturnType<typeof setTimeout>;

    const atualizar = () =>
      setVisivel(passouDoHero && !chegouAoFim && !descendo);

    const onScroll = () => {
      const y = window.scrollY;
      // Enquanto a pessoa desce lendo, o botao sai da frente do texto.
      // Ele volta assim que ela para ou sobe. A margem de 6px ignora o tremido.
      if (Math.abs(y - anterior) > 6) {
        descendo = y > anterior;
        anterior = y;
      }
      passouDoHero = y > 560;
      atualizar();

      // Parou de rolar: mostra de novo.
      clearTimeout(parado);
      parado = setTimeout(() => {
        descendo = false;
        atualizar();
      }, 420);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const io = fim
      ? new IntersectionObserver(
          ([entry]) => {
            chegouAoFim = entry.isIntersecting;
            atualizar();
          },
          { rootMargin: "0px 0px -20% 0px" }
        )
      : null;
    if (fim && io) io.observe(fim);

    atualizar();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(parado);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-300 md:hidden ${
        visivel
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visivel ? undefined : -1}
        aria-hidden={!visivel}
        className="flex min-h-14 items-center justify-center gap-2.5 rounded-[3px] bg-gold px-6 text-[0.98rem] font-medium text-white shadow-[0_6px_24px_-6px_rgba(42,37,34,0.45)]"
      >
        <WhatsappGlyph className="h-5 w-5" />
        Agendar avaliação
      </a>
    </div>
  );
}

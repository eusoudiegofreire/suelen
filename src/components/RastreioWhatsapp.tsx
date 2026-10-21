"use client";

import { useEffect } from "react";
import { rastrearEvento } from "./MetaPixel";

/**
 * Registra no Pixel da Meta um evento "Contact" sempre que alguem clica em um
 * botao do WhatsApp da pagina. Um unico ouvinte no documento cobre todos os
 * CTAs, inclusive os que sao componentes de servidor.
 *
 * `local` vai junto como parametro, para separar no Gerenciador de Eventos de
 * qual pagina o contato saiu.
 */
export function RastreioWhatsapp({ local }: { local: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="https://wa.me/"]'
      );
      if (!alvo) return;
      rastrearEvento("Contact", { content_name: local });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [local]);

  return null;
}

"use client";

import { useEffect, useState } from "react";
import { navLinks, siteConfig, whatsappUrl } from "@/config/site";
import { WhatsappGlyph } from "./ui/Primitives";
import { Marca } from "./ui/Marca";

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava a rolagem do fundo e permite fechar o menu com Esc.
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        rolou
          ? "border-b border-[var(--color-hairline)] bg-ivory/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      {/* Mesmo container do Hero, para o logotipo alinhar com a headline */}
      <div className="mx-auto flex h-20 max-w-[1540px] items-center gap-6 px-6 sm:px-10 lg:h-22 lg:px-12">
        {/* Simbolo oficial + nome escrito em HTML (ver nota em ui/Marca.tsx) */}
        <a
          href="#inicio"
          className="shrink-0"
          aria-label={`${siteConfig.name} — ir para o início`}
        >
          <Marca />
        </a>

        {/* Filete dourado entre o logotipo e a navegacao */}
        <span
          aria-hidden="true"
          className="hidden h-px w-14 shrink-0 bg-gold/70 xl:block"
        />

        {/* Navegacao — desktop */}
        <nav aria-label="Navegação principal" className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-5 xl:gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative inline-flex min-h-11 items-center whitespace-nowrap text-[0.9rem] text-ink-soft xl:text-[0.97rem] transition-colors hover:text-wine after:absolute after:bottom-2.5 after:left-0 after:h-px after:w-0 after:bg-wine after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          {/* Botao contornado, como na referencia */}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-12 items-center gap-2.5 rounded-full border border-wine/45 px-5 whitespace-nowrap xl:px-6 text-[0.92rem] font-medium text-wine transition-colors duration-300 hover:bg-wine hover:text-white sm:inline-flex"
          >
            <WhatsappGlyph className="h-4.5 w-4.5" />
            Agendar avaliação
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="-mr-2 inline-flex h-12 w-12 items-center justify-center text-ink lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
                  aberto ? "top-2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute top-2 left-0 h-px w-6 bg-current transition-opacity duration-200 ${
                  aberto ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
                  aberto ? "top-2 -rotate-45" : "top-3.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Navegacao — mobile */}
      <div
        id="menu-mobile"
        hidden={!aberto}
        className="border-t border-[var(--color-hairline)] bg-ivory lg:hidden"
      >
        <nav aria-label="Navegação principal (celular)" className="px-6 py-6 sm:px-10">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className="border-b border-[var(--color-hairline)] last:border-0"
              >
                <a
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="flex min-h-14 items-center font-display text-xl text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAberto(false)}
            className="mt-6 flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-wine px-6 font-medium text-white"
          >
            <WhatsappGlyph className="h-5 w-5" />
            Agendar avaliação
          </a>
        </nav>
      </div>
    </header>
  );
}

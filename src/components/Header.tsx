"use client";

import { useEffect, useState } from "react";
import { navLinks, siteConfig, whatsappUrl } from "@/config/site";
import { Monogram } from "./ui/Monogram";

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
          ? "border-b border-line bg-ivory/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-2.5 text-ink"
          aria-label={`${siteConfig.name} — ir para o início`}
        >
          <Monogram className="h-9 w-9 shrink-0 text-gold-bright" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[0.7rem] tracking-[0.02em] text-ink-muted">
              Instituto
            </span>
            <span className="text-[0.82rem] font-medium tracking-[0.16em] text-ink uppercase">
              Suelen Paranhos
            </span>
          </span>
        </a>

        {/* Navegação — desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-[0.92rem] text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-bright after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-[2px] bg-gold px-5 text-[0.88rem] font-medium text-white transition-colors hover:bg-ink sm:inline-flex"
          >
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
                className={`absolute left-0 top-2 h-px w-6 bg-current transition-opacity duration-200 ${
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

      {/* Navegação — mobile */}
      <div
        id="menu-mobile"
        hidden={!aberto}
        className="border-t border-line bg-ivory lg:hidden"
      >
        <nav aria-label="Navegação principal (celular)" className="px-5 py-6 sm:px-8">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line-soft last:border-0">
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
            className="mt-6 flex min-h-13 items-center justify-center rounded-[2px] bg-gold px-6 font-medium text-white"
          >
            Agendar avaliação
          </a>
        </nav>
      </div>
    </header>
  );
}

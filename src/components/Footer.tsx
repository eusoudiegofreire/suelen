import { navLinks, siteConfig, whatsappUrl } from "@/config/site";
import { Marca } from "./ui/Marca";
import { WhatsappGlyph } from "./ui/Primitives";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ivory px-5 pt-16 pb-28 sm:px-8 md:pb-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Identificação */}
          <div>
            <Marca />

            <p className="mt-5 text-[0.9rem] leading-relaxed text-ink-soft">
              {siteConfig.professional.title}
              <br />
              {siteConfig.professional.registry}
            </p>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <h2 className="font-display text-[1.05rem] text-ink">Navegação</h2>
            <ul className="mt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-9 items-center text-[0.92rem] text-ink-soft transition-colors hover:text-wine"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="font-display text-[1.05rem] text-ink">Atendimento</h2>

            <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-soft">
              Atendimento presencial
              <br />
              {siteConfig.address.label}
            </p>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2.5 text-[0.92rem] font-medium text-ink transition-colors hover:text-wine"
            >
              <WhatsappGlyph className="h-4.5 w-4.5 text-gold-deep" />
              Falar pelo WhatsApp
            </a>

            {/* Aparece automaticamente quando o Instagram for preenchido
                em src/config/site.ts */}
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex min-h-11 items-center gap-2.5 text-[0.92rem] font-medium text-ink transition-colors hover:text-wine"
              >
                <InstagramGlyph className="h-4.5 w-4.5 text-gold-deep" />
                {siteConfig.social.instagramHandle || "Instagram"}
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[0.8rem] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p>
            As informações deste site têm caráter informativo e não substituem
            uma avaliação presencial.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** lucide-react nao exporta mais icones de marca, entao o traçado fica aqui. */
function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

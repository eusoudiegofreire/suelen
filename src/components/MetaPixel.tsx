import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Pixel da Meta.
 *
 * Fica so na pagina que recebe trafego de anuncio (/curso-vip). O site
 * principal continua sem rastreamento — por isso este componente nao esta no
 * layout raiz, que valeria para o site inteiro.
 *
 * `afterInteractive` (padrao do next/script) carrega o pixel logo apos a
 * hidratacao: cedo o bastante para registrar a visita, sem atrasar a pintura
 * da pagina.
 *
 * Com META_PIXEL_ID vazio, nada e injetado.
 */
export function MetaPixel() {
  const id = siteConfig.META_PIXEL_ID;
  if (!id) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');
          `,
        }}
      />

      {/* Fallback para quem navega sem JavaScript */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara um evento no pixel, se ele estiver carregado.
 *
 * Silencioso de proposito: bloqueador de anuncio, pixel desligado ou falha de
 * rede nao podem quebrar o formulario.
 */
export function rastrearEvento(nome: string, parametros?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", nome, parametros);
}

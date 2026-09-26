/**
 * ============================================================================
 * CONFIGURACAO CENTRAL DO SITE
 * ============================================================================
 * Este e o unico lugar do projeto onde ficam o numero do WhatsApp, a mensagem
 * inicial, o endereco e as redes sociais. Nenhum componente deve repetir esses
 * dados: todos importam daqui.
 *
 * Para colocar o site no ar, edite apenas os campos marcados com TODO.
 * ============================================================================
 */

export const siteConfig = {
  // --------------------------------------------------------------------
  // WHATSAPP
  // --------------------------------------------------------------------
  // TODO: SUBSTITUIR PELO NUMERO REAL DO WHATSAPP ANTES DE PUBLICAR.
  // Formato: codigo do pais + DDD + numero, somente digitos, sem espacos,
  // sem parenteses, sem tracos e sem o sinal de "+".
  // Exemplo para um numero de Ariquemes (DDD 69): "5569999999999"
  WHATSAPP_NUMBER: "55XXXXXXXXXXX",

  // Mensagem que ja vem escrita quando a pessoa abre a conversa.
  WHATSAPP_MESSAGE:
    "Olá! Conheci o Instituto pelo site e gostaria de agendar uma avaliação.",

  // --------------------------------------------------------------------
  // IDENTIFICACAO
  // --------------------------------------------------------------------
  name: "Instituto Suelen Paranhos",
  shortName: "Instituto Suelen Paranhos",
  tagline: "Odontologia · Saúde · Estética",

  professional: {
    name: "Dra. Suelen Paranhos",
    title: "Cirurgiã-Dentista, especialista em Harmonização Orofacial",
    registry: "CRO-RO 3294",
  },

  // --------------------------------------------------------------------
  // ENDERECO
  // --------------------------------------------------------------------
  // Cidade e estado sao confirmados. O logradouro ainda nao foi informado:
  // TODO: preencher `street` quando o endereco completo for confirmado.
  // Enquanto estiver vazio, o site mostra apenas "Ariquemes - RO".
  address: {
    street: "",
    city: "Ariquemes",
    state: "RO",
    country: "BR",
    get label() {
      return this.street
        ? `${this.street} — ${this.city} - ${this.state}`
        : `${this.city} - ${this.state}`;
    },
  },

  // --------------------------------------------------------------------
  // REDES SOCIAIS
  // --------------------------------------------------------------------
  // TODO: preencher a URL do Instagram quando for definida.
  // Enquanto estiver vazio, o link simplesmente nao aparece no site.
  social: {
    instagram: "",
    instagramHandle: "",
  },

  // --------------------------------------------------------------------
  // SEO
  // --------------------------------------------------------------------
  // TODO: trocar pelo dominio definitivo quando ele for contratado.
  url: "https://institutosuelenparanhos.com.br",
} as const;

/**
 * Monta o link do WhatsApp a partir da configuracao acima.
 *
 * @param message Mensagem alternativa. Quando omitida, usa WHATSAPP_MESSAGE.
 *                Util para identificar de qual botao veio o contato.
 */
export function whatsappUrl(message: string = siteConfig.WHATSAPP_MESSAGE) {
  return `https://wa.me/${siteConfig.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * `false` enquanto o numero ainda for o placeholder.
 * Serve para nao publicarmos dados de contato invalidos nos dados estruturados.
 */
export const isWhatsappConfigured = !/X/.test(siteConfig.WHATSAPP_NUMBER);

/** Itens do menu. O mesmo array alimenta o cabecalho e o rodape. */
export const navLinks = [
  { href: "#full-face", label: "Full Face" },
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#resultados", label: "Resultados" },
  { href: "#duvidas", label: "Dúvidas" },
] as const;

import { NextResponse } from "next/server";

/**
 * Ponte entre o formulario do Curso VIP e o webhook do n8n (que cria o lead
 * no Kommo).
 *
 * Existe para a URL do webhook NAO ir para o navegador. Se o formulario
 * chamasse o n8n direto, o endereco ficaria visivel no JavaScript da pagina e
 * qualquer um poderia despejar leads falsos no CRM. Aqui a URL fica so no
 * servidor, na variavel de ambiente N8N_WEBHOOK_CURSO_VIP.
 */

/** Campos aceitos. Qualquer outra coisa enviada pelo cliente e descartada. */
type Corpo = {
  nome?: unknown;
  whatsapp?: unknown;
  profissao?: unknown;
  habilitacao?: unknown;
  momento?: unknown;
  profissao_codigo?: unknown;
  habilitacao_codigo?: unknown;
  momento_codigo?: unknown;
};

const texto = (v: unknown, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const destino = process.env.N8N_WEBHOOK_CURSO_VIP;

  if (!destino) {
    // Sem a variavel configurada nao ha para onde enviar. Avisa no log do
    // servidor em vez de falhar silenciosamente.
    console.error(
      "[curso-vip] N8N_WEBHOOK_CURSO_VIP nao esta configurada — lead nao enviado ao CRM."
    );
    return NextResponse.json(
      { ok: false, erro: "webhook-nao-configurado" },
      { status: 503 }
    );
  }

  let corpo: Corpo;
  try {
    corpo = (await request.json()) as Corpo;
  } catch {
    return NextResponse.json({ ok: false, erro: "json-invalido" }, { status: 400 });
  }

  const nome = texto(corpo.nome, 120);
  const whatsapp = texto(corpo.whatsapp, 30).replace(/\D/g, "");

  // Sem nome e telefone o lead chega no Kommo sem contato util.
  if (nome.length < 2 || whatsapp.length < 10 || whatsapp.length > 13) {
    return NextResponse.json({ ok: false, erro: "contato-invalido" }, { status: 400 });
  }

  const payload = {
    nome,
    whatsapp,
    profissao: texto(corpo.profissao),
    habilitacao: texto(corpo.habilitacao),
    momento: texto(corpo.momento),
    profissao_codigo: texto(corpo.profissao_codigo, 40),
    habilitacao_codigo: texto(corpo.habilitacao_codigo, 40),
    momento_codigo: texto(corpo.momento_codigo, 40),
    source: "curso-vip",
    created_at: new Date().toISOString(),
  };

  try {
    // Timeout curto: a pessoa ja esta sendo levada para o WhatsApp e nao pode
    // ficar presa esperando o CRM responder.
    const corte = AbortSignal.timeout(8000);
    const resposta = await fetch(destino, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: corte,
    });

    if (!resposta.ok) {
      console.error(
        `[curso-vip] n8n respondeu ${resposta.status}: ${(await resposta.text()).slice(0, 300)}`
      );
      return NextResponse.json({ ok: false, erro: "n8n-falhou" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[curso-vip] falha ao chamar o n8n:", e);
    return NextResponse.json({ ok: false, erro: "n8n-indisponivel" }, { status: 502 });
  }
}

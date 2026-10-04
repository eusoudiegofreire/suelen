"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { etapasCursoVip, TOTAL_ETAPAS } from "@/data/curso-vip";

/**
 * Formulario de qualificacao do Curso VIP: tres perguntas, uma por tela, uma
 * tela de contato e a confirmacao.
 *
 * Decisoes que importam:
 * - Alternativas sao <input type="radio"> reais dentro de <fieldset>/<legend>,
 *   entao teclado, leitor de tela e clique no rotulo funcionam sem JS extra.
 * - Selecionar NAO avanca sozinho: a pessoa confirma no "Continuar", porque
 *   toque errado em lista e comum no celular.
 * - As respostas ficam em estado unico, entao voltar preserva o que ja foi
 *   escolhido.
 * - Nenhuma alternativa bloqueia o envio. O formulario coleta informacao;
 *   quem avalia compatibilidade e a equipe, depois.
 * - O ultimo botao conclui o CADASTRO. O WhatsApp so aparece depois, na tela
 *   de confirmacao, como um link que a pessoa clica. Assim o cadastro e um
 *   passo fechado em si, e o WhatsApp deixa de ser pop-up aberto por script
 *   (que o navegador costuma bloquear) e vira navegacao normal.
 */

const TOTAL_PERGUNTAS = etapasCursoVip.length;

/** (69) 99999-9999 — formata enquanto digita, sem impedir apagar. */
function formatarTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function FormularioCursoVip() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<(string | null)[]>(() =>
    Array(TOTAL_PERGUNTAS).fill(null)
  );
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [concluido, setConcluido] = useState(false);

  const tituloRef = useRef<HTMLHeadingElement>(null);
  const raizRef = useRef<HTMLDivElement>(null);
  const primeiraRenderizacao = useRef(true);

  const etapaContato = etapa === TOTAL_PERGUNTAS;
  const atual = etapaContato ? null : etapasCursoVip[etapa];
  const resposta = etapaContato ? null : respostas[etapa];

  // Ao trocar de tela: traz o formulario para o topo e leva o foco para o
  // titulo novo.
  //
  // O scroll importa no celular, onde a apresentacao fica acima do formulario:
  // sem ele a pessoa avanca e continua vendo o bloco anterior, com o conteudo
  // novo fora da dobra. `preventScroll` evita o segundo salto que o focus()
  // causaria por conta propria.
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    raizRef.current?.scrollIntoView({
      behavior: suave ? "smooth" : "auto",
      block: "start",
    });
    tituloRef.current?.focus({ preventScroll: true });
  }, [etapa, concluido]);

  function escolher(codigo: string) {
    setRespostas((anteriores) => {
      const copia = [...anteriores];
      copia[etapa] = codigo;
      return copia;
    });
    setErro(null);
  }

  /** Alternativa escolhida em cada pergunta, ja resolvida para rotulo + codigo. */
  function respostasResolvidas() {
    return etapasCursoVip.map((e, i) => {
      const alt = e.alternativas.find((a) => a.codigo === respostas[i]);
      return {
        id: e.id,
        rotulo: e.rotulo,
        valor: alt?.rotulo ?? "",
        codigo: alt?.codigo ?? "",
      };
    });
  }

  function montarMensagem() {
    const linhas = respostasResolvidas().map(
      (r, i) => `${i + 1}. ${r.rotulo}: ${r.valor}`
    );
    return [
      `Olá! Acabei de fazer meu cadastro no Curso VIP da ${siteConfig.professional.name}.`,
      "",
      `Meu nome é ${nome.trim()}.`,
      "",
      "Minhas respostas:",
      "",
      linhas.join("\n\n"),
      "",
      "Gostaria de receber mais informações sobre o curso.",
    ].join("\n");
  }

  /**
   * Envia para o n8n (que cria o lead no Kommo).
   *
   * Uma falha aqui nao impede a conclusao: a pessoa cumpriu a parte dela e a
   * tela de confirmacao aparece do mesmo jeito, com o botao do WhatsApp — que
   * leva nome e respostas na mensagem e funciona como segunda via do lead.
   */
  async function enviarParaCrm() {
    const r = respostasResolvidas();
    try {
      const resposta = await fetch("/api/curso-vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          nome: nome.trim(),
          whatsapp: telefone.replace(/\D/g, ""),
          profissao: r[0].valor,
          habilitacao: r[1].valor,
          momento: r[2].valor,
          profissao_codigo: r[0].codigo,
          habilitacao_codigo: r[1].codigo,
          momento_codigo: r[2].codigo,
        }),
      });
      if (!resposta.ok) {
        console.warn("[curso-vip] lead nao registrado no CRM:", resposta.status);
      }
    } catch (e) {
      console.warn("[curso-vip] falha ao registrar o lead no CRM:", e);
    }
  }

  async function avancar() {
    // --- telas de pergunta ---
    if (!etapaContato) {
      if (!resposta) {
        setErro("Selecione uma opção para continuar.");
        return;
      }
      setErro(null);
      setEtapa(etapa + 1);
      return;
    }

    // --- tela de contato: conclui o cadastro ---
    if (nome.trim().length < 2) {
      setErro("Informe seu nome para continuar.");
      return;
    }
    const digitos = telefone.replace(/\D/g, "");
    if (digitos.length < 10 || digitos.length > 11) {
      setErro("Informe um WhatsApp válido, com DDD.");
      return;
    }

    setErro(null);
    setEnviando(true);
    await enviarParaCrm();
    setEnviando(false);
    setConcluido(true);
  }

  function voltar() {
    setErro(null);
    setEtapa((e) => Math.max(0, e - 1));
  }

  const progresso = concluido ? 100 : ((etapa + 1) / TOTAL_ETAPAS) * 100;
  const idErro = "curso-vip-erro";
  const chave = concluido ? "fim" : etapaContato ? "contato" : atual!.id;

  /* ====================================================================
     Confirmação
     ==================================================================== */
  if (concluido) {
    return (
      <div ref={raizRef} className="w-full scroll-mt-6">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
          <div className="h-full w-full rounded-full bg-wine" />
        </div>

        <div key={chave} className="etapa-entra mt-9">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-soft text-wine"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="m5 12.5 4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h2
            ref={tituloRef}
            tabIndex={-1}
            data-foco-programatico=""
            className="mt-6 font-display text-[1.6rem] leading-snug font-medium text-ink outline-none sm:text-[1.9rem]"
          >
            Cadastro concluído, {nome.trim().split(" ")[0]}
          </h2>

          <p className="mt-4 max-w-[30rem] text-[1rem] leading-[1.7] text-ink-soft">
            Recebemos suas respostas. A equipe vai analisar as informações e
            seguir com você pelo WhatsApp.
          </p>

          <p className="mt-3 max-w-[30rem] text-[0.95rem] leading-[1.7] text-ink-soft">
            Se preferir, você mesma pode iniciar a conversa agora — suas
            respostas já vão junto na mensagem.
          </p>

          <a
            href={whatsappUrl(montarMensagem())}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-[3.5rem] items-center justify-center gap-2.5 rounded-full bg-wine px-8 text-[1rem] font-medium text-white shadow-[0_14px_30px_-16px_rgba(139,38,61,0.7)] transition-colors duration-200 hover:bg-wine-deep"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.25-8.25Zm-2.53 4.4c-.15 0-.4.06-.61.28-.21.22-.8.79-.8 1.92s.82 2.23.94 2.38c.11.15 1.6 2.44 3.88 3.42.54.23.96.37 1.29.48.54.17 1.04.15 1.43.09.44-.07 1.34-.55 1.53-1.08.19-.53.19-.98.13-1.08-.06-.1-.21-.15-.43-.27-.22-.11-1.34-.66-1.54-.73-.21-.08-.36-.12-.51.11-.15.22-.58.73-.72.88-.13.15-.26.17-.49.06-.22-.11-.95-.35-1.81-1.12a6.78 6.78 0 0 1-1.25-1.56c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.08-.15.04-.28-.02-.39-.06-.11-.5-1.23-.7-1.68-.18-.44-.37-.38-.5-.39h-.43Z" />
            </svg>
            Enviar mensagem no WhatsApp
          </a>
        </div>
      </div>
    );
  }

  /* ====================================================================
     Etapas
     ==================================================================== */
  return (
    <div ref={raizRef} className="w-full scroll-mt-6">
      {/* ----------------------------------------------------------------
          Progresso
          ---------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.78rem] font-medium tracking-[0.16em] text-ink-soft uppercase">
          Etapa {etapa + 1} de {TOTAL_ETAPAS}
        </p>
        <p aria-hidden="true" className="font-display text-[0.95rem] text-gold-deep">
          {String(etapa + 1).padStart(2, "0")}
          <span className="text-ink-soft/50">
            {" "}
            / {String(TOTAL_ETAPAS).padStart(2, "0")}
          </span>
        </p>
      </div>

      <div
        className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={etapa + 1}
        aria-valuemin={1}
        aria-valuemax={TOTAL_ETAPAS}
        aria-label={`Progresso: etapa ${etapa + 1} de ${TOTAL_ETAPAS}`}
      >
        <div
          className="h-full rounded-full bg-wine transition-[width] duration-500 ease-out"
          style={{ width: `${progresso}%` }}
        />
      </div>

      {/* ----------------------------------------------------------------
          Etapa
          ---------------------------------------------------------------- */}
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void avancar();
        }}
      >
        {/* key força a animação de entrada a cada troca de etapa */}
        <fieldset key={chave} className="etapa-entra mt-8 border-0 p-0">
          <legend className="sr-only">
            {etapaContato ? "Seus dados de contato" : atual!.pergunta}
          </legend>

          {/* Recebe o foco a cada troca de etapa. Nao pode ser aria-hidden:
              mandar foco para conteudo escondido quebra o leitor de tela. */}
          <h2
            ref={tituloRef}
            tabIndex={-1}
            data-foco-programatico=""
            className="font-display text-[1.45rem] leading-snug font-medium text-ink outline-none sm:text-[1.7rem]"
          >
            {etapaContato ? "Para onde enviamos as informações?" : atual!.pergunta}
          </h2>

          {etapaContato && (
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              A equipe usa esses dados para continuar a conversa pelo WhatsApp.
            </p>
          )}

          {/* ---------- perguntas ---------- */}
          {!etapaContato && (
            <div
              className="mt-6 space-y-2.5"
              aria-describedby={erro ? idErro : undefined}
            >
              {atual!.alternativas.map((alternativa) => {
                const selecionada = resposta === alternativa.codigo;
                return (
                  <label
                    key={alternativa.codigo}
                    className={`group flex min-h-[3.5rem] cursor-pointer items-center gap-4 rounded-[10px] border px-4 py-3.5 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-wine ${
                      selecionada
                        ? "border-wine bg-rose-soft"
                        : "border-line bg-shell hover:border-wine/45 hover:bg-rose-soft/45"
                    }`}
                  >
                    <input
                      type="radio"
                      name={atual!.id}
                      value={alternativa.codigo}
                      checked={selecionada}
                      onChange={() => escolher(alternativa.codigo)}
                      className="sr-only"
                    />

                    {/* Indicador redondo. aria-hidden porque o proprio radio ja
                        comunica o estado para a tecnologia assistiva. */}
                    <span
                      aria-hidden="true"
                      className={`flex h-[1.15rem] w-[1.15rem] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                        selecionada
                          ? "border-wine"
                          : "border-ink/30 group-hover:border-wine/50"
                      }`}
                    >
                      <span
                        className={`h-[0.6rem] w-[0.6rem] rounded-full bg-wine transition-transform duration-200 ${
                          selecionada ? "scale-100" : "scale-0"
                        }`}
                      />
                    </span>

                    <span className="text-[0.98rem] leading-snug text-ink">
                      {alternativa.rotulo}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {/* ---------- contato ---------- */}
          {etapaContato && (
            <div
              className="mt-6 space-y-4"
              aria-describedby={erro ? idErro : undefined}
            >
              <div>
                <label
                  htmlFor="curso-vip-nome"
                  className="block text-[0.88rem] font-medium text-ink"
                >
                  Nome completo
                </label>
                <input
                  id="curso-vip-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    setErro(null);
                  }}
                  placeholder="Como podemos te chamar"
                  className="mt-2 block min-h-[3.25rem] w-full rounded-[10px] border border-line bg-shell px-4 text-[1rem] text-ink transition-colors placeholder:text-ink-soft/55 hover:border-wine/45 focus:border-wine focus:outline-2 focus:outline-offset-2 focus:outline-wine"
                />
              </div>

              <div>
                <label
                  htmlFor="curso-vip-whatsapp"
                  className="block text-[0.88rem] font-medium text-ink"
                >
                  WhatsApp com DDD
                </label>
                <input
                  id="curso-vip-whatsapp"
                  name="whatsapp"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(formatarTelefone(e.target.value));
                    setErro(null);
                  }}
                  placeholder="(69) 99999-9999"
                  className="mt-2 block min-h-[3.25rem] w-full rounded-[10px] border border-line bg-shell px-4 text-[1rem] text-ink transition-colors placeholder:text-ink-soft/55 hover:border-wine/45 focus:border-wine focus:outline-2 focus:outline-offset-2 focus:outline-wine"
                />
              </div>
            </div>
          )}

          {erro && (
            <p
              id={idErro}
              role="alert"
              className="mt-4 flex items-center gap-2 text-[0.9rem] font-medium text-[#b91c1c]"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0">
                <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 4.8v4M8 11.1h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {erro}
            </p>
          )}
        </fieldset>

        {/* ----------------------------------------------------------------
            Ações
            ---------------------------------------------------------------- */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-4">
          {etapa > 0 && (
            <button
              type="button"
              onClick={voltar}
              disabled={enviando}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-medium text-ink-soft transition-colors duration-200 hover:text-wine disabled:opacity-50"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                <path d="M12 4.5 6.5 10l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Voltar
            </button>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="group inline-flex min-h-[3.5rem] flex-1 items-center justify-center gap-2.5 rounded-full bg-wine px-7 text-[1rem] font-medium text-white shadow-[0_14px_30px_-16px_rgba(139,38,61,0.7)] transition-colors duration-200 hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-70"
          >
            {etapaContato ? (enviando ? "Enviando…" : "Concluir cadastro") : "Continuar"}
            {!enviando && (
              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { etapasCursoVip, TOTAL_ETAPAS } from "@/data/curso-vip";

/**
 * Formulario de qualificacao do Curso VIP: tres perguntas, uma por tela, e
 * uma tela final de contato.
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
 * - No envio o WhatsApp abre PRIMEIRO, ainda dentro do gesto do clique, para
 *   o navegador nao tratar como pop-up bloqueado. O envio ao CRM vai em
 *   seguida e nunca trava a pessoa: se falhar, a conversa do WhatsApp ja leva
 *   todas as respostas, entao o lead nao se perde.
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

  const tituloRef = useRef<HTMLHeadingElement>(null);
  const raizRef = useRef<HTMLDivElement>(null);
  const primeiraRenderizacao = useRef(true);

  const etapaContato = etapa === TOTAL_PERGUNTAS;
  const atual = etapaContato ? null : etapasCursoVip[etapa];
  const resposta = etapaContato ? null : respostas[etapa];

  // Ao trocar de etapa: traz o formulario para o topo da tela e leva o foco
  // para o titulo novo.
  //
  // O scroll importa no celular, onde a apresentacao fica acima do formulario:
  // sem ele a pessoa avanca e continua vendo o bloco anterior, com a pergunta
  // nova e o botao fora da dobra. `preventScroll` evita o segundo salto que o
  // focus() causaria por conta propria.
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
  }, [etapa]);

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
      return { id: e.id, rotulo: e.rotulo, valor: alt?.rotulo ?? "", codigo: alt?.codigo ?? "" };
    });
  }

  function montarMensagem() {
    const linhas = respostasResolvidas().map(
      (r, i) => `${i + 1}. ${r.rotulo}: ${r.valor}`
    );
    return [
      `Olá! Quero participar do Curso VIP da ${siteConfig.professional.name}.`,
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

  /** Envia para o n8n (que cria o lead no Kommo). Falha nunca bloqueia a pessoa. */
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

  function avancar() {
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

    // --- tela de contato ---
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

    // Abre o WhatsApp dentro do gesto do clique: depois de um await o
    // navegador trataria como pop-up e bloquearia.
    window.open(whatsappUrl(montarMensagem()), "_blank", "noopener,noreferrer");

    void enviarParaCrm().finally(() => setEnviando(false));
  }

  function voltar() {
    setErro(null);
    setEtapa((e) => Math.max(0, e - 1));
  }

  const progresso = ((etapa + 1) / TOTAL_ETAPAS) * 100;
  const idErro = "curso-vip-erro";
  const chave = etapaContato ? "contato" : atual!.id;

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
          avancar();
        }}
      >
        {/* key força a animação de entrada a cada troca de etapa */}
        <fieldset key={chave} className="etapa-entra mt-8 border-0 p-0">
          <legend className="sr-only">
            {etapaContato
              ? "Seus dados de contato"
              : atual!.pergunta}
          </legend>

          {/* Recebe o foco a cada troca de etapa. Nao pode ser aria-hidden:
              mandar foco para conteudo escondido quebra o leitor de tela. */}
          <h2
            ref={tituloRef}
            tabIndex={-1}
            data-foco-programatico=""
            className="font-display text-[1.45rem] leading-snug font-medium text-ink outline-none sm:text-[1.7rem]"
          >
            {etapaContato
              ? "Para onde enviamos as informações?"
              : atual!.pergunta}
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
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-medium text-ink-soft transition-colors duration-200 hover:text-wine"
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
            {etapaContato
              ? enviando
                ? "Abrindo o WhatsApp…"
                : "Continuar pelo WhatsApp"
              : "Continuar"}
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

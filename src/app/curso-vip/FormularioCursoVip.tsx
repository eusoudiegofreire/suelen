"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { etapasCursoVip, TOTAL_ETAPAS } from "@/data/curso-vip";

/**
 * Formulario de qualificacao em tres etapas, uma pergunta por tela.
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
 */
export function FormularioCursoVip() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<(string | null)[]>(
    () => Array(TOTAL_ETAPAS).fill(null)
  );
  const [erro, setErro] = useState(false);

  const tituloRef = useRef<HTMLHeadingElement>(null);
  const raizRef = useRef<HTMLDivElement>(null);
  const primeiraRenderizacao = useRef(true);

  const atual = etapasCursoVip[etapa];
  const resposta = respostas[etapa];
  const ultima = etapa === TOTAL_ETAPAS - 1;

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

  function escolher(valor: string) {
    setRespostas((anteriores) => {
      const copia = [...anteriores];
      copia[etapa] = valor;
      return copia;
    });
    setErro(false);
  }

  function montarMensagem() {
    const linhas = etapasCursoVip.map(
      (e, i) => `${i + 1}. ${e.rotulo}: ${respostas[i]}`
    );
    return [
      `Olá! Quero participar do Curso VIP da ${siteConfig.professional.name}.`,
      "",
      "Minhas respostas:",
      "",
      linhas.join("\n\n"),
      "",
      "Gostaria de receber mais informações sobre o curso.",
    ].join("\n");
  }

  function avancar() {
    if (!resposta) {
      setErro(true);
      return;
    }
    if (!ultima) {
      setEtapa(etapa + 1);
      return;
    }
    // whatsappUrl ja aplica encodeURIComponent na mensagem
    window.open(whatsappUrl(montarMensagem()), "_blank", "noopener,noreferrer");
  }

  function voltar() {
    setErro(false);
    setEtapa((e) => Math.max(0, e - 1));
  }

  const progresso = ((etapa + 1) / TOTAL_ETAPAS) * 100;
  const idErro = "curso-vip-erro";

  return (
    <div ref={raizRef} className="w-full scroll-mt-6">
      {/* ----------------------------------------------------------------
          Progresso
          ---------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.78rem] font-medium tracking-[0.16em] text-ink-soft uppercase">
          Etapa {etapa + 1} de {TOTAL_ETAPAS}
        </p>
        <p
          aria-hidden="true"
          className="font-display text-[0.95rem] text-gold-deep"
        >
          {String(etapa + 1).padStart(2, "0")}
          <span className="text-ink-soft/50"> / {String(TOTAL_ETAPAS).padStart(2, "0")}</span>
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
        <fieldset key={atual.id} className="etapa-entra mt-8 border-0 p-0">
          {/* Nomeia o grupo de radios. Fica so para leitor de tela porque a
              mesma pergunta aparece visivelmente no h2 logo abaixo. */}
          <legend className="sr-only">{atual.pergunta}</legend>

          {/* Recebe o foco a cada troca de etapa. Nao pode ser aria-hidden:
              mandar foco para conteudo escondido quebra o leitor de tela. */}
          <h2
            ref={tituloRef}
            tabIndex={-1}
            data-foco-programatico=""
            className="font-display text-[1.45rem] leading-snug font-medium text-ink outline-none sm:text-[1.7rem]"
          >
            {atual.pergunta}
          </h2>

          <div
            className="mt-6 space-y-2.5"
            aria-describedby={erro ? idErro : undefined}
          >
            {atual.alternativas.map((alternativa) => {
              const selecionada = resposta === alternativa;
              return (
                <label
                  key={alternativa}
                  className={`group flex min-h-[3.5rem] cursor-pointer items-center gap-4 rounded-[10px] border px-4 py-3.5 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-wine ${
                    selecionada
                      ? "border-wine bg-rose-soft"
                      : "border-line bg-shell hover:border-wine/45 hover:bg-rose-soft/45"
                  }`}
                >
                  <input
                    type="radio"
                    name={atual.id}
                    value={alternativa}
                    checked={selecionada}
                    onChange={() => escolher(alternativa)}
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
                    {alternativa}
                  </span>
                </label>
              );
            })}
          </div>

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
              Selecione uma opção para continuar.
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
            className="group inline-flex min-h-[3.5rem] flex-1 items-center justify-center gap-2.5 rounded-full bg-wine px-7 text-[1rem] font-medium text-white shadow-[0_14px_30px_-16px_rgba(139,38,61,0.7)] transition-colors duration-200 hover:bg-wine-deep"
          >
            {ultima ? "Continuar pelo WhatsApp" : "Continuar"}
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

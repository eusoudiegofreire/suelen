/**
 * Perguntas do formulario de qualificacao do Curso VIP.
 *
 * As perguntas e alternativas sao as fornecidas pela clinica. O formulario
 * apenas registra o que a pessoa respondeu: nenhuma alternativa bloqueia o
 * envio e nenhuma resposta gera parecer sobre habilitacao profissional, que
 * e analise posterior da equipe.
 */

export type EtapaCursoVip = {
  /** Usado no name dos radios e no rotulo da mensagem do WhatsApp. */
  id: string;
  /** Como a resposta aparece na mensagem enviada. */
  rotulo: string;
  pergunta: string;
  alternativas: readonly string[];
};

export const etapasCursoVip = [
  {
    id: "profissao",
    rotulo: "Profissão",
    pergunta: "Qual é a sua profissão?",
    alternativas: [
      "Dentista",
      "Médico(a)",
      "Biomédico(a)",
      "Farmacêutico(a)",
      "Enfermeiro(a)",
      "Sou estudante de uma dessas áreas",
      "Outra profissão",
    ],
  },
  {
    id: "habilitacao",
    rotulo: "Habilitação profissional",
    pergunta:
      "Você possui registro profissional ativo e está legalmente habilitado(a) para atuar com injetáveis?",
    alternativas: [
      "Sim, já estou habilitado(a)",
      "Estou concluindo minha habilitação",
      "Ainda não estou habilitado(a)",
    ],
  },
  {
    id: "momento",
    rotulo: "Momento profissional",
    pergunta: "Qual opção melhor representa o seu momento profissional?",
    alternativas: [
      "Já atuo com injetáveis e quero aperfeiçoar minha técnica",
      "Já fiz cursos, mas ainda tenho pouca prática",
      "Sou habilitado(a), mas ainda não comecei a atender",
      "Estou me preparando para entrar nessa área",
    ],
  },
] as const satisfies readonly EtapaCursoVip[];

export const TOTAL_ETAPAS = etapasCursoVip.length;

/** Selos de apoio da area de apresentacao. Nada aqui afirma vaga, data ou preco. */
export const garantiasCursoVip = [
  "Inscrição sujeita à análise",
  "Apenas 3 perguntas",
  "Atendimento pelo WhatsApp",
] as const;

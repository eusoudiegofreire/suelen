/**
 * Perguntas do formulario de qualificacao do Curso VIP.
 *
 * As perguntas e alternativas sao as fornecidas pela clinica. O formulario
 * apenas registra o que a pessoa respondeu: nenhuma alternativa bloqueia o
 * envio e nenhuma resposta gera parecer sobre habilitacao profissional, que
 * e analise posterior da equipe.
 *
 * Cada alternativa tem `rotulo` (o que a pessoa le e o que vai na mensagem do
 * WhatsApp) e `codigo` (texto curto e sem acento, usado nas tags do Kommo).
 * Sem o codigo, uma tag viraria a frase inteira da alternativa.
 */

export type AlternativaCursoVip = {
  codigo: string;
  rotulo: string;
};

export type EtapaCursoVip = {
  /** Usado no name dos radios e como chave no envio para o CRM. */
  id: string;
  /** Como a resposta aparece na mensagem do WhatsApp e no lead. */
  rotulo: string;
  pergunta: string;
  alternativas: readonly AlternativaCursoVip[];
};

export const etapasCursoVip = [
  {
    id: "profissao",
    rotulo: "Profissão",
    pergunta: "Qual é a sua profissão?",
    alternativas: [
      { codigo: "dentista", rotulo: "Dentista" },
      { codigo: "medico", rotulo: "Médico(a)" },
      { codigo: "biomedico", rotulo: "Biomédico(a)" },
      { codigo: "farmaceutico", rotulo: "Farmacêutico(a)" },
      { codigo: "enfermeiro", rotulo: "Enfermeiro(a)" },
      { codigo: "estudante", rotulo: "Sou estudante de uma dessas áreas" },
      { codigo: "outra", rotulo: "Outra profissão" },
    ],
  },
  {
    id: "habilitacao",
    rotulo: "Habilitação profissional",
    pergunta:
      "Você possui registro profissional ativo e está legalmente habilitado(a) para atuar com injetáveis?",
    alternativas: [
      { codigo: "habilitado", rotulo: "Sim, já estou habilitado(a)" },
      { codigo: "concluindo", rotulo: "Estou concluindo minha habilitação" },
      { codigo: "nao-habilitado", rotulo: "Ainda não estou habilitado(a)" },
    ],
  },
  {
    id: "momento",
    rotulo: "Momento profissional",
    pergunta: "Qual opção melhor representa o seu momento profissional?",
    alternativas: [
      {
        codigo: "atua-aperfeicoar",
        rotulo: "Já atuo com injetáveis e quero aperfeiçoar minha técnica",
      },
      {
        codigo: "pouca-pratica",
        rotulo: "Já fiz cursos, mas ainda tenho pouca prática",
      },
      {
        codigo: "nao-comecou",
        rotulo: "Sou habilitado(a), mas ainda não comecei a atender",
      },
      {
        codigo: "preparando",
        rotulo: "Estou me preparando para entrar nessa área",
      },
    ],
  },
] as const satisfies readonly EtapaCursoVip[];

/** 3 perguntas + a tela final de contato. */
export const TOTAL_ETAPAS = etapasCursoVip.length + 1;

/** Identifica a origem do lead no CRM. */
export const ORIGEM_CURSO_VIP = "curso-vip";

/** Selos de apoio da area de apresentacao. Nada aqui afirma vaga, data ou preco. */
export const garantiasCursoVip = [
  "Inscrição sujeita à análise",
  "Apenas 3 perguntas",
  "Atendimento pelo WhatsApp",
] as const;

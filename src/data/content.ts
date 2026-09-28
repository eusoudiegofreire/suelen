/**
 * Todo o texto do site em um unico arquivo, para revisao e edicao sem mexer
 * na marcacao. Os textos sao os fornecidos pela clinica — nenhum numero,
 * resultado, depoimento ou credencial foi acrescentado.
 */

import { fotos } from "./images";

export const beneficiosFullFace = [
  "Análise global da face",
  "Planejamento individualizado",
  "Respeito à anatomia",
  "Preservação das características",
  "Possibilidade de tratamento por etapas",
  "Busca por naturalidade e equilíbrio",
] as const;

export const procedimentos = [
  {
    nome: "Toxina botulínica",
    texto:
      "Utilizada para suavizar linhas de expressão e contribuir para uma aparência mais leve e descansada, preservando a naturalidade das expressões.",
  },
  {
    nome: "Preenchimento labial",
    texto:
      "Pode melhorar contorno, definição, proporção e volume dos lábios, respeitando a anatomia e o resultado desejado por cada paciente.",
  },
  {
    nome: "Rinomodelação",
    texto:
      "Procedimento realizado com preenchedor para promover ajustes estéticos no nariz, quando indicado, contribuindo para o equilíbrio do perfil e da face.",
  },
  {
    nome: "Bioestimuladores de colágeno",
    texto:
      "Estimulam a produção de colágeno do próprio organismo e podem contribuir gradualmente para firmeza, sustentação e qualidade da pele.",
  },
  {
    nome: "Microagulhamento",
    texto:
      "Tratamento voltado à renovação e à qualidade da pele, podendo auxiliar na aparência da textura, dos poros, de linhas finas e de determinadas marcas.",
  },
  {
    nome: "Skinbooster",
    texto:
      "Tratamento voltado principalmente à hidratação, ao viço e à qualidade da pele.",
  },
  {
    nome: "Fios de PDO",
    texto:
      "Podem estimular a produção de colágeno e, dependendo da avaliação, auxiliar na sustentação e no contorno facial.",
  },
] as const;

export const diferenciais = [
  "Avaliação presencial e individualizada",
  "Planejamento que considera o rosto como um todo",
  "Cuidado para preservar a identidade",
  "Busca por resultados naturais",
  "Possibilidade de tratamento por etapas",
  "Acompanhamento da equipe durante o processo",
  "Atendimento presencial em Ariquemes",
] as const;

export const etapas = [
  {
    titulo: "Entre em contato",
    texto: "Fale com a equipe pelo WhatsApp e consulte os horários disponíveis.",
  },
  {
    titulo: "Faça sua avaliação",
    texto:
      "A Dra. Suelen conhece seus objetivos e realiza uma análise individualizada da face.",
  },
  {
    titulo: "Receba seu planejamento",
    texto:
      "Você recebe as orientações, indicações e possíveis etapas do tratamento.",
  },
  {
    titulo: "Inicie o tratamento",
    texto:
      "Dependendo da indicação e da disponibilidade, o procedimento poderá ser realizado no mesmo dia ou agendado.",
  },
] as const;

export const faq = [
  {
    pergunta: "Preciso fazer uma avaliação antes?",
    resposta:
      "Sim. A avaliação permite conhecer seus objetivos, analisar sua face e verificar quais procedimentos podem ser considerados para o seu caso.",
  },
  {
    pergunta: "Como saber qual procedimento é indicado para mim?",
    resposta:
      "Você não precisa decidir sozinha. Durante a avaliação, a Dra. Suelen analisa suas características e explica quais possibilidades fazem sentido para aquilo que você deseja melhorar.",
  },
  {
    pergunta: "Posso realizar o procedimento no dia da avaliação?",
    resposta:
      "Dependendo da indicação, do procedimento e da disponibilidade da agenda, ele poderá ser realizado no mesmo dia. Também é possível deixar o tratamento agendado para outra data.",
  },
  {
    pergunta: "Preciso realizar todo o planejamento Full Face de uma vez?",
    resposta:
      "Não necessariamente. Quando o planejamento envolve mais de um procedimento, existe a possibilidade de organizar o tratamento por etapas.",
  },
  {
    pergunta: "Quanto tempo duram os procedimentos e a recuperação?",
    resposta:
      "Isso varia conforme o procedimento e as características de cada paciente. As orientações específicas são apresentadas durante a avaliação.",
  },
  {
    pergunta: "Quais são as formas de pagamento?",
    resposta:
      "A clínica trabalha com pagamento à vista e parcelamento no cartão. As condições disponíveis são informadas pela equipe.",
  },
  {
    pergunta: "Como funciona o acompanhamento?",
    resposta:
      "A equipe orienta e acompanha o paciente durante o processo. Os cuidados e retornos necessários dependem do procedimento realizado.",
  },
] as const;

/**
 * Galeria de resultados.
 * Os textos alternativos descrevem apenas o que esta visivel, sem supor
 * diagnostico, emocao ou grau de resultado.
 */
export const resultados = [
  { foto: fotos.resultadoFullFace01, alt: "Paciente atendida pela Dra. Suelen Paranhos, registro de planejamento Full Face." },
  { foto: fotos.resultadoFullFace02, alt: "Paciente atendida pela Dra. Suelen Paranhos, registro de planejamento Full Face." },
  { foto: fotos.resultadoFullFace03, alt: "Paciente atendida pela Dra. Suelen Paranhos, registro de planejamento Full Face." },
  { foto: fotos.resultadoFullFace04, alt: "Paciente atendida pela Dra. Suelen Paranhos, registro de planejamento Full Face." },
  { foto: fotos.resultadoFullFace05, alt: "Paciente atendida pela Dra. Suelen Paranhos, registro de planejamento Full Face." },
  { foto: fotos.resultadoToxina, alt: "Paciente atendida pela Dra. Suelen Paranhos, registro de aplicação de toxina botulínica." },
  { foto: fotos.resultadoLabial, alt: "Paciente atendida pela Dra. Suelen Paranhos, registro de preenchimento labial." },
] as const;

/**
 * Prints reais de conversas enviadas por pacientes.
 * O conteudo nao e transcrito nem reescrito — as imagens sao exibidas como
 * foram recebidas.
 */
export const depoimentos = [
  { foto: fotos.depoimento01, alt: "Print de mensagem enviada por paciente à Dra. Suelen Paranhos." },
  { foto: fotos.depoimento02, alt: "Print de mensagem enviada por paciente à Dra. Suelen Paranhos." },
  { foto: fotos.depoimento03, alt: "Print de mensagem enviada por paciente à Dra. Suelen Paranhos." },
  { foto: fotos.depoimento04, alt: "Print de mensagem enviada por paciente à Dra. Suelen Paranhos." },
  { foto: fotos.depoimento05, alt: "Print de mensagem enviada por paciente à Dra. Suelen Paranhos." },
] as const;

export const AVISO_RESULTADOS =
  "Cada paciente possui características e respostas individuais. Os resultados apresentados não constituem promessa de resultado.";

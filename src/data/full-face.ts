/**
 * Textos da pagina de vendas /full-face.
 *
 * Segue a mesma regra do resto do site: nenhum numero, preco, prazo de
 * duracao, garantia de resultado ou credencial que a clinica nao tenha
 * informado. O tom e de convite a avaliacao, nao de promessa.
 */

import { fotos } from "./images";

/** Mensagem que ja chega escrita no WhatsApp, para a equipe saber a origem. */
export const MENSAGEM_FULL_FACE =
  "Olá! Vi a página do Full Face da Dra. Suelen Paranho e gostaria de agendar minha avaliação.";

/** Frases curtas que aparecem logo abaixo do botao principal. */
export const apoiosHero = [
  "Avaliação presencial em Ariquemes",
  "Planejamento individualizado",
  "Tratamento por etapas, se preferir",
] as const;

/** Situacoes em que a pessoa se reconhece. */
export const queixas = [
  "Sente que o rosto mudou, mas não consegue dizer exatamente o quê",
  "Aparenta cansaço mesmo quando está descansada",
  "Já pensou em um procedimento, mas não sabe se é o certo para você",
  "Tem receio de ficar artificial ou com o rosto diferente",
  "Quer cuidar dos sinais do tempo sem perder a sua identidade",
  "Prefere investir com planejamento em vez de tratar uma queixa de cada vez",
] as const;

/** Comparacao entre tratar pontos isolados e planejar a face inteira. */
export const comparacao = {
  isolado: [
    "Começa pelo procedimento escolhido",
    "Olha para uma região de cada vez",
    "Cada decisão é tomada separadamente",
    "Mais difícil prever o conjunto",
  ],
  fullFace: [
    "Começa pela avaliação do rosto inteiro",
    "Considera a relação entre as regiões da face",
    "Define o que realmente faz sentido para você",
    "Organiza prioridades e, se preferir, etapas",
  ],
} as const;

/** O que a avaliacao Full Face observa. Descritivo, sem prometer efeito. */
export const regioesAvaliadas = [
  {
    titulo: "Proporções e equilíbrio",
    texto:
      "A relação entre testa, região dos olhos, nariz, lábios e queixo, e como cada parte conversa com o rosto como um todo.",
  },
  {
    titulo: "Contorno e sustentação",
    texto:
      "Linha da mandíbula, maçãs do rosto e as estruturas que dão forma e firmeza à face.",
  },
  {
    titulo: "Expressões",
    texto:
      "As linhas que aparecem quando você fala, sorri e se expressa, preservando a naturalidade dos seus movimentos.",
  },
  {
    titulo: "Qualidade da pele",
    texto: "Hidratação, viço, textura e firmeza da pele.",
  },
  {
    titulo: "Seus objetivos",
    texto:
      "O que incomoda você, o que você gostaria de melhorar e o que faz questão de manter.",
  },
] as const;

/** Galeria da pagina: so os registros de planejamento Full Face. */
export const resultadosFullFace = [
  fotos.resultadoFullFace01,
  fotos.resultadoFullFace02,
  fotos.resultadoFullFace03,
  fotos.resultadoFullFace04,
  fotos.resultadoFullFace05,
].map((foto) => ({
  foto,
  alt: "Paciente atendida pela Dra. Suelen Paranho, registro de planejamento Full Face.",
}));

/** Duvidas especificas do Full Face. */
export const faqFullFace = [
  {
    pergunta: "Full Face quer dizer fazer vários procedimentos de uma vez?",
    resposta:
      "Não. Full Face significa avaliar o rosto por completo para definir o que realmente faz sentido para você. Em alguns casos o planejamento envolve mais de um procedimento; em outros, menos do que você imaginava.",
  },
  {
    pergunta: "Vou ficar com o rosto diferente ou artificial?",
    resposta:
      "O planejamento da Dra. Suelen busca naturalidade e equilíbrio, respeitando a anatomia e preservando as suas características. Cada paciente responde de forma individual, e por isso tudo começa pela avaliação.",
  },
  {
    pergunta: "Preciso fazer todo o planejamento de uma vez?",
    resposta:
      "Não necessariamente. Quando o planejamento envolve mais de um procedimento, existe a possibilidade de organizar o tratamento por etapas.",
  },
  {
    pergunta: "Quais procedimentos fazem parte do Full Face?",
    resposta:
      "Não existe um pacote fixo. Dependendo da avaliação, o planejamento pode considerar toxina botulínica, preenchimento labial, rinomodelação, bioestimuladores de colágeno, microagulhamento, skinbooster ou fios de PDO — apenas o que for indicado para o seu caso.",
  },
  {
    pergunta: "Posso realizar o procedimento no dia da avaliação?",
    resposta:
      "Dependendo da indicação, do procedimento e da disponibilidade da agenda, ele poderá ser realizado no mesmo dia. Também é possível deixar o tratamento agendado para outra data.",
  },
  {
    pergunta: "Quanto tempo duram os procedimentos e a recuperação?",
    resposta:
      "Isso varia conforme o procedimento e as características de cada paciente. As orientações específicas são apresentadas durante a avaliação.",
  },
  {
    pergunta: "Quais são as formas de pagamento?",
    resposta:
      "A clínica trabalha com pagamento à vista e parcelamento no cartão. O valor da avaliação e as condições disponíveis são informados pela equipe pelo WhatsApp.",
  },
] as const;

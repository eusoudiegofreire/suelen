/**
 * Confere os contrastes do sistema de cores (WCAG 2.1).
 * Rodar com: node scripts/check-contrast.mjs
 *
 * Regra do projeto: texto precisa de 4.5:1. Filetes e formas decorativas nao
 * carregam informacao e por isso nao entram nessa exigencia — mas ficam
 * marcados abaixo para ninguem usa-los em texto por engano.
 */
const L = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const razao = (a, b) => {
  const [x, y] = [L(a), L(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const BG = "#F7F3ED";
const BG2 = "#EFE5DC";
const ESCURO = "#272321";

const pares = [
  ["#272321", BG, "texto principal / fundo", "texto"],
  ["#625A55", BG, "texto secundario / fundo", "texto"],
  ["#625A55", BG2, "texto secundario / fundo 2", "texto"],
  ["#8B263D", BG, "vinho / fundo", "texto"],
  ["#FFFFFF", "#8B263D", "branco / botao vinho", "texto"],
  ["#FFFFFF", "#6F1E31", "branco / botao vinho hover", "texto"],
  ["#8A6A22", BG, "dourado escuro / fundo", "texto"],
  ["#7D6020", BG, "dourado escuro alt / fundo", "texto"],
  ["#C19638", BG, "DOURADO DA LOGO / fundo", "decorativo"],
  ["#C19638", ESCURO, "dourado da logo / secao escura", "texto"],
  ["#E8D8D1", ESCURO, "rose / secao escura", "decorativo"],
  [BG, ESCURO, "marfim / secao escura", "texto"],
];

let falhas = 0;
for (const [fg, bg, rotulo, tipo] of pares) {
  const r = razao(fg, bg);
  const passa = tipo === "decorativo" ? true : r >= 4.5;
  if (!passa) falhas++;
  const nota = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA-grande" : "baixo";
  console.log(
    `${passa ? "ok  " : "FALHA"} ${rotulo.padEnd(32)} ${fg} / ${bg}  ${r.toFixed(2).padStart(5)}:1  ${nota}${tipo === "decorativo" ? "  (so decorativo)" : ""}`
  );
}
console.log(falhas ? `\n${falhas} par(es) de TEXTO abaixo de 4.5:1` : "\nTodos os pares de texto passam em AA.");

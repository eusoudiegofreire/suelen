const L = (hex) => {
  const c = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255)
    .map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2];
};
const ratio = (a,b) => { const [x,y] = [L(a),L(b)].sort((m,n)=>n-m); return (x+0.05)/(y+0.05); };
const pairs = [
  ["#2A2522","#FAF7F2","texto principal / fundo marfim"],
  ["#2A2522","#FFFFFF","texto principal / branco"],
  ["#5F564D","#FAF7F2","texto secundario / marfim"],
  ["#6B6158","#FAF7F2","texto muted / marfim"],
  ["#8A6D2F","#FAF7F2","ouro texto / marfim"],
  ["#A8873E","#FAF7F2","ouro claro / marfim"],
  ["#FFFFFF","#8A6D2F","branco / botao ouro"],
  ["#FFFFFF","#2A2522","branco / botao grafite"],
  ["#FAF7F2","#2A2522","marfim / secao escura"],
  ["#C9AE74","#2A2522","ouro claro / secao escura"],
  ["#6E2E36","#FAF7F2","vinho / marfim"],
  ["#5F564D","#F3EEE6","texto sec / areia"],
];
for (const [fg,bg,label] of pairs) {
  const r = ratio(fg,bg);
  const tag = r>=7 ? "AAA" : r>=4.5 ? "AA " : r>=3 ? "AA-lg" : "FALHA";
  console.log(`${label.padEnd(32)} ${fg} on ${bg}  ${r.toFixed(2).padStart(5)}:1  ${tag}`);
}

/**
 * Marca do Instituto: monograma "SP" dentro de um circulo, com o perfil
 * estilizado de um rosto a direita — releitura em SVG do letreiro da clinica.
 * Decorativo: quem le a pagina com leitor de tela recebe o nome em texto.
 */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle
        cx="32"
        cy="32"
        r="24.5"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.55"
      />
      {/* S */}
      <path
        d="M35.2 21.6c-1.9-1.7-4.6-2.4-7-1.7-2.7.8-4.4 3.2-4.1 5.7.3 2.4 2.4 3.7 5.2 4.6 3.3 1 5.7 2.3 6 5.2.3 3-2 5.7-5.2 6.4-2.9.7-5.9-.2-7.9-2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* P */}
      <path
        d="M30.4 24.8v22.4M30.4 25.2h5.4c3 0 5.4 2.2 5.4 5s-2.4 5-5.4 5h-5.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* perfil do rosto */}
      <path
        d="M41.6 19.4c1.6 2.6 2.4 5.2 2.2 7.6-.2 1.9-1.2 3-2.3 3.9-.6.5-.6 1 .1 1.3.9.4 1.2 1 .7 1.8-.4.6-1.1.9-2 1-.5 0-.7.3-.6.8.2 1.3-.5 2.3-1.9 2.7"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

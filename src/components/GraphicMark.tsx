import { useReveal } from "../hooks/useReveal";

const GLYPHS = {
  star: "✦",
  cross: "+",
  circle: "○",
  arrow: "→",
} as const;

interface GraphicMarkProps {
  symbol: keyof typeof GLYPHS;
  delay?: number;
  className?: string;
}

/** Pequeno elemento gráfico decorativo que surge com fade + leve rotação ao entrar na viewport. */
export function GraphicMark({ symbol, delay = 0, className = "" }: GraphicMarkProps) {
  const { ref, visible } = useReveal<HTMLSpanElement>(delay);

  return (
    <span
      ref={ref}
      className={`graphic-mark${visible ? " is-visible" : ""} ${className}`}
      aria-hidden="true"
    >
      {GLYPHS[symbol]}
    </span>
  );
}

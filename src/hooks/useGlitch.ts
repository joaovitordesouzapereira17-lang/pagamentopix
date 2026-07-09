import { useEffect, useState } from "react";

/** Alterna `true` por uma rajada curta a cada `intervalMs`, para disparar o efeito glitch no CSS. */
export function useGlitch(intervalMs = 5200) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setIsGlitching(true);
      const timeout = setTimeout(() => setIsGlitching(false), 340);
      return () => clearTimeout(timeout);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return isGlitching;
}

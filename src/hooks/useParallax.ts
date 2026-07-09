import { useEffect, useRef } from "react";

/**
 * Aplica um deslocamento vertical bem leve em função do scroll, exposto como a
 * custom property `--parallax-y` (em vez de escrever `transform` diretamente),
 * para poder ser combinado com outros transforms do próprio elemento via CSS:
 *   transform: translateY(var(--parallax-y, 0px)) rotate(...);
 * Desativado com prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(factor = 0.08) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * factor;
      el.style.setProperty("--parallax-y", `${offset}px`);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);

  return ref;
}

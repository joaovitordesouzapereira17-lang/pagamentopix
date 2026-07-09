import { useEffect, useRef } from "react";

/** Aplica um leve deslocamento vertical em função do scroll (desativado com prefers-reduced-motion). */
export function useParallax<T extends HTMLElement>(factor: number) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    function update() {
      if (el) el.style.transform = `translateY(${window.scrollY * factor}px)`;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);

  return ref;
}

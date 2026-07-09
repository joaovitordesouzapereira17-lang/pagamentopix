import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(isFinePointer && !reduceMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function onMove(e: MouseEvent) {
      const ring = ringRef.current;
      if (ring) ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor-label]");
      if (labelled) {
        setLabel(labelled.dataset.cursorLabel ?? "");
      }
    }
    function onOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-label]")) setLabel("");
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className={`cursor-ring${label ? " is-project" : ""}`} ref={ringRef} aria-hidden="true">
      <span className="cursor-ring-label mono">{label}</span>
    </div>
  );
}

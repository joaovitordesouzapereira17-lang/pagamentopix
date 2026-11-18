import { useMemo, useRef, useState } from "react";
import { radioStations } from "../data/radio";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";
import { useReveal } from "../hooks/useReveal";

const DEFAULT_MIN = 88;
const DEFAULT_MAX = 108;
const SNAP_THRESHOLD = 0.6;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function Radio() {
  const kicker = useReveal<HTMLParagraphElement>(0);
  const title = useReveal<HTMLHeadingElement>(0);

  const { min, max } = useMemo(() => {
    if (radioStations.length === 0) return { min: DEFAULT_MIN, max: DEFAULT_MAX };
    const freqs = radioStations.map((s) => s.frequency);
    return {
      min: Math.min(DEFAULT_MIN, Math.floor(Math.min(...freqs))),
      max: Math.max(DEFAULT_MAX, Math.ceil(Math.max(...freqs))),
    };
  }, []);

  const [freq, setFreq] = useState(radioStations[0]?.frequency ?? (min + max) / 2);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const active = radioStations.find((s) => Math.abs(s.frequency - freq) <= SNAP_THRESHOLD) ?? null;

  function freqFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return freq;
    const rect = track.getBoundingClientRect();
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    return min + ratio * (max - min);
  }

  function tuneTo(next: number) {
    setFreq(clamp(next, min, max));
  }

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    tuneTo(freqFromClientX(e.clientX));
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    tuneTo(freqFromClientX(e.clientX));
  }
  function onPointerUp() {
    dragging.current = false;
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") tuneTo(freq + 0.1);
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") tuneTo(freq - 0.1);
  }

  const needlePercent = ((freq - min) / (max - min)) * 100;

  return (
    <main id="conteudo" className="radio-page">
      <section className="radio-intro">
        <p className={`section-kicker mono light ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
          <GraphicMark symbol="circle" /> RÁDIO — 05
        </p>
        <h1 className={`radio-title ${title.className}`} ref={title.ref} style={title.style}>
          Sintonize o que eu ando ouvindo.
        </h1>
        <p className="radio-sub">
          Gire o dial pra pegar uma estação. Cada frequência é uma seleção diferente — do jeito que
          um rádio de verdade nunca faz só uma coisa de cada vez.
        </p>
      </section>

      <div className="wmp-shell">
        <div className="wmp-titlebar">
          <span className="wmp-titlebar-text">📻 Radio.mp3 - Media Player</span>
          <span className="paint-titlebar-buttons" aria-hidden="true">
            <span>_</span><span>□</span><span>✕</span>
          </span>
        </div>
        <div className="radio-deck">
        <div className="radio-display">
          {active ? (
            <>
              <span className="mono radio-display-freq">{active.frequency.toFixed(1)} FM</span>
              <h2 className="radio-display-name">{active.name}</h2>
              {active.note && <p className="radio-display-note">{active.note}</p>}
            </>
          ) : (
            <>
              <span className="mono radio-display-freq">{freq.toFixed(1)} FM</span>
              <p className="radio-display-static">— estática —</p>
            </>
          )}
        </div>

        <div
          className="radio-dial"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="radio-dial-track" />
          {radioStations.map((s) => (
            <button
              key={s.frequency}
              type="button"
              className={`radio-tick${active?.frequency === s.frequency ? " is-active" : ""}`}
              style={{ left: `${((s.frequency - min) / (max - min)) * 100}%` }}
              onClick={(e) => {
                e.stopPropagation();
                tuneTo(s.frequency);
              }}
            >
              <span className="radio-tick-mark" />
              <span className="radio-tick-label mono">{s.frequency.toFixed(1)}</span>
            </button>
          ))}
          <div
            className="radio-needle"
            role="slider"
            tabIndex={0}
            aria-label="Sintonizador do rádio"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={Number(freq.toFixed(1))}
            onKeyDown={onKeyDown}
            style={{ left: `${needlePercent}%` }}
          />
        </div>

        {radioStations.length === 0 && (
          <div className="radio-empty">
            <EditHint file="src/data/radio.ts">Adicione suas estações (array radioStations)</EditHint>
          </div>
        )}

        {active && (
          <div className="radio-embed">
            <iframe
              key={active.embedUrl}
              src={active.embedUrl}
              title={`Player — ${active.name}`}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}
        </div>
      </div>
    </main>
  );
}

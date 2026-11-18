import { useEffect, useMemo, useRef, useState } from "react";
import { radioStations, type RadioStation } from "../data/radio";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";
import { useReveal } from "../hooks/useReveal";
import { useRadio } from "../context/RadioContext";

const DEFAULT_MIN = 88;
const DEFAULT_MAX = 108;
const SNAP_THRESHOLD = 0.6;
const EQ_BARS = 9;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function Radio() {
  const kicker = useReveal<HTMLParagraphElement>(0);
  const title = useReveal<HTMLHeadingElement>(0);
  const { current, isPlaying, isLoading, volume, tune, togglePlay, setVolume } = useRadio();

  const { min, max } = useMemo(() => {
    if (radioStations.length === 0) return { min: DEFAULT_MIN, max: DEFAULT_MAX };
    const freqs = radioStations.map((s) => s.frequency);
    return {
      min: Math.min(DEFAULT_MIN, Math.floor(Math.min(...freqs))),
      max: Math.max(DEFAULT_MAX, Math.ceil(Math.max(...freqs))),
    };
  }, []);

  const [freq, setFreq] = useState(current?.frequency ?? radioStations[0]?.frequency ?? (min + max) / 2);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const active = radioStations.find((s) => Math.abs(s.frequency - freq) <= SNAP_THRESHOLD) ?? null;

  useEffect(() => {
    if (active && active.frequency !== current?.frequency) tune(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.frequency]);

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

  function selectStation(s: RadioStation) {
    setFreq(s.frequency);
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
  const showingLive = active && active.frequency === current?.frequency;

  return (
    <main id="conteudo" className="radio-page">
      <section className="radio-intro">
        <p className={`section-kicker mono light ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
          <GraphicMark symbol="circle" /> RÁDIO — 05
        </p>
        <h1 className={`radio-title font-integral ${title.className}`} ref={title.ref} style={title.style}>
          Sintonize o que eu ando ouvindo.
        </h1>
        <p className="radio-sub">
          Gire o dial pra pegar uma estação. É rádio de verdade, tocando ao vivo — a música continua
          mesmo se você for pra outra página.
        </p>
      </section>

      <div className="boombox">
        <div className="boombox-grille" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
        </div>

        <div className="boombox-face">
          <div className="boombox-lcd">
            {showingLive ? (
              <>
                <span className="mono boombox-lcd-freq">{active!.frequency.toFixed(1)} FM</span>
                <div className="boombox-marquee">
                  <span className={isLoading ? "is-loading" : ""}>
                    {isLoading ? "SINTONIZANDO..." : `${active!.name.toUpperCase()} — AO VIVO VIA SOMAFM — ${active!.name.toUpperCase()} — AO VIVO VIA SOMAFM`}
                  </span>
                </div>
                {active!.note && <p className="boombox-note">{active!.note}</p>}
              </>
            ) : (
              <>
                <span className="mono boombox-lcd-freq">{freq.toFixed(1)} FM</span>
                <p className="boombox-static">— estática —</p>
              </>
            )}
            <div className={`boombox-eq${isPlaying ? " is-playing" : ""}`} aria-hidden="true">
              {Array.from({ length: EQ_BARS }).map((_, i) => <span key={i} style={{ "--i": i } as React.CSSProperties} />)}
            </div>
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

          {radioStations.length === 0 ? (
            <div className="radio-empty">
              <EditHint file="src/data/radio.ts">Adicione suas estações (array radioStations)</EditHint>
            </div>
          ) : (
            <div className="boombox-controls">
              <div className="boombox-transport">
                <button type="button" className="boombox-btn" aria-label="Estação anterior" onClick={() => {
                  const idx = radioStations.findIndex((s) => s.frequency === active?.frequency);
                  const prev = radioStations[(idx <= 0 ? radioStations.length : idx) - 1];
                  if (prev) selectStation(prev);
                }}>⏮</button>
                <button type="button" className="boombox-btn boombox-btn-play" aria-label={isPlaying ? "Pausar" : "Tocar"} onClick={togglePlay}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button type="button" className="boombox-btn" aria-label="Próxima estação" onClick={() => {
                  const idx = radioStations.findIndex((s) => s.frequency === active?.frequency);
                  const next = radioStations[(idx + 1) % radioStations.length];
                  if (next) selectStation(next);
                }}>⏭</button>
              </div>

              <div className="boombox-presets">
                {radioStations.slice(0, 4).map((s, i) => (
                  <button
                    key={s.frequency}
                    type="button"
                    className={`boombox-preset${active?.frequency === s.frequency ? " is-active" : ""}`}
                    onClick={() => selectStation(s)}
                    title={s.name}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="boombox-volume">
                <span aria-hidden="true">🔉</span>
                <input
                  type="range" min={0} max={1} step={0.01} value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                />
                <span aria-hidden="true">🔊</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

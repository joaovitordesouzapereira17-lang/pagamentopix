import { radioStations } from "../data/radio";
import { profile } from "../data/profile";
import { EditHint } from "./EditHint";
import { useReveal } from "../hooks/useReveal";
import { useRadio } from "../context/RadioContext";

const EQ_HEIGHTS = [20, 38, 26, 48, 30, 43, 18, 35, 48, 25, 40, 22];

export function Radio() {
  const kicker = useReveal<HTMLParagraphElement>(0);
  const title = useReveal<HTMLHeadingElement>(0);
  const { current, isPlaying, isLoading, volume, tune, togglePlay, setVolume } = useRadio();

  if (radioStations.length === 0) {
    return (
      <main id="conteudo" className="radio-page">
        <section className="radio-intro">
          <p className={`section-kicker mono light ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
            RÁDIO — 05
          </p>
          <h1 className={`radio-title font-integral ${title.className}`} ref={title.ref} style={title.style}>
            Sintonize o que eu ando ouvindo.
          </h1>
        </section>
        <div className="radio-empty">
          <EditHint file="src/data/radio.ts">Adicione suas estações (array radioStations)</EditHint>
        </div>
      </main>
    );
  }

  const activeIndex = Math.max(0, radioStations.findIndex((s) => s.frequency === current?.frequency));
  const station = radioStations[activeIndex];

  function changeStation(index: number) {
    tune(radioStations[index]);
  }

  return (
    <main id="conteudo" className="radio-page">
      <div className="radio-topline mono">
        <span>● RÁDIO — 05</span>
        <span>FREQUÊNCIAS PESSOAIS / 2026</span>
      </div>

      <section className="radio-intro">
        <div>
          <p className={`radio-kicker mono ${kicker.className}`} ref={kicker.ref} style={kicker.style}>SUA PRÓXIMA DESCOBERTA COMEÇA AQUI</p>
          <h1 className={`radio-title font-integral ${title.className}`} ref={title.ref} style={title.style}>
            O que toca
            <br />
            <span className="font-hotham radio-title-accent">por aqui?</span>
          </h1>
        </div>

        <p className="radio-description">
          Gire o dial, escolha uma frequência e descubra um pouco do que faz parte da minha
          trilha sonora — é rádio de verdade, tocando ao vivo.
        </p>
      </section>

      <section className="radio-console">
        <div className="console-label mono">
          <span>J.V. RADIO</span>
          <span>STEREO SYSTEM / Nº 001</span>
        </div>

        <div className="radio-device">
          <div className="speaker speaker-left" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
          </div>

          <div className="radio-screen">
            <div className="screen-top mono">
              <span>NOW TUNING</span>
              <span className="live-dot">
                {isLoading ? "● SINTONIZANDO" : isPlaying ? "● AO VIVO" : "● EM ESPERA"}
              </span>
            </div>

            <strong className="mono">{station.frequency.toFixed(1)} FM</strong>
            <h2 className="font-integral">{station.name}</h2>
            <p>{station.description}</p>

            <div className={`equalizer${isPlaying ? " is-playing" : ""}`} aria-hidden="true">
              {EQ_HEIGHTS.map((height, i) => (
                <span key={i} style={{ height: `${isPlaying ? height : 5}px`, animationDelay: `${i * 0.08}s` } as React.CSSProperties} />
              ))}
            </div>
          </div>

          <div className="radio-controls">
            <div className="tuning-area">
              <span className="tuning-label mono">SINTONIZAR ESTAÇÃO</span>

              <input
                type="range"
                min={0}
                max={radioStations.length - 1}
                step={1}
                value={activeIndex}
                onChange={(e) => changeStation(Number(e.target.value))}
                aria-label="Sintonizar estação"
              />

              <div className="frequency-labels mono">
                {radioStations.map((item, i) => (
                  <button key={item.frequency} onClick={() => changeStation(i)} className={activeIndex === i ? "selected" : ""}>
                    {item.frequency.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="device-buttons">
              <button aria-label="Estação anterior" onClick={() => changeStation((activeIndex + radioStations.length - 1) % radioStations.length)}>◀◀</button>
              <button className="play-button" onClick={togglePlay} aria-label={isPlaying ? "Pausar" : "Reproduzir"}>
                {isPlaying ? "Ⅱ" : "▶"}
              </button>
              <button aria-label="Próxima estação" onClick={() => changeStation((activeIndex + 1) % radioStations.length)}>▶▶</button>
            </div>

            <div className="volume-display">
              <span className="mono">VOL.</span>
              <input
                type="range" min={0} max={1} step={0.01} value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Volume"
              />
            </div>
          </div>
        </div>

        <div className="console-footer mono">
          <span>DESIGNED BY {profile.fullName.split(" ")[0].toUpperCase()} {profile.fullName.split(" ")[1]?.toUpperCase() ?? ""}</span>
          {profile.city && <span>EST. 2026 — {profile.city.toUpperCase()}</span>}
        </div>
      </section>

      <section className="station-section">
        <div className="station-heading">
          <h2 className="font-integral">Escolha sua estação</h2>
          <span className="mono">{String(radioStations.length).padStart(2, "0")} FREQUÊNCIAS DISPONÍVEIS</span>
        </div>

        <div className="station-grid">
          {radioStations.map((item, i) => (
            <button
              key={item.frequency}
              className={`station-card${activeIndex === i ? " active" : ""}`}
              style={{ "--station-color": item.color } as React.CSSProperties}
              onClick={() => changeStation(i)}
            >
              <span className="station-number mono">0{i + 1}</span>
              <strong className="font-integral">{item.name}</strong>
              <span className="station-frequency mono">{item.frequency.toFixed(1)} FM</span>
              <span className="station-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

import { useState } from "react";
import { mural, type MuralItem } from "../data/mural";
import { withBase } from "../utils/paths";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";
import { useReveal } from "../hooks/useReveal";
import { useEscapeKey } from "../hooks/useEscapeKey";

const KIND_LABELS: Record<MuralItem["kind"], string> = {
  still: "Still de filme",
  album: "Capa de álbum",
  poster: "Pôster",
  textura: "Textura",
  foto: "Fotografia",
};

export function Mural() {
  const kicker = useReveal<HTMLParagraphElement>(0);
  const title = useReveal<HTMLHeadingElement>(0);
  const [active, setActive] = useState<number | null>(null);
  const activeItem = active !== null ? mural[active] : null;
  useEscapeKey(activeItem !== null, () => setActive(null));

  return (
    <main id="conteudo" className="mural-page">
      <div className="paint-window">
        <div className="paint-titlebar">
          <span className="paint-titlebar-text">🖼️ Mural.jpg - Paint</span>
          <span className="paint-titlebar-buttons" aria-hidden="true">
            <span>_</span><span>□</span><span>✕</span>
          </span>
        </div>
        <div className="paint-menubar" aria-hidden="true">
          {["Arquivo", "Editar", "Exibir", "Imagem", "Cores", "Ajuda"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className="paint-body">
          <div className="paint-toolbar" aria-hidden="true">
            {["✎", "✂", "⬚", "◯", "▱", "A", "🪣", "🔍"].map((t, i) => (
              <span className="paint-tool" key={i}>{t}</span>
            ))}
          </div>

          <div className="paint-canvas">
            <section className="mural-intro">
              <p className={`section-kicker mono light ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
                <GraphicMark symbol="star" /> MURAL — 04
              </p>
              <h1 className={`mural-title ${title.className}`} ref={title.ref} style={title.style}>
                Referências, inspirações e o que anda na minha cabeça.
              </h1>
              <p className="mural-sub">
                Um arquivo pessoal de cinema, música e imagens que influenciam a forma como eu penso design.
              </p>
            </section>

            {mural.length === 0 ? (
              <div className="mural-empty">
                <EditHint file="src/data/mural.ts">Adicione suas referências visuais (array mural)</EditHint>
              </div>
            ) : (
              <div className="mural-grid">
                {mural.map((item, i) => (
                  <button
                    key={item.image + i}
                    type="button"
                    className="mural-tile"
                    style={{ "--rz": `${((i % 5) - 2) * 2.4}deg` } as React.CSSProperties}
                    onClick={() => setActive(i)}
                  >
                    <img src={withBase(item.image)} alt={item.origin} />
                    <span className="mural-tile-tag mono">{KIND_LABELS[item.kind]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="paint-palette" aria-hidden="true">
          <span className="paint-palette-current" />
          {["#171717", "#E9E1D2", "#D93656", "#F2A900", "#536FE5", "#8CBA68", "#ffffff", "#7A7165"].map((c) => (
            <span key={c} className="paint-swatch" style={{ background: c }} />
          ))}
        </div>
      </div>

      {activeItem && (
        <div className="mural-lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <div className="mural-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button className="mural-lightbox-close" onClick={() => setActive(null)} aria-label="Fechar">
              ✕
            </button>
            <img className="mural-lightbox-img" src={withBase(activeItem.image)} alt={activeItem.origin} />
            <div className="mural-lightbox-info">
              <span className="mono mural-lightbox-kind">{KIND_LABELS[activeItem.kind]}</span>
              <h2>{activeItem.origin}</h2>
              {activeItem.note && <p>{activeItem.note}</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

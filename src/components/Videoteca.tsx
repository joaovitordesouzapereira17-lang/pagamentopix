import { useMemo, useState } from "react";
import { videoteca, type VideotecaItem } from "../data/videoteca";
import { withBase } from "../utils/paths";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";
import { useReveal } from "../hooks/useReveal";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { TierList } from "./TierList";

function pickDouble(items: VideotecaItem[]): [VideotecaItem, VideotecaItem] | null {
  if (items.length < 2) return null;
  const a = Math.floor(Math.random() * items.length);
  let b = Math.floor(Math.random() * (items.length - 1));
  if (b >= a) b += 1;
  return [items[a], items[b]];
}

export function Videoteca() {
  const kicker = useReveal<HTMLParagraphElement>(0);
  const title = useReveal<HTMLHeadingElement>(0);

  const genres = useMemo(() => Array.from(new Set(videoteca.map((v) => v.genre))).sort(), []);
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<number | null>(null);
  const activeItem = active !== null ? videoteca[active] : null;
  useEscapeKey(activeItem !== null, () => setActive(null));

  const [doubleState, setDoubleState] = useState<"idle" | "spinning" | "revealed">("idle");
  const [doublePair, setDoublePair] = useState<[VideotecaItem, VideotecaItem] | null>(null);
  useEscapeKey(doubleState !== "idle", () => setDoubleState("idle"));

  function rollDouble() {
    const pair = pickDouble(videoteca);
    if (!pair) return;
    setDoubleState("spinning");
    window.setTimeout(() => {
      setDoublePair(pair);
      setDoubleState("revealed");
    }, 900);
  }

  const filtered = videoteca.filter((v) => filter === "all" || v.genre === filter);

  return (
    <main id="conteudo" className="videoteca-page">
      <section className="videoteca-intro">
        <p className={`section-kicker mono light ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
          <GraphicMark symbol="cross" /> VIDEOTECA — 07
        </p>
        <h1 className={`videoteca-title ${title.className}`} ref={title.ref} style={title.style}>
          Uma parede de pôsteres dos filmes que ficaram.
        </h1>
        <p className="videoteca-sub">
          Cinema é uma das minhas maiores referências. Essa é a prateleira dos filmes que mais me marcaram.
        </p>

        {videoteca.length >= 2 && (
          <button type="button" className="btn btn-line videoteca-double-btn" onClick={rollDouble}>
            Montar sessão dupla
          </button>
        )}

        {genres.length > 1 && (
          <nav className="project-index-nav videoteca-filters" role="group" aria-label="Filtrar por gênero">
            <button className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>
              Todos
            </button>
            {genres.map((g) => (
              <span key={g} style={{ display: "contents" }}>
                <span aria-hidden="true">/</span>
                <button className={filter === g ? "is-active" : ""} onClick={() => setFilter(g)}>
                  {g}
                </button>
              </span>
            ))}
          </nav>
        )}
      </section>

      {videoteca.length === 0 ? (
        <div className="videoteca-empty">
          <EditHint file="src/data/videoteca.ts">Adicione seus filmes de referência (array videoteca)</EditHint>
        </div>
      ) : (
        <>
          <section className="videoteca-tier-section">
            <p className="mono videoteca-tier-heading">Minha tier list — arraste ou clique pra reorganizar</p>
            <TierList items={videoteca} />
          </section>

          <div className="videoteca-grid">
          {filtered.map((item) => {
            const realIndex = videoteca.indexOf(item);
            return (
              <button key={item.image + item.title} type="button" className="videoteca-poster" onClick={() => setActive(realIndex)}>
                {realIndex === 0 && <span className="project-badge videoteca-badge" aria-hidden="true">NOVO!</span>}
                <img src={withBase(item.image)} alt={item.title} />
                <span className="videoteca-poster-info">
                  <span className="videoteca-poster-title">{item.title}</span>
                  <span className="mono videoteca-poster-year">{item.year}</span>
                </span>
              </button>
            );
          })}
          </div>
        </>
      )}

      {activeItem && (
        <div className="mural-lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <div className="mural-lightbox-card videoteca-sheet" onClick={(e) => e.stopPropagation()}>
            <button className="mural-lightbox-close" onClick={() => setActive(null)} aria-label="Fechar">
              ✕
            </button>
            <img className="mural-lightbox-img" src={withBase(activeItem.image)} alt={activeItem.title} />
            <div className="mural-lightbox-info">
              <span className="mono mural-lightbox-kind">{activeItem.genre} — {activeItem.year}</span>
              <h2>{activeItem.title}</h2>
              {activeItem.director && <p className="videoteca-sheet-director">Direção: {activeItem.director}</p>}
              {activeItem.synopsis && <p>{activeItem.synopsis}</p>}
              {activeItem.note && <p className="videoteca-sheet-note">"{activeItem.note}"</p>}
            </div>
          </div>
        </div>
      )}

      {doubleState !== "idle" && (
        <div className="mural-lightbox" role="dialog" aria-modal="true" onClick={() => setDoubleState("idle")}>
          <div className="videoteca-double-card" onClick={(e) => e.stopPropagation()}>
            {doubleState === "spinning" || !doublePair ? (
              <div className="videoteca-reel" aria-hidden="true">
                <GraphicMark symbol="circle" />
                <p className="mono">preparando a sessão...</p>
              </div>
            ) : (
              <>
                <button className="mural-lightbox-close" onClick={() => setDoubleState("idle")} aria-label="Fechar">
                  ✕
                </button>
                <p className="mono videoteca-double-label">Sessão dupla</p>
                <div className="videoteca-double-posters">
                  {doublePair.map((film) => (
                    <figure key={film.title}>
                      <img src={withBase(film.image)} alt={film.title} />
                      <figcaption>{film.title} <span className="mono">— {film.year}</span></figcaption>
                    </figure>
                  ))}
                </div>
                <button type="button" className="underline-link videoteca-double-reroll" onClick={rollDouble}>
                  Sortear outra sessão
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

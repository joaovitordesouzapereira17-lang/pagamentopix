import { useState } from "react";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import { useParallax } from "../hooks/useParallax";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";
import { ProfilePhoto } from "./ProfilePhoto";
import { DesktopLayer } from "./DesktopLayer";

const LINE_CLASSES = ["line-a", "line-b", "line-c"];

function splitNameIntoLines(fullName: string): string[] {
  const words = fullName.split(" ").filter(Boolean);
  if (words.length === 0) return ["Seu Nome"];
  if (words.length <= 3) return words;

  const third = Math.ceil(words.length / 3);
  const lines = [
    words.slice(0, third).join(" "),
    words.slice(third, third * 2).join(" "),
    words.slice(third * 2).join(" "),
  ];
  return lines.filter(Boolean);
}

export function Hero() {
  const nameLines = splitNameIntoLines(profile.fullName);
  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const kicker = useReveal<HTMLParagraphElement>(0);
  const nameReveal0 = useReveal<HTMLSpanElement>(120);
  const nameReveal1 = useReveal<HTMLSpanElement>(220);
  const nameReveal2 = useReveal<HTMLSpanElement>(320);
  const nameReveals = [nameReveal0, nameReveal1, nameReveal2];
  const photo = useReveal<HTMLDivElement>(200);
  const foot = useReveal<HTMLDivElement>(420);
  const tagReveal = useReveal<HTMLSpanElement>(500);
  const tagParallax = useParallax<HTMLSpanElement>(0.06);
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <section className="hero" id="topo">
      <DesktopLayer />
      <div className="hero-grid">
        <p className={`hero-kicker mono ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
          <GraphicMark symbol="cross" className="hero-kicker-mark" />
          {profile.role ? profile.role : <EditHint file="src/data/profile.ts">Defina seu cargo/título (campo role)</EditHint>}
        </p>

        <h1 className="hero-name">
          {nameLines.map((line, i) => {
            const r = nameReveals[i] ?? nameReveals[nameReveals.length - 1];
            return (
              <span
                className={`hero-name-line ${LINE_CLASSES[i] ?? "line-c"} ${r.className}`}
                ref={r.ref}
                style={r.style}
                key={line}
              >
                {line}
              </span>
            );
          })}
        </h1>

        <div className={`hero-photo-panel ${photo.className}`} ref={photo.ref} style={photo.style}>
          <div className="msn-webcam-card">
            <div className="msn-webcam-titlebar">
              <span>📷 Webcam</span>
              <span className="msn-webcam-live"><i /> AO VIVO</span>
            </div>
            <div className="hero-avatar">
              <ProfilePhoto
                src={profile.photo}
                alt={profile.fullName}
                initials={initials}
                hintFile="public/images/profile/"
                className="hero-avatar-photo"
                hideHint
                onErrorChange={setPhotoMissing}
              />
            </div>
          </div>
          {photoMissing && (
            <EditHint file="public/images/profile/" className="hero-avatar-hint">
              Adicione sua foto
            </EditHint>
          )}
          {profile.nickname && (
            <span
              className={`hero-photo-tag mono ${tagReveal.className}`}
              ref={(node) => {
                tagReveal.ref.current = node;
                tagParallax.current = node;
              }}
              style={tagReveal.style}
            >
              CONHECIDO COMO {profile.nickname.toUpperCase()} ✦
            </span>
          )}
        </div>

        <div className={`hero-foot ${foot.className}`} ref={foot.ref} style={foot.style}>
          <div className="hero-bio-window">
            <div className="paint-titlebar hero-bio-titlebar">
              <span className="paint-titlebar-text">👤 Perfil.txt</span>
              <span className="paint-titlebar-buttons" aria-hidden="true">
                <span>_</span><span>□</span><span>✕</span>
              </span>
            </div>
            <div className="hero-bio-body">
              {profile.heroIntro ? (
                <p className="hero-intro">{profile.heroIntro}</p>
              ) : (
                <EditHint file="src/data/profile.ts">Escreva sua apresentação profissional (campo heroIntro)</EditHint>
              )}
              <div className="hero-mood">
                <span className="hero-mood-label">MOOD ATUAL</span>
                <span className="hero-mood-value">⚡ no modo criar</span>
              </div>
              <a href="#projetos" className="hero-scroll">
                Ver trabalho
                <span className="hero-scroll-line"><span /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

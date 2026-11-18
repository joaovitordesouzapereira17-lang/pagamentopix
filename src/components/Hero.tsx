import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import { useParallax } from "../hooks/useParallax";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";
import { ProfilePhoto } from "./ProfilePhoto";
import { DesktopLayer } from "./DesktopLayer";

const dragProps = {
  drag: true,
  dragElastic: 0.08,
  dragMomentum: false,
  whileTap: { cursor: "grabbing" },
  whileDrag: { scale: 1.02, zIndex: 15, boxShadow: "0 20px 40px rgba(30,27,75,0.35)" },
} as const;

function splitSurname(fullName: string): [string, string] {
  const words = fullName.split(" ").filter(Boolean);
  if (words.length <= 1) return [fullName, ""];
  return [words.slice(0, -1).join(" "), words[words.length - 1]];
}

export function Hero() {
  const [firstNames, surname] = splitSurname(profile.fullName);
  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const kicker = useReveal<HTMLParagraphElement>(0);
  const nameReveal = useReveal<HTMLHeadingElement>(120);
  const photo = useReveal<HTMLDivElement>(200);
  const foot = useReveal<HTMLDivElement>(420);
  const tagReveal = useReveal<HTMLSpanElement>(500);
  const tagParallax = useParallax<HTMLSpanElement>(0.06);
  const [photoMissing, setPhotoMissing] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section className="hero" id="topo" ref={heroRef}>
      <DesktopLayer />
      <div className="hero-grid">
        <p className={`hero-kicker mono ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
          <GraphicMark symbol="cross" className="hero-kicker-mark" />
          {profile.role ? profile.role : <EditHint file="src/data/profile.ts">Defina seu cargo/título (campo role)</EditHint>}
        </p>

        <h1 className={`hero-name ${nameReveal.className}`} ref={nameReveal.ref} style={nameReveal.style}>
          <span className="hero-name-eyebrow font-hotham">Portfólio</span>
          <span className="hero-name-full font-integral">
            {firstNames} <span className="font-hotham hero-name-accent">{surname}</span>
          </span>
        </h1>

        <div className={`hero-photo-panel ${photo.className}`} ref={photo.ref} style={photo.style}>
          <motion.div className="wmp-photo-window" {...dragProps} dragConstraints={heroRef}>
            <div className="wmp-photo-titlebar">
              <span>🪟 {profile.fullName.split(" ")[0]}.jpg - Windows Media Player</span>
              <span className="paint-titlebar-buttons" aria-hidden="true">
                <span>_</span><span>□</span><span>✕</span>
              </span>
            </div>
            <div className="wmp-photo-menubar" aria-hidden="true">
              {["File", "View", "Play", "Tools", "Help"].map((m) => <span key={m}>{m}</span>)}
            </div>
            <div className="wmp-photo-display">
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
            <div className="wmp-photo-controls">
              <span className="wmp-photo-btn" aria-hidden="true">⏮</span>
              <span className="wmp-photo-btn wmp-photo-btn-play" aria-hidden="true">▶</span>
              <span className="wmp-photo-btn" aria-hidden="true">⏭</span>
              <span className="wmp-photo-volume" aria-hidden="true">
                🔊<span className="wmp-photo-volume-track"><span /></span>
              </span>
            </div>
          </motion.div>
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
          <motion.div className="hero-bio-window" {...dragProps} dragConstraints={heroRef}>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

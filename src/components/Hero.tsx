import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { experience } from "../data/experience";
import { useReveal } from "../hooks/useReveal";
import { useParallax } from "../hooks/useParallax";
import { useGlitch } from "../hooks/useGlitch";
import { EditHint } from "./EditHint";
import { ProfilePhoto } from "./ProfilePhoto";

function GlitchLine({ text }: { text: string }) {
  return (
    <span className="glitch-wrap">
      <span className="glitch-base">{text}</span>
      <span className="glitch-layer glitch-layer-1" aria-hidden="true">{text}</span>
      <span className="glitch-layer glitch-layer-2" aria-hidden="true">{text}</span>
    </span>
  );
}

export function Hero() {
  const isGlitching = useGlitch();

  const words = profile.fullName.split(" ").filter(Boolean);
  const line1 = words.slice(0, 2).join(" ") || "SEU NOME";
  const line2 = words.slice(2).join(" ");

  const ringRef = useParallax<HTMLDivElement>(0.12);
  const starRef = useParallax<HTMLDivElement>(0.22);
  const squareRef = useParallax<HTMLDivElement>(0.08);
  const vertRef = useParallax<HTMLSpanElement>(0.05);

  const eyebrow = useReveal<HTMLDivElement>(0);
  const title = useReveal<HTMLHeadingElement>(80);
  const foot = useReveal<HTMLDivElement>(160);
  const stats = useReveal<HTMLDivElement>(240);

  const initials = words.slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";

  const statItems = [
    { label: "projetos no portfólio", value: projects.length, suffix: "+" },
    { label: "experiências profissionais", value: experience.length, suffix: "+" },
    { label: "anos de idade", value: profile.age ?? 0, suffix: "", skipIfEmpty: !profile.age },
  ].filter((s) => !s.skipIfEmpty && s.value > 0);

  return (
    <section className="hero" id="topo">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-halftone" />
        <div className="hero-scanlines" />
        <div className="hero-shape hero-shape-ring" ref={ringRef} />
        <div className="hero-shape hero-shape-star" ref={starRef}>
          <svg viewBox="0 0 40 40" fill="var(--electric)">
            <path d="M20 0l4 15 15 5-15 5-4 15-4-15-15-5 15-5z" />
          </svg>
        </div>
        <div className="hero-shape hero-shape-square" ref={squareRef} />
        <span className="hero-shape hero-shape-vert" ref={vertRef}>
          PORTFÓLIO ✦ {new Date().getFullYear()} ✦
        </span>
      </div>

      <div className="hero-inner">
        <div className="hero-top-row">
          <div className={`eyebrow mono ${eyebrow.className}`} ref={eyebrow.ref} style={eyebrow.style}>
            {profile.role ? `// ${profile.role}` : <EditHint file="src/data/profile.ts">Defina seu cargo/título (campo role)</EditHint>}
          </div>

          <ProfilePhoto
            src={profile.photo}
            alt={profile.fullName}
            initials={initials}
            hintFile="public/images/profile/"
            className="hero-photo"
          />
        </div>

        <h1
          className={`hero-title ${title.className} ${isGlitching ? "is-glitching" : ""}`}
          ref={title.ref}
          style={title.style}
        >
          <GlitchLine text={line1.toUpperCase()} />
          {line2 && (
            <span className="hero-title-outline">
              <GlitchLine text={line2.toUpperCase()} />
            </span>
          )}
        </h1>

        <div className={`hero-foot ${foot.className}`} ref={foot.ref} style={foot.style}>
          {profile.heroIntro ? (
            <p className="hero-subtitle">{profile.heroIntro}</p>
          ) : (
            <div className="hero-subtitle">
              <EditHint file="src/data/profile.ts">Escreva sua apresentação profissional (campo heroIntro)</EditHint>
            </div>
          )}
          <div className="hero-actions">
            <a href="#projetos" className="btn btn-primary">Ver projetos</a>
            <a href="#contato" className="btn btn-outline">Fale comigo</a>
          </div>
        </div>

        {statItems.length > 0 && (
          <div className={`hero-stats ${stats.className}`} ref={stats.ref} style={stats.style}>
            {statItems.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-number mono">{s.value}{s.suffix}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <a href="#sobre" className="scroll-cue" aria-label="Rolar para a próxima seção">
        <span className="scroll-cue-text mono">SCROLL</span>
        <span className="scroll-cue-line"><span /></span>
      </a>
    </section>
  );
}

import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import { EditHint } from "./EditHint";
import { ProfilePhoto } from "./ProfilePhoto";

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
  const name = useReveal<HTMLHeadingElement>(120);
  const photo = useReveal<HTMLDivElement>(240);
  const foot = useReveal<HTMLDivElement>(360);

  return (
    <section className="hero" id="topo">
      <div className="hero-grid">
        <p className={`hero-kicker mono ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
          {profile.role ? `— ${profile.role}` : <EditHint file="src/data/profile.ts">Defina seu cargo/título (campo role)</EditHint>}
        </p>

        <h1 className={`hero-name ${name.className}`} ref={name.ref} style={name.style}>
          {nameLines.map((line, i) => (
            <span className={`hero-name-line ${LINE_CLASSES[i] ?? "line-c"}`} key={line}>
              {line}
            </span>
          ))}
        </h1>

        <div className={`hero-photo-panel ${photo.className}`} ref={photo.ref} style={photo.style}>
          <ProfilePhoto
            src={profile.photo}
            alt={profile.fullName}
            initials={initials}
            hintFile="public/images/profile/"
            className="hero-photo"
          />
        </div>

        <div className={`hero-foot ${foot.className}`} ref={foot.ref} style={foot.style}>
          {profile.heroIntro ? (
            <p className="hero-intro">{profile.heroIntro}</p>
          ) : (
            <EditHint file="src/data/profile.ts">Escreva sua apresentação profissional (campo heroIntro)</EditHint>
          )}
          <a href="#projetos" className="hero-scroll">
            Ver trabalho
            <span className="hero-scroll-line"><span /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

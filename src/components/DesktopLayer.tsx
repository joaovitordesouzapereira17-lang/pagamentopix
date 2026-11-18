import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";

interface DesktopIcon {
  label: string;
  glyph: string;
  to: string;
  top: string;
  side: "left" | "right";
  offset: string;
}

const ICONS: DesktopIcon[] = [
  { label: "Sobre.txt", glyph: "📄", to: "/#sobre", top: "10%", side: "right", offset: "6%" },
  { label: "Projetos", glyph: "📁", to: "/#projetos", top: "19%", side: "right", offset: "6%" },
  { label: "Mural.jpg", glyph: "🖼️", to: "/mural", top: "28%", side: "right", offset: "6%" },
  { label: "Radio.mp3", glyph: "📻", to: "/radio", top: "68%", side: "right", offset: "6%" },
  { label: "Videoteca", glyph: "📼", to: "/videoteca", top: "77%", side: "right", offset: "6%" },
  { label: "Contato.eml", glyph: "✉️", to: "/#contato", top: "86%", side: "right", offset: "6%" },
];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function DesktopLayer() {
  const now = useClock();
  const [selected, setSelected] = useState<string | null>(null);
  const signature = profile.nickname || profile.fullName.split(" ")[0] || "Portfólio";
  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="desktop-layer">
      <div className="desktop-icons">
        {ICONS.map((icon) => (
          <Link
            key={icon.label}
            to={icon.to}
            className={`desktop-icon${selected === icon.label ? " is-selected" : ""}`}
            style={{ top: icon.top, [icon.side]: icon.offset } as React.CSSProperties}
            onMouseDown={() => setSelected(icon.label)}
            onMouseLeave={() => setSelected(null)}
          >
            <span className="desktop-icon-glyph" aria-hidden="true">{icon.glyph}</span>
            <span className="desktop-icon-label mono">{icon.label}</span>
          </Link>
        ))}
      </div>

      <div className="desktop-taskbar">
        <a href="#topo" className="desktop-start mono">
          <span className="desktop-start-mark" aria-hidden="true">◆</span>
          {signature}
        </a>
        <span className="mono desktop-clock">
          {date} — {time}
        </span>
      </div>
    </div>
  );
}

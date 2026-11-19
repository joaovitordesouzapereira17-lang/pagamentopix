import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clapperboard, Folder, Image, Mail, Radio, UserRound, X } from "lucide-react";

const shortcuts = [
  { label: "Sobre", to: "/#sobre", Icon: UserRound },
  { label: "Projetos", to: "/#projetos", Icon: Folder },
  { label: "Mural", to: "/mural", Icon: Image },
  { label: "Rádio", to: "/radio", Icon: Radio },
  { label: "Videoteca", to: "/videoteca", Icon: Clapperboard },
  { label: "Contato", to: "/#contato", Icon: Mail },
];

export function SystemTaskbar() {
  const [now, setNow] = useState(() => new Date());
  const [startOpen, setStartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => setStartOpen(false), [location.pathname, location.hash]);

  return (
    <>
      {startOpen && (
        <div className="system-start-menu" role="dialog" aria-label="Menu iniciar">
          <div className="system-start-head">
            <span className="system-start-avatar">JV</span>
            <span><strong>João Vitor</strong><small>Portfólio pessoal</small></span>
            <button type="button" onClick={() => setStartOpen(false)} aria-label="Fechar menu"><X size={16} /></button>
          </div>
          <div className="system-start-links">
            {shortcuts.map(({ label, to, Icon }) => (
              <Link key={label} to={to}><Icon size={17} />{label}<span>›</span></Link>
            ))}
          </div>
          <div className="system-start-foot">ARQUIVO CRIATIVO · 2026</div>
        </div>
      )}
      <div className="system-taskbar">
        <button className={`system-start-button${startOpen ? " is-active" : ""}`} type="button" onClick={() => setStartOpen((v) => !v)} aria-expanded={startOpen}>
          <span className="system-start-orb">✦</span> Iniciar
        </button>
        <div className="system-taskbar-apps" aria-label="Atalhos">
          {shortcuts.map(({ label, to, Icon }) => (
            <Link key={label} to={to} title={label} className={location.pathname === to ? "is-current" : ""}>
              <Icon size={17} />
            </Link>
          ))}
        </div>
        <div className="system-tray">
          <span className="system-tray-led" />
          <span className="system-tray-clock">{now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
          <small>{now.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}</small>
        </div>
      </div>
    </>
  );
}

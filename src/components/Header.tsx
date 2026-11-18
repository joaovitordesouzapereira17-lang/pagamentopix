import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import { GraphicMark } from "./GraphicMark";

const NAV_ITEMS = [
  { label: "Sobre", index: "01", to: "/#sobre", sectionId: "sobre" },
  { label: "Projetos", index: "02", to: "/#projetos", sectionId: "projetos" },
  { label: "Skills", index: "03", to: "/#skills", sectionId: "skills" },
  { label: "Mural", index: "04", to: "/mural", sectionId: null },
  { label: "Rádio", index: "05", to: "/radio", sectionId: null },
  { label: "Contato", index: "06", to: "/#contato", sectionId: "contato" },
];

export function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const closeNav = () => setNavOpen(false);
  const signature = profile.nickname || profile.fullName.split(" ")[0] || "Portfólio";

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    item.sectionId ? location.pathname === "/" && activeId === item.sectionId : location.pathname === item.to;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="wordmark">
          {signature} <GraphicMark symbol="star" className="wordmark-mark" />
        </Link>

        <nav className={`nav${navOpen ? " is-open" : ""}`} id="nav">
          <button className="nav-close mono" aria-label="Fechar menu" onClick={closeNav}>
            FECHAR ✕
          </button>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <span className="nav-index">{item.index}</span>
                <Link
                  to={item.to}
                  className={`nav-link${isActive(item) ? " is-active" : ""}`}
                  onClick={closeNav}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-footer">
            {profile.email && <span>{profile.email}</span>}
            {profile.city && <span>{profile.city}</span>}
          </div>
        </nav>

        <Link to="/#contato" className="btn btn-line header-cta">
          Contato
        </Link>

        <button
          className={`menu-toggle${navOpen ? " is-open" : ""}`}
          aria-label={navOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={navOpen}
          aria-controls="nav"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span>Menu</span>
          <span className="menu-toggle-box">
            <i></i>
            <i></i>
          </span>
        </button>
      </div>
    </header>
  );
}

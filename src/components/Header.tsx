import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const NAV_ITEMS = [
  { id: "sobre", label: "Sobre", index: "01" },
  { id: "projetos", label: "Projetos", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "contato", label: "Contato", index: "04" },
];

export function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

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
  }, []);

  const closeNav = () => setNavOpen(false);
  const firstName = profile.fullName.split(" ")[0] || "Portfólio";

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#topo" className="wordmark">
          {firstName}<span className="wordmark-dot">.</span>
        </a>

        <nav className={`nav${navOpen ? " is-open" : ""}`} id="nav">
          <button className="nav-close mono" aria-label="Fechar menu" onClick={closeNav}>
            FECHAR ✕
          </button>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <span className="nav-index">{item.index}</span>
                <a
                  href={`#${item.id}`}
                  className={`nav-link${activeId === item.id ? " is-active" : ""}`}
                  onClick={closeNav}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-footer">
            {profile.email && <span>{profile.email}</span>}
            {profile.city && <span>{profile.city}</span>}
          </div>
        </nav>

        <a href="#contato" className="btn btn-line header-cta">
          Contato
        </a>

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

import { profile } from "../data/profile";
import { Marquee } from "./Marquee";

export function Footer() {
  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <footer className="site-footer">
      <Marquee className="footer-marquee" text="DISPONÍVEL PARA PROJETOS ✦ VAMOS NESSA ✦ " />
      <div className="footer-inner">
        <p className="mono">© {new Date().getFullYear()} {profile.fullName || initials}</p>
        <a href="#topo" className="back-to-top mono">VOLTAR AO TOPO ↑</a>
      </div>
    </footer>
  );
}

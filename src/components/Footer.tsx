import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="mono">© {new Date().getFullYear()} {profile.fullName}</p>
        <a href="#topo" className="back-to-top mono">VOLTAR AO TOPO ↑</a>
      </div>
    </footer>
  );
}

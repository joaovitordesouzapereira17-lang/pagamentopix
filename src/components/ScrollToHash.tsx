import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Faz o link de nav funcionar tanto dentro da home (âncora normal) quanto
 * vindo de outra rota (ex: /mural -> /#projetos): navega pra home e, no
 * mesmo commit, rola até a seção certa.
 */
export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash, location.key]);

  return null;
}

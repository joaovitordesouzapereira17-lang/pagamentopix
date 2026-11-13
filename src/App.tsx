import { useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import TypeRemixPreloader from "./components/ui/type-remix-preloader";
import { profile } from "./data/profile";
import { skills } from "./data/skills";

const SEEN_KEY = "portfolio-preloader-seen";

function Site() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <ScrollProgress />
      <CustomCursor />
      <Header />

      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(() => {
    try {
      return sessionStorage.getItem(SEEN_KEY) !== "1";
    } catch {
      return true;
    }
  });

  if (!loading) return <Site />;

  const roles = profile.focusAreas.length ? profile.focusAreas : skills.flatMap((g) => g.items).slice(0, 4);

  return (
    <TypeRemixPreloader
      word="CRIATIVO"
      name={profile.fullName}
      discipline={profile.role}
      year="2026"
      period="2026"
      handle={profile.socials.find((s) => s.label === "Instagram")?.url.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@") ?? profile.email}
      roles={roles}
      kicker="Um Portfólio"
      tagline="Projeto Pessoal"
      motto={profile.philosophy?.title.replace(/\.$/, "").toLowerCase() ?? "criatividade com propósito"}
      durationMs={4200}
      onComplete={() => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* sessionStorage indisponível (modo privado) — tudo bem, só roda de novo */
        }
        setLoading(false);
      }}
    />
  );
}

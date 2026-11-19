import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { ScrollToHash } from "./components/ScrollToHash";
import { Header } from "./components/Header";
import { GlobalRadioBar } from "./components/GlobalRadioBar";
import { SystemTaskbar } from "./components/SystemTaskbar";
import { RadioProvider } from "./context/RadioContext";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Mural } from "./components/Mural";
import { Radio } from "./components/Radio";
import { Videoteca } from "./components/Videoteca";
import { ProjectDetail } from "./components/ProjectDetail";
import TypeRemixPreloader from "./components/ui/type-remix-preloader";
import { profile } from "./data/profile";
import { skills } from "./data/skills";

const SEEN_KEY = "portfolio-preloader-seen";

function HomePage() {
  return (
    <main id="conteudo">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}

function Site() {
  return (
    <RadioProvider>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mural" element={<Mural />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/videoteca" element={<Videoteca />} />
        <Route path="/trabalhos/:slug" element={<ProjectDetail />} />
      </Routes>

      <Footer />
      <GlobalRadioBar />
      <SystemTaskbar />
    </RadioProvider>
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

  if (!loading) {
    return (
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Site />
      </BrowserRouter>
    );
  }

  const roles = profile.focusAreas.length ? profile.focusAreas : skills.flatMap((g) => g.items).slice(0, 4);

  return (
    <TypeRemixPreloader
      word="PORTFÓLIO"
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

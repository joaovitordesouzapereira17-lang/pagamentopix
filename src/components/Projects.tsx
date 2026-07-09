import { useState } from "react";
import { projects, projectCategories, type Project } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const kicker = useReveal<HTMLParagraphElement>(0);
  const head = useReveal<HTMLDivElement>(0);

  const openIndex = openProject ? projects.indexOf(openProject) : -1;

  return (
    <section className="section-projects" id="projetos">
      <p className={`section-kicker mono light ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
        <GraphicMark symbol="arrow" /> PROJETOS — 02
      </p>

      <div className={`section-head ${head.className}`} ref={head.ref} style={head.style}>
        <h2 className="section-title-serif">Trabalho selecionado</h2>
        <p className="section-desc">
          Cada projeto representa uma oportunidade de transformar uma ideia em uma experiência. Gosto
          de participar de todas as etapas do processo, desde o conceito até a construção da
          identidade visual, sempre buscando unir criatividade e estratégia para criar soluções que
          realmente façam sentido.
        </p>

        {projectCategories.length > 1 && (
          <nav className="project-index-nav" role="group" aria-label="Filtrar projetos por categoria">
            <button className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>
              Todos
            </button>
            {projectCategories.map((cat) => (
              <span key={cat} style={{ display: "contents" }}>
                <span aria-hidden="true">/</span>
                <button className={filter === cat ? "is-active" : ""} onClick={() => setFilter(cat)}>
                  {cat}
                </button>
              </span>
            ))}
          </nav>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="projects-empty">
          <EditHint file="src/data/projects/">Crie um arquivo de projeto (veja o README dessa pasta)</EditHint>
        </div>
      ) : (
        <div className="project-spreads">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              reverse={index % 2 === 1}
              hidden={filter !== "all" && project.category !== filter}
              onOpen={setOpenProject}
            />
          ))}
        </div>
      )}

      <ProjectModal project={openProject} index={openIndex} onClose={() => setOpenProject(null)} />
    </section>
  );
}

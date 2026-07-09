import { useState } from "react";
import { projects, projectCategories, type Project } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import { EditHint } from "./EditHint";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const label = useReveal<HTMLDivElement>(0);
  const heading = useReveal<HTMLDivElement>(0);
  const filters = useReveal<HTMLDivElement>(0);

  const openIndex = openProject ? projects.indexOf(openProject) : -1;

  return (
    <section className="section section-invert" id="projetos">
      <div className={`spread-label mono ${label.className}`} ref={label.ref} style={label.style}>
        <span>PROJETOS — SPREAD 02</span>
        <span>{projects.length} {projects.length === 1 ? "TRABALHO" : "TRABALHOS"}</span>
      </div>

      <div className={`section-heading ${heading.className}`} ref={heading.ref} style={heading.style}>
        <h2 className="section-title">Trabalhos que<br />fazem barulho.</h2>
        <p className="section-subtitle">
          {projects.length > 0
            ? "Uma seleção de projetos. Clique num card para abrir os detalhes."
            : "Nenhum projeto cadastrado ainda."}
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="projects-empty">
          <EditHint file="src/data/projects/">Crie um arquivo de projeto (veja o README dessa pasta)</EditHint>
        </div>
      ) : (
        <>
          {projectCategories.length > 1 && (
            <div className={`filters ${filters.className}`} ref={filters.ref} style={filters.style} role="group" aria-label="Filtrar projetos por categoria">
              <button
                className={`filter-btn ${filter === "all" ? "is-active" : ""}`}
                onClick={() => setFilter("all")}
              >
                Todos
              </button>
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${filter === cat ? "is-active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                span={projects.length === 1 ? "span-12" : index === 0 ? "span-8" : "span-4"}
                hidden={filter !== "all" && project.category !== filter}
                onOpen={setOpenProject}
              />
            ))}
          </div>
        </>
      )}

      <ProjectModal project={openProject} index={openIndex} onClose={() => setOpenProject(null)} />
    </section>
  );
}

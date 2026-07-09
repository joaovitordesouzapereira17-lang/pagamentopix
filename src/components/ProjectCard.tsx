import { useState } from "react";
import type { Project } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import { withBase } from "../utils/paths";

interface ProjectCardProps {
  project: Project;
  index: number;
  reverse: boolean;
  hidden: boolean;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, reverse, hidden, onOpen }: ProjectCardProps) {
  const reveal = useReveal<HTMLDivElement>(0);
  const [imgErrored, setImgErrored] = useState(false);
  const cover = project.images[0];

  return (
    <article
      className={`project-spread reveal ${reveal.className} ${reverse ? "is-reverse" : ""} ${hidden ? "is-hidden" : ""}`}
      ref={reveal.ref}
      style={reveal.style}
    >
      <div className="project-visual-col">
        <button className="project-visual" onClick={() => onOpen(project)} data-cursor-label="Ver projeto">
          <span className="project-number mono">{String(index + 1).padStart(2, "0")}</span>
          {cover && !imgErrored ? (
            <img src={withBase(cover)} alt={project.title} onError={() => setImgErrored(true)} />
          ) : (
            <div className="project-visual-fallback">
              <span className="project-visual-fallback-inner">{project.category}</span>
            </div>
          )}
        </button>
      </div>

      <div className="project-meta-col">
        <p className="project-meta-top mono">{project.category} — {project.year}</p>
        <h3 className="project-title-serif">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        {project.technologies.length > 0 && <p className="project-tech">{project.technologies.join(" · ")}</p>}
        <button className="project-open-link underline-link" onClick={() => onOpen(project)}>
          Ver case completo
        </button>
      </div>
    </article>
  );
}

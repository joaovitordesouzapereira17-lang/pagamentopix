import { useState } from "react";
import type { Project } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import { withBase } from "../utils/paths";

const THUMB_CLASSES = ["thumb-1", "thumb-2", "thumb-3", "thumb-4", "thumb-5", "thumb-6"];

interface ProjectCardProps {
  project: Project;
  index: number;
  span: "span-8" | "span-4" | "span-12";
  hidden: boolean;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, span, hidden, onOpen }: ProjectCardProps) {
  const reveal = useReveal<HTMLButtonElement>(0);
  const [imgErrored, setImgErrored] = useState(false);
  const thumbClass = THUMB_CLASSES[index % THUMB_CLASSES.length];
  const cover = project.images[0];

  return (
    <button
      className={`project-card ${reveal.className} ${span} ${hidden ? "is-hidden" : ""}`}
      ref={reveal.ref}
      style={reveal.style}
      onClick={() => onOpen(project)}
    >
      <span className="project-index mono">{String(index + 1).padStart(2, "0")}</span>
      <div className={`project-thumb ${!cover || imgErrored ? thumbClass : ""}`}>
        {cover && !imgErrored ? (
          <img
            className="project-thumb-img"
            src={withBase(cover)}
            alt={project.title}
            onError={() => setImgErrored(true)}
          />
        ) : null}
        <span className="project-tag-float mono">{project.category.toUpperCase()}</span>
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <span className="project-cta mono">ABRIR DETALHES →</span>
      </div>
    </button>
  );
}

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/projects";
import { withBase } from "../utils/paths";

interface ProjectModalProps {
  project: Project | null;
  index: number;
  onClose: () => void;
}

export function ProjectModal({ project, index, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!project) return;
    lastFocused.current = document.activeElement;
    document.body.classList.add("modal-open");
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKeyDown);
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const isRemoteVideo = project.video?.startsWith("http");

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <button className="modal-close" ref={closeRef} aria-label="Fechar detalhes do projeto" onClick={onClose}>
          ✕
        </button>
        <span className="modal-index mono">{String(index + 1).padStart(2, "0")}</span>

        {project.images[0] ? (
          <img className="modal-thumb modal-thumb-img" src={withBase(project.images[0])} alt={project.title} />
        ) : (
          <div className="modal-thumb modal-thumb-fallback">
            <span>{project.category}</span>
          </div>
        )}

        <div className="modal-body">
          <p className="modal-category mono">{project.category.toUpperCase()}</p>
          <h3 id="modal-title">{project.title}</h3>
          <p>{project.description}</p>

          {project.video && (
            <div className="modal-video">
              {isRemoteVideo ? (
                <iframe
                  src={project.video}
                  title={`Vídeo de apresentação — ${project.title}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls src={withBase(project.video)} />
              )}
            </div>
          )}

          <dl className="modal-meta">
            <div>
              <dt className="mono">ANO</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt className="mono">CLIENTE</dt>
              <dd>{project.client || "—"}</dd>
            </div>
            <div>
              <dt className="mono">TECNOLOGIAS</dt>
              <dd>{project.technologies.join(", ") || "—"}</dd>
            </div>
          </dl>

          {(project.link || project.github) && (
            <div className="modal-links">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  Ver projeto
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                  Código no GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

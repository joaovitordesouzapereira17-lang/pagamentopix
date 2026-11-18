import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { EditHint } from "./EditHint";
import { withBase } from "../utils/paths";

const SECTIONS: { key: "briefing" | "concept" | "process" | "result"; label: string; hint: string }[] = [
  { key: "briefing", label: "Briefing", hint: "Escreva o briefing deste projeto (campo briefing)" },
  { key: "concept", label: "Conceito criativo", hint: "Escreva o conceito criativo (campo concept)" },
  { key: "process", label: "Processo de desenvolvimento", hint: "Escreva o processo de desenvolvimento (campo process)" },
  { key: "result", label: "Resultado", hint: "Escreva o resultado (campo result)" },
];

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main id="conteudo" className="project-detail">
        <div className="project-detail-head">
          <Link to="/#projetos" className="underline-link project-detail-back">← Voltar aos projetos</Link>
          <h1 className="project-detail-title">Projeto não encontrado.</h1>
        </div>
      </main>
    );
  }

  const isRemoteVideo = project.video?.startsWith("http");
  const gallery = project.images.slice(1);
  const hintFile = `src/data/projects/${project.slug}.ts`;

  return (
    <main id="conteudo" className="project-detail">
      <div className="project-detail-head">
        <Link to="/#projetos" className="underline-link project-detail-back">← Voltar aos projetos</Link>
        <p className="mono project-detail-category">{project.category} — {project.year}</p>
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-desc">{project.description}</p>
      </div>

      <div className="project-detail-cover">
        {project.images[0] ? (
          <img src={withBase(project.images[0])} alt={project.title} />
        ) : (
          <div className="project-detail-cover-fallback">{project.category}</div>
        )}
      </div>

      {project.video && (
        <div className="project-detail-video">
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

      <div className="project-detail-body">
        <div className="project-detail-sections">
          {SECTIONS.map((s) => (
            <div className="project-detail-section" key={s.key}>
              <p className="project-detail-section-title mono">{s.label}</p>
              {project[s.key] ? <p>{project[s.key]}</p> : <EditHint file={hintFile}>{s.hint}</EditHint>}
            </div>
          ))}
        </div>

        <div className="project-detail-rule" aria-hidden="true" />

        <dl className="project-detail-meta about-facts">
          <div className="fact-row">
            <dt className="mono">Ano</dt>
            <dd>{project.year}</dd>
          </div>
          <div className="fact-row">
            <dt className="mono">Cliente</dt>
            <dd>{project.client || "—"}</dd>
          </div>
          <div className="fact-row">
            <dt className="mono">Tecnologias</dt>
            <dd>{project.technologies.join(", ") || "—"}</dd>
          </div>

          {(project.link || project.github) && (
            <div className="project-detail-links">
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
        </dl>
      </div>

      {gallery.length > 0 && (
        <div className="project-detail-gallery">
          {gallery.map((img) => (
            <img key={img} src={withBase(img)} alt={project.title} />
          ))}
        </div>
      )}
    </main>
  );
}

import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { useReveal } from "../hooks/useReveal";
import { withBase } from "../utils/paths";
import { EditHint } from "./EditHint";
import { ProfilePhoto } from "./ProfilePhoto";

export function About() {
  const label = useReveal<HTMLDivElement>(0);
  const visual = useReveal<HTMLDivElement>(0);
  const content = useReveal<HTMLDivElement>(80);

  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const quickFacts: { label: string; value?: string } [] = [
    { label: "Idade", value: profile.age ? `${profile.age} anos` : undefined },
    { label: "Cidade", value: profile.city || undefined },
    { label: "Formação", value: profile.education || undefined },
  ];

  return (
    <section className="section about" id="sobre">
      <div className={`spread-label mono ${label.className}`} ref={label.ref} style={label.style}>
        <span>SOBRE — SPREAD 01</span>
        <span>ROLAR ↓</span>
      </div>

      <div className="about-grid">
        <div className={visual.className} ref={visual.ref} style={visual.style}>
          <div className="about-visual">
            <ProfilePhoto
              src={profile.photo}
              alt={profile.fullName}
              initials={initials}
              hintFile="public/images/profile/"
              className="about-frame"
            />
          </div>
        </div>

        <div className={content.className} ref={content.ref} style={content.style}>
          <div className="about-content">
            {profile.bio ? (
              <p className="about-text about-text-lead">{profile.bio}</p>
            ) : (
              <EditHint file="src/data/profile.ts">Conte sua trajetória (campo bio)</EditHint>
            )}

            <dl className="quick-facts">
              {quickFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="mono">{fact.label.toUpperCase()}</dt>
                  <dd>{fact.value ?? <EditHint file="src/data/profile.ts">Preencha</EditHint>}</dd>
                </div>
              ))}
            </dl>

            <div className="about-lists">
              <div>
                <p className="about-list-title mono">ÁREAS DE ATUAÇÃO</p>
                {profile.focusAreas.length > 0 ? (
                  <ul className="scribble-list">
                    {profile.focusAreas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                ) : (
                  <EditHint file="src/data/profile.ts">Liste suas áreas de atuação (campo focusAreas)</EditHint>
                )}
              </div>

              <div>
                <p className="about-list-title mono">EXPERIÊNCIA</p>
                {experience.length > 0 ? (
                  <ul className="experience-list">
                    {experience.map((item) => (
                      <li key={`${item.company}-${item.period}`}>
                        <p className="experience-role">{item.role} <span className="experience-company">— {item.company}</span></p>
                        <p className="experience-period mono">{item.period}{item.location ? ` · ${item.location}` : ""}</p>
                        {item.description && <p className="experience-description">{item.description}</p>}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="experience-tech">
                            {item.technologies.map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EditHint file="src/data/experience.ts">Adicione suas experiências profissionais</EditHint>
                )}
              </div>
            </div>

            {profile.resumeUrl && (
              <a href={withBase(profile.resumeUrl)} className="btn btn-outline" download>
                Baixar currículo
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

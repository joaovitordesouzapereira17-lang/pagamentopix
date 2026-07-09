import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { useReveal } from "../hooks/useReveal";
import { withBase } from "../utils/paths";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";

function splitLede(bio: string): [string, string] {
  const match = bio.match(/^(.+?[.!?])(\s+(.*))?$/s);
  if (!match) return [bio, ""];
  return [match[1], match[3] ?? ""];
}

export function About() {
  const kicker = useReveal<HTMLParagraphElement>(0);
  const text = useReveal<HTMLDivElement>(0);
  const facts = useReveal<HTMLDListElement>(80);

  const [lede, rest] = profile.bio ? splitLede(profile.bio) : ["", ""];

  const factRows: { label: string; value?: string }[] = [
    { label: "Idade", value: profile.age ? `${profile.age} anos` : undefined },
    { label: "Cidade", value: profile.city || undefined },
    { label: "Formação", value: profile.education || undefined },
    { label: "Foco", value: profile.focusAreas.length > 0 ? profile.focusAreas.join(" · ") : undefined },
  ];

  return (
    <section className="section" id="sobre">
      <p className={`section-kicker mono ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
        <GraphicMark symbol="circle" /> SOBRE — 01
      </p>

      <div className="about-grid">
        <div className={text.className} ref={text.ref} style={text.style}>
          {profile.bio ? (
            <>
              <p className="lede">{lede}</p>
              {rest && <p className="about-body">{rest}</p>}
            </>
          ) : (
            <EditHint file="src/data/profile.ts">Conte sua trajetória (campo bio)</EditHint>
          )}

          {experience.length > 0 ? (
            <div className="experience-editorial">
              {experience.map((item) => (
                <div className="experience-row" key={`${item.company}-${item.period}`}>
                  <div>
                    <p className="experience-role">
                      {item.role} <span className="experience-company">— {item.company}</span>
                    </p>
                  </div>
                  <p className="experience-period mono">
                    {item.period}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  {(item.description || (item.technologies && item.technologies.length > 0)) && (
                    <div className="experience-details">
                      {item.description && <p className="experience-description">{item.description}</p>}
                      {item.technologies && item.technologies.length > 0 && (
                        <p className="experience-tech">{item.technologies.join(" · ")}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="experience-editorial">
              <EditHint file="src/data/experience.ts">Adicione suas experiências profissionais</EditHint>
            </div>
          )}

          {profile.resumeUrl && (
            <a href={withBase(profile.resumeUrl)} className="btn btn-line" download>
              Baixar currículo
            </a>
          )}
        </div>

        <div className="about-rule" aria-hidden="true" />

        <dl className={`about-facts ${facts.className}`} ref={facts.ref} style={facts.style}>
          {factRows.map((fact) => (
            <div className="fact-row" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value ?? <EditHint file="src/data/profile.ts">Preencha</EditHint>}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

import { skills } from "../data/skills";
import { useReveal } from "../hooks/useReveal";
import { EditHint } from "./EditHint";

const ROTATIONS = ["rot-0", "rot-1", "rot-2", "rot-3"];
const SIZES = ["size-md", "size-lg", "size-sm"];

export function Skills() {
  const label = useReveal<HTMLDivElement>(0);
  const heading = useReveal<HTMLDivElement>(0);

  return (
    <section className="section" id="skills">
      <div className={`spread-label mono ${label.className}`} ref={label.ref} style={label.style}>
        <span>SKILLS — SPREAD 03</span>
        <span>{skills.length} {skills.length === 1 ? "FRENTE" : "FRENTES"}</span>
      </div>

      <div className={`section-heading ${heading.className}`} ref={heading.ref} style={heading.style}>
        <h2 className="section-title">Caixa de<br />ferramentas.</h2>
        <p className="section-subtitle">Habilidades por área — sem barra de progresso, só o que eu realmente entrego.</p>
      </div>

      {skills.length > 0 ? (
        <div className="skills-groups">
          {skills.map((group) => (
            <SkillGroupBlock key={group.category} category={group.category} items={group.items} />
          ))}
        </div>
      ) : (
        <EditHint file="src/data/skills.ts">Adicione seus grupos de habilidades</EditHint>
      )}
    </section>
  );
}

function SkillGroupBlock({ category, items }: { category: string; items: string[] }) {
  const reveal = useReveal<HTMLDivElement>(0);
  return (
    <div className={`skill-group ${reveal.className}`} ref={reveal.ref} style={reveal.style}>
      <p className="skill-group-title mono">{category.toUpperCase()}</p>
      <div className="tag-cloud">
        {items.map((item, i) => (
          <span key={item} className={`tag-chip ${SIZES[i % SIZES.length]} ${ROTATIONS[i % ROTATIONS.length]}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

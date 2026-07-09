import { skills } from "../data/skills";
import { useReveal } from "../hooks/useReveal";
import { EditHint } from "./EditHint";

export function Skills() {
  const kicker = useReveal<HTMLParagraphElement>(0);
  const head = useReveal<HTMLDivElement>(0);

  return (
    <section className="section" id="skills">
      <p className={`section-kicker mono ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
        SKILLS — 03
      </p>

      <div className={`section-head ${head.className}`} ref={head.ref} style={head.style}>
        <h2 className="section-title-serif">Caixa de ferramentas</h2>
        <p className="section-desc">Habilidades por área, sem barra de progresso — só o que eu realmente entrego.</p>
      </div>

      {skills.length > 0 ? (
        <div className="skills-index">
          {skills.map((group, i) => (
            <SkillBlock key={group.category} index={i} category={group.category} items={group.items} />
          ))}
        </div>
      ) : (
        <EditHint file="src/data/skills.ts">Adicione seus grupos de habilidades</EditHint>
      )}
    </section>
  );
}

function SkillBlock({ index, category, items }: { index: number; category: string; items: string[] }) {
  const reveal = useReveal<HTMLDivElement>(0);
  return (
    <div className={`skill-block ${reveal.className}`} ref={reveal.ref} style={reveal.style}>
      <span className="skill-block-number mono">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="skill-block-title">{category}</h3>
      <p className="skill-block-items">{items.join("  ·  ")}</p>
    </div>
  );
}

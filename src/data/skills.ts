/**
 * Habilidades, agrupadas por categoria. Adicione, remova ou renomeie
 * grupos e itens livremente — a seção Skills renderiza isso automaticamente.
 */

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  // { category: "Frontend", items: ["React", "TypeScript", "CSS"] },
  // { category: "Backend", items: ["Node.js", "PostgreSQL"] },
  // { category: "Ferramentas", items: ["Git", "Figma", "Docker"] },
];

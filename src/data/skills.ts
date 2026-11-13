/**
 * Habilidades, agrupadas por categoria. Adicione, remova ou renomeie
 * grupos e itens livremente — a seção Skills renderiza isso automaticamente.
 */

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { category: "Design", items: ["Adobe Photoshop", "Adobe Illustrator", "Canva"] },
  {
    category: "Marketing",
    items: [
      "Branding",
      "Social Media",
      "Planejamento de Conteúdo",
      "Identidade Visual",
      "Copywriting",
      "Marketing Digital",
      "Estratégia de Comunicação",
    ],
  },
];

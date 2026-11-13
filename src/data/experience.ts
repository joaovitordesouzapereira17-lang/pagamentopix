/**
 * Experiências profissionais, exibidas na seção "Sobre".
 * Adicione um objeto por experiência, do mais recente para o mais antigo.
 */

export interface ExperienceItem {
  company: string;
  role: string;

  /** Ex: "2023 — atual" ou "Jan 2021 — Mar 2023" */
  period: string;

  location?: string;
  description?: string;
  technologies?: string[];
}

export const experience: ExperienceItem[] = [
  // {
  //   company: "Nome da Empresa",
  //   role: "Seu cargo",
  //   period: "2023 — atual",
  //   location: "São Paulo, SP (remoto)",
  //   description: "O que você fez/entregou nessa experiência.",
  //   technologies: ["React", "TypeScript", "Node.js"],
  // },
];

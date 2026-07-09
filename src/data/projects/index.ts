import type { Project } from "./types";

export type { Project } from "./types";

/**
 * Agrega automaticamente todo arquivo .ts desta pasta que exportar `project`.
 * Para adicionar um projeto novo: crie um arquivo aqui (ex: meu-app.ts) com
 *   export const project: Project = { ... }
 * Nenhum outro arquivo precisa ser editado — este índice encontra sozinho.
 */
const modules = import.meta.glob<{ project: Project }>("./*.ts", { eager: true });

export const projects: Project[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith("/index.ts") && !path.endsWith("/types.ts"))
  .map(([, mod]) => mod.project)
  .filter(Boolean)
  .sort((a, b) => b.year - a.year);

export const projectCategories: string[] = Array.from(new Set(projects.map((p) => p.category))).sort();

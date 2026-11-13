export interface Project {
  /** Identificador único e amigável para URL, ex: "app-financeiro" */
  slug: string;

  title: string;
  description: string;

  /** Categoria usada nos filtros da seção Projetos, ex: "Web", "Mobile", "Design" */
  category: string;

  technologies: string[];

  /** Caminhos dentro de /public, ex: ["images/projects/app-financeiro/capa.jpg"] */
  images: string[];

  /** Caminho do vídeo dentro de /public ou URL de embed (YouTube/Vimeo). Opcional. */
  video?: string;

  /** Link do projeto no ar. Opcional. */
  link?: string;

  /** Link do repositório no GitHub. Opcional. */
  github?: string;

  year: number;

  /** Nome do cliente/empresa, quando aplicável. Opcional. */
  client?: string;
}

# Como adicionar um projeto

Crie um novo arquivo `.ts` nesta pasta (ex: `app-financeiro.ts`) com este formato:

```ts
import type { Project } from "./types";

export const project: Project = {
  slug: "app-financeiro",
  title: "Nome do projeto",
  description: "Descrição curta do que o projeto faz e qual problema resolve.",
  category: "Web", // usado no filtro da seção Projetos — pode criar categorias novas livremente
  technologies: ["React", "TypeScript", "Node.js"],
  images: [
    "images/projects/app-financeiro/capa.jpg",
    "images/projects/app-financeiro/tela-2.jpg",
  ],
  video: "", // opcional: caminho em /public/videos/projects/... ou uma URL de embed
  link: "https://seu-projeto.com", // opcional
  github: "https://github.com/seu-usuario/app-financeiro", // opcional
  year: 2025,
  client: "", // opcional
};
```

Não precisa editar mais nada — `src/data/projects/index.ts` encontra e lista o
arquivo automaticamente, ordenado do mais recente para o mais antigo. Para
remover um projeto, basta apagar o arquivo correspondente.

Coloque as imagens e vídeos do projeto em:

```
public/images/projects/<slug>/
public/videos/projects/<slug>/
```

/**
 * Videoteca: pôsteres de filmes que marcaram você, estilo parede de locadora.
 * Coloque o pôster em /public/images/videoteca/ e acrescente um objeto aqui.
 * Sem itens, a página mostra só o aviso discreto apontando pra este arquivo.
 */

/** Fileira inicial do filme na tier list. Sem essa marcação, ele começa na fileira "Não avaliados". */
export type Tier = "S" | "A" | "B" | "C" | "D";

export interface VideotecaItem {
  /** Caminho do pôster dentro de /public, ex: "images/videoteca/filme.jpg" */
  image: string;
  title: string;
  year: number;
  genre: string;
  director?: string;
  synopsis?: string;
  /** Comentário/nota pessoal sobre o filme. Opcional. */
  note?: string;
  /** Posição inicial na tier list (S = favorito absoluto, D = fraco). Opcional. */
  tier?: Tier;
}

export const videoteca: VideotecaItem[] = [
  // Exemplo (comentado) do formato esperado:
  // {
  //   image: "images/videoteca/exemplo.jpg",
  //   title: "Nome do filme",
  //   year: 2000,
  //   genre: "Drama",
  //   director: "Nome do diretor",
  //   synopsis: "Do que o filme trata, em uma ou duas frases.",
  //   note: "Por que esse filme importa pra você.",
  //   tier: "S",
  // },
];

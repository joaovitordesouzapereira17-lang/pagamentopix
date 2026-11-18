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
  { image: "posters/vantagens-de-ser-invisivel.jpg", title: "As Vantagens de Ser Invisível", year: 2012, genre: "Drama", director: "Stephen Chbosky" },
  { image: "posters/sociedade-dos-poetas-mortos.jpg", title: "Sociedade dos Poetas Mortos", year: 1989, genre: "Drama", director: "Peter Weir" },
  { image: "posters/scooby-doo.jpg", title: "Scooby-Doo", year: 2002, genre: "Comédia", director: "Raja Gosnell" },
  { image: "posters/truman-show.jpg", title: "O Show de Truman", year: 1998, genre: "Drama", director: "Peter Weir" },
  { image: "posters/homem-do-futuro.jpg", title: "O Homem do Futuro", year: 2011, genre: "Comédia", director: "Cláudio Torres" },
  { image: "posters/shrek.jpg", title: "Shrek", year: 2001, genre: "Animação", director: "Andrew Adamson, Vicky Jenson" },
  { image: "posters/toy-story.jpg", title: "Toy Story", year: 1995, genre: "Animação", director: "John Lasseter" },
  { image: "posters/la-la-land.jpg", title: "La La Land: Cantando Estações", year: 2016, genre: "Musical", director: "Damien Chazelle" },
  { image: "posters/avengers.jpg", title: "Os Vingadores", year: 2012, genre: "Ação", director: "Joss Whedon" },
  { image: "posters/vaca-tussa.jpg", title: "Nem que a Vaca Tussa", year: 2004, genre: "Animação", director: "Will Finn, John Sanford" },
  { image: "posters/eternity.jpg", title: "Eternity", year: 2025, genre: "Romance", director: "David Freyne" },
  { image: "posters/rei-leao.jpg", title: "O Rei Leão", year: 1994, genre: "Animação", director: "Roger Allers, Rob Minkoff" },
];

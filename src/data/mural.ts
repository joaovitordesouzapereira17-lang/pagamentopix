/**
 * Mural de referências: cinema, música, texturas e imagens que inspiram o
 * trabalho. Cada item aponta pra uma imagem em /public/images/mural/ — para
 * adicionar uma referência, coloque o arquivo lá e acrescente um objeto aqui.
 * Sem itens, a página mostra um aviso discreto apontando pra este arquivo.
 */

export interface MuralItem {
  /** Caminho da imagem dentro de /public, ex: "images/mural/still-cinema.jpg" */
  image: string;
  /** Categoria só pra estilizar o rótulo do item. */
  kind: "still" | "album" | "poster" | "textura" | "foto";
  /** De onde vem essa referência — filme, álbum, artista, lugar. */
  origin: string;
  /** Nota pessoal curta sobre por que essa referência importa. Opcional. */
  note?: string;
}

export const mural: MuralItem[] = [
  // Exemplo (comentado) do formato esperado:
  // { image: "images/mural/exemplo.jpg", kind: "still", origin: "Nome do filme", note: "Por que essa cena marcou." },
];

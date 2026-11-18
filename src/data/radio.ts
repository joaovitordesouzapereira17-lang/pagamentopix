/**
 * Estações do Rádio: cada uma é uma playlist/faixa incorporada (Spotify ou
 * YouTube) com uma frequência própria no dial e uma nota pessoal. Para
 * adicionar uma estação, pegue o link de "Incorporar" da playlist/faixa no
 * Spotify (ou um embed do YouTube) e acrescente um objeto aqui.
 *
 * Sem estações cadastradas, o dial aparece mudo (só estática) — nunca com
 * estações inventadas.
 */

export interface RadioStation {
  /** Posição no dial, em "MHz" — só estética, escolha um número entre 88 e 108. */
  frequency: number;
  /** Nome da estação/playlist. */
  name: string;
  /** Nota pessoal curta sobre por que essa seleção importa. Opcional. */
  note?: string;
  /** URL de embed do Spotify ou YouTube, ex: "https://open.spotify.com/embed/playlist/..." */
  embedUrl: string;
}

export const radioStations: RadioStation[] = [
  // Exemplo (comentado) do formato esperado:
  // {
  //   frequency: 91.5,
  //   name: "Trilha pra trabalhar",
  //   note: "O que eu ouço quando preciso de foco.",
  //   embedUrl: "https://open.spotify.com/embed/playlist/SEU_ID_AQUI",
  // },
];

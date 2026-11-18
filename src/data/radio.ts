/**
 * Estações do Rádio: cada uma é um stream de rádio pela internet de verdade
 * (via SomaFM), com uma frequência própria no dial e uma nota pessoal. Pra
 * trocar uma estação, troque o campo `streamUrl` por outro stream HTTPS
 * estável (ex: outro canal da SomaFM — veja https://somafm.com/listen/).
 *
 * Sem estações cadastradas, o dial aparece mudo (só estática) — nunca com
 * estações inventadas.
 */

export interface RadioStation {
  /** Posição no dial, em "MHz" — só estética, escolha um número entre 88 e 108. */
  frequency: number;
  /** Nome da estação. */
  name: string;
  /** Nota pessoal curta sobre por que essa seleção importa. Opcional. */
  note?: string;
  /** URL HTTPS do stream de áudio ao vivo (ex: SomaFM). */
  streamUrl: string;
}

export const radioStations: RadioStation[] = [
  {
    frequency: 89.5,
    name: "Lo-Fi",
    note: "Pra focar sem distrair.",
    streamUrl: "https://ice1.somafm.com/fluid-128-mp3",
  },
  {
    frequency: 98.0,
    name: "Pop 2000",
    note: "Synthpop/indie pop com cara de início dos 2000.",
    streamUrl: "https://ice1.somafm.com/poptron-128-mp3",
  },
  {
    frequency: 102.9,
    name: "Indie Rock",
    note: "Guitarra e melodia, sem academicismo.",
    streamUrl: "https://ice1.somafm.com/indiepop-128-mp3",
  },
  {
    frequency: 106.7,
    name: "Trilhas",
    note: "Ambiente/cinemático, de fundo pra qualquer coisa.",
    streamUrl: "https://ice1.somafm.com/deepspaceone-128-mp3",
  },
];

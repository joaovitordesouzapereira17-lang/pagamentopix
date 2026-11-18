/**
 * Estações do Rádio: cada uma é um stream de rádio pela internet de verdade,
 * com uma frequência própria no dial e uma nota pessoal. Três formatos de
 * fonte são suportados:
 *
 * - `{ kind: "aac", streamUrl }` — stream de áudio direto (AAC/MP3), toca
 *   nativamente pela tag <audio>.
 * - `{ kind: "hls", streamUrl }` — stream HLS (.m3u8), tocado via hls.js.
 * - `{ kind: "youtube", videoId }` — vídeo/livestream do YouTube, tocado
 *   por um player oculto (YouTube IFrame API).
 *
 * Sem estações cadastradas, o dial aparece mudo (só estática) — nunca com
 * estações inventadas.
 */

export type RadioSource =
  | { kind: "aac"; streamUrl: string }
  | { kind: "hls"; streamUrl: string }
  | { kind: "youtube"; videoId: string };

export interface RadioStation {
  /** Posição no dial, em "MHz" — só estética, escolha um número entre 88 e 108. */
  frequency: number;
  /** Nome da estação. */
  name: string;
  /** Nota pessoal curta sobre por que essa seleção importa. Opcional. */
  note?: string;
  source: RadioSource;
}

export const radioStations: RadioStation[] = [
  {
    frequency: 89.5,
    name: "Lofi Girl",
    note: "Pra focar sem distrair — a live de lo-fi mais famosa da internet.",
    source: { kind: "youtube", videoId: "jfKfPfyJRdk" },
  },
  {
    frequency: 98.0,
    name: "NovaBrasil FM",
    note: "Rádio pop brasileira de verdade, ao vivo.",
    source: { kind: "aac", streamUrl: "https://20823.live.streamtheworld.com/NOVABRASIL_SPAAC.aac" },
  },
  {
    frequency: 102.9,
    name: "M80 Rock",
    note: "Clássicos do rock, ao vivo.",
    source: { kind: "hls", streamUrl: "https://stream-hls.bauermedia.pt/m80.aac/playlist.m3u8" },
  },
  {
    frequency: 106.7,
    name: "Trilhas",
    note: "Ambiente/cinemático, de fundo pra qualquer coisa.",
    source: { kind: "aac", streamUrl: "https://ice1.somafm.com/deepspaceone-128-mp3" },
  },
];

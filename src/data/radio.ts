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
  /** Descrição curta exibida no console do rádio. */
  description: string;
  /** Cor de identidade da estação (hex) — usada só em detalhes (card, ponto, número). */
  color: string;
  source: RadioSource;
}

export const radioStations: RadioStation[] = [
  {
    frequency: 88.5,
    name: "MPB Clube",
    description: "Pop brasileiro de verdade, ao vivo — clássicos sem pressa.",
    color: "#F04D68",
    source: { kind: "aac", streamUrl: "https://20823.live.streamtheworld.com/NOVABRASIL_SPAAC.aac" },
  },
  {
    frequency: 94.2,
    name: "Pop Station",
    description: "Hits e clássicos que não saem da cabeça, ao vivo.",
    color: "#4568E8",
    source: { kind: "hls", streamUrl: "https://stream-hls.bauermedia.pt/m80.aac/playlist.m3u8" },
  },
  {
    frequency: 98.0,
    name: "Alternativa",
    description: "Sons diferentes — a live de lo-fi mais famosa da internet.",
    color: "#E9A928",
    source: { kind: "youtube", videoId: "jfKfPfyJRdk" },
  },
  {
    frequency: 106.7,
    name: "Trilhas",
    description: "Ambiente/cinemático, de fundo pra qualquer coisa.",
    color: "#77A86A",
    source: { kind: "aac", streamUrl: "https://ice1.somafm.com/deepspaceone-128-mp3" },
  },
];

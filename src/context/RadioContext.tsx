import Hls from "hls.js";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { RadioStation } from "../data/radio";

interface RadioContextValue {
  current: RadioStation | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  tune: (station: RadioStation) => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
}

const RadioContext = createContext<RadioContextValue | null>(null);

/** Tipos mínimos da YouTube IFrame API — só o que este componente usa. */
interface YTPlayer {
  loadVideoById: (id: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  setVolume: (v: number) => void;
}
interface YTPlayerEvent { data: number }
interface YTNamespace {
  Player: new (
    el: string,
    opts: {
      height: string;
      width: string;
      playerVars: Record<string, number>;
      events: { onReady: () => void; onStateChange: (e: YTPlayerEvent) => void };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: YTNamespace;
  }
}

/** Gera um "chiado" curto de estática (0.4s) via Web Audio API — sem nenhum arquivo de áudio. */
function playStaticBurst(ctx: AudioContext) {
  const duration = 0.4;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 1800;
  bandpass.Q.value = 0.6;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  noise.connect(bandpass).connect(gain).connect(ctx.destination);
  noise.start();
  noise.stop(ctx.currentTime + duration);
}

function loadYouTubeApi(): Promise<void> {
  if (window.YT && window.YT.Player) return Promise.resolve();
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
}

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const ytRef = useRef<YTPlayer | null>(null);
  const ytReadyRef = useRef(false);
  const [current, setCurrent] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(0.7);

  useEffect(() => {
    loadYouTubeApi().then(() => {
      ytRef.current = new window.YT!.Player("yt-radio-player", {
        height: "0",
        width: "0",
        playerVars: { autoplay: 0, controls: 0 },
        events: {
          onReady: () => {
            ytReadyRef.current = true;
          },
          onStateChange: (e: YTPlayerEvent) => {
            if (e.data === window.YT!.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT!.PlayerState.PAUSED || e.data === window.YT!.PlayerState.ENDED) setIsPlaying(false);
          },
        },
      });
    });
  }, []);

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctor();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }

  function stopAll() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    hlsRef.current?.destroy();
    hlsRef.current = null;
    if (ytReadyRef.current) ytRef.current?.stopVideo();
  }

  const tune = useCallback((station: RadioStation) => {
    try {
      playStaticBurst(getAudioCtx());
    } catch {
      /* Web Audio indisponível — segue sem o efeito de estática */
    }
    setIsLoading(true);
    setCurrent(station);

    window.setTimeout(() => {
      stopAll();
      const { source } = station;

      if (source.kind === "youtube") {
        if (!ytReadyRef.current) {
          setIsLoading(false);
          return;
        }
        ytRef.current?.loadVideoById(source.videoId);
        ytRef.current?.setVolume(volume * 100);
        ytRef.current?.playVideo();
        setIsLoading(false);
        return;
      }

      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = volume;

      if (source.kind === "hls") {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hlsRef.current = hls;
          hls.loadSource(source.streamUrl);
          hls.attachMedia(audio);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
            setIsLoading(false);
          });
          hls.on(Hls.Events.ERROR, (_evt, data) => {
            if (data.fatal) setIsLoading(false);
          });
        } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
          audio.src = source.streamUrl;
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
        return;
      }

      audio.src = source.streamUrl;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }, 180);
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!current) return;
    if (current.source.kind === "youtube") {
      if (!ytReadyRef.current) return;
      if (isPlaying) ytRef.current?.pauseVideo();
      else ytRef.current?.playVideo();
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [current, isPlaying]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (ytReadyRef.current) ytRef.current?.setVolume(v * 100);
  }, []);

  return (
    <RadioContext.Provider value={{ current, isPlaying, isLoading, volume, tune, togglePlay, setVolume }}>
      {children}
      <audio
        ref={audioRef}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => { setIsPlaying(false); setIsLoading(false); }}
      />
      <div id="yt-radio-player" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} />
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("useRadio precisa estar dentro de <RadioProvider>");
  return ctx;
}

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
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

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [current, setCurrent] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(0.7);

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctor();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }

  const tune = useCallback((station: RadioStation) => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      playStaticBurst(getAudioCtx());
    } catch {
      /* Web Audio indisponível — segue sem o efeito de estática */
    }
    setIsLoading(true);
    setCurrent(station);
    window.setTimeout(() => {
      audio.src = station.streamUrl;
      audio.volume = volume;
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
    const audio = audioRef.current;
    if (!audio || !current) return;
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
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("useRadio precisa estar dentro de <RadioProvider>");
  return ctx;
}

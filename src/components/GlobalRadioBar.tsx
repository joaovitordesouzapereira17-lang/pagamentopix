import { useRadio } from "../context/RadioContext";

export function GlobalRadioBar() {
  const { current, isPlaying, togglePlay } = useRadio();
  if (!current) return null;

  return (
    <div className="global-radio-bar" role="status">
      <span className="global-radio-dot" aria-hidden="true" />
      <span className="mono global-radio-freq">{current.frequency.toFixed(1)} FM</span>
      <span className="global-radio-name">{current.name}</span>
      <button type="button" className="global-radio-toggle" onClick={togglePlay} aria-label={isPlaying ? "Pausar rádio" : "Retomar rádio"}>
        {isPlaying ? "⏸" : "▶"}
      </button>
    </div>
  );
}

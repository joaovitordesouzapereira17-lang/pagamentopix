import { useState } from "react";
import { withBase } from "../utils/paths";
import { EditHint } from "./EditHint";

interface ProfilePhotoProps {
  src: string;
  alt: string;
  initials: string;
  hintFile: string;
  className?: string;
  /** Quando true, não renderiza o EditHint interno — use onErrorChange para exibi-lo em outro lugar. */
  hideHint?: boolean;
  onErrorChange?: (errored: boolean) => void;
}

/** Mostra a foto de perfil, ou um bloco com iniciais + aviso de edição enquanto o arquivo não existe. */
export function ProfilePhoto({
  src,
  alt,
  initials,
  hintFile,
  className = "",
  hideHint = false,
  onErrorChange,
}: ProfilePhotoProps) {
  const [errored, setErrored] = useState(false);

  function handleError() {
    setErrored(true);
    onErrorChange?.(true);
  }

  return (
    <div className={`photo-frame ${className}`}>
      <div className="photo-frame-inner">
        {!errored ? (
          <img src={withBase(src)} alt={alt} onError={handleError} />
        ) : (
          <span className="photo-frame-fallback" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
      {errored && !hideHint && <EditHint file={hintFile}>Adicione sua foto</EditHint>}
    </div>
  );
}

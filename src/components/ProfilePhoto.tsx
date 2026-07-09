import { useState } from "react";
import { withBase } from "../utils/paths";
import { EditHint } from "./EditHint";

interface ProfilePhotoProps {
  src: string;
  alt: string;
  initials: string;
  hintFile: string;
  className?: string;
}

/** Mostra a foto de perfil, ou um bloco com iniciais + aviso de edição enquanto o arquivo não existe. */
export function ProfilePhoto({ src, alt, initials, hintFile, className = "" }: ProfilePhotoProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={`photo-frame ${className}`}>
      <div className="photo-frame-inner">
        {!errored ? (
          <img src={withBase(src)} alt={alt} onError={() => setErrored(true)} />
        ) : (
          <span className="photo-frame-fallback mono" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
      {errored && <EditHint file={hintFile}>Adicione sua foto</EditHint>}
    </div>
  );
}

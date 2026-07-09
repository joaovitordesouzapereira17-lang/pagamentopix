interface EditHintProps {
  /** Texto curto explicando o que falta preencher. */
  children: string;
  /** Caminho do arquivo onde o conteúdo deve ser editado. */
  file: string;
}

/**
 * Aviso visual (não é conteúdo do portfólio) mostrado quando um campo de
 * dados ainda está vazio, apontando onde editar. Nunca exibe texto fictício.
 */
export function EditHint({ children, file }: EditHintProps) {
  return (
    <p className="edit-hint mono">
      ✎ {children} — edite em <code>{file}</code>
    </p>
  );
}

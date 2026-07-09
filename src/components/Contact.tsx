import { FormEvent, useState } from "react";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import { EditHint } from "./EditHint";
import { GraphicMark } from "./GraphicMark";

export function Contact() {
  const kicker = useReveal<HTMLParagraphElement>(0);
  const statement = useReveal<HTMLHeadingElement>(0);
  const info = useReveal<HTMLDivElement>(80);
  const form = useReveal<HTMLFormElement>(80);

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [note, setNote] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) {
      setNote("Preencha todos os campos antes de enviar.");
      return;
    }
    if (!profile.email) {
      setNote("Adicione seu e-mail em src/data/profile.ts para receber mensagens.");
      return;
    }

    const subject = encodeURIComponent(`Contato via portfólio — ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setNote("Abrindo seu aplicativo de e-mail para enviar a mensagem...");
    setValues({ name: "", email: "", message: "" });
  }

  const factRows: { label: string; value?: string; href?: string }[] = [
    { label: "E-mail", value: profile.email || undefined, href: profile.email ? `mailto:${profile.email}` : undefined },
    profile.phone ? { label: "Telefone", value: profile.phone, href: `tel:${profile.phone.replace(/\D/g, "")}` } : { label: "", value: undefined },
    { label: "Cidade", value: profile.city || undefined },
  ].filter((row) => row.label);

  return (
    <section className="section-contact" id="contato">
      <p className={`section-kicker mono light ${kicker.className}`} ref={kicker.ref} style={kicker.style}>
        <GraphicMark symbol="star" /> CONTATO — 04
      </p>

      <h2 className={`contact-statement ${statement.className}`} ref={statement.ref} style={statement.style}>
        Vamos conversar sobre o que vem a seguir.
      </h2>

      <div className="contact-columns">
        <div className={`contact-details-editorial ${info.className}`} ref={info.ref} style={info.style}>
          <dl>
            {factRows.map((row) => (
              <div className="fact-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  {row.value ? (
                    row.href ? <a href={row.href}>{row.value}</a> : row.value
                  ) : (
                    <EditHint file="src/data/profile.ts">{`Preencha o campo ${row.label.toLowerCase()}`}</EditHint>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {profile.socials.length > 0 ? (
            <div className="contact-socials-inline">
              {profile.socials.map((social) => (
                <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              ))}
            </div>
          ) : (
            <EditHint file="src/data/profile.ts">Adicione seus links de redes sociais (campo socials)</EditHint>
          )}
        </div>

        <form className={`contact-form-editorial ${form.className}`} ref={form.ref} style={form.style} onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="name">Nome</label>
            <input
              type="text" id="name" placeholder="Seu nome" required
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">E-mail</label>
            <input
              type="email" id="email" placeholder="voce@email.com" required
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message" rows={4} placeholder="Conte um pouco sobre o seu projeto..." required
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-solid">Enviar mensagem</button>
          <p className="form-note" role="status" aria-live="polite">{note}</p>
        </form>
      </div>
    </section>
  );
}

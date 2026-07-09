import { FormEvent, useState } from "react";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import { EditHint } from "./EditHint";

export function Contact() {
  const label = useReveal<HTMLDivElement>(0);
  const info = useReveal<HTMLDivElement>(0);
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

  return (
    <section className="section section-contact" id="contato">
      <div className="contact-bg" aria-hidden="true" />
      <div className={`spread-label mono light ${label.className}`} ref={label.ref} style={label.style}>
        <span>CONTATO — SPREAD 04</span>
        <span>VAMOS NESSA</span>
      </div>

      <div className="contact-grid">
        <div className={info.className} ref={info.ref} style={info.style}>
          <div className="contact-info">
            <h2 className="section-title section-title-light">
              Vamos criar<br />algo <span className="text-outline-electric">insano</span>?
            </h2>
            <p className="contact-text">
              Projetos novos, colaborações ou uma boa conversa — me chama que eu respondo rápido.
            </p>

            <ul className="contact-details">
              <li>
                <span className="contact-icon">✉</span>
                {profile.email ? (
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                ) : (
                  <EditHint file="src/data/profile.ts">Adicione seu e-mail</EditHint>
                )}
              </li>
              {profile.phone && (
                <li>
                  <span className="contact-icon">☏</span>
                  <a href={`tel:${profile.phone.replace(/\D/g, "")}`}>{profile.phone}</a>
                </li>
              )}
              {profile.city && (
                <li>
                  <span className="contact-icon">◎</span>
                  <span>{profile.city}</span>
                </li>
              )}
            </ul>

            {profile.socials.length > 0 ? (
              <div className="social-links">
                {profile.socials.map((social) => (
                  <a key={social.label} href={social.url} className="social-btn" target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                ))}
              </div>
            ) : (
              <EditHint file="src/data/profile.ts">Adicione seus links de redes sociais (campo socials)</EditHint>
            )}
          </div>
        </div>

        <form className={`contact-form ${form.className}`} ref={form.ref} style={form.style} onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="name" className="mono">NOME</label>
            <input
              type="text" id="name" placeholder="Seu nome" required
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email" className="mono">E-MAIL</label>
            <input
              type="email" id="email" placeholder="voce@email.com" required
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <label htmlFor="message" className="mono">MENSAGEM</label>
            <textarea
              id="message" rows={5} placeholder="Conte um pouco sobre o seu projeto..." required
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Enviar mensagem</button>
          <p className="form-note mono" role="status" aria-live="polite">{note}</p>
        </form>
      </div>
    </section>
  );
}

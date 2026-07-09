/**
 * Dados centrais do portfólio: hero, seção "Sobre" e contato.
 * Edite apenas este arquivo para atualizar essas informações —
 * nenhum componente React precisa ser tocado.
 */

export interface SocialLink {
  /** Nome exibido no botão, ex: "LinkedIn", "GitHub", "Instagram" */
  label: string;
  url: string;
}

export interface Profile {
  fullName: string;

  /** Apelido usado como assinatura no cabeçalho e como etiqueta no Hero. */
  nickname?: string;

  /** Cargo/título curto exibido abaixo do nome no hero. Ex: "Desenvolvedor Full Stack" */
  role: string;

  /** Apresentação profissional breve (1-2 frases) exibida no hero. */
  heroIntro: string;

  /** Caminho da foto dentro de /public, ex: "images/profile/joao-vitor.jpg" */
  photo: string;

  age?: number;
  city?: string;

  /** Ex: "Ciência da Computação — Nome da Instituição" */
  education?: string;

  /** Texto contando sua trajetória, exibido na seção "Sobre". */
  bio: string;

  /** Áreas de atuação/interesse, exibidas como tags na seção "Sobre". */
  focusAreas: string[];

  /** Tecnologias que você utiliza no dia a dia (também alimenta a seção Skills, se quiser reforçar aqui). */
  email: string;
  phone?: string;

  /** Caminho do currículo em PDF dentro de /public, ex: "files/curriculo.pdf" */
  resumeUrl?: string;

  socials: SocialLink[];
}

export const profile: Profile = {
  fullName: "João Vitor de Souza Pereira",
  nickname: "Jão",
  role: "",
  heroIntro: "",
  photo: "images/profile/joao-vitor.jpg",

  age: undefined,
  city: "",
  education: "",
  bio: "",
  focusAreas: [],

  email: "",
  phone: "",
  resumeUrl: "files/curriculo-joao-vitor.pdf",

  socials: [
    // { label: "LinkedIn", url: "https://linkedin.com/in/seu-usuario" },
    // { label: "GitHub", url: "https://github.com/seu-usuario" },
    // { label: "Instagram", url: "https://instagram.com/seu-usuario" },
  ],
};

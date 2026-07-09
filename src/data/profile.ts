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

export interface Philosophy {
  title: string;
  text: string;
}

export interface ChildhoodPhoto {
  /** Caminho da foto dentro de /public, ex: "images/profile/infancia.jpg" */
  image: string;
  quote: string;
  caption: string;
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

  /**
   * Imagem decorativa (colagem, textura) exibida como plano de fundo de todo
   * o Hero — como uma capa/cover, com a foto (circular) sobreposta por cima.
   * Caminho dentro de /public, ex: "images/profile/moldura.jpg". Opcional.
   */
  photoFrame?: string;

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

  /** Declaração de princípio/filosofia de trabalho, exibida na seção "Sobre". */
  philosophy?: Philosophy;

  /** Bloco narrativo com uma foto de infância, exibido na seção "Sobre". */
  childhoodPhoto?: ChildhoodPhoto;
}

export const profile: Profile = {
  fullName: "João Vitor de Souza Pereira",
  nickname: "Jão",
  role: "Publicidade, Design e Estratégia Digital",
  heroIntro:
    "Tenho 22 anos e acredito que toda boa ideia começa com uma boa história. Meu trabalho é transformar criatividade em soluções que conectam marcas, pessoas e experiências.",
  photo: "images/profile/joao-vitor.jpg",
  photoFrame: "images/profile/moldura.jpg",

  age: 22,
  city: "Várzea Paulista, SP",
  education: "Publicidade e Propaganda",
  bio:
    "A criatividade sempre fez parte de quem eu sou. Tenho 22 anos e, desde criança, minha imaginação sempre foi um pouco inquieta. Sempre gostei de criar histórias, imaginar possibilidades e enxergar as coisas por perspectivas diferentes. Aquela criança curiosa continua fazendo parte de quem eu sou hoje — e é justamente ela que inspira a forma como penso e desenvolvo cada projeto.\n\n" +
    "Filmes, músicas e diferentes formas de arte sempre foram minhas maiores fontes de inspiração. Gosto de observar detalhes, entender como uma boa narrativa desperta emoções e como o design pode transformar uma ideia em algo memorável.\n\n" +
    "Hoje curso Publicidade e Propaganda e direciono minha criatividade para áreas como branding, identidade visual, design e marketing digital. Busco desenvolver projetos que unam estratégia, comunicação e estética para criar experiências que façam sentido para as pessoas.",
  focusAreas: ["Branding", "Identidade Visual", "Design", "Marketing Digital"],

  email: "joaovitordesouzapereira17@gmail.com",
  phone: "(11) 97093-4843",
  resumeUrl: "files/curriculo-joao-vitor.pdf",

  socials: [
    { label: "Instagram", url: "https://www.instagram.com/_.joaovitorz" },
  ],

  philosophy: {
    title: "Criatividade com propósito.",
    text:
      "Acredito que design e comunicação vão muito além da aparência. Boas ideias precisam resolver problemas, despertar emoções e criar conexões reais. É isso que busco em cada projeto: unir criatividade, estratégia e intenção para construir algo que tenha significado.",
  },

  childhoodPhoto: {
    image: "images/profile/infancia.jpg",
    quote: "Essa foto representa onde tudo começou.",
    caption:
      "Desde pequeno, a criatividade sempre encontrou espaço na minha vida. Hoje ela continua sendo a principal ferramenta que utilizo para transformar ideias em projetos.",
  },
};

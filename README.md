# Portfólio — João Vitor de Souza Pereira

Portfólio pessoal construído em **React + TypeScript + Vite**. Todo o conteúdo
(nome, bio, experiências, skills, projetos, mídias) fica isolado em `src/data/`
e `public/` — para atualizar o site, edite esses arquivos; os componentes em
`src/components/` não precisam ser tocados.

O projeto não tem nenhum conteúdo fictício. Onde uma informação ainda não foi
preenchida, o site mostra um aviso discreto (`✎ ... — edite em src/data/...`)
apontando exatamente onde escrever — nunca um texto de exemplo fingindo ser real.

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento com hot reload
npm run build    # build de produção em /dist
npm run preview  # serve o build de produção localmente
npm run lint     # checagem de tipos (tsc --noEmit)
```

## Estrutura

```
src/
  data/
    profile.ts        # nome, cargo, foto, bio, idade, cidade, formação, contato, redes sociais
    experience.ts      # lista de experiências profissionais
    skills.ts           # habilidades agrupadas por categoria
    projects/
      types.ts          # formato (interface) de um projeto
      index.ts           # agrega automaticamente os arquivos desta pasta — não editar
      README.md            # como adicionar um projeto novo
      <slug>.ts             # um arquivo por projeto (você cria)
  components/          # UI — consome os dados acima, não contém conteúdo
  hooks/                # scroll reveal, parallax, glitch
  styles/global.css      # paleta, tipografia, layout, responsividade
public/
  images/profile/        # sua foto
  images/projects/<slug>/  # imagens de cada projeto
  videos/projects/<slug>/  # vídeos de apresentação (opcional)
  icons/                    # ícones extras, se precisar
  files/                     # currículo em PDF, etc.
```

## Como editar o conteúdo

### Perfil, hero, "Sobre" e contato — `src/data/profile.ts`

Preencha os campos: `role`, `heroIntro`, `bio`, `age`, `city`, `education`,
`focusAreas`, `email`, `phone`, `socials`. Coloque sua foto em
`public/images/profile/` e aponte o campo `photo` para o arquivo (ex:
`"images/profile/joao-vitor.jpg"`). Enquanto a foto não existir, o site mostra
suas iniciais no lugar — nada quebra.

### Experiências profissionais — `src/data/experience.ts`

Um objeto por experiência (empresa, cargo, período, descrição, tecnologias),
do mais recente para o mais antigo.

### Skills — `src/data/skills.ts`

Grupos por categoria (`{ category: "Frontend", items: [...] }`). Adicione,
remova ou renomeie grupos livremente.

### Projetos — `src/data/projects/`

Cada projeto é **um arquivo próprio** nessa pasta (veja o `README.md` dentro
dela para o formato exato). Para adicionar um projeto novo, basta criar o
arquivo — nenhum outro lugar precisa ser editado, o índice encontra sozinho.
Categorias de filtro na seção Projetos são geradas automaticamente a partir
dos projetos cadastrados.

Coloque as imagens/vídeos de cada projeto em:

```
public/images/projects/<slug>/
public/videos/projects/<slug>/
```

### Currículo em PDF

Coloque o arquivo em `public/files/` e aponte `profile.resumeUrl` para ele.
O botão "Baixar currículo" na seção Sobre só aparece quando esse campo está
preenchido.

## Publicar no GitHub Pages

Este repositório já inclui um workflow (`.github/workflows/deploy.yml`) que
builda e publica o site automaticamente a cada push na branch principal.
Ative em **Settings → Pages → Source: GitHub Actions** uma única vez; depois
disso, todo push já atualiza o site publicado em
`https://<usuário>.github.io/pagamentopix/`.

Se o nome do repositório mudar, atualize também o `base` em `vite.config.ts`.

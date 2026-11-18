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
    mural.ts             # referências visuais (cinema, música, imagens) do Mural
    radio.ts              # estações (playlists/faixas incorporadas) do Rádio
    videoteca.ts           # pôsteres de filmes de referência da Videoteca
    projects/
      types.ts          # formato (interface) de um projeto
      index.ts           # agrega automaticamente os arquivos desta pasta — não editar
      README.md            # como adicionar um projeto novo
      <slug>.ts             # um arquivo por projeto (você cria)
  components/          # UI — consome os dados acima, não contém conteúdo
  hooks/                # scroll reveal (useReveal)
  styles/global.css      # paleta, tipografia, layout, responsividade
public/
  images/profile/        # sua foto
  images/mural/            # imagens das referências do Mural
  images/videoteca/         # pôsteres dos filmes da Videoteca
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

O campo `nickname` (opcional) vira a assinatura no cabeçalho e uma etiqueta
vertical ao lado da foto no Hero — deixe em branco para usar só o primeiro
nome do campo `fullName`.

`philosophy` (opcional) é uma declaração curta exibida no fim da seção Sobre.
`childhoodPhoto` (opcional) monta o bloco narrativo com uma foto antiga —
coloque a imagem em `public/images/profile/` e aponte o campo `image` para
ela; `quote` e `caption` são o texto ao lado.

`photoFrame` (opcional) é uma imagem decorativa (colagem, textura) exibida
como plano de fundo de toda a seção Hero — como uma capa/cover (estilo
Facebook) —, com a foto (`photo`) sobreposta por cima, recortada em círculo,
centralizada.

### Experiências profissionais — `src/data/experience.ts`

Um objeto por experiência (empresa, cargo, período, descrição, tecnologias),
do mais recente para o mais antigo.

### Skills — `src/data/skills.ts`

Grupos por categoria (`{ category: "Frontend", items: [...] }`). Adicione,
remova ou renomeie grupos livremente.

### Mural (referências) — `src/data/mural.ts` e página `/mural`

Um arquivo pessoal de cinema, música e imagens de referência, numa colagem
estilo Y2K/grunge. Cada item é `{ image, kind, origin, note? }`: coloque a
imagem em `public/images/mural/` e acrescente o objeto ao array `mural`.
Sem nenhum item cadastrado, a página mostra apenas o aviso discreto apontando
pra este arquivo — nunca referências inventadas.

### Rádio — `src/data/radio.ts` e página `/radio`

Cada estação é `{ frequency, name, note?, source }`. `source` aponta pra
uma fonte de áudio ao vivo de verdade, em um dos três formatos:
`{ kind: "aac", streamUrl }` (stream direto), `{ kind: "hls", streamUrl }`
(stream `.m3u8`, tocado via `hls.js`) ou `{ kind: "youtube", videoId }`
(vídeo/live do YouTube, tocado por um player oculto). O áudio toca de
verdade, pelo player global do site (`RadioContext`), e continua tocando
mesmo navegando entre páginas. `frequency` só posiciona a estação no dial
(escolha um número entre 88 e 108). Sem estações, o dial funciona
normalmente mas fica sempre em "estática".

As URLs de stream de rádios comerciais mudam com o tempo — se alguma
parar de tocar, é só trocar o `streamUrl`/`videoId` pelo de outra estação.

### Videoteca — `src/data/videoteca.ts` e página `/videoteca`

Cada filme é `{ image, title, year, genre, director?, synopsis?, note?, tier? }`.
Coloque o pôster em `public/posters/` (ou `public/images/videoteca/`, tanto
faz — o campo `image` aceita qualquer caminho dentro de `public/`). O botão "Montar sessão
dupla" só aparece com pelo menos 2 filmes cadastrados.

O campo opcional `tier` ("S" | "A" | "B" | "C" | "D") define a posição
inicial do filme na tier list exibida no topo da página. Sem esse campo,
o filme começa na fileira "Não avaliados". Quem visita o site pode
arrastar (ou clicar pra pegar e clicar na fileira pra soltar) os pôsteres
entre as fileiras — é só uma brincadeira da sessão, não salva em lugar
nenhum; pra mudar o ranking "oficial" de verdade, edite o campo `tier`.

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

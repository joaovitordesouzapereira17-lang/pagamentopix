# Portfólio — Ana Duarte (template)

Site de portfólio estático (HTML/CSS/JS puro, sem build), pronto para publicar em qualquer
hospedagem estática (GitHub Pages, Netlify, Vercel, etc.).

Identidade visual autoral: mistura de Punk, Y2K, Maximalismo, Editorial e Design Tech —
paleta preto/branco/vinho/azul elétrico, tipografia `Unbounded` + `Archivo` + `Space Mono`,
grid assimétrico, glitch, halftone, marquee, cursor customizado e modal de detalhes de
projeto.

## Estrutura

```
index.html        # marcação e conteúdo de todas as seções
css/styles.css     # estilos (paleta, tipografia, layout, responsividade, animações)
js/main.js         # menu mobile, cursor, parallax, glitch, filtro de projetos,
                    # modal de detalhes, scroll reveal, formulário
```

## Como personalizar

Todo o conteúdo é placeholder e deve ser substituído no `index.html`:

- **Nome/logo**: troque "Ana Duarte" e as iniciais "AD" no cabeçalho, hero e rodapé.
- **Hero**: nome grande, frase de apresentação e números em `#topo`.
- **Sobre**: citação de destaque, bio e as duas listas ("O que eu faço" / "Área de
  atuação") em `#sobre`.
- **Projetos**: cada `<button class="project-card">` em `#projetos` tem um
  `data-project="id"` que corresponde a uma entrada no objeto `projectData` em
  `js/main.js` — é ali que ficam a descrição longa, ano, papel, ferramentas e tags
  exibidas no modal de detalhes. Edite os dois lugares juntos ao trocar um projeto.
  Para adicionar/remover categorias de filtro, ajuste os botões `.filter-btn` e o
  atributo `data-category` dos cards.
- **Skills**: grupos e tags em `#skills` (`.skill-group` / `.tag-chip`).
- **Contato**: e-mail, telefone e links de redes sociais (`href="#"`) em `#contato`.
  O formulário abre o cliente de e-mail do visitante via `mailto:` (em `js/main.js`,
  variável de destino `ana.duarte@exemplo.com`) — troque pelo seu e-mail, ou substitua
  por um serviço de formulário (Formspree, Web3Forms, etc.) se preferir receber sem
  depender do app de e-mail do usuário.
- **Paleta**: os quatro tokens de cor (`--ink`, `--paper`, `--wine`, `--electric`) estão
  no topo de `css/styles.css` — mudar esses valores atualiza o site inteiro.

## Publicar no GitHub Pages

1. Configure Settings → Pages → Branch: a branch deste repositório, pasta `/ (root)`.
2. O site ficará disponível em `https://<usuário>.github.io/<repositório>/`.

## Rodar localmente

Não é necessário build. Basta abrir `index.html` no navegador, ou servir a pasta:

```
python3 -m http.server 8000
```

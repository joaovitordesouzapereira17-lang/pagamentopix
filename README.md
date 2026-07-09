# Portfólio — Ana Duarte (template)

Site de portfólio estático (HTML/CSS/JS puro, sem build), pronto para publicar em qualquer
hospedagem estática (GitHub Pages, Netlify, Vercel, etc.).

## Estrutura

```
index.html        # marcação e conteúdo de todas as seções
css/styles.css     # estilos (paleta, layout, responsividade, animações)
js/main.js         # menu mobile, filtro de projetos, scroll reveal, formulário
```

## Como personalizar

Todo o conteúdo é placeholder e deve ser substituído no `index.html`:

- **Nome/logo**: troque "Ana Duarte" e as iniciais "AD" no cabeçalho e rodapé.
- **Seção Início**: título, subtítulo e números em `#inicio`.
- **Sobre**: texto de bio e "fatos rápidos" (e-mail, localização) em `#sobre`.
- **Projetos**: cada `<article class="project-card">` em `#projetos` — troque título,
  descrição, tags e o link `href="#"` pelo link real do projeto (Behance, site, etc.).
  Para adicionar/remover categorias de filtro, ajuste os botões `.filter-btn` e o atributo
  `data-category` dos cards.
- **Habilidades**: cards em `#habilidades` e a lista de ferramentas em `.tools`.
- **Contato**: e-mail, telefone e links de redes sociais (`href="#"`) em `#contato`.
  O formulário abre o cliente de e-mail do visitante via `mailto:` (em `js/main.js`,
  variável de destino `ana.duarte@exemplo.com`) — troque pelo seu e-mail, ou substitua
  por um serviço de formulário (Formspree, Web3Forms, etc.) se preferir receber sem
  depender do app de e-mail do usuário.

## Publicar no GitHub Pages

1. Configure Settings → Pages → Branch: a branch deste repositório, pasta `/ (root)`.
2. O site ficará disponível em `https://<usuário>.github.io/<repositório>/`.

## Rodar localmente

Não é necessário build. Basta abrir `index.html` no navegador, ou servir a pasta:

```
python3 -m http.server 8000
```

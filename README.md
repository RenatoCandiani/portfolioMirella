# Site da Atriz — Portfólio / Trajetória

Site estático (HTML + CSS + JavaScript), sem instalação, sem banco de dados.
Feito para apresentar a trajetória, os trabalhos, fotos, vídeos e contato de uma atriz.

## Como ver o site no computador

Opção mais simples: **dê dois cliques no arquivo `index.html`**. Ele abre no navegador.

Se quiser ver do jeitinho que fica publicado (recomendado), rode um servidor local:

```bash
# dentro da pasta site-atriz
python -m http.server 8000
```

Depois abra no navegador: http://localhost:8000

## O que editar (tudo em `index.html`)

O arquivo `index.html` tem comentários (`<!-- ... -->`) mostrando onde mexer:

1. **Nome** — já está como `Mirella`. Se ela usar nome artístico completo (nome + sobrenome), use Substituir Tudo (Ctrl+H) para trocar em todos os lugares de uma vez.
2. **Textos** — bio na seção "Sobre", descrições dos trabalhos, marcos da "Trajetória".
3. **Ficha técnica** — cidade, altura, idiomas, DRT (dados que casting costuma pedir).
4. **Contato** — e-mail, WhatsApp e links das redes sociais (Instagram, TikTok, YouTube).

## Fotos

1. Coloque as imagens na pasta `img/`.
2. No `index.html`, troque cada bloco de placeholder por uma imagem. Exemplo, na galeria:

```html
<!-- de: -->
<div class="gallery-item"><div class="placeholder-img" data-label="Foto 1"></div></div>

<!-- para: -->
<div class="gallery-item"><img src="img/foto1.jpg" alt="Mirella"></div>
```

O efeito de ampliar a foto (lightbox) ao clicar já funciona sozinho depois disso.

## Vídeos (YouTube)

Troque o placeholder de vídeo por um embed. Pegue o ID do vídeo do YouTube
(a parte depois de `watch?v=`) e cole assim:

```html
<div class="video-item">
  <iframe src="https://www.youtube.com/embed/SEU_ID_AQUI"
          title="Reel" allowfullscreen loading="lazy"></iframe>
</div>
```

## Cores

As cores ficam no topo do arquivo `css/style.css`, no bloco `:root`.
A cor de destaque é `--accent` (dourado). Troque por outra se quiser.

## Como publicar de graça

- **Netlify Drop** (mais fácil): acesse https://app.netlify.com/drop e arraste a pasta `site-atriz`. Sai um link no ar na hora.
- **GitHub Pages**: suba a pasta num repositório e ative o Pages nas configurações.
- **Vercel**: importe o projeto e faça o deploy.

Depois dá para ligar um domínio próprio (ex.: `nomedaatriz.com.br`).

## Estrutura dos arquivos

```
site-atriz/
├── index.html      → conteúdo do site (é aqui que você edita os textos)
├── css/style.css   → aparência (cores, fontes, layout)
├── js/main.js      → interações (menu, galeria, animações)
├── img/            → coloque as fotos aqui
└── README.md       → este guia
```

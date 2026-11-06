# -*- coding: utf-8 -*-
"""
Gerador dos blocos de Trabalhos e Maquiagem do site da Mirella.
Lê as pastas em img/trabalhos/<nome>/ e img/make/<nome>/ (vídeos .mp4 + fotos)
e reescreve as seções #videos e #maquiagem do index.html.

Para atualizar o site depois de adicionar arquivos:  python gera_blocos.py
"""
import os, re

IMG = "img"
IMG_EXT = (".jpg", ".jpeg", ".png", ".webp")

# (pasta, nome exibido, selo opcional, link do Instagram) — define ORDEM e metadados
TRAB_META = [
    ("oppo",   "Oppo",             "📱 gravado no Reno 16", "https://www.instagram.com/p/DeAR-Zkv8Mc/"),
    ("natura", "Natura",           "",                       "https://www.instagram.com/p/DcwlAS5DgZj/"),
    ("ifood",  "iFood",            "",                       "https://www.instagram.com/p/DZ8STJnxBnA/"),
    ("bis",    "BIS",              "",                       "https://www.instagram.com/p/DbHOfEHEU5b/"),
    ("nood",   "Nood TV",          "",                       "https://www.instagram.com/p/DbREn3dERjv/"),
    ("telles", "Telles &amp; Júlia", "colab",                "https://www.instagram.com/p/DboUcApEW71/"),
    ("golpe",  "Golpe da agência", "denúncia",               "https://www.instagram.com/p/DcTkSLqxoCY/"),
]
MAKE_META = [
    ("gaara",          "Gaara",       "https://www.instagram.com/p/Ddptx_ARHDk/"),
    ("poa",            "Poá Makeup",  "https://www.instagram.com/p/Dd0tJKCte0r/"),
    ("anos-80",        "Anos 80",     "https://www.instagram.com/p/Dd7O4DUtyXo/"),
    ("preto-e-branco", "🤍 + 🖤",     "https://www.instagram.com/p/Ddh_lnyxQ12/"),
]


def listar(base, pasta):
    d = os.path.join(IMG, base, pasta)
    if not os.path.isdir(d):
        return [], []
    arquivos = sorted(os.listdir(d), key=str.lower)
    vids = [f for f in arquivos if f.lower().endswith(".mp4")]
    fotos = [f for f in arquivos if f.lower().endswith(IMG_EXT)]
    return vids, fotos


def bloco(base, pasta, nome, selo, ig):
    vids, fotos = listar(base, pasta)
    if not vids and not fotos:
        return ""  # pasta vazia (ex.: Amor) -> ignora
    selo_html = f' <span class="trabalho-selo">{selo}</span>' if selo else ""

    reels = ""
    for v in vids:
        base_v = os.path.splitext(v)[0]
        src = f"{IMG}/{base}/{pasta}/{v}"
        poster = f"{IMG}/{base}/{pasta}/posters/{base_v}.jpg"
        reels += (
            f'          <button class="reel" type="button" data-video="{src}" aria-label="Abrir vídeo">'
            f'<video src="{src}" poster="{poster}" muted loop playsinline preload="none"></video>'
            f'<span class="reel-play">▶</span></button>\n'
        )
    reels_html = f'        <div class="reels">\n{reels}        </div>\n' if vids else ""

    fotos_html = ""
    if fotos:
        itens = ""
        for f in fotos:
            src = f"{IMG}/{base}/{pasta}/{f}"
            itens += (
                f'          <button class="foto" type="button" data-full="{src}">'
                f'<img src="{src}" loading="lazy" alt="{nome} — Mirella Almada"></button>\n'
            )
        fotos_html = f'        <div class="trabalho-fotos">\n{itens}        </div>\n'

    return (
        f'      <article class="trabalho">\n'
        f'        <div class="trabalho-head">\n'
        f'          <h3 class="trabalho-nome">{nome}{selo_html}</h3>\n'
        f'          <a class="trabalho-ig" href="{ig}" target="_blank" rel="noopener">ver no Instagram ↗</a>\n'
        f'        </div>\n'
        f'{reels_html}{fotos_html}'
        f'      </article>\n'
    )


def secao(id_, classe, subtitulo, titulo, lead, blocos):
    return (
        f'  <section class="section {classe}" id="{id_}">\n'
        f'    <div class="container">\n'
        f'      <div class="section-header">\n'
        f'        <p class="section-subtitle">{subtitulo}</p>\n'
        f'        <h2 class="section-title">{titulo}</h2>\n'
        f'        <p class="section-lead">{lead}</p>\n'
        f'      </div>\n\n'
        f'{blocos}'
        f'    </div>\n'
        f'  </section>'
    )


def main():
    trab = "".join(bloco("trabalhos", p, n, s, ig) for p, n, s, ig in TRAB_META)
    make = "".join(bloco("make", p, n, "", ig) for p, n, ig in MAKE_META)

    sec_trab = secao(
        "videos", "trabalhos", "Portfólio em vídeo", "Trabalhos &amp; Aparições",
        "Os vídeos tocam sozinhos enquanto você rola; clique pra assistir com som.", trab,
    )
    sec_make = secao(
        "maquiagem", "makeup", "Além do palco", "Maquiagem &amp; Caracterização",
        "Ela também é maquiadora — cria as próprias caracterizações, do clássico ao cênico.", make,
    )

    with open("index.html", encoding="utf-8") as fp:
        html = fp.read()

    html = re.sub(r'(?s)  <section class="section trabalhos" id="videos">.*?</section>',
                  lambda m: sec_trab, html, count=1)
    html = re.sub(r'(?s)  <section class="section makeup" id="maquiagem">.*?</section>',
                  lambda m: sec_make, html, count=1)

    with open("index.html", "w", encoding="utf-8", newline="\n") as fp:
        fp.write(html)

    print("Blocos gerados:")
    for p, n, s, ig in TRAB_META:
        v, f = listar("trabalhos", p)
        print(f"  {n}: {len(v)} video(s), {len(f)} foto(s)")
    for p, n, ig in MAKE_META:
        v, f = listar("make", p)
        print(f"  {n}: {len(v)} video(s), {len(f)} foto(s)")


if __name__ == "__main__":
    main()

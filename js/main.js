/* ============================================================
   main.js — interações do site da Mirella
   (a cortina de abertura é 100% CSS, não precisa de JS)
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  /* Ano no rodapé */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Navbar muda ao rolar */
  var navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 40) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  function closeMenu() { navMenu.classList.remove("open"); navToggle.classList.remove("active"); }
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      navToggle.classList.toggle("active");
    });
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* Fade-in ao rolar */
  var faders = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    faders.forEach(function (el) { obs.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Pilha de fotos: clicar (ou no botão) manda a foto de cima pro fundo */
  var pilha = document.getElementById("pilha");
  if (pilha) {
    var fotos = Array.prototype.slice.call(pilha.querySelectorAll(".polaroid"));
    var total = fotos.length;
    var proximaFoto = function () {
      fotos.forEach(function (f) {
        var pos = (parseInt(f.getAttribute("data-pos"), 10) + 1) % total;
        f.setAttribute("data-pos", pos);
      });
    };
    pilha.addEventListener("click", proximaFoto);
    var botaoPilha = document.querySelector(".pilha-botao");
    if (botaoPilha) botaoPilha.addEventListener("click", function (e) {
      e.stopPropagation();
      proximaFoto();
    });
  }

  /* Lightbox da galeria (funciona assim que você trocar os placeholders por <img>) */
  var lightbox = document.getElementById("lightbox");
  var lightboxContent = document.getElementById("lightboxContent");
  var lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      if (!img) return;
      lightboxContent.innerHTML = '<img src="' + img.src + '" alt="' + (img.alt || "") + '">';
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxContent.innerHTML = "";
  }
  if (lightbox) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
  }

  /* ---------- Reels dos trabalhos (vídeos .mp4) ----------
     Preview toca mudo quando fica visível; clicar abre em tela cheia com som. */
  var reels = document.querySelectorAll(".reel");
  if (reels.length && "IntersectionObserver" in window) {
    var reelObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target.querySelector("video");
        if (!v) return;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) { p.catch(function () {}); } }
        else { v.pause(); }
      });
    }, { threshold: 0.4 });
    reels.forEach(function (r) { reelObs.observe(r); });
  }
  reels.forEach(function (reel) {
    reel.addEventListener("click", function () {
      var src = reel.getAttribute("data-video");
      if (!src || !lightbox) return;
      lightboxContent.innerHTML = '<video src="' + src + '" controls autoplay playsinline style="max-width:90vw;max-height:85vh;border-radius:4px"></video>';
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
});

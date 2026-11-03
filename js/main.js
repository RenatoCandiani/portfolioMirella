/* ============================================================
   main.js — interações do site
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Ano atual no rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar muda ao rolar ---------- */
  var navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 40) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile (abre/fecha) ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeMenu() {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      navToggle.classList.toggle("active");
    });
    // Fecha o menu ao clicar em um link
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Fade-in ao rolar a página ---------- */
  var faders = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    faders.forEach(function (el) { observer.observe(el); });
  } else {
    // Navegadores antigos: mostra tudo
    faders.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Lightbox da galeria ----------
     Funciona automaticamente quando você trocar os placeholders
     por <img src="img/foto.jpg"> dentro de .gallery-item          */
  var lightbox = document.getElementById("lightbox");
  var lightboxContent = document.getElementById("lightboxContent");
  var lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      if (!img) return; // ainda é placeholder, ignora
      lightboxContent.innerHTML =
        '<img src="' + img.src + '" alt="' + (img.alt || "") + '">';
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxContent.innerHTML = "";
  }

  if (lightbox) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }
});

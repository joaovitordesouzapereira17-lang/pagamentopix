(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ano no rodapé
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------------------------------------------------
  // Header background + scroll progress bar
  // ---------------------------------------------------
  var header = document.getElementById("site-header");
  var progressBar = document.getElementById("scroll-progress");

  function onScroll() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------------------------------------------------
  // Mobile menu
  // ---------------------------------------------------
  var menuToggle = document.getElementById("menu-toggle");
  var navClose = document.getElementById("nav-close");
  var nav = document.getElementById("nav");

  function openNav() {
    nav.classList.add("is-open");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  menuToggle.addEventListener("click", function () {
    nav.classList.contains("is-open") ? closeNav() : openNav();
  });
  navClose.addEventListener("click", closeNav);
  nav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  // ---------------------------------------------------
  // Active nav link on scroll
  // ---------------------------------------------------
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav-link");
  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach(function (section) { navObserver.observe(section); });

  // ---------------------------------------------------
  // Scroll reveal (staggered)
  // ---------------------------------------------------
  var revealCounters = {};
  var revealObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var section = entry.target.closest("section");
          var key = section ? section.id : "root";
          revealCounters[key] = (revealCounters[key] || 0) + 1;
          var delay = reduceMotion ? 0 : Math.min(revealCounters[key] * 70, 350);
          entry.target.style.transitionDelay = delay + "ms";
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });

  // ---------------------------------------------------
  // Custom cursor (pointer:fine only)
  // ---------------------------------------------------
  var cursorDot = document.getElementById("cursor-dot");
  if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
    window.addEventListener("mousemove", function (e) {
      cursorDot.style.transform = "translate(" + (e.clientX - 9) + "px," + (e.clientY - 9) + "px)";
    });
    document.querySelectorAll("a, button, .tag-chip").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursorDot.classList.add("is-active"); });
      el.addEventListener("mouseleave", function () { cursorDot.classList.remove("is-active"); });
    });
  }

  // ---------------------------------------------------
  // Parallax on hero shapes
  // ---------------------------------------------------
  var parallaxEls = document.querySelectorAll("[data-parallax]");
  if (!reduceMotion && parallaxEls.length) {
    var ticking = false;
    function updateParallax() {
      var y = window.scrollY;
      parallaxEls.forEach(function (el) {
        var factor = parseFloat(el.getAttribute("data-parallax")) || 0;
        el.style.transform = "translateY(" + (y * factor) + "px)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ---------------------------------------------------
  // Periodic glitch burst on hero name
  // ---------------------------------------------------
  if (!reduceMotion) {
    var glitchTargets = document.querySelectorAll(".glitch-wrap");
    setInterval(function () {
      glitchTargets.forEach(function (el) {
        el.classList.add("is-glitching");
        setTimeout(function () { el.classList.remove("is-glitching"); }, 340);
      });
    }, 5200);
  }

  // ---------------------------------------------------
  // Project filter
  // ---------------------------------------------------
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      projectCards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  // ---------------------------------------------------
  // Project detail modal
  // ---------------------------------------------------
  var projectData = {
    aurora: {
      index: "01", category: "BRANDING", title: "Aurora — Identidade Visual",
      description: "Sistema de marca completo para uma healthtech: naming, logo, paleta e um guia de aplicação que acompanha o produto do pitch deck à interface.",
      year: "2025", role: "Direção de arte", tools: "Illustrator, Figma",
      tags: ["Branding", "Logo", "Guidelines"], thumb: "thumb-1"
    },
    nimbus: {
      index: "02", category: "UI/UX", title: "Nimbus — App de Produtividade",
      description: "Redesign completo de um app mobile de produtividade, com foco em simplicidade, hierarquia clara e acessibilidade AA em todo o fluxo.",
      year: "2024", role: "UI Design", tools: "Figma, Principle",
      tags: ["UI Design", "Mobile", "Prototipagem"], thumb: "thumb-2"
    },
    flora: {
      index: "03", category: "ILUSTRAÇÃO", title: "Flora Fest — Cartazes de Evento",
      description: "Série de ilustrações e cartazes para um festival de música independente, explorando halftone e tipografia expressiva em formato editorial.",
      year: "2024", role: "Ilustração & Direção de arte", tools: "Procreate, Illustrator",
      tags: ["Ilustração", "Pôster", "Editorial"], thumb: "thumb-3"
    },
    orbit: {
      index: "04", category: "UI/UX", title: "Orbit — App Financeiro",
      description: "Design de produto do zero para um app de finanças pessoais: pesquisa, wireframes, design system e handoff para o time de engenharia.",
      year: "2023", role: "Product Design", tools: "Figma, FigJam",
      tags: ["Fintech", "Design System", "App"], thumb: "thumb-4"
    },
    lumen: {
      index: "05", category: "BRANDING", title: "Café Lumen — Marca & Embalagem",
      description: "Naming, identidade visual e sistema de embalagens para uma torrefação artesanal — do rótulo ao ponto de venda.",
      year: "2023", role: "Branding & Packaging", tools: "Illustrator, Photoshop",
      tags: ["Branding", "Packaging", "Print"], thumb: "thumb-5"
    },
    sistema: {
      index: "06", category: "DESIGN SYSTEM", title: "Estudo: Sistema de Design",
      description: "Biblioteca de componentes escalável construída para um time de produto, com tokens documentados e variantes para light e dark mode.",
      year: "2025", role: "Design System Lead", tools: "Figma, Design Tokens",
      tags: ["Design System", "Figma", "Documentação"], thumb: "thumb-6"
    }
  };

  var modal = document.getElementById("project-modal");
  var modalClose = document.getElementById("modal-close");
  var modalThumb = document.getElementById("modal-thumb");
  var modalIndex = document.getElementById("modal-index");
  var modalCategory = document.getElementById("modal-category");
  var modalTitle = document.getElementById("modal-title");
  var modalDescription = document.getElementById("modal-description");
  var modalYear = document.getElementById("modal-year");
  var modalRole = document.getElementById("modal-role");
  var modalTools = document.getElementById("modal-tools");
  var modalTags = document.getElementById("modal-tags");
  var lastFocused = null;

  function openModal(id) {
    var data = projectData[id];
    if (!data) return;
    lastFocused = document.activeElement;

    modalThumb.className = "modal-thumb " + data.thumb;
    modalIndex.textContent = data.index;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalYear.textContent = data.year;
    modalRole.textContent = data.role;
    modalTools.textContent = data.tools;
    modalTags.innerHTML = "";
    data.tags.forEach(function (tag) {
      var span = document.createElement("span");
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  projectCards.forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(card.getAttribute("data-project"));
    });
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // ---------------------------------------------------
  // Contact form (mailto)
  // ---------------------------------------------------
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        note.textContent = "Preencha todos os campos antes de enviar.";
        return;
      }

      var subject = encodeURIComponent("Contato via portfólio — " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:ana.duarte@exemplo.com?subject=" + subject + "&body=" + body;

      note.textContent = "Abrindo seu aplicativo de e-mail para enviar a mensagem...";
      form.reset();
    });
  }
})();

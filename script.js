// ================================
// Real Madrid CF - script.js
// ================================

document.addEventListener("DOMContentLoaded", () => {
  // 1) Botón "Explorar Historia"
  const btnExplorar = document.querySelector("#inicio button");
  const historia = document.querySelector("#historia");

  if (btnExplorar && historia) {
    btnExplorar.addEventListener("click", () => {
      historia.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // 2) Scroll suave para el menú (por si el navegador no respeta scroll-behavior)
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;
      e.preventDefault();

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // 3) Navbar "scrolled"
  const header = document.querySelector("header");
  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  // 4) Resaltar link activo según sección visible (Scroll Spy)
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const linkMap = new Map();

  navLinks.forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("#")) linkMap.set(href.slice(1), a);
  });

  const setActiveLink = (id) => {
    navLinks.forEach((a) => a.classList.remove("active"));
    const a = linkMap.get(id);
    if (a) a.classList.add("active");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Busca la sección con mayor visibilidad
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        setActiveLink(visible.target.id);
      }
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
    }
  );

  sections.forEach((sec) => observer.observe(sec));
});
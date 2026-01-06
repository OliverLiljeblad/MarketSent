/*
  Vanilla JS enhancements:
  - Mobile nav toggle
  - Active nav link based on section in view
  - Reveal-on-scroll animations
  - Non-functional contact form UX + basic validation
*/

(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  function setNavOpen(isOpen) {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", String(isOpen));
    siteNav.classList.toggle("is-open", isOpen);
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!isOpen);
    });
  }

  // Close nav after click (mobile)
  navLinks.forEach((a) => {
    a.addEventListener("click", () => setNavOpen(false));
  });

  // ESC closes nav
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });

  // Active link + reveal animations
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const reveals = Array.from(document.querySelectorAll(".reveal"));

  const byId = new Map(navLinks.map((a) => [a.getAttribute("href")?.replace("#", ""), a]));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains("reveal")) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
          return;
        }

        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((a) => a.classList.remove("is-active"));
          const link = byId.get(id);
          if (link) link.classList.add("is-active");
        }
      });
    },
    {
      // A bit of top offset so the active state matches the user’s perception
      root: null,
      threshold: 0.5,
    }
  );

  sections.forEach((s) => io.observe(s));
  reveals.forEach((el) => io.observe(el));

  // Contact form (front-end only)
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");

  function setNote(text, isError) {
    if (!note) return;
    note.textContent = text;
    note.style.color = isError ? "rgba(248, 113, 113, 0.95)" : "rgba(232, 238, 252, 0.72)";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");

      const nameVal = name?.value?.trim() ?? "";
      const emailVal = email?.value?.trim() ?? "";
      const messageVal = message?.value?.trim() ?? "";

      if (!nameVal || !emailVal || !messageVal) {
        setNote("Please fill out all fields.", true);
        return;
      }

      // Basic email sanity check (not exhaustive)
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailVal)) {
        setNote("Please enter a valid email address.", true);
        return;
      }

      setNote("Thanks! This demo form doesn’t send yet—update it later to use a backend or form service.", false);
      form.reset();
    });
  }
})();

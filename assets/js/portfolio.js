document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const backToTop = document.getElementById("back-to-top");
  const year = document.getElementById("current-year");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // Theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  }

  function updateThemeIcon() {
    const dark = root.getAttribute("data-theme") === "dark";
    themeIcon.className = dark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio-theme", "dark");
    }
    updateThemeIcon();
  });

  // Mobile navigation
  mobileToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    mobileToggle.setAttribute("aria-expanded", String(open));
    mobileToggle.innerHTML = open
      ? '<i class="bi bi-x-lg"></i>'
      : '<i class="bi bi-list"></i>';
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
    });
  });

  // Back to top
  function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 600);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Active desktop navigation
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));

  // AOS animations
  if (window.AOS) {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 45
    });
  }

  year.textContent = new Date().getFullYear();
});

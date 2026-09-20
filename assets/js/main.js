/* =====================================================================
 * GIRAF Logistics — main.js
 * Renders i18n content, handles language switch, scroll reveal & counters.
 * ===================================================================== */

/* --------------------------- SVG icon set --------------------------- */
const ICONS = {
  ocean: '<path d="M3 18h18M5 18V9l4-3 4 3v9M13 18V8l4-2 4 2v10M7 12h0M17 11h0"/>',
  air: '<path d="M21 13l-9-2-4-7-2 1 3 6-6 1-1 2 7-1 3 5 2-1-2-5 8-1z"/>',
  railway: '<path d="M7 4h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM4 11h16M9 20l-2 3M15 20l2 3M9 14h0M15 14h0"/>',
  inland: '<path d="M2 7h11v9H2zM13 10h5l4 3v3h-9zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
  ecommerce: '<path d="M3 5h2l2 11h11l2-8H6M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 5l1-2h2"/>',
  dg: '<path d="M12 3l9 16H3zM12 10v4M12 17h0"/>',
  port: '<circle cx="12" cy="5" r="2"/><path d="M12 7v11M5 18h14M7 14a5 5 0 0 1 10 0"/>',
  customs: '<path d="M7 3h7l4 4v14H7zM14 3v4h4M9 12l2 2 4-4M9 17h6"/>',
  warehouse: '<path d="M3 21V8l9-5 9 5v13M3 21h18M8 21v-6h8v6"/>',
  bonded: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6zM9 12l2 2 4-4"/>',
  general: '<path d="M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10"/>',
  frozen: '<path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18"/>',
  danger: '<path d="M12 3l9 16H3zM12 10v4M12 17h0"/>',
  special: '<path d="M12 3l2 6 6 1-4 5 1 6-5-3-5 3 1-6-4-5 6-1z"/>',
  grade: '<path d="M5 4h14l-1 16-6 3-6-3zM9 9h6M9 13h6M9 17h4"/>',
  platform: '<path d="M4 7h16M4 12h16M4 17h16M8 4v16M16 4v16"/>',
  experience: '<circle cx="12" cy="9" r="5"/><path d="M8 14l-2 7 6-3 6 3-2-7"/>',
  local: '<path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>'
};

function svg(name, cls) {
  return `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

/* --------------------------- i18n core --------------------------- */
const SUPPORTED = ["en", "zh"];
const STORAGE_KEY = "giraf_lang";
let current = localStorage.getItem(STORAGE_KEY) || "en";
if (!SUPPORTED.includes(current)) current = "en";

function t(key) {
  return (COPY[current] && COPY[current][key]) || (COPY.en[key]) || key;
}

function applyStatic() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.getAttribute("data-i18n"));
  });
  document.documentElement.lang = current;
}

/* --------------------------- renderers --------------------------- */
function renderStats() {
  const grid = document.getElementById("statsGrid");
  grid.innerHTML = DATA[current].stats.map((s) => `
    <div class="stat reveal">
      <div class="stat__num" data-target="${s.value}" data-suffix="${s.suffix || ""}">0</div>
      <div class="stat__label">${s.label}</div>
    </div>`).join("");
}

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  grid.innerHTML = DATA[current].services.map((s) => `
    <article class="card reveal">
      <div class="card__icon">${svg(s.icon)}</div>
      <h3 class="card__title">${s.title}</h3>
      <p class="card__desc">${s.desc}</p>
    </article>`).join("");
}

function renderSolutions() {
  const grid = document.getElementById("solutionsGrid");
  grid.innerHTML = DATA[current].solutions.map((s) => `
    <article class="card card--accent reveal">
      <div class="card__icon card__icon--gold">${svg(s.icon)}</div>
      <h3 class="card__title">${s.title}</h3>
      <p class="card__desc">${s.desc}</p>
    </article>`).join("");
}

function renderOffices() {
  const grid = document.getElementById("officesGrid");
  grid.innerHTML = DATA[current].offices.map((o) => `
    <div class="office reveal">
      <span class="office__dot"></span>
      <div class="office__city">${o.city}</div>
      <div class="office__country">${o.country}</div>
    </div>`).join("");
}

function renderIndustries() {
  const grid = document.getElementById("industriesGrid");
  grid.innerHTML = DATA[current].industries.map((i) =>
    `<span class="chip reveal">${i}</span>`).join("");
}

function renderWhy() {
  const grid = document.getElementById("whyGrid");
  if (!grid) return;
  grid.innerHTML = DATA[current].why.map((w) => `
    <article class="card reveal">
      <div class="card__icon">${svg(w.icon)}</div>
      <h3 class="card__title">${w.title}</h3>
      <p class="card__desc">${w.desc}</p>
    </article>`).join("");
}

function renderSubsidiaries() {
  const el = document.getElementById("subsidiariesList");
  if (!el) return;
  el.innerHTML = DATA[current].subsidiaries.map((s) =>
    `<li class="reveal">${s}</li>`).join("");
}

function setActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav__links a").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.nav === page);
  });
}

function renderAll() {
  applyStatic();
  if (document.getElementById("statsGrid")) renderStats();
  if (document.getElementById("servicesGrid")) renderServices();
  if (document.getElementById("solutionsGrid")) renderSolutions();
  if (document.getElementById("officesGrid")) renderOffices();
  if (document.getElementById("industriesGrid")) renderIndustries();
  if (document.getElementById("whyGrid")) renderWhy();
  renderSubsidiaries();
  setActiveNav();
  observeReveal();
  observeCounters();
}

/* --------------------------- language switch --------------------------- */
function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) return;
  current = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.querySelectorAll(".lang__btn").forEach((b) =>
    b.classList.toggle("is-active", b.dataset.lang === lang));
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("langSwitch").addEventListener("click", (e) => {
  const btn = e.target.closest(".lang__btn");
  if (btn) setLanguage(btn.dataset.lang);
});

/* --------------------------- scroll reveal --------------------------- */
let revealObserver;
function observeReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in-view");
        revealObserver.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal:not(.in-view)").forEach((el) =>
    revealObserver.observe(el));
}

/* --------------------------- count-up --------------------------- */
let counterObserver;
function observeCounters() {
  if (counterObserver) counterObserver.disconnect();
  counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        animateCount(en.target);
        counterObserver.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat__num").forEach((el) =>
    counterObserver.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const dur = 1400;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString() + suffix;
  }
  requestAnimationFrame(step);
}

/* --------------------------- nav interactions --------------------------- */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("nav--scrolled", window.scrollY > 20);
});

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("is-open");
    burger.classList.remove("is-open");
  }
});

/* --------------------------- contact form --------------------------- */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(contactForm);
    const name = (d.get("name") || "").toString().trim();
    const email = (d.get("email") || "").toString().trim();
    const msg = (d.get("message") || "").toString().trim();
    const subject = encodeURIComponent("GIRAFSAIL inquiry from " + name);
    const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + msg);
    window.location.href = "mailto:info@giraf-logistics.com?subject=" + subject + "&body=" + body;
  });
}

/* --------------------------- boot --------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
document.querySelector('.lang__btn[data-lang="' + current + '"]')
  ?.classList.add("is-active");
renderAll();

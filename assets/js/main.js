/* =====================================================================
 * GIRAF Logistics — main.js
 * Renders i18n content, handles language switch, scroll reveal & counters.
 * ===================================================================== */

/* --------------------------- SVG icon set --------------------------- */
const ICONS = {
  ocean: '<path d="M3 15h18M4 15l2 4h12l2-4M6 15V9h4v6M12 15V6h5v9M12 6V3h2"/>',
  air: '<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/>',
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
  local: '<path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
  project: '<path d="M3 21V8h7M10 8V5h6M16 5v16M16 9h5M2 21h20"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
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
  /* attribute-localised bits: placeholders, titles and aria labels */
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });
  document.documentElement.lang = current;
}

/* --------------------------- page <title> localization --------------------------- */
const PAGE_TITLES = {
  en: {
    home: "GIRAFSAIL Logistics — Simplify the Cross-Border Trade",
    services: "Services — GIRAFSAIL Logistics",
    solutions: "Solutions — GIRAFSAIL Logistics",
    network: "Network — GIRAFSAIL Logistics",
    about: "About — GIRAFSAIL Logistics",
    contact: "Contact — GIRAFSAIL Logistics"
  },
  zh: {
    home: "GIRAFSAIL 物流 — 让跨境贸易更简单",
    services: "服务 — GIRAFSAIL 物流",
    solutions: "解决方案 — GIRAFSAIL 物流",
    network: "全球网络 — GIRAFSAIL 物流",
    about: "关于我们 — GIRAFSAIL 物流",
    contact: "联系我们 — GIRAFSAIL 物流"
  }
};
function applyPageTitle() {
  const map = PAGE_TITLES[current] || PAGE_TITLES.en;
  const key = document.body.dataset.page || "home";
  const title = map[key];
  if (title) document.title = title;
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

function featureList(features) {
  if (!features || !features.length) return "";
  const items = features.map((f) => `
    <li class="caps__item">
      <svg class="caps__tick" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4 10-10"/></svg>
      <span>${f}</span>
    </li>`).join("");
  return `<ul class="caps">${items}</ul>`;
}

function detailCard(s, accent) {
  const cls = "card detail-item reveal" + (accent ? " card--accent" : "");
  const iconCls = "card__icon" + (accent ? " card__icon--gold" : "");
  return `
    <article class="${cls}">
      <div class="detail-item__head">
        <div class="${iconCls}">${svg(s.icon)}</div>
        <div>
          <h3 class="card__title">${s.title}</h3>
          <p class="card__desc">${s.desc}</p>
          ${s.tag ? `<span class="detail-item__tag">${s.tag}</span>` : ""}
        </div>
      </div>
      <p class="detail-item__intro">${s.intro || ""}</p>
      <div class="detail-item__caps">
        <p class="detail-item__caps-label">${t("detail.capLabel")}</p>
        ${featureList(s.features)}
      </div>
    </article>`;
}

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  const items = DATA[current].services;
  const order = ["freight", "special", "trade"];
  const groups = order
    .map((cat) => ({ cat, items: items.filter((s) => s.cat === cat) }))
    .filter((g) => g.items.length);
  grid.innerHTML =
    '<div class="svc-groups">' +
    groups
      .map(
        (g) => `
      <div class="svc-group reveal">
        <div class="svc-group__head">
          <span class="svc-group__title">${t("services.cat." + g.cat)}</span>
          <span class="svc-group__count">${g.items.length}</span>
          <span class="svc-group__rule"></span>
        </div>
        <div class="detail-list">
          ${g.items.map((s) => detailCard(s, false)).join("")}
        </div>
      </div>`
      )
      .join("") +
    "</div>";
}

function renderProcess() {
  const grid = document.getElementById("processGrid");
  if (!grid) return;
  const steps = DATA[current].process || [];
  grid.innerHTML = steps.map((s) => `
    <div class="proc-step reveal">
      <div class="proc-step__num">${s.num}</div>
      <h3 class="proc-step__title">${s.title}</h3>
      <p class="proc-step__desc">${s.desc}</p>
    </div>`).join("");
}

function renderSolutions() {
  const grid = document.getElementById("solutionsGrid");
  if (!grid) return;
  const items = DATA[current].solutions;
  grid.innerHTML = grid.classList.contains("detail-list")
    ? items.map((s) => detailCard(s, true)).join("")
    : items.map((s) => `
      <article class="card card--accent reveal">
        <div class="card__icon card__icon--gold">${svg(s.icon)}</div>
        <h3 class="card__title">${s.title}</h3>
        <p class="card__desc">${s.desc}</p>
      </article>`).join("");
}

function renderOffices() {
  const grid = document.getElementById("officesGrid");
  if (!grid) return;
  const subs = DATA[current].subsidiaries || [];
  const china = current === "zh" ? "大中华区" : "Greater China";
  /* The band is labelled by country, not by continent: the branch records
     carry only a region, so match them against the offices table first. */
  const countryOf = {};
  (DATA[current].offices || []).forEach((o) => { countryOf[o.city] = o.country; });
  const list = [];
  subs.forEach((g) => {
    if (g.region === china) return;
    g.items.forEach((b) => list.push({
      city: b.city, region: g.region,
      country: countryOf[b.city] || g.region,
      phone: b.phone,
    }));
  });
  const esc = (v) => String(v == null ? "" : v);
  grid.innerHTML = list.map((b) => `
    <div class="office office--full reveal">
      <span class="office__dot"></span>
      <div class="office__main">
        <div class="office__city">${esc(b.city)}</div>
        <div class="office__country">${esc(b.country)}</div>
      </div>
      ${b.phone ? `<a class="office__phone" href="tel:${esc(b.phone).replace(/[^0-9+]/g, "")}"><span class="office__ico" aria-hidden="true">&#9742;</span>${esc(b.phone)}</a>` : ""}
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

function renderAbout() {
  const f = document.getElementById("aboutFoundations");
  if (f) {
    f.innerHTML = DATA[current].aboutFoundations.map((x) => `
      <article class="about-found reveal">
        <div class="about-found__icon">${svg(x.icon)}</div>
        <h3 class="about-found__title">${x.title}</h3>
        <p class="about-found__desc">${x.desc}</p>
      </article>`).join("");
  }
}

function renderHistory() {
  const el = document.getElementById("aboutHistory");
  if (!el) return;
  const items = (COPY[current] && COPY[current]["about.history"]) || COPY.en["about.history"];
  el.innerHTML = items.map((h) => `
    <li class="timeline__item reveal">
      <span class="timeline__marker" aria-hidden="true"></span>
      <span class="timeline__year">${h.year}</span>
      <div class="timeline__body">
        <h3 class="timeline__title">${h.title}</h3>
        <p class="timeline__text">${h.text}</p>
      </div>
    </li>`).join("");
}

function renderContactOffices() {
  const el = document.getElementById("contactOffices");
  if (!el) return;
  const subs = {};
  DATA[current].subsidiaries.forEach((g) => g.items.forEach((b) => {
    subs[b.city.toLowerCase().split(" (")[0]] = b;
  }));
  const esc = (v) => String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  el.innerHTML = DATA[current].offices.map((o) => {
    const b = subs[o.city.toLowerCase().split(" (")[0]] || {};
    const phone = b.phone ? `<a class="office-card__phone" href="tel:${esc(b.phone.replace(/\s+/g, ""))}">${esc(b.phone)}</a>` : "";
    const addr = b.address ? `<p class="office-card__addr">${esc(b.address)}</p>` : "";
    return `
      <div class="office-card reveal" tabindex="0">
        <div class="office-card__top">
          <span class="office-card__city">${esc(o.city)}</span>
          <span class="office-card__country">${esc(o.country)}</span>
        </div>
        <div class="office-card__detail">
          ${addr}
          ${phone}
        </div>
      </div>`;
  }).join("");
}

function renderSubsidiaries() {
  const el = document.getElementById("subsidiariesList");
  if (!el) return;
  const groups = DATA[current].subsidiaries;
  const esc = (v) => String(v == null ? "" : v);
  el.innerHTML = groups.map((g) => `
    <div class="subs__group reveal">
      <div class="subs__group-head">
        <span class="subs__group-name">${esc(g.region)}</span>
        <span class="subs__group-count">${g.items.length}</span>
        <span class="subs__group-rule"></span>
      </div>
      <div class="subs__offices">
        ${g.items.map((b) => `
          <article class="sub-office">
            <h3 class="sub-office__city">${esc(b.city)}</h3>
            <p class="sub-office__addr">${esc(b.address)}</p>
            ${b.phone ? `<a class="sub-office__line" href="tel:${esc(b.phone).replace(/[^0-9+]/g, "")}"><span class="sub-office__ico" aria-hidden="true">&#9742;</span><span>${esc(b.phone)}</span></a>` : ""}
            ${b.email ? `<a class="sub-office__line" href="mailto:${esc(b.email)}"><span class="sub-office__ico" aria-hidden="true">&#9993;</span><span>${esc(b.email)}</span></a>` : ""}
          </article>`).join("")}
      </div>
    </div>`).join("");
}

/* ===================================================================
   ROUND 2 — inquiry builder (contact) + mode chooser (services)
   Both read the same real data the rest of the site renders: the
   subsidiary list, the solution catalogue and the service catalogue.
   Nothing here invents a rate, a transit time or a waybill number.
   =================================================================== */
const BUILD_OTHER = "__other";
const BUILD_ADVISE = "advise";
const CHOOSER_ICON = { ocean: "ocean", air: "air", rail: "railway", inland: "inland" };

let chooserStep = 0;
let chooserPicks = [];
let chooserDone = false;
let builderPrefilled = false;

function bizData() { return DATA[current] || DATA.en; }

function escHtml(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ------------------------------- builder ------------------------------- */

/* Fill a <select> while keeping whatever the user had chosen. Option order is
   identical across locales (same regions, same cities), so the selected *index*
   survives a language switch even though the labels change language. */
function fillSelect(el, buildHtml, fallbackIndex) {
  if (!el) return;
  const idx = el.selectedIndex;
  el.innerHTML = buildHtml();
  if (idx >= 0 && idx < el.options.length) el.selectedIndex = idx;
  else if (typeof fallbackIndex === "number" && fallbackIndex < el.options.length) el.selectedIndex = fallbackIndex;
}

function branchOptionsHtml() {
  const d = bizData();
  return d.subsidiaries.map((g) =>
    '<optgroup label="' + escHtml(g.region) + '">' +
    g.items.map((b) => '<option value="' + escHtml(b.city) + '">' + escHtml(b.city) + "</option>").join("") +
    "</optgroup>"
  ).join("") + '<option value="' + BUILD_OTHER + '">' + escHtml(t("build.other")) + "</option>";
}

function cargoOptionsHtml() {
  const d = bizData();
  return d.solutions.map((s) =>
    '<option value="' + escHtml(s.title) + '">' + escHtml(s.title) + "</option>"
  ).join("") + '<option value="' + BUILD_OTHER + '">' + escHtml(t("build.other")) + "</option>";
}

function modeOptionsHtml() {
  const d = bizData();
  const modes = d.chooser.modes.map((m) => {
    const svc = d.services.filter((x) => x.title === m.service)[0] || {};
    const label = svc.title || m.service;
    return '<option value="' + escHtml(m.key) + '" data-service="' + escHtml(label) + '">' +
      escHtml(label + (svc.tag ? " \u00b7 " + svc.tag : "")) + "</option>";
  }).join("");
  return modes + '<option value="' + BUILD_ADVISE + '">' + escHtml(t("build.unsure")) + "</option>";
}

/* Data convention: Greater China is listed last. Default the lane to the HQ
   branch plus the first European office, so the form opens on a real example. */
function defaultBranchIndex(which) {
  const groups = bizData().subsidiaries;
  let n = 0;
  if (which === "origin") {
    for (let i = 0; i < groups.length - 1; i++) n += groups[i].items.length;
    return n;
  }
  for (let i = 0; i < groups.length; i++) {
    if (/Europe|\u6b27\u6d32/i.test(groups[i].region)) return n;
    n += groups[i].items.length;
  }
  return n;
}

function syncBuilderOthers() {
  const pairs = [
    ["buildOrigin", "buildOriginOther"],
    ["buildDest", "buildDestOther"],
    ["buildCargo", "buildCargoOther"]
  ];
  pairs.forEach((p) => {
    const sel = document.getElementById(p[0]);
    const inp = document.getElementById(p[1]);
    if (!sel || !inp) return;
    const on = sel.value === BUILD_OTHER;
    inp.hidden = !on;
    if (!on) inp.value = "";
  });
}

/* The structured brief, as i18n-labelled lines. This is the single source of
   truth for both the live summary panel and the email body. */
function briefLines() {
  const val = (id) => {
    const el = document.getElementById(id);
    return el ? String(el.value == null ? "" : el.value).trim() : "";
  };
  const rows = [];
  const pick = (selId, otherId, key) => {
    const sel = document.getElementById(selId);
    if (!sel || !sel.value) return;
    let v = sel.value;
    if (v === BUILD_OTHER) v = val(otherId) || t("build.other");
    rows.push(t(key) + ": " + v);
  };
  pick("buildOrigin", "buildOriginOther", "build.origin");
  pick("buildDest", "buildDestOther", "build.dest");
  pick("buildCargo", "buildCargoOther", "build.cargo");

  const mode = document.getElementById("buildMode");
  if (mode && mode.value) {
    if (mode.value === BUILD_ADVISE) {
      rows.push(t("build.mode") + ": " + t("build.unsure"));
    } else {
      const op = mode.options[mode.selectedIndex];
      rows.push(t("build.mode") + ": " + ((op && op.getAttribute("data-service")) || mode.value));
    }
  }
  const vol = val("buildVolume");
  if (vol) rows.push(t("build.volume") + ": " + vol);
  const when = val("buildWhen");
  if (when) rows.push(t("build.when") + ": " + when);
  return rows;
}

function updateBrief() {
  const el = document.getElementById("buildSummary");
  if (!el) return;
  const rows = briefLines();
  const notesEl = document.getElementById("cfMsg");
  const notes = notesEl ? String(notesEl.value || "").trim() : "";
  if (notes) rows.push(t("build.notes") + ": " + notes);
  if (!rows.length) {
    el.textContent = t("build.summaryEmpty");
    el.classList.add("is-empty");
    return;
  }
  el.classList.remove("is-empty");
  el.textContent = rows.join("\n");
}

function renderBuilder() {
  const origin = document.getElementById("buildOrigin");
  if (!origin) return;
  fillSelect(origin, branchOptionsHtml, defaultBranchIndex("origin"));
  fillSelect(document.getElementById("buildDest"), branchOptionsHtml, defaultBranchIndex("dest"));
  fillSelect(document.getElementById("buildCargo"), cargoOptionsHtml, 0);
  fillSelect(document.getElementById("buildMode"), modeOptionsHtml, 0);
  if (!builderPrefilled) {
    builderPrefilled = true;
    applyBuilderParams();
  }
  syncBuilderOthers();
  updateBrief();
}

/* Deep link support: contact.html?mode=rail&from=London&to=Shenzhen&cargo=... */
function applyBuilderParams() {
  let p;
  try { p = new URLSearchParams(window.location.search); } catch (e) { return; }
  const setv = (id, v) => {
    if (!v) return;
    const el = document.getElementById(id);
    if (!el) return;
    const i = Array.prototype.findIndex.call(el.options, (o) => o.value === v);
    if (i >= 0) el.selectedIndex = i;
  };
  setv("buildOrigin", p.get("from"));
  setv("buildDest", p.get("to"));
  setv("buildCargo", p.get("cargo"));
  setv("buildMode", p.get("mode"));
}

function legacyCopy(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) { return false; }
}

function copyBrief() {
  const el = document.getElementById("buildSummary");
  const btn = document.getElementById("buildCopy");
  if (!el) return;
  const text = el.textContent || "";
  const done = () => {
    if (!btn) return;
    btn.classList.add("is-done");
    btn.textContent = t("build.copied");
    window.clearTimeout(btn.__t);
    btn.__t = window.setTimeout(() => {
      btn.classList.remove("is-done");
      btn.textContent = t("build.adopt");
    }, 1700);
  };
  const fail = () => {
    if (window.__girafToast) window.__girafToast(t("build.copyFail"));
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, () => { legacyCopy(text) ? done() : fail(); });
  } else {
    legacyCopy(text) ? done() : fail();
  }
}

function initInquiryBuilder() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  if (!form.dataset.builderBound) {
    form.dataset.builderBound = "1";
    form.addEventListener("input", updateBrief);
    /* a select landing on "Other" must reveal its free-text field, and leaving
       it must clear that field — both are change-time concerns, so keep the
       input handler free of side effects (it fires on every keystroke). */
    form.addEventListener("change", function () {
      syncBuilderOthers();
      updateBrief();
    });

    const swap = document.getElementById("buildSwap");
    if (swap) {
      swap.addEventListener("click", () => {
        const o = document.getElementById("buildOrigin");
        const d = document.getElementById("buildDest");
        const oo = document.getElementById("buildOriginOther");
        const od = document.getElementById("buildDestOther");
        if (!o || !d) return;
        const i = o.selectedIndex, j = d.selectedIndex;
        const ov = oo ? oo.value : "", dv = od ? od.value : "";
        o.selectedIndex = j;
        d.selectedIndex = i;
        if (oo) oo.value = dv;
        if (od) od.value = ov;
        swap.classList.toggle("is-flip");
        syncBuilderOthers();
        updateBrief();
      });
    }
    const copy = document.getElementById("buildCopy");
    if (copy) copy.addEventListener("click", copyBrief);
  }
}

/* ------------------------------- chooser ------------------------------- */

function chooserMeta(key) {
  const d = bizData();
  const m = d.chooser.modes.filter((x) => x.key === key)[0];
  const svc = d.services.filter((s) => s.title === (m && m.service))[0] || {};
  return {
    key: key,
    icon: CHOOSER_ICON[key] || "ocean",
    title: svc.title || (m ? m.service : key),
    tag: svc.tag || "",
    desc: svc.desc || "",
    intro: svc.intro || svc.desc || ""
  };
}

/* Highest weight wins; ties fall back to the declared mode order, so the
   result is deterministic for the same answers. */
function chooserRank() {
  const modes = bizData().chooser.modes.map((m) => m.key);
  const sc = {};
  modes.forEach((k) => { sc[k] = 0; });
  chooserPicks.forEach((w) => {
    if (!w) return;
    Object.keys(w).forEach((k) => { if (k in sc) sc[k] += w[k]; });
  });
  return modes.slice().sort((a, b) => (sc[b] - sc[a]) || (modes.indexOf(a) - modes.indexOf(b)));
}

function renderChooser() {
  const body = document.getElementById("chooserBody");
  if (!body) return;
  const d = bizData();
  const total = d.chooser.questions.length;

  if (chooserDone) {
    const rank = chooserRank();
    const top = chooserMeta(rank[0]);
    const alt = chooserMeta(rank[1] || rank[0]);
    body.innerHTML =
      '<div class="choose__result">' +
        '<p class="choose__badge">' + escHtml(t("chooser.result")) + "</p>" +
        '<p class="choose__lead">' + escHtml(t("chooser.resultLead")) + "</p>" +
        '<div class="choose__rec">' +
          '<span class="choose__ico" aria-hidden="true">' + svg(top.icon) + "</span>" +
          "<div>" +
            "<h3>" + escHtml(top.title) + "</h3>" +
            "<p>" + escHtml(top.intro) + "</p>" +
            (top.tag ? '<span class="choose__tag">' + escHtml(top.tag) + "</span>" : "") +
          "</div>" +
        "</div>" +
        '<p class="choose__also">' + escHtml(t("chooser.also")) + ": <b>" + escHtml(alt.title) + "</b>" +
          (alt.tag ? " \u00b7 " + escHtml(alt.tag) : "") + "</p>" +
        '<div class="choose__acts">' +
          '<a class="btn btn--primary" href="contact.html?mode=' + encodeURIComponent(top.key) + '">' +
            escHtml(t("chooser.build")) + "</a>" +
          '<button type="button" class="choose__back" data-act="restart">' + escHtml(t("chooser.restart")) + "</button>" +
        "</div>" +
      "</div>";
    return;
  }

  const q = d.chooser.questions[chooserStep];
  const pct = Math.round((chooserStep / total) * 100);
  body.innerHTML =
    '<div class="choose__head">' +
      '<p class="choose__step">' +
        escHtml(t("chooser.progress").replace("{n}", String(chooserStep + 1)).replace("{total}", String(total))) +
      "</p>" +
      '<div class="choose__bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + total +
        '" aria-valuenow="' + (chooserStep + 1) + '"><span style="width:' + pct + '%"></span></div>' +
    "</div>" +
    '<h3 class="choose__q">' + escHtml(q.q) + "</h3>" +
    '<div class="choose__opts">' +
      q.options.map((o, i) =>
        '<button type="button" class="choose__opt" data-opt="' + i + '">' + escHtml(o.label) + "</button>"
      ).join("") +
    "</div>" +
    (chooserStep > 0
      ? '<button type="button" class="choose__back" data-act="back">' + escHtml(t("chooser.back")) + "</button>"
      : "");
}

function initChooser() {
  const host = document.getElementById("chooser");
  if (!host || host.dataset.bound) return;
  host.dataset.bound = "1";
  host.addEventListener("click", (e) => {
    const questions = bizData().chooser.questions;
    const opt = e.target.closest(".choose__opt");
    if (opt) {
      const i = parseInt(opt.getAttribute("data-opt"), 10);
      const q = questions[chooserStep];
      if (!q || !q.options[i]) return;
      chooserPicks[chooserStep] = q.options[i].w;
      chooserPicks.length = chooserStep + 1;
      if (chooserStep + 1 >= questions.length) chooserDone = true;
      else chooserStep++;
      renderChooser();
      return;
    }
    if (e.target.closest('[data-act="back"]')) {
      chooserDone = false;
      chooserStep = Math.max(0, chooserStep - 1);
      renderChooser();
      return;
    }
    if (e.target.closest('[data-act="restart"]')) {
      chooserStep = 0;
      chooserPicks = [];
      chooserDone = false;
      renderChooser();
    }
  });
}

function setActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav__links a").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.nav === page);
  });
}

function renderAll() {
  applyPageTitle();
  applyStatic();
  if (document.getElementById("statsGrid")) renderStats();
  if (document.getElementById("servicesGrid")) renderServices();
  if (document.getElementById("solutionsGrid")) renderSolutions();
  if (document.getElementById("processGrid")) renderProcess();
  if (document.getElementById("officesGrid")) renderOffices();
  if (document.getElementById("industriesGrid")) renderIndustries();
  if (document.getElementById("whyGrid")) renderWhy();
  renderAbout();
  renderHistory();
  renderContactOffices();
  renderSubsidiaries();
  renderBuilder();
  renderChooser();
  setActiveNav();
  applyRevealStagger();
  observeReveal();
  observeCounters();
  initHeroTypewriter();
  applyThemeLabel();
}


/* --------------------------- hero typewriter --------------------------- */
let heroTypeTimer = null;
let heroResizeTimer = null;

function heroAccent(text, accent) {
  if (!accent || text.indexOf(accent) === -1) return text;
  const i = text.indexOf(accent);
  return text.slice(0, i) + '<span class="stroke">' + accent + '</span>' + text.slice(i + accent.length);
}

/* The headline is set in a fluid clamp inside a shrink-to-fit container, so
   the same slogan can be one line at 900px and two at 1400px. Reserve exactly
   as many lines as the longest slogan needs at the *current* width, so the
   hero never reflows mid-word while the text is being typed out. */
function reserveHeroLines(ttl, textEl, slogans) {
  const lh = parseFloat(getComputedStyle(ttl).lineHeight);
  if (!lh) return;
  const prev = textEl.innerHTML;
  ttl.style.minHeight = "0px";
  let lines = 1;
  for (let i = 0; i < slogans.length; i++) {
    textEl.innerHTML = heroAccent(slogans[i].text, slogans[i].accent);
    lines = Math.max(lines, Math.round(ttl.getBoundingClientRect().height / lh));
  }
  textEl.innerHTML = prev;
  ttl.style.minHeight = Math.round(lines * lh) + "px";
}

function initHeroTypewriter() {
  const wrap = document.getElementById("heroRotate");
  if (!wrap) return;
  const textEl = wrap.querySelector(".hero__rotate-text");
  const caret = wrap.querySelector(".hero__caret");
  if (!textEl) return;
  if (heroTypeTimer) { clearTimeout(heroTypeTimer); heroTypeTimer = null; }
  const slogans = (COPY[current] && COPY[current].heroSlogans) || [];
  if (!slogans.length) { textEl.innerHTML = t("hero.title") || ""; return; }
  wrap.setAttribute("aria-label", slogans[0].text);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    textEl.innerHTML = heroAccent(slogans[0].text, slogans[0].accent);
    if (caret) caret.style.display = "none";
    reserveHeroLines(wrap, textEl, slogans);
    return;
  }
  reserveHeroLines(wrap, textEl, slogans);
  if (caret) caret.style.display = "";

  let idx = 0, phase = "typing", currentText = "";
  function step() {
    if (document.hidden) { heroTypeTimer = setTimeout(step, 400); return; }
    const s = slogans[idx];
    if (phase === "typing") {
      currentText = s.text.slice(0, currentText.length + 1);
      textEl.textContent = currentText;
      if (currentText.length === s.text.length) {
        textEl.innerHTML = heroAccent(s.text, s.accent);
        phase = "holding";
        heroTypeTimer = setTimeout(step, 2200);
      } else {
        heroTypeTimer = setTimeout(step, 55 + Math.random() * 45);
      }
    } else if (phase === "holding") {
      phase = "deleting";
      heroTypeTimer = setTimeout(step, 60);
    } else {
      currentText = currentText.slice(0, -1);
      textEl.textContent = currentText;
      if (currentText.length === 0) {
        idx = (idx + 1) % slogans.length;
        phase = "typing";
        heroTypeTimer = setTimeout(step, 380);
      } else {
        heroTypeTimer = setTimeout(step, 30 + Math.random() * 30);
      }
    }
  }
  step();
}

/* re-measure the reserved headline height after a viewport change */
window.addEventListener("resize", function () {
  if (heroResizeTimer) clearTimeout(heroResizeTimer);
  heroResizeTimer = setTimeout(initHeroTypewriter, 200);
});

/* --------------------------- language switch --------------------------- */
function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) return;
  current = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.querySelectorAll(".lang__btn").forEach((b) =>
    b.classList.toggle("is-active", b.dataset.lang === lang));
  renderAll();
  document.querySelectorAll(".reveal").forEach(function (e) {
    e.classList.add("in-view");
    e.style.transitionDelay = "";
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("langSwitch").addEventListener("click", (e) => {
  const btn = e.target.closest(".lang__btn");
  if (btn) setLanguage(btn.dataset.lang);
});

/* --------------------------- staggered reveal (cascade) --------------------------- */
function applyRevealStagger() {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var groups = {};
  document.querySelectorAll(".reveal").forEach(function (el) {
    var par = el.parentElement;
    var idx = groups[par] || 0;
    groups[par] = idx + 1;
    if (idx > 0) el.style.transitionDelay = (Math.min(idx, 10) * 60) + "ms";
  });
}

/* --------------------------- scroll reveal --------------------------- */
let revealObserver;
function observeReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      var past = en.boundingClientRect && en.boundingClientRect.top < 0;
      if (en.isIntersecting || past) {
        en.target.classList.add("in-view");
        var el = en.target;
        setTimeout(function () { el.style.transitionDelay = ""; }, 1200);
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
  /* reduced-motion: skip the count animation, show the final value at once */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = target.toLocaleString() + suffix;
    return;
  }
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
const progress = document.createElement("div");
progress.className = "scroll-progress";
document.body.appendChild(progress);
function updateProgress() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const p = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
  progress.style.width = (p * 100) + "%";
}
window.addEventListener("scroll", () => {
  nav.classList.toggle("nav--scrolled", window.scrollY > 20);
  updateProgress();
}, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

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
    const val = (k) => (d.get(k) || "").toString().trim();
    const name = val("name");
    const email = val("email");
    /* compose: structured brief first, free-text notes after it */
    const parts = [];
    const brief = briefLines();
    if (brief.length) parts.push(brief.join("\n"));
    const notes = val("message");
    if (notes) parts.push(t("build.notes") + ": " + notes);
    const subject = encodeURIComponent("GIRAFSAIL inquiry from " + name);
    const head = "Name: " + name + "\nEmail: " + email;
    const body = encodeURIComponent(head + "\n\n" + (parts.join("\n\n") || "-"));
    window.location.href = "mailto:info@giraf-logistics.com?subject=" + subject + "&body=" + body;
  });
}

/* --------------------------- theme (开灯 / 关灯) --------------------------- */
const THEME_KEY = "giraf_theme";
const THEME_LABEL = {
  en: { off: "Lights off", on: "Lights on", offTitle: "Switch to dark mode", onTitle: "Switch to light mode" },
  zh: { off: "关灯", on: "开灯", offTitle: "切换到夜间模式", onTitle: "切换到日间模式" }
};

function isDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function applyThemeLabel() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const l = THEME_LABEL[current] || THEME_LABEL.en;
  const dark = isDark();
  btn.setAttribute("aria-pressed", dark ? "true" : "false");
  btn.setAttribute("aria-label", dark ? l.onTitle : l.offTitle);
  btn.setAttribute("title", dark ? l.on : l.off);
}

function setTheme(mode) {
  const next = mode === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  applyThemeLabel();
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  document.documentElement.setAttribute("data-theme", saved === "dark" ? "dark" : "light");
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => setTheme(isDark() ? "light" : "dark"));
  }
  applyThemeLabel();
}

/* --------------------------- boot --------------------------- */
initTheme();
document.getElementById("year").textContent = new Date().getFullYear();
document.querySelector('.lang__btn[data-lang="' + current + '"]')
  ?.classList.add("is-active");
initInquiryBuilder();
initChooser();
renderAll();

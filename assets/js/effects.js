/* =====================================================================
 * GIRAF Logistics — effects.js
 * vue-bits-inspired interactions, implemented in vanilla JS/Canvas/CSS.
 * Effects: Aurora hero canvas, Glow Cursor, Card spotlight + animated
 * border-glow, flowing hero routes, dark-section dot field, and the
 * animated logistics-network backdrop on every second-level page banner.
 * Also hosts the footer mascot and the Konami celebration.
 * All effects respect prefers-reduced-motion and pause when off-screen.
 * ===================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* Pause a rAF loop when its host element scrolls out of view. */
  function visibilityPause(el, onShow, onHide) {
    if (!('IntersectionObserver' in window)) return function () {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) onShow(); else onHide();
      });
    }, { threshold: 0.02 });
    io.observe(el);
    return function () { io.disconnect(); };
  }

  /* i18n lookup from inside this closure. main.js owns the global t(), but a
     name may be shadowed locally (a numeric clock named `t`, say) — so reach
     for it on window explicitly and always degrade to a readable fallback. */
  function T(key, fb) {
    try {
      if (typeof window.t === 'function') return window.t(key) || fb || key;
    } catch (e) { /* fall through */ }
    return fb || key;
  }

  /* Small transient pill used by the builder and the easter egg. */
  function toast(msg) {
    if (!msg) return;
    var el = document.createElement('div');
    el.className = 'egg-toast';
    el.setAttribute('role', 'status');
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-on'); });
    setTimeout(function () {
      el.classList.remove('is-on');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 420);
    }, 3200);
  }
  window.__girafToast = toast;
  window.__girafCelebrate = celebrate;

  /* -------------------------------------------------------------------
   * 1. AURORA — drifting colored blobs (lighter compositing) on the hero
   * ----------------------------------------------------------------- */
  function initAurora() {
    var c = document.getElementById('aurora');
    if (!c) return;
    var ctx = c.getContext('2d');
    var w = 0, h = 0, dpr = 1, raf = 0, running = true, blobs = [];
    var palette = [
      [35, 110, 224],  // blue
      [22, 170, 205],  // cyan
      [79, 91, 213],   // indigo
      [232, 163, 61]   // gold (kept faint)
    ];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      var r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = Math.max(1, w * dpr);
      c.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function seed() {
      blobs = palette.map(function (col, i) {
        return {
          col: col,
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.18,
          r: Math.max(w, h) * (0.30 + Math.random() * 0.20),
          a: 0.085 - i * 0.010
        };
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < blobs.length; i++) {
        var b = blobs[i];
        if (running) {
          b.x += b.vx; b.y += b.vy;
          if (b.x < -b.r) b.x = w + b.r; else if (b.x > w + b.r) b.x = -b.r;
          if (b.y < -b.r) b.y = h + b.r; else if (b.y > h + b.r) b.y = -b.r;
        }
        var g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        var c0 = 'rgba(' + b.col[0] + ',' + b.col[1] + ',' + b.col[2] + ',' + b.a + ')';
        g.addColorStop(0, c0);
        g.addColorStop(1, 'rgba(' + b.col[0] + ',' + b.col[1] + ',' + b.col[2] + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
    function loop() {
      draw();
      if (running && !reduce) raf = requestAnimationFrame(loop);
    }

    resize(); seed();
    if (reduce) { draw(); }
    else { loop(); }

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { resize(); seed(); if (reduce) draw(); }, 150);
    });
    visibilityPause(c, function () { running = true; if (!reduce) loop(); },
      function () { running = false; cancelAnimationFrame(raf); });
  }

  /* -------------------------------------------------------------------
   * 2. GLOW CURSOR — soft light that follows the pointer (global)
   * ----------------------------------------------------------------- */
  function initGlowCursor() {
    if (!fine || reduce) return;
    var el = document.createElement('div');
    el.className = 'glow-cursor';
    document.body.appendChild(el);
    var x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, shown = false;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { el.style.opacity = '1'; shown = true; }
    });
    document.addEventListener('pointerleave', function () { el.style.opacity = '0'; shown = false; });
    (function lerp() {
      x += (tx - x) * 0.16; y += (ty - y) * 0.16;
      el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(lerp);
    })();
  }

  /* -------------------------------------------------------------------
   * 3. CARD SPOTLIGHT — mouse-tracking radial highlight on .card
   *    (the animated gradient border is handled purely in CSS)
   * ----------------------------------------------------------------- */
  function initSpotlight() {
    if (!fine) return;
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest(
        '.card, .about-found, .proc-step, .sub-office, .office, .office-card, .about-promise');
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* -------------------------------------------------------------------
   * 4. DOT FIELD — subtle twinkling grid behind the dark network section
   * ----------------------------------------------------------------- */
  function initDotField() {
    var c = document.getElementById('dotfield');
    if (!c) return;
    var ctx = c.getContext('2d');
    var w = 0, h = 0, dpr = 1, raf = 0, running = true, dots = [], gap = 30;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      var r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = Math.max(1, w * dpr);
      c.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }
    function seed() {
      dots = [];
      for (var y = gap / 2; y < h; y += gap) {
        for (var x = gap / 2; x < w; x += gap) {
          dots.push({ x: x, y: y, p: Math.random() * Math.PI * 2, s: 0.4 + Math.random() * 0.6 });
        }
      }
    }
    var t = 0;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var a = (reduce ? 0.35 : (0.18 + 0.22 * (0.5 + 0.5 * Math.sin(t * d.s + d.p)))) * d.s;
        ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function loop() {
      t += 0.02; draw();
      if (running && !reduce) raf = requestAnimationFrame(loop);
    }
    resize();
    if (reduce) draw(); else loop();
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt); rt = setTimeout(resize, 150);
    });
    visibilityPause(c, function () { running = true; if (!reduce) loop(); },
      function () { running = false; cancelAnimationFrame(raf); });
  }

  /* -------------------------------------------------------------------
   * 5. HERO ROUTES — animated flowing dash on the SVG shipping lines
   *    (handled by CSS; nothing to do here besides ensuring the element
   *     exists. Kept for symmetry / future hooks.)
   * ----------------------------------------------------------------- */

  /* -------------------------------------------------------------------
   * 6. HERO NETWORK — animated logistics-network backdrop on every
   *    second-level page banner (.page-hero__canvas[data-hero-network]).
   *    Nodes pulse, near pairs are linked, gold "packets" flow along
   *    links, and particles drift upward. Honors reduced-motion + pauses
   *    off-screen.
   * ----------------------------------------------------------------- */
  function initHeroNetwork() {
    var canvases = document.querySelectorAll('[data-hero-network]');
    if (!canvases.length) return;
    var ACCENTS = {
      blue: [158, 198, 255], gold: [255, 217, 168], cyan: [143, 233, 244],
      violet: [195, 184, 255], green: [143, 240, 212]
    };
    Array.prototype.forEach.call(canvases, function (c) {
      var ctx = c.getContext('2d');
      var w = 0, h = 0, dpr = 1, raf = 0, running = true, t = 0;
      var nodes = [], links = [], packets = [], parts = [];
      var accent = ACCENTS[c.dataset.heroAccent] || ACCENTS.blue;
      var gold = [232, 163, 61]; // gold "cargo" packets stay consistent across pages

      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 1.4);
        var r = c.getBoundingClientRect();
        w = r.width; h = r.height;
        c.width = Math.max(1, w * dpr);
        c.height = Math.max(1, h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seed();
      }
      function seed() {
        nodes = []; links = []; packets = []; parts = [];
        var n = Math.max(14, Math.min(34, Math.round(w / 42)));
        for (var i = 0; i < n; i++) {
          nodes.push({
            x: Math.random() * w, y: Math.random() * h,
            ph: Math.random() * Math.PI * 2, sp: 0.4 + Math.random() * 0.9,
            gold: Math.random() < 0.22, r: 1.5 + Math.random() * 1.8
          });
        }
        var maxD = Math.min(w, h) * 0.44;
        for (var a = 0; a < nodes.length; a++) {
          for (var b = a + 1; b < nodes.length; b++) {
            var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < maxD && Math.random() < 0.5) {
              links.push({ a: a, b: b });
              if (Math.random() < 0.45) {
                packets.push({ a: a, b: b, p: Math.random(), sp: 0.004 + Math.random() * 0.006 });
              }
            }
          }
        }
        var pn = Math.max(10, Math.round(w / 55));
        for (var k = 0; k < pn; k++) {
          parts.push({ x: Math.random() * w, y: Math.random() * h, vy: -(0.15 + Math.random() * 0.35), r: 0.9 + Math.random() * 1.3, ph: Math.random() * Math.PI * 2 });
        }
      }
      function draw() {
        ctx.clearRect(0, 0, w, h);
        // base links
        ctx.lineWidth = 1;
        for (var i = 0; i < links.length; i++) {
          var l = links[i], A = nodes[l.a], B = nodes[l.b];
          var g = ctx.createLinearGradient(A.x, A.y, B.x, B.y);
          g.addColorStop(0, 'rgba(' + accent[0] + ',' + accent[1] + ',' + accent[2] + ',0.18)');
          g.addColorStop(1, 'rgba(' + accent[0] + ',' + accent[1] + ',' + accent[2] + ',0.08)');
          ctx.strokeStyle = g;
          ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
        }
        // flowing dashed overlay
        if (!reduce) {
          ctx.setLineDash([3, 7]);
          ctx.lineDashOffset = -(t * 6) % 14;
          ctx.strokeStyle = 'rgba(' + accent[0] + ',' + accent[1] + ',' + accent[2] + ',0.42)';
          for (var j = 0; j < links.length; j++) {
            var L = links[j], X = nodes[L.a], Y = nodes[L.b];
            ctx.beginPath(); ctx.moveTo(X.x, X.y); ctx.lineTo(Y.x, Y.y); ctx.stroke();
          }
          ctx.setLineDash([]);
        }
        // flowing packets
        if (!reduce) {
          for (var p = 0; p < packets.length; p++) {
            var pk = packets[p], Pa = nodes[pk.a], Pb = nodes[pk.b];
            pk.p += pk.sp; if (pk.p > 1) pk.p -= 1;
            var px = Pa.x + (Pb.x - Pa.x) * pk.p, py = Pa.y + (Pb.y - Pa.y) * pk.p;
            ctx.fillStyle = 'rgba(232,163,61,0.18)';
            ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = 'rgba(232,163,61,0.95)';
            ctx.beginPath(); ctx.arc(px, py, 1.8, 0, Math.PI * 2); ctx.fill();
          }
        }
        // nodes (pulsing glow + core)
        for (var m = 0; m < nodes.length; m++) {
          var nd = nodes[m];
          var pulse = reduce ? 0.6 : (0.55 + 0.45 * Math.sin(t * nd.sp + nd.ph));
          var col = nd.gold ? gold : accent;
          var rr = nd.r * (0.8 + 0.4 * pulse);
          var gl = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, rr * 3.2);
          gl.addColorStop(0, 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (0.72 * pulse).toFixed(3) + ')');
          gl.addColorStop(1, 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',0)');
          ctx.fillStyle = gl;
          ctx.beginPath(); ctx.arc(nd.x, nd.y, rr * 3.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + pulse.toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(nd.x, nd.y, rr, 0, Math.PI * 2); ctx.fill();
        }
        // drifting particles
        for (var q = 0; q < parts.length; q++) {
          var pt = parts[q];
          if (!reduce) { pt.y += pt.vy; if (pt.y < -4) { pt.y = h + 4; pt.x = Math.random() * w; } }
          var pa = 0.42 + 0.33 * Math.sin(t * 0.5 + pt.ph);
          ctx.fillStyle = 'rgba(255,255,255,' + pa.toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2); ctx.fill();
        }
      }
      function loop() { t += 0.016; draw(); if (running && !reduce) raf = requestAnimationFrame(loop); }

      resize();
      if (reduce) draw(); else loop();
      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt); rt = setTimeout(function () { resize(); if (reduce) draw(); }, 150);
      });
      visibilityPause(c, function () { running = true; if (!reduce) loop(); },
        function () { running = false; cancelAnimationFrame(raf); });
    });
  }

  /* -------------------------------------------------------------------
   * 7. PARTICLE TEXT — a word rendered as hundreds of drifting dots that
   *    assemble into the letter shapes, with gentle pointer parallax.
   *    Used as the home-hero kinetic wordmark (data-particle-text="GIRAF").
   * ----------------------------------------------------------------- */
  function initParticleText() {
    var canvases = document.querySelectorAll('[data-particle-text]');
    if (!canvases.length) return;
    Array.prototype.forEach.call(canvases, function (c) {
      var ctx = c.getContext('2d');
      var text = c.dataset.particleText || 'GIRAF';
      var w = 0, h = 0, dpr = 1, raf = 0, running = true, pts = [];
      var mouse = { x: -9999, y: -9999 };

      function build() {
        var off = document.createElement('canvas');
        off.width = Math.max(1, Math.floor(w)); off.height = Math.max(1, Math.floor(h));
        var o = off.getContext('2d');
        var fontSize = Math.min(h * 0.86, (w * 0.82) / text.length * 1.35);
        o.fillStyle = '#fff';
        o.textAlign = 'center'; o.textBaseline = 'middle';
        o.font = '700 ' + fontSize + 'px "Space Grotesk", system-ui, sans-serif';
        o.fillText(text, w / 2, h / 2);
        var data = o.getImageData(0, 0, off.width, off.height).data;
        var step = Math.max(3, Math.round(dpr * 3));
        var targets = [];
        for (var y = 0; y < h; y += step) {
          for (var x = 0; x < w; x += step) {
            var a = data[((Math.floor(y) * off.width + Math.floor(x)) * 4) + 3];
            if (a > 130) targets.push({ x: x, y: y });
          }
        }
        pts = targets.map(function (t) {
          return {
            x: Math.random() * w, y: Math.random() * h,
            tx: t.x, ty: t.y, vx: 0, vy: 0,
            gold: Math.random() < 0.16, c: 0.45 + Math.random() * 0.55
          };
        });
      }
      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 1.4);
        var r = c.getBoundingClientRect();
        w = r.width; h = r.height;
        c.width = Math.max(1, Math.floor(w * dpr));
        c.height = Math.max(1, Math.floor(h * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        build();
      }
      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < pts.length; i++) {
          var p = pts[i];
          if (running && !reduce) {
            p.vx += (p.tx - p.x) * 0.012;
            p.vy += (p.ty - p.y) * 0.012;
            p.vx *= 0.86; p.vy *= 0.86;
            var dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
            if (d2 < 11000 && d2 > 0.01) {
              var f = (11000 - d2) / 11000 * 1.8, d = Math.sqrt(d2);
              p.vx += (dx / d) * f; p.vy += (dy / d) * f;
            }
            p.x += p.vx; p.y += p.vy;
          }
          var col = p.gold ? '232,163,61' : '186,212,255';
          ctx.fillStyle = 'rgba(' + col + ',' + (0.6 * p.c).toFixed(2) + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.gold ? 1.7 : 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      function loop() { draw(); if (running && !reduce) raf = requestAnimationFrame(loop); }

      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      });
      c.addEventListener('pointerleave', function () { mouse.x = -9999; mouse.y = -9999; });

      resize();
      if (reduce) { pts.forEach(function (p) { p.x = p.tx; p.y = p.ty; }); draw(); }
      else loop();
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { if (running) build(); });
      }
      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt); rt = setTimeout(function () {
          resize();
          if (reduce) { pts.forEach(function (p) { p.x = p.tx; p.y = p.ty; }); draw(); }
        }, 150);
      });
      visibilityPause(c, function () { running = true; if (!reduce) loop(); },
        function () { running = false; cancelAnimationFrame(raf); });
    });
  }

  /* -------------------------------------------------------------------
   * 8. NETWORK MAP — self-contained canvas world map (equirectangular
   *    graticule + glowing branch nodes with pulsing radiation rings and
   *    hub-and-spoke cargo arcs). No third-party tiles / API keys; no
   *    borders drawn (compliance). Honors reduced-motion + pauses
   *    off-screen. Hover for city / phone; click a node to pin a detail
   *    panel (region / address / phone / real local time) and pick an A→B
   *    lane that pre-fills an inquiry. All figures are the real branch list.
   * ----------------------------------------------------------------- */
  var NET_TZ = {
    "Los Angeles": "America/Los_Angeles", "Mexico City": "America/Mexico_City",
    "London": "Europe/London", "Hamburg": "Europe/Berlin",
    "Bangkok": "Asia/Bangkok", "Hanoi": "Asia/Ho_Chi_Minh",
    "Ho Chi Minh City": "Asia/Ho_Chi_Minh", "Klang (Malaysia)": "Asia/Kuala_Lumpur",
    "Singapore": "Asia/Singapore", "Riyadh": "Asia/Riyadh", "Casablanca": "Africa/Casablanca",
    "Shenzhen": "Asia/Shanghai", "Shanghai": "Asia/Shanghai", "Ningbo": "Asia/Shanghai",
    "Tianjin": "Asia/Shanghai", "Qingdao": "Asia/Shanghai", "Hefei": "Asia/Shanghai",
    "Xiamen": "Asia/Shanghai", "Foshan": "Asia/Shanghai", "Shunde": "Asia/Shanghai",
    "Guangzhou": "Asia/Shanghai", "Zhongshan": "Asia/Shanghai", "Dongguan": "Asia/Shanghai",
    "Jiangmen": "Asia/Shanghai", "Huizhou": "Asia/Shanghai", "Shantou": "Asia/Shanghai",
    "Zhuhai": "Asia/Shanghai", "Wuhan": "Asia/Shanghai", "Nanjing": "Asia/Shanghai",
    "Chengdu": "Asia/Shanghai", "Changsha": "Asia/Shanghai", "Beijing": "Asia/Shanghai",
    "Chongqing": "Asia/Shanghai"
  };

  function initNetMap() {
    var c = document.getElementById('netmap');
    if (!c) return;
    var wrap = c.parentElement;            // .netmap
    var tip = document.getElementById('netmapTip');
    var hint = wrap.querySelector('.netmap__hint');
    var ctx = c.getContext('2d');
    var w = 0, h = 0, dpr = 1, raf = 0, running = true, t = 0;
    var nodes = [], arcs = [], hoverIdx = -1;
    var pinned = -1, route = { from: -1, to: -1 };
    var LAND = (typeof WORLDMAP !== "undefined") ? WORLDMAP : [];
    var landCanvas = null;

    /* `t` is the numeric animation clock in this scope, so reach the
       global i18n helper (main.js) via window to avoid shadowing. */
    var TR = (typeof window !== 'undefined' && typeof window.t === 'function')
      ? window.t : function (k) { return k; };

    /* detail panel is created here so the page markup stays page-agnostic */
    var panel = document.createElement('div');
    panel.className = 'netmap__panel';
    panel.setAttribute('role', 'status');
    panel.setAttribute('aria-live', 'polite');
    wrap.appendChild(panel);

    // Continent & ocean labels (bilingual). Positioned in lon/lat so they
    // reproject on resize. type controls font treatment.
    var LABELS = [
      { lat: 46, lon: -100, type: 'continent', en: 'NORTH AMERICA', zh: '北美洲' },
      { lat: -14, lon: -62, type: 'continent', en: 'SOUTH AMERICA', zh: '南美洲' },
      { lat: 52, lon: 13,  type: 'continent', en: 'EUROPE', zh: '欧洲' },
      { lat: 8,  lon: 21,  type: 'continent', en: 'AFRICA', zh: '非洲' },
      { lat: 47, lon: 95,  type: 'continent', en: 'ASIA', zh: '亚洲' },
      { lat: -25, lon: 134, type: 'continent', en: 'OCEANIA', zh: '大洋洲' },
      { lat: 30, lon: -35, type: 'ocean', en: 'ATLANTIC OCEAN', zh: '大西洋' },
      { lat: -10, lon: -120, type: 'ocean', en: 'PACIFIC OCEAN', zh: '太平洋' },
      { lat: -12, lon: 78, type: 'ocean', en: 'INDIAN OCEAN', zh: '印度洋' }
    ];

    var LON_MIN = -140, LON_MAX = 155, LAT_MIN = -30, LAT_MAX = 75;
    function project(lat, lon) {
      return {
        x: (lon - LON_MIN) / (LON_MAX - LON_MIN) * w,
        y: (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * h
      };
    }
    function esc(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
      });
    }
    function localTime(city) {
      var tz = NET_TZ[city]; if (!tz) return '';
      try {
        return new Intl.DateTimeFormat((typeof current !== 'undefined' && current === 'zh') ? 'zh-CN' : 'en-GB',
          { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
      } catch (err) { return ''; }
    }
    function build() {
      nodes = [];
      var subs = (typeof DATA !== 'undefined' && DATA[current] && DATA[current].subsidiaries) || [];
      subs.forEach(function (g) {
        (g.items || []).forEach(function (b) {
          if (typeof b.lat === 'number' && typeof b.lon === 'number') {
            nodes.push({ lat: b.lat, lon: b.lon, city: b.city || '', phone: b.phone || '',
              email: b.email || '', address: b.address || '', region: g.region || '' });
          }
        });
      });
      // hub = node nearest to Shenzhen (~114.05, 22.55)
      var hub = 0, best = Infinity;
      nodes.forEach(function (n, i) {
        var d = (n.lat - 22.55) * (n.lat - 22.55) + (n.lon - 114.05) * (n.lon - 114.05);
        if (d < best) { best = d; hub = i; }
      });
      arcs = [];
      for (var i = 0; i < nodes.length; i++) if (i !== hub) arcs.push({ a: hub, b: i });
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      w = c.clientWidth || wrap.clientWidth;
      h = c.clientHeight || Math.round(w / 2);
      c.width = Math.max(1, Math.floor(w * dpr));
      c.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.forEach(function (n) { var p = project(n.lat, n.lon); n.x = p.x; n.y = p.y; });
      renderLandBuffer();
    }
    function drawGraticule() {
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (var lon = -120; lon <= 150; lon += 30) {
        if (lon < LON_MIN || lon > LON_MAX) continue;
        var x = (lon - LON_MIN) / (LON_MAX - LON_MIN) * w;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (var lat = -30; lat <= 60; lat += 30) {
        if (lat < LAT_MIN || lat > LAT_MAX) continue;
        var y = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * h;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(232,163,61,0.18)';
      var eq = (LAT_MAX - 0) / (LAT_MAX - LAT_MIN) * h;
      ctx.beginPath(); ctx.moveTo(0, eq); ctx.lineTo(w, eq); ctx.stroke();
    }
    function renderLandBuffer() {
      if (!LAND.length) { landCanvas = null; return; }
      landCanvas = document.createElement('canvas');
      landCanvas.width = c.width; landCanvas.height = c.height;
      var lc = landCanvas.getContext('2d');
      lc.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (var k = 0; k < LAND.length; k++) {
        var poly = LAND[k]; if (!poly || !poly.length) continue;
        lc.beginPath();
        for (var j = 0; j < poly.length; j++) {
          var p = project(poly[j][1], poly[j][0]);
          if (j === 0) lc.moveTo(p.x, p.y); else lc.lineTo(p.x, p.y);
        }
        lc.closePath();
        lc.fillStyle = 'rgba(30,52,84,0.62)';
        lc.fill();
        lc.strokeStyle = 'rgba(120,160,210,0.40)';
        lc.lineWidth = 1;
        lc.stroke();
      }
    }
    function drawLand() {
      if (landCanvas) ctx.drawImage(landCanvas, 0, 0, w, h);
    }
    function arcPoint(A, B) {
      var mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      var dx = B.x - A.x, dy = B.y - A.y, dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var off = Math.min(dist * 0.16, 70);
      return { cx: mx - dy / dist * off, cy: my + dx / dist * off };
    }
    function drawArcs() {
      var routed = (route.from >= 0 && route.to >= 0);
      for (var i = 0; i < arcs.length; i++) {
        var A = nodes[arcs[i].a], B = nodes[arcs[i].b];
        var c2 = arcPoint(A, B);
        ctx.strokeStyle = 'rgba(120,180,255,' + (routed ? 0.04 : 0.10) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.quadraticCurveTo(c2.cx, c2.cy, B.x, B.y); ctx.stroke();
        if (!reduce && !routed) {
          var p = (t * 0.12 + i * 0.13) % 1;
          var qx = (1 - p) * (1 - p) * A.x + 2 * (1 - p) * p * c2.cx + p * p * B.x;
          var qy = (1 - p) * (1 - p) * A.y + 2 * (1 - p) * p * c2.cy + p * p * B.y;
          ctx.fillStyle = 'rgba(232,163,61,0.95)';
          ctx.beginPath(); ctx.arc(qx, qy, 1.8, 0, Math.PI * 2); ctx.fill();
        }
      }
      if (routed) {
        var A2 = nodes[route.from], B2 = nodes[route.to], c3 = arcPoint(A2, B2);
        ctx.strokeStyle = 'rgba(232,163,61,0.62)';
        ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(A2.x, A2.y); ctx.quadraticCurveTo(c3.cx, c3.cy, B2.x, B2.y); ctx.stroke();
        if (!reduce) {
          var pp = (t * 0.18) % 1;
          var x2 = (1 - pp) * (1 - pp) * A2.x + 2 * (1 - pp) * pp * c3.cx + pp * pp * B2.x;
          var y2 = (1 - pp) * (1 - pp) * A2.y + 2 * (1 - pp) * pp * c3.cy + pp * pp * B2.y;
          ctx.fillStyle = 'rgba(255,255,255,0.95)';
          ctx.beginPath(); ctx.arc(x2, y2, 2.4, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    function drawNodes() {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var on = (i === hoverIdx || i === pinned || i === route.from || i === route.to);
        if (!reduce) {
          var phase = (t * 0.6 + i * 0.7) % 1;
          var rr = phase * 22;
          var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rr);
          g.addColorStop(0, 'rgba(232,163,61,' + (0.32 * (1 - phase)).toFixed(3) + ')');
          g.addColorStop(1, 'rgba(232,163,61,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(n.x, n.y, rr, 0, Math.PI * 2); ctx.fill();
        }
        var col = on ? '255,255,255' : '232,163,61';
        ctx.fillStyle = 'rgba(' + col + ',0.25)';
        ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(' + col + ',0.95)';
        ctx.beginPath(); ctx.arc(n.x, n.y, on ? 4.2 : 2.6, 0, Math.PI * 2); ctx.fill();
        if (i === pinned || i === route.from || i === route.to) {
          ctx.strokeStyle = (i === route.from || i === route.to) ? 'rgba(232,163,61,0.95)' : 'rgba(255,255,255,0.85)';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(n.x, n.y, 9.5, 0, Math.PI * 2); ctx.stroke();
        }
      }
    }
    function drawLabels() {
      var lang = (typeof current !== 'undefined' && current === 'zh') ? 'zh' : 'en';
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      try { ctx.letterSpacing = '2px'; } catch (e) {}
      for (var i = 0; i < LABELS.length; i++) {
        var L = LABELS[i];
        var p = project(L.lat, L.lon);
        if (L.type === 'continent') {
          ctx.font = '600 13px "Segoe UI", system-ui, sans-serif';
          ctx.fillStyle = 'rgba(202,222,246,0.55)';
        } else {
          ctx.font = 'italic 600 14px "Segoe UI", system-ui, sans-serif';
          ctx.fillStyle = 'rgba(150,190,230,0.40)';
        }
        ctx.fillText(L[lang], p.x, p.y);
      }
      ctx.restore();
    }
    function draw() { ctx.clearRect(0, 0, w, h); drawGraticule(); drawLand(); drawLabels(); drawArcs(); drawNodes(); }
    function loop() { t += 0.016; draw(); if (running && !reduce) raf = requestAnimationFrame(loop); }

    function showTip(i) {
      if (!tip) return;
      var n = nodes[i]; if (!n) return;
      var html = '<b>' + esc(n.city) + '</b>';
      if (n.phone) html += '<br><span>' + esc(n.phone) + '</span>';
      tip.innerHTML = html;
      tip.style.left = n.x + 'px';
      tip.style.top = n.y + 'px';
      tip.classList.add('is-on');
    }
    function hideTip() { if (tip) tip.classList.remove('is-on'); }

    function renderPanel() {
      if (hint) hint.classList.toggle('is-off', pinned >= 0);
      if (pinned < 0) { panel.classList.remove('is-on'); panel.innerHTML = ''; return; }
      var n = nodes[pinned];
      var routed = (route.from >= 0 && route.to >= 0);
      var html = '';
      if (routed) {
        var A = nodes[route.from], B = nodes[route.to];
        html += '<h3 class="netmap__lane"><b>' + esc(A.city) + '</b> \u2192 <b>' + esc(B.city) + '</b></h3>';
      } else {
        html += '<h3>' + esc(n.city) + '</h3>';
        if (n.region) html += '<p class="netmap__region">' + esc(n.region) + '</p>';
        var tm = localTime(n.city);
        if (tm) html += '<div class="netmap__row"><span class="netmap__k">' + TR('network.panelTime') +
          '</span><span class="netmap__v" data-tz="' + esc(n.city) + '">' + tm + '</span></div>';
        if (n.phone) html += '<div class="netmap__row"><span class="netmap__k">' + TR('network.panelPhone') +
          '</span><span class="netmap__v"><a href="tel:' + esc(n.phone).replace(/[^0-9+]/g, '') + '">' + esc(n.phone) + '</a></span></div>';
        if (n.address) html += '<p class="netmap__addr">' + esc(n.address) + '</p>';
      }
      var acts = '';
      if (route.from < 0) {
        acts += '<button type="button" class="netmap__btn netmap__btn--gold" data-act="origin">' + TR('network.setOrigin') + '</button>';
        acts += '<button type="button" class="netmap__btn" data-act="close">' + TR('network.clearRoute') + '</button>';
      } else if (!routed) {
        html += '<p class="netmap__pick">' + TR('network.pickDest') + '</p>';
        acts += '<button type="button" class="netmap__btn" data-act="close">' + TR('network.clearRoute') + '</button>';
      } else {
        var subj = 'Lane inquiry: ' + nodes[route.from].city + ' -> ' + nodes[route.to].city;
        var body = 'Origin: ' + nodes[route.from].city + '\nDestination: ' + nodes[route.to].city + '\n\nPlease quote this lane.';
        acts += '<a class="netmap__btn netmap__btn--gold" href="mailto:info@giraf-logistics.com?subject=' +
          encodeURIComponent(subj) + '&body=' + encodeURIComponent(body) + '">' + TR('network.inquireLane') + '</a>';
        acts += '<button type="button" class="netmap__btn" data-act="close">' + TR('network.clearRoute') + '</button>';
      }
      html += '<div class="netmap__acts">' + acts + '</div>';
      panel.innerHTML = html;
      panel.classList.add('is-on');
      Array.prototype.forEach.call(panel.querySelectorAll('[data-act]'), function (b) {
        b.addEventListener('click', function () {
          var a = b.getAttribute('data-act');
          if (a === 'origin') { route.from = pinned; route.to = -1; renderPanel(); }
          else { clearSel(); }
        });
      });
    }
    function clearSel() { pinned = -1; route.from = -1; route.to = -1; hideTip(); renderPanel(); }

    c.addEventListener('pointermove', function (e) {
      if (!fine) return;
      var r = c.getBoundingClientRect();
      var mx = e.clientX - r.left, my = e.clientY - r.top;
      var found = -1, fd = 256;
      for (var i = 0; i < nodes.length; i++) {
        var dx = nodes[i].x - mx, dy = nodes[i].y - my, d2 = dx * dx + dy * dy;
        if (d2 < fd) { fd = d2; found = i; }
      }
      if (found !== hoverIdx) { hoverIdx = found; if (found >= 0) showTip(found); else hideTip(); }
    });
    c.addEventListener('pointerleave', function () { hoverIdx = -1; hideTip(); });
    c.addEventListener('click', function (e) {
      var r = c.getBoundingClientRect();
      var mx = e.clientX - r.left, my = e.clientY - r.top;
      var found = -1, fd = 400;
      for (var i = 0; i < nodes.length; i++) {
        var dx = nodes[i].x - mx, dy = nodes[i].y - my, d2 = dx * dx + dy * dy;
        if (d2 < fd) { fd = d2; found = i; }
      }
      if (found < 0) return;
      if (route.from >= 0 && found !== route.from) { route.to = found; pinned = found; renderPanel(); return; }
      if (pinned === found) { clearSel(); return; }
      pinned = found; route.to = -1; renderPanel();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') clearSel(); });
    var langWrap = document.getElementById('langSwitch');
    if (langWrap) langWrap.addEventListener('click', function () { setTimeout(renderPanel, 0); });
    setInterval(function () {
      if (pinned < 0 || !panel.classList.contains('is-on')) return;
      var el = panel.querySelector('[data-tz]');
      if (el) { var v = localTime(nodes[pinned].city); if (v) el.textContent = v; }
    }, 15000);

    build(); resize();
    if (reduce) draw(); else loop();
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt); rt = setTimeout(function () { resize(); if (reduce) draw(); }, 150);
    });
    visibilityPause(wrap, function () { running = true; if (!reduce) loop(); },
      function () { running = false; cancelAnimationFrame(raf); });
  }

  /* -------------------------------------------------------------------
   * 9. MAGNETIC CTAs — primary buttons drift a few px toward the pointer.
   *    Desktop fine-pointer only; no-op under reduced-motion.
   * ----------------------------------------------------------------- */
  function initMagnetic() {
    if (reduce) return;
    var btns = document.querySelectorAll('.btn--primary, .btn--gold');
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('pointermove', function (e) {
        /* only a real mouse drives the pull; ignore touch / pen drags */
        if (e.pointerType && e.pointerType !== 'mouse') return;
        var r = b.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) / r.width;
        var my = (e.clientY - r.top - r.height / 2) / r.height;
        b.style.setProperty('--mag-x', (mx * 8).toFixed(2) + 'px');
        b.style.setProperty('--mag-y', (my * 6).toFixed(2) + 'px');
      });
      b.addEventListener('pointerleave', function () {
        b.style.setProperty('--mag-x', '0px');
        b.style.setProperty('--mag-y', '0px');
      });
    });
  }

  /* -------------------------------------------------------------------
   * 10. RIPPLE — a soft currentColor wave from the press point on .btn.
   * ----------------------------------------------------------------- */
  function initRipple() {
    if (reduce) return;
    document.addEventListener('pointerdown', function (e) {
      var tgt = e.target;
      var b = tgt && tgt.closest ? tgt.closest('.btn') : null;
      if (!b) return;
      var r = b.getBoundingClientRect();
      var d = Math.max(r.width, r.height);
      var s = document.createElement('span');
      s.className = 'ripple';
      s.style.width = s.style.height = d + 'px';
      s.style.left = (e.clientX - r.left - d / 2) + 'px';
      s.style.top = (e.clientY - r.top - d / 2) + 'px';
      b.appendChild(s);
      setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 620);
    });
  }
  /* -------------------------------------------------------------------
   * 11. MASCOT — a small giraffe in the footer. It is also the keyboard-free
   *     trigger for the easter egg (five clicks), since Konami needs a
   *     physical keyboard and this site is read on phones too.
   * ----------------------------------------------------------------- */
  var MASCOT_SVG =
    '<svg viewBox="6 5.8 24.7 24.7" fill="currentColor" aria-hidden="true">' +
    /* one filled mass: head, neck, body and both legs, so the outline never
       self-closes into a blob at small sizes */
    '<path fill-rule="evenodd" d="M27.1 9.2C27.2 8.5 26.7 7.9 25.9 7.6' +
    'C25.0 7.2 23.5 7.2 22.6 7.6C21.8 7.9 21.4 8.6 21.4 9.7' +
    'C21.0 12.2 19.2 15.2 17.6 17.4C16.1 18.4 13.6 18.8 11.6 19.4' +
    'C10.2 19.8 9.5 20.7 9.7 21.9C9.9 22.9 10.6 23.4 11.7 23.4L12.4 23.4' +
    'L12.1 29.6C12.1 30.2 12.5 30.5 13.0 30.5C13.5 30.5 13.9 30.2 14.0 29.6' +
    'L14.4 23.4L16.6 23.3L16.7 29.6C16.7 30.2 17.1 30.5 17.6 30.5' +
    'C18.1 30.5 18.5 30.2 18.6 29.6L18.7 23.1L19.6 23.0' +
    'C19.9 21.4 20.0 19.6 19.7 18.2C20.0 15.8 21.4 13.1 23.3 10.9' +
    'C24.5 10.5 25.7 10.4 26.3 10.3C26.9 10.1 27.1 9.7 27.1 9.2Z' +
    /* the eye is a hole, so it works on any background */
    'M23.9 8.3A.8.8 0 1 0 23.9 9.9A.8.8 0 1 0 23.9 8.3Z"/>' +
    /* ossicones */
    '<path d="M22.7 7.8 22.5 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
    '<path d="M24.4 7.9 24.2 6.1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
    '</svg>';

  function initMascot() {
    var host = document.querySelector('.footer__brand') || document.querySelector('.footer__bottom');
    if (!host || host.querySelector('.mascot')) return;

    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'mascot';
    b.setAttribute('aria-label', T('egg.mascot', 'GIRAFSAIL mascot'));
    b.innerHTML = MASCOT_SVG;

    /* keep the aria-label in the active language without main.js knowing we exist */
    if ('MutationObserver' in window) {
      new MutationObserver(function () {
        b.setAttribute('aria-label', T('egg.mascot', 'GIRAFSAIL mascot'));
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }

    var n = 0, timer = 0;
    b.addEventListener('click', function () {
      b.classList.remove('is-idle'); /* cancel any pending idle sway */
      b.classList.remove('is-hop');
      void b.offsetWidth;            /* restart the animation */
      b.classList.add('is-hop');
      setTimeout(function () { b.classList.remove('is-hop'); }, 700);
      n++;
      clearTimeout(timer);
      timer = setTimeout(function () { n = 0; }, 1800);
      if (n >= 5) { n = 0; celebrate(); }
    });

    host.appendChild(b);

    /* idle sway: after a few quiet seconds the giraffe gives a little wave */
    if (!reduce) {
      var idleTimer = 0;
      function goIdle() { b.classList.add('is-idle'); }
      function armIdle() { clearTimeout(idleTimer); idleTimer = setTimeout(goIdle, 6000); }
      function wake() { b.classList.remove('is-idle'); armIdle(); }
      ['pointermove', 'keydown', 'click', 'touchstart', 'scroll'].forEach(function (ev) {
        document.addEventListener(ev, wake, { passive: true });
      });
      armIdle();
    }
  }

  /* -------------------------------------------------------------------
   * 12. KONAMI — the classic sequence, plus a one-shot particle burst and a
   *     toast. Under reduced-motion the toast still fires (the joke stays
   *     discoverable) but no particles are drawn.
   * ----------------------------------------------------------------- */
  var SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var celebrating = false;

  function initKonami() {
    var i = 0;
    window.addEventListener('keydown', function (e) {
      var tag = ((e.target && e.target.tagName) || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      var k = e.key || '';
      if (k.length === 1) k = k.toLowerCase();
      if (k === SEQUENCE[i]) {
        i++;
        if (i === SEQUENCE.length) { i = 0; celebrate(); }
      } else {
        i = (k === SEQUENCE[0]) ? 1 : 0;
      }
    });
  }

  /* Type "GIRAF" anywhere (outside form fields) for a golden particle shower. */
  function initTypeEgg() {
    var WORD = 'giraf', buf = '';
    window.addEventListener('keydown', function (e) {
      var tag = ((e.target && e.target.tagName) || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      var k = (e.key || '').toLowerCase();
      if (k.length !== 1 || k < 'a' || k > 'z') return;
      buf = (buf + k).slice(-WORD.length);
      if (buf === WORD) { buf = ''; celebrate(); }
    });
  }

  function celebrate() {
    if (celebrating) return;
    celebrating = true;
    setTimeout(function () { celebrating = false; }, 2400);

    document.documentElement.classList.add('is-celebrating');
    setTimeout(function () { document.documentElement.classList.remove('is-celebrating'); }, 2200);

    if (!reduce) { burst(); patrol(); }
  }

  /* Gold + brand-blue confetti on a throwaway full-screen canvas. */
  function burst() {
    var c = document.createElement('canvas');
    c.className = 'konami-burst';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    var ctx = c.getContext('2d');
    if (!ctx) { if (c.parentNode) c.parentNode.removeChild(c); return; }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var vw = window.innerWidth, vh = window.innerHeight;
    c.width = Math.floor(vw * dpr);
    c.height = Math.floor(vh * dpr);
    c.style.width = vw + 'px';
    c.style.height = vh + 'px';

    var cx = c.width / 2, cy = c.height * 0.42;
    var cols = ['#e8a33d', '#0071e3', '#ffffff', '#c8852a'];
    var ps = [];
    for (var n = 0; n < 150; n++) {
      var a = Math.random() * Math.PI * 2;
      var sp = (2 + Math.random() * 10) * dpr;
      ps.push({
        x: cx, y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 1.4 * dpr,
        r: (1 + Math.random() * 2.8) * dpr,
        col: cols[(Math.random() * cols.length) | 0]
      });
    }

    var LIFE = 1500;
    var start = performance.now();
    function loop(now) {
      var el = now - start;
      ctx.clearRect(0, 0, c.width, c.height);
      var k = Math.max(0, 1 - el / LIFE);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.17 * dpr;
        p.vx *= 0.993; p.vy *= 0.993;
        ctx.globalAlpha = k;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (el < LIFE) requestAnimationFrame(loop);
      else if (c.parentNode) c.parentNode.removeChild(c);
    }
    requestAnimationFrame(loop);
  }

  /* Typing "longsail" launches fireworks from the bottom of the screen.
     Pure motion — suppressed under reduced-motion. */
  function fireworks() {
    if (reduce) return;
    if (document.querySelector('.longsail-fireworks')) return;
    var c = document.createElement('canvas');
    c.className = 'longsail-fireworks';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    var ctx = c.getContext('2d');
    if (!ctx) { if (c.parentNode) c.parentNode.removeChild(c); return; }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = window.innerWidth, H = window.innerHeight;
    c.width = Math.floor(W * dpr);
    c.height = Math.floor(H * dpr);
    c.style.width = W + 'px';
    c.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    var cols = ['#e8a33d', '#0071e3', '#ffffff', '#c8852a', '#7ac0ff'];
    var parts = [], rockets = [];

    function launch() {
      rockets.push({
        x: W * (0.12 + Math.random() * 0.76),
        y: H + 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(7 + Math.random() * 3),
        ty: H * (0.16 + Math.random() * 0.34),
        col: cols[(Math.random() * cols.length) | 0],
        trail: []
      });
    }
    function explode(x, y, col) {
      var n = 36 + (Math.random() * 24 | 0);
      for (var i = 0; i < n; i++) {
        var a = (i / n) * Math.PI * 2 + Math.random() * 0.25;
        var sp = 1.5 + Math.random() * 3.6;
        parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, col: col });
      }
    }

    var start = performance.now(), LIFE = 3700, last = 0, count = 0;
    function loop(now) {
      var el = now - start;
      ctx.clearRect(0, 0, W, H);
      for (var r = rockets.length - 1; r >= 0; r--) {
        var rk = rockets[r];
        rk.x += rk.vx; rk.y += rk.vy; rk.vy += 0.045;
        rk.trail.push(rk.x, rk.y);
        if (rk.trail.length > 20) rk.trail.splice(0, 2);
        for (var t = 0; t < rk.trail.length; t += 2) {
          ctx.globalAlpha = (t / rk.trail.length) * 0.6;
          ctx.fillStyle = rk.col;
          ctx.beginPath();
          ctx.arc(rk.trail[t], rk.trail[t + 1], 1.5, 0, 6.2832);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = rk.col;
        ctx.beginPath();
        ctx.arc(rk.x, rk.y, 2.4, 0, 6.2832);
        ctx.fill();
        if (rk.y <= rk.ty || rk.vy >= 0) { explode(rk.x, rk.y, rk.col); rockets.splice(r, 1); }
      }
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.vx *= 0.985; p.vy *= 0.985;
        p.life -= 0.012;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.1, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (el < 2300 && el - last > 280 && count < 9) { launch(); last = el; count++; }
      if (el < LIFE && (rockets.length || parts.length || el < 2300)) requestAnimationFrame(loop);
      else if (c.parentNode) c.parentNode.removeChild(c);
    }
    requestAnimationFrame(loop);
  }

  /* -------------------------------------------------------------------
   * 13. EASTER-EGG MOTION - tasteful extensions on top of the existing
   *     Konami / mascot celebration. Both are no-ops under reduced-motion.
   * ----------------------------------------------------------------- */

  /* A giraffe laps the viewport once after the celebration fires. */
  function patrol() {
    if (reduce) return;
    if (document.querySelector('.mascot-runner')) return;
    var el = document.createElement('div');
    el.className = 'mascot-runner';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = MASCOT_SVG;
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 2700);
  }

  /* Double-clicking the nav logo showers confetti from the logo. */
  function logoConfetti() {
    if (reduce) return;
    if (document.querySelector('.logo-confetti')) return;
    var c = document.createElement('canvas');
    c.className = 'logo-confetti';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    var ctx = c.getContext('2d');
    if (!ctx) { if (c.parentNode) c.parentNode.removeChild(c); return; }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var vw = window.innerWidth, vh = window.innerHeight;
    c.width = Math.floor(vw * dpr);
    c.height = Math.floor(vh * dpr);
    c.style.width = vw + 'px';
    c.style.height = vh + 'px';

    var logo = document.querySelector('.nav__logo');
    var lr = logo ? logo.getBoundingClientRect() : null;
    var cx = lr ? (lr.left + lr.width / 2) * dpr : c.width / 2;
    var cy = lr ? (lr.top + lr.height / 2) * dpr : c.height * 0.3;
    var cols = ['#e8a33d', '#0071e3', '#ffffff', '#c8852a'];
    var ps = [];
    for (var n = 0; n < 150; n++) {
      var a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3;
      var sp = (3 + Math.random() * 9) * dpr;
      ps.push({
        x: cx, y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: (2 + Math.random() * 3.4) * dpr,
        rot: Math.random() * 6.2832,
        vr: (Math.random() - 0.5) * 0.35,
        col: cols[(Math.random() * cols.length) | 0],
        rect: Math.random() < 0.6
      });
    }

    var LIFE = 1700;
    var start = performance.now();
    function loop(now) {
      var el = now - start;
      ctx.clearRect(0, 0, c.width, c.height);
      var k = Math.max(0, 1 - el / LIFE);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.17 * dpr;
        p.vx *= 0.992; p.vy *= 0.992;
        p.rot += p.vr;
        ctx.save();
        ctx.globalAlpha = k;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.col;
        if (p.rect) ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
        else { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, 6.2832); ctx.fill(); }
        ctx.restore();
      }
      if (el < LIFE) requestAnimationFrame(loop);
      else if (c.parentNode) c.parentNode.removeChild(c);
    }
    requestAnimationFrame(loop);
  }

  function initLogoEgg() {
    var logo = document.querySelector('.nav__logo');
    if (!logo) return;
    var last = 0, navTimer = 0;
    logo.addEventListener('click', function (e) {
      /* leave modifier / middle clicks to the browser (open in new tab, etc.) */
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey ||
          e.shiftKey || e.altKey) return;
      var now = Date.now();
      if (now - last < 350) {
        clearTimeout(navTimer);
        e.preventDefault();
        last = 0;
        logoConfetti();
      } else {
        last = now;
        e.preventDefault();           /* we navigate manually after a grace period */
        var href = logo.getAttribute('href');
        navTimer = setTimeout(function () {
          if (href) window.location.href = href;
        }, 320);
      }
    });
  }

  /* Selecting text inside any page-hero pops a tiny giraffe that hops and fades.
     Under reduced-motion only the static gold selection tint (style.css) shows. */
  function initHeroSelectEgg() {
    if (reduce) return;
    var busy = false;
    function spawn(x, y) {
      if (busy) return;
      busy = true;
      var el = document.createElement('div');
      el.className = 'hero-select-egg';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = MASCOT_SVG;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      document.body.appendChild(el);
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1300);
      setTimeout(function () { busy = false; }, 600);
    }
    function onSelect() {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
      var range = sel.getRangeAt(0);
      var c = range.commonAncestorContainer;
      if (!c || !c.nodeType) return;
      var host = (c.nodeType === 3 ? c.parentElement : c).closest('.page-hero');
      if (!host) return;
      var rects = range.getClientRects();
      if (!rects.length) return;
      var r = rects[rects.length - 1];
      spawn(r.right, r.bottom);
    }
    document.addEventListener('mouseup', function () { setTimeout(onSelect, 0); });
    document.addEventListener('touchend', function () { setTimeout(onSelect, 0); });
  }

  /* Type "longsail" anywhere (outside form fields) to launch fireworks. */
  function initLongsailEgg() {
    var WORD = 'longsail', buf = '';
    window.addEventListener('keydown', function (e) {
      var tag = ((e.target && e.target.tagName) || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      var k = (e.key || '').toLowerCase();
      if (k.length !== 1 || k < 'a' || k > 'z') return;
      buf = (buf + k).slice(-WORD.length);
      if (buf === WORD) { buf = ''; fireworks(); }
    });
  }

  ready(function () {
    initAurora();
    /* Disabled on purpose: the 520px pointer halo and the per-card specular
       both read as a floating smudge of light under the cursor once the cards
       turned frosted. Functions kept above — re-enable by uncommenting. */
    // initGlowCursor();
    // initSpotlight();
    initDotField();
    initHeroNetwork();
    initParticleText();
    initNetMap();
    initMagnetic();
    initRipple();
    initMascot();
    initKonami();
    initTypeEgg();
    initLogoEgg();
    initHeroSelectEgg();
    initLongsailEgg();
  });
})();

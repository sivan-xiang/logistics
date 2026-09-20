/* =====================================================================
 * GIRAF Logistics — effects.js
 * vue-bits-inspired interactions, implemented in vanilla JS/Canvas/CSS.
 * Effects: Aurora hero canvas, Glow Cursor, Card spotlight + animated
 * border-glow, flowing hero routes, dark-section dot field, and the
 * animated logistics-network backdrop on every second-level page banner.
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
          a: 0.20 - i * 0.012
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
      var card = e.target.closest && e.target.closest('.card');
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
          parts.push({ x: Math.random() * w, y: Math.random() * h, vy: -(0.15 + Math.random() * 0.35), r: 0.6 + Math.random() * 1.1, ph: Math.random() * Math.PI * 2 });
        }
      }
      function draw() {
        ctx.clearRect(0, 0, w, h);
        // base links
        ctx.lineWidth = 1;
        for (var i = 0; i < links.length; i++) {
          var l = links[i], A = nodes[l.a], B = nodes[l.b];
          var g = ctx.createLinearGradient(A.x, A.y, B.x, B.y);
          g.addColorStop(0, 'rgba(' + accent[0] + ',' + accent[1] + ',' + accent[2] + ',0.12)');
          g.addColorStop(1, 'rgba(' + accent[0] + ',' + accent[1] + ',' + accent[2] + ',0.05)');
          ctx.strokeStyle = g;
          ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
        }
        // flowing dashed overlay
        if (!reduce) {
          ctx.setLineDash([3, 7]);
          ctx.lineDashOffset = -(t * 6) % 14;
          ctx.strokeStyle = 'rgba(' + accent[0] + ',' + accent[1] + ',' + accent[2] + ',0.30)';
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
          gl.addColorStop(0, 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (0.5 * pulse).toFixed(3) + ')');
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
          var pa = 0.25 + 0.25 * Math.sin(t * 0.5 + pt.ph);
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

  ready(function () {
    initAurora();
    initGlowCursor();
    initSpotlight();
    initDotField();
    initHeroNetwork();
  });
})();

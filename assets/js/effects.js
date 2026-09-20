/* =====================================================================
 * GIRAF Logistics — effects.js
 * vue-bits-inspired interactions, implemented in vanilla JS/Canvas/CSS.
 * Effects: Aurora hero canvas, Glow Cursor, Card spotlight + animated
 * border-glow, flowing hero routes, dark-section dot field.
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

  ready(function () {
    initAurora();
    initGlowCursor();
    initSpotlight();
    initDotField();
  });
})();

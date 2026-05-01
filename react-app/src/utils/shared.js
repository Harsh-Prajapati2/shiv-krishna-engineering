/* Shared Utility Functions */
/* shared.js — Shiv Krishna Engineers */

// ── CURSOR ──
(function() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  if (!cursor || !dot) return;
  let mx = -100, my = -100, cx = -100, cy = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function anim() {
    cx += (mx - cx) * 0.14;
    cy += (my - cy) * 0.14;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    requestAnimationFrame(anim);
  })();
})();

// ── SCROLL PROGRESS + NAV DARK ──
(function() {
  const prog = document.getElementById('progress');
  const nav  = document.getElementById('mainNav');
  if (!prog && !nav) return;
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    const h = document.body.scrollHeight - window.innerHeight;
    if (prog) prog.style.width = (h > 0 ? (s / h * 100) : 0) + '%';
    if (nav)  nav.classList.toggle('dark', s > 120);
  }, { passive: true });
})();

// ── INTERSECTION OBSERVER: .reveal + .reveal-left ──
(function() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = +(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('visible'), delay);
      io.unobserve(el);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left').forEach(el => io.observe(el));
})();

// ── COUNTER ANIMATION ──
(function() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +(el.dataset.target || 0);
      let start = null;
      const dur = 1600;
      (function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => io.observe(el));
})();

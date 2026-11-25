/* article-a.js: interactive patterns for long-form pages. */
(function () {
  document.querySelectorAll('[data-xbeam]').forEach(function (fig) {
    var stops = [
      { beam: '#7FD36B', depth: '36%', heat: .95, abs: '92%', hit: false,
        t: '532 nm, green. Epidermal melanin soaks it up, so the heat lands at the surface. Lifts a sunspot off fair skin; high risk in deeper skin.' },
      { beam: '#E8B04A', depth: '44%', heat: .6, abs: '58%', hit: false,
        t: '755 nm, alexandrite. Still strongly absorbed by melanin. Effective on hair and pigment in lighter skin; needs adjusted settings in III to IV and is high risk at V to VI.' },
      { beam: '#E26A5A', depth: '72%', heat: .12, abs: '12%', hit: true,
        t: '1064 nm, Nd:YAG. Melanin absorbs roughly ten times less, so light passes the epidermis and reaches its target. The backbone of laser care in skin of color.' }
    ];
    var r = fig.querySelector('.xBeam-range'), txt = fig.querySelector('.xBeam-text'), btns = fig.querySelectorAll('.xBeam-stops button');
    function set(i) {
      var s = stops[i];
      fig.style.setProperty('--beam', s.beam); fig.style.setProperty('--depth', s.depth);
      fig.style.setProperty('--heat', s.heat); fig.style.setProperty('--abs', s.abs);
      fig.classList.toggle('is-hit', s.hit); txt.textContent = s.t; r.value = i;
      btns.forEach(function (b, k) { b.setAttribute('aria-checked', k === i); });
    }
    r.addEventListener('input', function () { set(+r.value); });
    btns.forEach(function (b, k) { b.addEventListener('click', function () { set(k); }); });
    set(0);
  });
})();
(function () {
  document.querySelectorAll('.xTabs').forEach(function (t) {
    var bs = t.querySelectorAll('.xTabs-bar button'), ps = t.querySelectorAll('.xTabs-panel');
    function set(i) { bs.forEach(function (b, k) { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; }); ps.forEach(function (p, k) { p.hidden = k !== i; }); }
    bs.forEach(function (b, k) { b.addEventListener('click', function () { set(k); }); });
    set(0);
  });
  document.querySelectorAll('.xQuiz').forEach(function (q) {
    var steps = q.querySelectorAll('.xQuiz-step'), ans = q.querySelectorAll('.xQuiz-ans');
    q.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () {
        var step = b.closest('.xQuiz-step'), go = b.getAttribute('data-go'), idx = [].indexOf.call(steps, step);
        step.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        steps.forEach(function (s, k) { if (k > idx) { s.hidden = s.id !== go; s.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); } });
        ans.forEach(function (a) { a.hidden = a.id !== go; });
      });
    });
    var r = q.querySelector('.xQuiz-reset');
    if (r) r.addEventListener('click', function () { steps.forEach(function (s, k) { s.hidden = k > 0; }); ans.forEach(function (a) { a.hidden = true; }); q.querySelectorAll('button[aria-pressed]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); });
  });


  /* Steps: scroll lights them up in order; click or keyboard picks one */
  document.querySelectorAll('.xSteps').forEach(function (ol) {
    var li = [].slice.call(ol.children); if (li.length < 2) return;
    ol.classList.add('is-live');
    var picked = -1;
    function set(i) { li.forEach(function (x, k) { x.classList.toggle('on', k === i); x.classList.toggle('done', k < i); x.setAttribute('aria-current', k === i ? 'step' : 'false'); }); }
    li.forEach(function (x, k) {
      x.tabIndex = 0;
      x.addEventListener('click', function () { picked = k; set(k); });
      x.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); picked = k; set(k); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); var n = li[Math.min(k + 1, li.length - 1)]; n.focus(); n.click(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); var p = li[Math.max(k - 1, 0)]; p.focus(); p.click(); }
      });
    });
    set(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var tick = false;
    function onScroll() {
      tick = false; if (picked > -1) return;
      var r = ol.getBoundingClientRect(), vh = window.innerHeight;
      var p = (vh * 0.85 - r.top) / (vh * 0.65);
      set(Math.max(0, Math.min(li.length - 1, Math.floor(p * li.length))));
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  });

})();

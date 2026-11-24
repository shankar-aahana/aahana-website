/* Treatment pages: turns "What a session is like" (dl.glance inside a dark
   key band) into an interactive dial. The original list stays in the page
   for no-JS and print; the dial replaces it on screen. */
(function () {
  var dl = document.querySelector('.keyband .glance');
  if (!dl) return;
  var band = dl.closest('.keyband'); band.classList.add('dark', 'tDial-band');
  var items = [].map.call(dl.querySelectorAll(':scope > div'), function (d) {
    return { t: d.querySelector('dt').textContent.trim(), d: d.querySelector('dd').innerHTML };
  });
  var n = items.length; if (n < 3) { band.classList.remove("dark","tDial-band"); return; }
  var NS = 'http://www.w3.org/2000/svg', C = 200, R = 168, gap = 10;
  var wrap = document.createElement('div'); wrap.className = 'tDial';
  var stage = document.createElement('div'); stage.className = 'tDial-stage';
  var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 400 400'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('class', 'tDial-svg');
  var inner = document.createElementNS(NS, 'circle'); inner.setAttribute('cx', C); inner.setAttribute('cy', C); inner.setAttribute('r', R - 26); inner.setAttribute('class', 'tDial-inner'); svg.appendChild(inner);
  var arcs = [], dots = [];
  function pt(a, r) { a = (a - 90) * Math.PI / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; }
  for (var i = 0; i < n; i++) {
    var a0 = i * 360 / n + gap / 2, a1 = (i + 1) * 360 / n - gap / 2, p0 = pt(a0, R), p1 = pt(a1, R);
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', 'M' + p0 + ' A' + R + ' ' + R + ' 0 0 1 ' + p1); path.setAttribute('class', 'tDial-arc'); path.setAttribute('fill', 'none');
    svg.appendChild(path); arcs.push(path);
    var c = pt(a0 - gap / 2, R), dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', c[0]); dot.setAttribute('cy', c[1]); dot.setAttribute('r', 4); dot.setAttribute('class', 'tDial-dot');
    svg.appendChild(dot); dots.push(dot);
  }
  var center = document.createElement('div'); center.className = 'tDial-center'; center.setAttribute('aria-live', 'polite');
  stage.appendChild(svg); stage.appendChild(center);
  var list = document.createElement('div'); list.className = 'tDial-list'; list.setAttribute('role', 'tablist');
  var btns = items.map(function (it, i) {
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab');
    b.innerHTML = '<span>' + String(i + 1).padStart(2, '0') + '</span>' + it.t;
    b.addEventListener('click', function () { stop(); set(i); });
    list.appendChild(b); return b;
  });
  wrap.appendChild(stage); wrap.appendChild(list);
  dl.parentNode.insertBefore(wrap, dl); dl.classList.add('is-dialled');
  var cur = -1, timer = null;
  function set(i) {
    cur = i;
    arcs.forEach(function (p, k) { p.classList.toggle('is-on', k === i); p.classList.toggle('is-past', k < i); });
    dots.forEach(function (p, k) { p.classList.toggle('is-on', k <= i); });
    btns.forEach(function (b, k) { b.classList.toggle('is-on', k === i); b.setAttribute('aria-selected', k === i); });
    center.innerHTML = '<span class="tDial-k">' + String(i + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0') + '</span><strong>' + items[i].t + '</strong><p>' + items[i].d + '</p>';
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  set(0);
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !timer && cur !== -2) timer = setInterval(function () { set((cur + 1) % n); }, 4200);
        else if (!e.isIntersecting) stop();
      });
    }, { threshold: .4 }).observe(wrap);
    wrap.addEventListener('pointerenter', function () { stop(); cur = cur; });
  }
})();

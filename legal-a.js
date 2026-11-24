/* Privacy, Notice of Privacy Practices, Accessibility: a reader.
   Numbered sections, a sticky contents rail with progress on desktop,
   a slim "section n of N" bar with a contents sheet on phones, and the
   rights under a heading grouped into cards. Wording untouched. */
(function () {
  var inner = document.querySelector('.article-body .article-inner'); if (!inner) return;
  var hs = [].slice.call(inner.querySelectorAll(':scope > h2')); if (hs.length < 4) return;
  document.body.classList.add('legalA');
  hs.forEach(function (h, i) {
    if (!h.id) h.id = 's-' + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    var n = document.createElement('span'); n.className = 'lNum'; n.setAttribute('aria-hidden', 'true'); n.textContent = String(i + 1).padStart(2, '0');
    h.insertBefore(n, h.firstChild);
  });
  /* group h3 + its paragraphs into cards */
  [].slice.call(inner.querySelectorAll(':scope > h3')).forEach(function (h3) {
    var card = document.createElement('div'); card.className = 'lCard';
    h3.parentNode.insertBefore(card, h3);
    var el = h3; 
    while (el && el.tagName !== 'H2' && el.tagName !== 'H3' || el === h3) {
      var next = el.nextElementSibling; card.appendChild(el); el = next;
      if (!el || el.tagName === 'H2' || el.tagName === 'H3') break;
    }
  });
  [].slice.call(inner.querySelectorAll(':scope > .lCard')).forEach(function (c) {
    var prev = c.previousElementSibling;
    if (prev && prev.classList.contains('lCards')) { prev.appendChild(c); return; }
    var w = document.createElement('div'); w.className = 'lCards'; c.parentNode.insertBefore(w, c); w.appendChild(c);
  });
  /* contents rail */
  var rail = document.createElement('div'); rail.className = 'lRail'; rail.setAttribute('role', 'navigation'); rail.setAttribute('aria-label', 'On this page');
  var title = '<span class="lRail-k">On this page</span><span class="lRail-bar"><i></i></span>';
  var list = '<ol>' + hs.map(function (h, i) {
    return '<li><a href="#' + h.id + '"><span>' + String(i + 1).padStart(2, '0') + '</span>' + h.textContent.replace(/^\d\d/, '') + '</a></li>';
  }).join('') + '</ol>';
  rail.innerHTML = title + list;
  var mob = document.createElement('div'); mob.className = 'lMob';
  mob.innerHTML = '<button type="button" class="lMob-btn" aria-expanded="false"><span class="lMob-n">01 / ' + String(hs.length).padStart(2, '0') + '</span><span class="lMob-t"></span><span class="lMob-c">Contents</span></button><span class="lMob-bar"><i></i></span><div class="lMob-sheet">' + list + '</div>';
  inner.parentNode.insertBefore(rail, inner); document.body.appendChild(mob);
  var btn = mob.querySelector('.lMob-btn');
  btn.addEventListener('click', function () { var o = mob.classList.toggle('is-open'); btn.setAttribute('aria-expanded', o); });
  mob.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { mob.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }); });
  var links = [].slice.call(rail.querySelectorAll('a')), mlinks = [].slice.call(mob.querySelectorAll('a'));
  var body = document.querySelector('.article-body');
  function onScroll() {
    var y = window.scrollY + window.innerHeight * .35, cur = 0;
    hs.forEach(function (h, i) { if (h.getBoundingClientRect().top + window.scrollY <= y) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('is-on', i === cur); });
    mlinks.forEach(function (a, i) { a.classList.toggle('is-on', i === cur); });
    mob.querySelector('.lMob-n').textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(hs.length).padStart(2, '0');
    mob.querySelector('.lMob-t').textContent = hs[cur].textContent.replace(/^\d\d/, '');
    var r = body.getBoundingClientRect(), p = Math.min(1, Math.max(0, (window.innerHeight * .4 - r.top) / r.height));
    rail.querySelector('.lRail-bar i').style.height = (p * 100) + '%';
    mob.querySelector('.lMob-bar i').style.width = (p * 100) + '%';
    mob.classList.toggle('is-shown', r.top < 60 && r.bottom > 200);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();

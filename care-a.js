/* Care instructions, Direction A: a treatment picker (category chips +
   photo tiles) above the sheets, photo thumbnails on each treatment, and
   the sections of an open treatment shown as a numbered path. The plain
   list and all content stay in the page for print and no-JS. */
(function () {
  var img = {
    botox:'tx-botox-dysport-hero.jpg', fillers:'tx-dermal-fillers-hero.jpg', biostimulators:'tx-biostimulators-hero.jpg',
    skinvive:'tx-skinvive-hero.jpg', 'prp-skin':'tx-prp-skin-hero.jpg', 'prp-under-eye':'tx-prp-under-eye-hero.jpg',
    'prp-hair':'tx-prp-hair-hero.jpg', 'prp-microneedling':'tx-prp-microneedling-hero.jpg', aerolase:'tx-aerolase-neo-elite-hero.jpg',
    xerf:'tx-xerf-hero.jpg', microneedling:'tx-microneedling-hero.jpg',
    hydrafacial:'tx-hydrafacial-hero.jpg', 'vi-peel':'tx-vi-peel-hero.jpg', 'weight-loss':'tx-medical-weight-loss-hero.jpg',
    'sexual-wellness':'tx-sexual-wellness-hero.jpg', sphincter:'tx-painful-anal-sex-hero.jpg', headache:'tx-migraine-headache-hero.jpg'
  };
  var jump = document.querySelector('.jump'); if (!jump) return;
  var groups = [].map.call(jump.querySelectorAll('.jgroup'), function (g) {
    return { name: g.querySelector('h3').textContent, items: [].map.call(g.querySelectorAll('a'), function (a) {
      var id = a.getAttribute('href').slice(1), art = document.getElementById(id);
      var meta = art && art.querySelector('.txmeta');
      return { id: id, name: a.textContent, meta: meta ? meta.textContent : '' };
    }) };
  });

  /* picker */
  var pick = document.createElement('div'); pick.className = 'cPick';
  var tabs = document.createElement('div'); tabs.className = 'cPick-tabs'; tabs.setAttribute('role', 'tablist');
  var grid = document.createElement('div'); grid.className = 'cPick-grid';
  var cats = ['All'].concat(groups.map(function (g) { return g.name; }));
  cats.forEach(function (c, i) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = c; b.setAttribute('role', 'tab');
    if (!i) b.classList.add('is-on');
    b.addEventListener('click', function () {
      [].forEach.call(tabs.children, function (t) { t.classList.toggle('is-on', t === b); });
      [].forEach.call(grid.children, function (t) { t.hidden = !(c === 'All' || t.dataset.cat === c); });
      b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    });
    tabs.appendChild(b);
  });
  groups.forEach(function (g) {
    g.items.forEach(function (it) {
      var a = document.createElement('a'); a.href = '#' + it.id; a.className = 'cTile'; a.dataset.cat = g.name;
      a.innerHTML = '<span class="cTile-img" style="background-image:url(\'' + (img[it.id] || '') + '\')"></span>' +
        '<span class="cTile-cat">' + g.name + '</span><span class="cTile-name">' + it.name + '</span>' +
        '<span class="cTile-meta">' + it.meta + '</span>';
      a.addEventListener('click', function (e) { e.preventDefault(); go(it.id); history.replaceState(null, '', '#' + it.id); });
      grid.appendChild(a);
    });
  });
  pick.appendChild(tabs); pick.appendChild(grid);
  var grid0 = jump.querySelector('.jgrid'); grid0.parentNode.insertBefore(pick, grid0); grid0.classList.add('is-replaced');

  function go(id) {
    var el = document.getElementById(id); if (!el) return;
    document.querySelectorAll('.txwrap[open]').forEach(function (d) { if (!el.contains(d)) d.open = false; });
    var d = el.querySelector('.txwrap'); if (d) d.open = true;
    var first = el.querySelector('details.sec'); if (first) first.open = true;
    setTimeout(function () { el.scrollIntoView({ block: 'start', behavior: 'smooth' }); }, 30);
  }

  /* thumbnails + numbered sections in each treatment */
  document.querySelectorAll('article.tx').forEach(function (art) {
    var s = art.querySelector('.txwrap > summary');
    if (s && img[art.id]) { var t = document.createElement('span'); t.className = 'txthumb'; t.style.backgroundImage = "url('" + img[art.id] + "')"; t.setAttribute('aria-hidden', 'true'); s.insertBefore(t, s.firstChild); }
    var n = 0;
    art.querySelectorAll('details.sec > summary').forEach(function (sm) {
      n++; var k = document.createElement('span'); k.className = 'secnum'; k.setAttribute('aria-hidden', 'true');
      k.textContent = sm.parentNode.classList.contains('urgent') ? '!' : String(n).padStart(2, '0');
      sm.insertBefore(k, sm.firstChild);
    });
  });
})();

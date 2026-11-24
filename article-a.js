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

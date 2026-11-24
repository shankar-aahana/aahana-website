/* Single care sheets (care-*.html): photo in the header and the sections
   as a numbered path, matching the all-in-one care page. Content untouched. */
(function () {
  var img = {
    'care-botox':'tx-botox-dysport-hero.jpg', 'care-fillers':'tx-dermal-fillers-hero.jpg', 'care-biostimulators':'tx-biostimulators-hero.jpg',
    'care-skinvive':'tx-skinvive-hero.jpg', 'care-prp-skin':'tx-prp-skin-hero.jpg', 'care-prp-under-eye':'tx-prp-under-eye-hero.jpg',
    'care-prp-hair':'tx-prp-hair-hero.jpg', 'care-prp-microneedling':'tx-prp-microneedling-hero.jpg', 'care-aerolase':'tx-aerolase-neo-elite-hero.jpg',
    'care-xerf':'tx-xerf-hero.jpg', 'care-microneedling':'tx-microneedling-hero.jpg', 'care-hydrafacial':'tx-hydrafacial-hero.jpg',
    'care-vi-peel':'tx-vi-peel-hero.jpg', 'care-weight-loss':'tx-medical-weight-loss-hero.jpg', 'care-sexual-wellness':'tx-sexual-wellness-hero.jpg',
    'care-sphincter':'tx-painful-anal-sex-hero.jpg', 'care-headache':'tx-migraine-headache-hero.jpg'
  };
  var key = location.pathname.split('/').pop().replace(/\.html$/, '');
  var head = document.querySelector('.sheet-head');
  if (head && img[key]) {
    var p = document.createElement('span'); p.className = 'oneThumb'; p.setAttribute('aria-hidden', 'true');
    p.style.backgroundImage = "url('" + img[key] + "')"; head.appendChild(p); head.classList.add('has-thumb');
  }
  var n = 0;
  document.querySelectorAll('.sheet.single > details.sec > summary').forEach(function (sm) {
    n++; var k = document.createElement('span'); k.className = 'secnum'; k.setAttribute('aria-hidden', 'true');
    k.textContent = sm.parentNode.classList.contains('urgent') ? '!' : String(n).padStart(2, '0');
    sm.insertBefore(k, sm.firstChild);
  });
})();

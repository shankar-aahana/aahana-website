/* ============================================================
   Aahana shared footer
   ------------------------------------------------------------
   This file is the ONLY place the site footer is defined.
   Edit the values below and every page updates at once.
   Styles live in footer.css.
   ============================================================ */

(function () {

  var TAGLINE  = 'Physician-led medical aesthetics, grounded in precision medicine. ' +
                 'We treat more than what we see. Opening San Francisco, 2026.';
  var MEANING  = 'Aahana · आहान · first light of dawn';
  var ADDRESS  = '2175 3rd Street, Unit C1<br>San Francisco, CA 94107';
  var HOURS    = 'Hours: coming soon';
  var EMAIL    = 'hello@aahanaskin.com';
  var LEGAL    = '© 2026 Aahana Medical Aesthetics · Dr. Shankar Mundluru MD MBA · San Francisco, CA';
  var DOMAIN   = 'aahanasf.com';
  var TALLY_ID = 'kdJBYJ';

  document.write(
    '<footer class="section-footer">' +
      '<div class="footer-top">' +
        '<div>' +
          '<div class="footer-brand-name">AAHANA</div>' +
          '<div class="footer-brand-sub">Medical Aesthetics</div>' +
          '<div class="footer-name-meaning">' + MEANING + '</div>' +
          '<p class="footer-tagline">' + TAGLINE + '</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h5>Location</h5>' +
          '<address>' + ADDRESS + '<br><br>' + HOURS + '</address>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h5>Contact</h5>' +
          '<p>' +
            '<button class="footer-waitlist" data-tally-open="' + TALLY_ID + '" data-tally-overlay="1">Join the waitlist</button>' +
            '<br><br>' +
            '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
          '</p>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div class="footer-legal">' + LEGAL + '</div>' +
        '<div class="footer-dot"></div>' +
        '<div class="footer-legal">' + DOMAIN + '</div>' +
      '</div>' +
    '</footer>'
  );

})();

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
  var HOURS    = 'Hours: by appointment';
  var EMAIL    = 'hello@aahanaskin.com';
  var LEGAL    = '© 2026 Aahana Medical Aesthetics · Dr. Shankar Mundluru MD MBA · San Francisco, CA';
  var DOMAIN   = 'aahanasf.com';
  var INSTAGRAM = 'https://www.instagram.com/aahanaskin/';
  var IG_HANDLE = '@aahanaskin';
  /* Inline so the footer pulls in no icon font and no third-party asset. */
  var IG_GLYPH = '<svg class="ig-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4"/>' +
      '<circle cx="12" cy="12" r="4.3"/>' +
      '<circle cx="17.5" cy="6.5" r="1.25" class="ig-dot"/>' +
    '</svg>';
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
          '<h2>Location</h2>' +
          '<address>' + ADDRESS + '<br><br>' + HOURS + '</address>' +
          '<p><a href="contact.html">Getting here</a></p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h2>Contact</h2>' +
          '<p>' +
            '<button class="footer-waitlist" data-tally-open="' + TALLY_ID + '" data-tally-overlay="1">Join the waitlist</button>' +
            '<br><br>' +
            '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
            '<br><br>' +
            '<a class="footer-ig" href="' + INSTAGRAM + '" rel="me noopener" aria-label="Aahana on Instagram">' + IG_GLYPH + '<span>' + IG_HANDLE + '</span></a>' +
          '</p>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div class="footer-legal">' + LEGAL + '</div>' +
        '<div class="footer-dot"></div>' +
        '<a class="footer-legal footer-legal-link" href="privacy.html">Privacy Policy</a>' +
        '<div class="footer-dot"></div>' +
        '<a class="footer-legal footer-legal-link" href="notice-of-privacy-practices.html">Notice of Privacy Practices</a>' +
        '<div class="footer-dot"></div>' +
        '<a class="footer-legal footer-legal-link" href="accessibility.html">Accessibility</a>' +
        '<div class="footer-dot"></div>' +
        '<div class="footer-legal">' + DOMAIN + '</div>' +
      '</div>' +
    '</footer>'
  );

})();

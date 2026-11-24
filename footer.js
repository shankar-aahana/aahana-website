/* ============================================================
   Aahana shared footer
   ------------------------------------------------------------
   This file is the ONLY place the site footer is defined.
   Edit the values below and every page updates at once.
   Styles live in footer.css.
   ============================================================ */

(function () {

  var TAGLINE  = 'Physician-led medical aesthetics, grounded in precision medicine. ' +
                 'Care, seen clearly. Opening San Francisco, early 2027.';
  var MEANING  = 'Aahana · आहान · first light of dawn';
  var ADDRESS  = '2175 3rd Street, Unit C1<br>San Francisco, CA 94107';
  var ADDRESS2 = '125 Railroad Avenue, Suite 206<br>Danville, CA 94526';
  var HOURS    = 'Opening early 2027';
  var PHONE    = '415-691-7603';
  var PHONE_E164 = '+14156917603';
  var EMAIL    = 'hello@aahanaskin.com';
  var LEGAL    = '© 2026 Aahana Medical Aesthetics · Dr. Shankar Mundluru MD MBA · CA license A153775 · San Francisco, CA';
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

  var MONO = "class=\"f-label\"";
  document.write(
    '<footer class="section-footer">' +
      '<div class="f-top">' +
        '<div class="f-intro">' +
          '<p class="f-tagline">' + TAGLINE + '</p>' +
          '<button class="f-cta footer-waitlist" data-tally-open="' + TALLY_ID + '" data-tally-overlay="1">Join the waitlist' +
            '<svg viewBox="0 0 34 12" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M0 6h33M28 1l5 5-5 5"/></svg></button>' +
        '</div>' +
        '<div class="f-col">' +
          '<h2 ' + MONO + '>Locations</h2>' +
          /* Two addresses need labels or they read as one long block. The
             label above each says which is the clinic and which is the
             stopgap, so nobody turns up in Dogpatch before it opens. */
          '<p class="f-loc">The clinic, opening early 2027</p>' +
          '<address>' + ADDRESS + '</address>' +
          '<p class="f-loc">Until then, <a href="xerf.html#book">XERF in the East Bay</a></p>' +
          '<address>' + ADDRESS2 + '</address>' +
        '</div>' +
        '<div class="f-col">' +
          '<h2 ' + MONO + '>Contact</h2>' +
          '<ul class="f-list">' +
            '<li><span class="f-note">Text or call</span><a href="tel:' + PHONE_E164 + '">' + PHONE + '</a></li>' +
            '<li><span class="f-note">Email</span><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
            '<li><span class="f-note">Instagram</span><a class="footer-ig" href="' + INSTAGRAM + '" rel="me noopener" aria-label="' + IG_HANDLE + ' on Instagram">' + IG_GLYPH + '<span>' + IG_HANDLE + '</span></a></li>' +
          '</ul>' +
        '</div>' +
        /* Patients. The care sheets are open to anyone with the link but stay
           noindex: the same instructions are already on the treatment pages,
           where they earn their search traffic, and two indexed copies would
           compete with each other. rel=nofollow for the same reason. */
        '<div class="f-col">' +
          '<h2 ' + MONO + '>Explore</h2>' +
          '<ul class="f-list f-links">' +
            '<li><a href="services.html">Services</a></li>' +
            '<li><a href="about.html">Dr. Mundluru</a></li>' +
            '<li><a href="journal.html">Daybreak</a></li>' +
            '<li><a href="care.html" rel="nofollow">Care instructions</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="f-word" aria-hidden="true">aahana</div>' +
      '<div class="f-bottom">' +
        '<p class="f-legal">' + LEGAL + '</p>' +
        '<p class="f-meaning">' + MEANING + '</p>' +
        '<div class="f-legal-links" role="navigation" aria-label="Legal">' +
          '<a class="footer-legal" href="privacy.html">Privacy Policy</a>' +
          '<a class="footer-legal" href="notice-of-privacy-practices.html">Notice of Privacy Practices</a>' +
          '<a class="footer-legal" href="accessibility.html">Accessibility</a>' +
        '</div>' +
      '</div>' +
    '</footer>'
  );

})();

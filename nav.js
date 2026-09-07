/* ============================================================
   Aahana shared navigation
   ------------------------------------------------------------
   This file is the ONLY place the site navigation is defined.
   Edit the two lists below and every page updates at once.

   To add a Daybreak category, add one line to DAYBREAK_CATEGORIES.
   To add a treatment page, add one line to the right group below.
   ============================================================ */

(function () {

  /* ============================================================
     BOOKING
     ------------------------------------------------------------
     Leave this empty and every button on the site says
     "Join the waitlist" and opens the waitlist form.

     When online booking is live, paste the booking link between
     the quotes below. Every button on every page then switches to
     "Book a visit" and points at it. Nothing else changes.
     ============================================================ */
  var BOOKING_URL = '';

  var CTA_LABEL = BOOKING_URL ? 'Book a visit' : 'Join the waitlist';


  var PRACTICE_LINKS = [
    { label: 'Dr. Shankar',       href: 'about.html' },
    { label: 'Precision medicine', href: 'precision.html' },
    { label: 'Prakriti',           href: 'prakriti.html' }
  ];

  /* The services landing page, shown above the divider. */
  var SERVICES_MAIN = { label: 'All services', href: 'services.html' };

  /* Individual treatment pages. Add one line here as each ships. */
  var SERVICES_GROUPS = [
    { group: 'Injectables',     links: [
        { label: 'Botox & Dysport', href: 'botox-dysport.html' },
        { label: 'Dermal fillers',  href: 'dermal-fillers.html' },
        { label: 'Biostimulators',  href: 'biostimulators.html' },
        { label: 'PRP',             href: 'prp.html' }
      ] },
    { group: 'Lasers & energy', links: [
        { label: 'Aerolase Neo Elite', href: 'aerolase-neo-elite.html' },
        { label: 'XERF',               href: 'xerf.html' }
      ] },
    { group: 'Skin treatments', links: [
        { label: 'Microneedling', href: 'microneedling.html' },
        { label: 'VI Peel',      href: 'vi-peel.html' },
        { label: 'Hydrafacial',  href: 'hydrafacial.html' }
      ] },
    { group: 'Wellness',        links: [
        { label: 'Medical weight loss', href: 'medical-weight-loss.html' },
        { label: 'Sexual wellness',    href: 'sexual-wellness.html' }
      ] }
  ];

  /* The Daybreak landing page. Sits at the top of the menu, above a
     divider, so it reads as the section rather than one category in it. */
  var DAYBREAK_MAIN = { label: 'All articles', href: 'journal.html' };

  /* The categories below the divider. To add one, add a line here. */
  var DAYBREAK_CATEGORIES = [
    { label: 'Well aging',         href: 'journal.html#well-aging' },
    { label: 'Skin of color',      href: 'journal.html#skin-of-color' },
    { label: 'LGBTQ+ health',      href: 'journal.html#lgbtq' },
    { label: 'Precision medicine', href: 'journal.html#precision' },
    { label: 'Ayurveda',           href: 'journal.html#ayurveda' },
    { label: 'Sexual health',      href: 'journal.html#sexual-health' }
  ];

  /* ---------- markup ---------- */

  function desktopItems(links) {
    return links.map(function (l) {
      return '<a class="dropdown-item" href="' + l.href + '">' + l.label + '</a>';
    }).join('\n        ');
  }

  function serviceColumns() {
    return SERVICES_GROUPS.map(function (g) {
      var items = g.links.length
        ? desktopItems(g.links)
        : '<div class="dropdown-item" style="opacity:.4;cursor:default">Coming soon</div>';
      return '<div class="dropdown-col"><div class="dropdown-label">' + g.group + '</div>' + items + '</div>';
    }).join('');
  }

  function serviceGroupsMobile() {
    return SERVICES_GROUPS.map(function (g) {
      var items = g.links.length ? panelItems(g.links)
                                 : '<span class="disabled">Coming soon</span>';
      return '<span class="mobile-panel-label">' + g.group + '</span>' + items;
    }).join('');
  }

  function panelItems(links) {
    return links.map(function (l) {
      return '<a href="' + l.href + '">' + l.label + '</a>';
    }).join('\n      ');
  }

  var NAV_HTML =
    '<nav id="nav">' +
      '<a href="index.html" class="nav-brand">' +
        '<div class="nav-name">AAHANA</div>' +
        '<div class="nav-sub">Medical Aesthetics</div>' +
      '</a>' +
      '<ul class="nav-links">' +
        '<li class="nav-item">' +
          '<a class="nav-link" href="#" onclick="toggleNav(event)">The Practice <span class="chevron">▼</span></a>' +
          '<div class="dropdown">' + desktopItems(PRACTICE_LINKS) + '</div>' +
        '</li>' +
        '<li class="nav-item">' +
          '<a class="nav-link" href="#" onclick="toggleNav(event)">Services <span class="chevron">▼</span></a>' +
          '<div class="dropdown dropdown-wide">' +
            '<a class="dropdown-item lead" href="' + SERVICES_MAIN.href + '">' + SERVICES_MAIN.label + '</a>' +
            '<div class="dropdown-divider"></div>' +
            '<div class="dropdown-cols">' + serviceColumns() + '</div>' +
          '</div>' +
        '</li>' +
        '<li class="nav-item">' +
          '<a class="nav-link" href="#" onclick="toggleNav(event)">Daybreak <span class="chevron">▼</span></a>' +
          '<div class="dropdown">' +
            '<a class="dropdown-item lead" href="' + DAYBREAK_MAIN.href + '">' + DAYBREAK_MAIN.label + '</a>' +
            '<div class="dropdown-divider"></div>' +
            '<div class="dropdown-label">Browse by category</div>' +
            desktopItems(DAYBREAK_CATEGORIES) +
          '</div>' +
        '</li>' +
      '</ul>' +
      '<button data-tally-open="kdJBYJ" data-tally-overlay="1" class="nav-cta">' + CTA_LABEL + '</button>' +
      '<button class="nav-hamburger" id="navHamburger" aria-label="Open menu" onclick="toggleMobileMenu()">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>';

  var MOBILE_HTML =
    '<div class="mobile-menu" id="mobileMenu">' +
      '<div class="mobile-menu-panels">' +
        '<div class="mobile-panel main" id="mobilePanelMain">' +
          '<button class="mobile-panel-item" onclick="showSubmenu(\'practice\')">The Practice <span class="arrow">›</span></button>' +
          '<button class="mobile-panel-item" onclick="showSubmenu(\'services\')">Services <span class="arrow">›</span></button>' +
          '<button class="mobile-panel-item" onclick="showSubmenu(\'journal\')">Daybreak <span class="arrow">›</span></button>' +
        '</div>' +
        '<div class="mobile-panel" id="mobilePanelPractice">' +
          '<button class="mobile-panel-back" onclick="hideSubmenu()"><span class="back-arrow">‹</span> Back</button>' +
          '<div class="mobile-panel-title">The Practice</div>' + panelItems(PRACTICE_LINKS) +
        '</div>' +
        '<div class="mobile-panel" id="mobilePanelServices">' +
          '<button class="mobile-panel-back" onclick="hideSubmenu()"><span class="back-arrow">‹</span> Back</button>' +
          '<div class="mobile-panel-title">Services</div>' +
          '<a class="lead" href="' + SERVICES_MAIN.href + '">' + SERVICES_MAIN.label + '</a>' +
          serviceGroupsMobile() +
        '</div>' +
        '<div class="mobile-panel" id="mobilePanelJournal">' +
          '<button class="mobile-panel-back" onclick="hideSubmenu()"><span class="back-arrow">‹</span> Back</button>' +
          '<div class="mobile-panel-title">Daybreak</div>' +
          '<a class="lead" href="' + DAYBREAK_MAIN.href + '">' + DAYBREAK_MAIN.label + '</a>' +
          '<span class="mobile-panel-label">Browse by category</span>' +
          panelItems(DAYBREAK_CATEGORIES) +
        '</div>' +
      '</div>' +
      '<div class="mobile-menu-cta">' +
        '<button data-tally-open="kdJBYJ" data-tally-overlay="1">' + CTA_LABEL + '</button>' +
      '</div>' +
    '</div>';

  /* ---------- inject ---------- */

  document.write(NAV_HTML + MOBILE_HTML);

  /* ---------- behaviour ---------- */

  window.toggleMobileMenu = function () {
    var menu = document.getElementById('mobileMenu');
    var hamburger = document.getElementById('navHamburger');
    var isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
    if (isOpen) setTimeout(hideSubmenu, 300);
  };

  window.showSubmenu = function (name) {
    var menu = document.getElementById('mobileMenu');
    var ids = {
      practice: 'mobilePanelPractice',
      services: 'mobilePanelServices',
      journal:  'mobilePanelJournal'
    };
    document.querySelectorAll('.mobile-panel').forEach(function (p) {
      if (!p.classList.contains('main')) p.classList.remove('active');
    });
    var panel = document.getElementById(ids[name]);
    if (panel) {
      panel.classList.add('active');
      menu.classList.add('subactive');
      panel.scrollTop = 0;
    }
  };

  window.hideSubmenu = function () {
    var menu = document.getElementById('mobileMenu');
    if (!menu) return;
    menu.classList.remove('subactive');
    document.querySelectorAll('.mobile-panel').forEach(function (p) {
      if (!p.classList.contains('main')) p.classList.remove('active');
    });
  };

  window.toggleNav = function (e) {
    e.preventDefault();
    e.stopPropagation();
    var item = e.currentTarget.closest('.nav-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.nav-item').forEach(function (i) { i.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  };

  document.addEventListener('DOMContentLoaded', function () {

    /* If BOOKING_URL is set, retarget and relabel every waitlist button
       on the page, including the one at the bottom. */
    if (BOOKING_URL) {
      document.querySelectorAll('[data-tally-open], .cta-btn').forEach(function (b) {
        b.removeAttribute('data-tally-open');
        b.removeAttribute('data-tally-overlay');
        b.textContent = CTA_LABEL;
        b.addEventListener('click', function () { window.location.href = BOOKING_URL; });
      });
    }

    /* ------------------------------------------------------------
       WAITLIST FORM, LOADED ON DEMAND
       ------------------------------------------------------------
       Tally's embed script used to load on all 42 pages, which meant
       Tally received the URL of every page a visitor read, including
       the clinical ones, whether or not they ever opened the form.

       Now nothing loads until someone actually clicks a waitlist
       button. The first click fetches the script and opens the form;
       after that Tally has bound its own handlers and we step aside.
       If the script cannot be fetched, the click falls back to the
       form's own page so the visitor is never stuck.
       ------------------------------------------------------------ */
    var tallyLoading = false;

    function openWaitlist(formId) {
      window.Tally.openPopup(formId, {
        layout: 'modal',
        width: 700,
        overlay: true,
        emoji: undefined
      });
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-tally-open]') : null;
      if (!btn) return;

      /* Script already here: let Tally's own handler do the work. */
      if (window.Tally && window.Tally.openPopup) return;

      e.preventDefault();
      if (tallyLoading) return;
      tallyLoading = true;

      var formId = btn.getAttribute('data-tally-open');
      var s = document.createElement('script');
      s.src = 'https://tally.so/widgets/embed.js';
      s.onload = function () {
        tallyLoading = false;
        if (window.Tally && window.Tally.openPopup) openWaitlist(formId);
        else window.location.href = 'https://tally.so/r/' + formId;
      };
      s.onerror = function () {
        tallyLoading = false;
        window.location.href = 'https://tally.so/r/' + formId;
      };
      document.body.appendChild(s);
    });


    /* Care protocol modals. A button with data-modal="x" opens the
       <dialog id="x"> on that page. Escape closes it, so does clicking
       the backdrop or the close button. */
    document.querySelectorAll('[data-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dlg = document.getElementById(btn.getAttribute('data-modal'));
        if (dlg && dlg.showModal) dlg.showModal();
      });
    });
    document.querySelectorAll('dialog.care').forEach(function (dlg) {
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
      var x = dlg.querySelector('.care-close');
      if (x) x.addEventListener('click', function () { dlg.close(); });
    });

    var nav = document.getElementById('nav');
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 10);
      });
    }

    // Close any open dropdown when clicking outside the nav
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-item').forEach(function (i) { i.classList.remove('open'); });
      }
    });

    // Close menus when a nav link is followed. Same-page hash links
    // (journal.html#skin-of-color from journal.html) do not reload the
    // document, so nothing else would close them.
    document.querySelectorAll('.mobile-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        var menu = document.getElementById('mobileMenu');
        if (menu && menu.classList.contains('open')) toggleMobileMenu();
      });
    });
    document.querySelectorAll('.nav-links .dropdown-item').forEach(function (a) {
      a.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(function (i) { i.classList.remove('open'); });
      });
    });
  });

})();

/* ============================================================
   Aahana shared navigation
   ------------------------------------------------------------
   This file is the ONLY place the site navigation is defined.
   Edit the two lists below and every page updates at once.

   To add a Daybreak category, add one line to DAYBREAK_CATEGORIES.
   To add a Practice or Services link, edit those arrays.
   ============================================================ */

(function () {

  var PRACTICE_LINKS = [
    { label: 'Dr. Shankar',       href: 'about.html' },
    { label: 'Precision medicine', href: 'precision.html' },
    { label: 'Prakriti',           href: 'prakriti.html' }
  ];

  var SERVICES_LINKS = [
    { label: 'All services', href: 'services.html' }
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
          '<div class="dropdown">' + desktopItems(SERVICES_LINKS) +
            '<div class="dropdown-divider"></div>' +
            '<div class="dropdown-label">Coming soon</div>' +
            '<div class="dropdown-item" style="opacity:.45;cursor:default">Individual treatment pages</div>' +
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
      '<button data-tally-open="kdJBYJ" data-tally-overlay="1" class="nav-cta">Join the waitlist</button>' +
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
          '<div class="mobile-panel-title">Services</div>' + panelItems(SERVICES_LINKS) +
          '<span class="mobile-panel-label">Coming soon</span>' +
          '<span class="disabled">Individual treatment pages</span>' +
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
        '<button data-tally-open="kdJBYJ" data-tally-overlay="1">Join the waitlist</button>' +
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

/* The Fourth Player — landing interactions */
(function () {
  // ─── WhatsApp link wiring ───────────────────────────────
  // TODO: replace with your real WhatsApp Business number (international, digits only).
  var WA_NUMBER = "351960393194"; // The Fourth Player matchmaking bot (where players message to find a game)
  var WA_TEXT = encodeURIComponent("Hi! I'd like a fourth player 🎾");
  var waHref = WA_NUMBER
    ? "https://wa.me/" + WA_NUMBER + "?text=" + WA_TEXT
    : "https://wa.me/?text=" + WA_TEXT; // opens WhatsApp with the message; user picks the chat
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.setAttribute('href', waHref);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  // ─── year ───────────────────────────────────────────────
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ─── nav: scrolled state + mobile toggle ────────────────
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── hero reveal ────────────────────────────────────────
  var heroVisual = document.querySelector('.hero-variant.active .reveal');
  if (heroVisual) { requestAnimationFrame(function () { heroVisual.classList.add('in'); }); }

  // ─── scroll reveal ──────────────────────────────────────
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();

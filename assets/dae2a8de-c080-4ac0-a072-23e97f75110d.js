/* The Fourth Player — landing interactions */
(function () {
  // ─── WhatsApp link wiring ───────────────────────────────
  // TODO: replace with your real WhatsApp Business number (international, digits only).
  var WA_NUMBER = "351960393194"; // The Fourth Player matchmaking bot (where players message to find a game)
  // Default opener for on-page CTA buttons.
  var WA_TEXT = encodeURIComponent("Vamos, let the fun begin 🎾");
  var waHref = WA_NUMBER
    ? "https://wa.me/" + WA_NUMBER + "?text=" + WA_TEXT
    : "https://wa.me/?text=" + WA_TEXT; // opens WhatsApp with the message; user picks the chat
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.setAttribute('href', waHref);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  // QR code opener.
  var QR_TEXT = encodeURIComponent("Vamos, let the fun begin 🎾");
  document.querySelectorAll('[data-wa-qr]').forEach(function (a) {
    a.setAttribute('href', "https://wa.me/" + WA_NUMBER + "?text=" + QR_TEXT);
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
  // ─── rotating subtitle ──────────────────────────────────
  var subtitles = [
    "You shouldn't need to text 6 people just to fill a court. Send one message. We find your fourth.",
    "Find your fourth. Keep your number. No app, no drama.",
    "Padel and tennis players in Lisbon, matched on WhatsApp. Your number stays yours until you're ready.",
    "One message to find a partner. Zero apps to download. Your number shared only when you say yes.",
    "The padel court is booked. The group chat is chaos. There's a better way — and it's already on your phone."
  ];
  var subEl = document.getElementById('rotating-subtitle');
  if (subEl) {
    var subIdx = 0;
    setInterval(function () {
      subEl.classList.add('fade-out');
      setTimeout(function () {
        subIdx = (subIdx + 1) % subtitles.length;
        subEl.textContent = subtitles[subIdx];
        subEl.classList.remove('fade-out');
      }, 400);
    }, 6000);
  }
})();

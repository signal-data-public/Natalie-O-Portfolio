/* =============================================
   NATALIE OLOFSSON — PORTFOLIO
   ============================================= */

// ── Scroll reveal ────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => {
  // Stagger items inside grids/lists slightly
  if (el.closest('.featured-grid') || el.closest('.archive-list') || el.closest('.viz-grid')) {
    const siblings = el.parentElement.querySelectorAll('.reveal');
    const idx = Array.from(siblings).indexOf(el);
    el.style.transitionDelay = `${idx * 0.06}s`;
  }
  revealObserver.observe(el);
});

// ── Viz image fade-in on load ─────────────────
document.querySelectorAll('.viz-img').forEach((img) => {
  if (img.complete && img.naturalWidth) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => {
      // Image missing — hide the broken icon, placeholder bg shows instead
      img.style.display = 'none';
    });
  }
});

// ── Sticky nav ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Mobile menu ──────────────────────────────
const menuBtn   = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileMenuClose');

function openMenu()  { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

menuBtn?.addEventListener('click', openMenu);
mobileClose?.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach((l) => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// ── Archive filter ───────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const archiveItems = document.querySelectorAll('.archive-item');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active button
    filterBtns.forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    });

    // Show/hide items
    archiveItems.forEach((item) => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

// ── Smooth anchor scroll (offset for fixed nav) ─
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 60;
    window.scrollTo({ top: target.offsetTop - navH - 12, behavior: 'smooth' });
  });
});

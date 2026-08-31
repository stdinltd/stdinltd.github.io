// Heal & Thrive - Main JS

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const mobileNav = document.getElementById('mobile-nav');

  function openNav() {
    mobileNav.classList.add('open');
    document.body.classList.add('nav-open');
    closeBtn.focus();
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    document.body.classList.remove('nav-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus();
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeNav();
      }
    });

    // Close when clicking a mobile nav link
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // --- Scroll fade-in (Intersection Observer) ---
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Active nav link highlight ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, #mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('text-sage-700');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

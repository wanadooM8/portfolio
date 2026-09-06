function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();

      function focusTarget() {
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        target.focus({ preventScroll: true });
      }

      var reducedMotion = window.PortfolioUtils.prefersReducedMotion();
      if (reducedMotion || typeof gsap === 'undefined' || typeof ScrollToPlugin === 'undefined') {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        focusTarget();
        return;
      }

      gsap.registerPlugin(ScrollToPlugin);
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 0 },
        duration: 1,
        ease: 'power2.inOut',
        onComplete: focusTarget
      });
    });
  });
}

function initMobileNav() {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  function closeMenu() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  }

  function openMenu() {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu');
  }

  toggle.addEventListener('click', function () {
    if (links.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && links.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initSmoothNav();
  initThemeToggle();
  initMobileNav();
  initEasterEgg();
  initHeroAnimation();
  initMarquee();
  Promise.all([initProjects(), initContent()]).then(function () {
    initScrollReveals();
    initTimelineLine();
    initCardTilt();
  });
});

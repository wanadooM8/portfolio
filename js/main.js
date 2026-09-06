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
    toggle.setAttribute('aria-label', window.PortfolioI18n.t('menuOpen'));
  }

  function openMenu() {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', window.PortfolioI18n.t('menuClose'));
  }

  window.addEventListener('portfolio:langchange', function () {
    toggle.setAttribute('aria-label', window.PortfolioI18n.t(links.classList.contains('is-open') ? 'menuClose' : 'menuOpen'));
  });

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

function initLangToggle() {
  var button = document.getElementById('lang-toggle');
  if (!button) return;

  function updateButton() {
    button.textContent = window.PortfolioI18n.t('langSwitchLabel');
    button.setAttribute('aria-label', window.PortfolioI18n.t('langSwitchAria'));
  }
  updateButton();

  button.addEventListener('click', function () {
    var next = window.PortfolioI18n.getLang() === 'fr' ? 'en' : 'fr';
    window.PortfolioI18n.setLang(next);
    window.PortfolioI18n.applyStaticTranslations();
    updateButton();
    window.dispatchEvent(new Event('portfolio:langchange'));
    reloadLocalizedContent();
  });
}

function reloadLocalizedContent() {
  killScrollAnimations();
  Promise.all([initProjects(), initContent()]).then(function () {
    initScrollReveals();
    initTimelineLine();
    initCardTilt();
  });
}

function whenHero3DSettled(callback) {
  var done = false;
  function fire() {
    if (done) return;
    done = true;
    callback();
  }
  // hero-3d.js charge son modèle en asynchrone et peut épingler le Hero
  // (ScrollTrigger + pin), ce qui décale la mise en page. On attend ce
  // signal pour créer les autres ScrollTrigger sur des positions définitives
  // — un filet de sécurité évite de rester bloqué si hero-3d.js ne répond
  // jamais (ex. Three.js indisponible).
  document.addEventListener('hero3d:settled', fire, { once: true });
  window.setTimeout(fire, 2500);
}

document.addEventListener('DOMContentLoaded', function () {
  window.PortfolioI18n.applyStaticTranslations();
  initSmoothNav();
  initThemeToggle();
  initLangToggle();
  initMobileNav();
  initEasterEgg();
  initHeroAnimation();
  initMarquee();
  Promise.all([initProjects(), initContent()]).then(function () {
    whenHero3DSettled(function () {
      initScrollReveals();
      initTimelineLine();
      initCardTilt();
    });
  });
});

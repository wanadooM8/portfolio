function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.PortfolioUtils.prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initSmoothNav();
  initEasterEgg();
  initHeroAnimation();
  initScrollReveals();
  initMarquee();
});

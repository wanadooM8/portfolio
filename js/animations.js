function initHeroAnimation() {
  var title = document.getElementById('hero-title');
  if (!title) return;

  if (window.PortfolioUtils.prefersReducedMotion()) {
    gsap.set(title, { opacity: 1 });
    return;
  }

  if (typeof SplitText === 'undefined') {
    gsap.from(title, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' });
    return;
  }

  gsap.registerPlugin(SplitText);
  var split = new SplitText(title, { type: 'chars' });
  gsap.from(split.chars, {
    opacity: 0,
    y: 20,
    rotateX: -40,
    duration: 0.6,
    stagger: 0.02,
    ease: 'expo.out'
  });
}

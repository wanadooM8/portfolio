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

function initScrollReveals() {
  if (window.PortfolioUtils.prefersReducedMotion()) return;
  if (typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.reveal').forEach(function (el) {
    gsap.from(el.children, {
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

function initMarquee() {
  var track = document.querySelector('.marquee__track');
  if (!track) return;
  if (window.PortfolioUtils.prefersReducedMotion()) return;

  var width = track.scrollWidth / 2;
  gsap.to(track, {
    x: -width,
    duration: 20,
    ease: 'none',
    repeat: -1
  });
}

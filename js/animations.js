function initHeroAnimation() {
  var title = document.getElementById('hero-title');
  if (!title) return;

  if (typeof gsap === 'undefined') return;

  if (window.PortfolioUtils.prefersReducedMotion()) {
    return;
  }

  if (typeof SplitText === 'undefined') {
    gsap.from(title, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' });
    return;
  }

  gsap.registerPlugin(SplitText);
  var split = new SplitText(title, { type: 'words, chars' });
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
  if (typeof gsap === 'undefined') return;
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
  ScrollTrigger.refresh();
}

function fillMarqueeTrack(container, track) {
  var seed = track.innerHTML;
  var guard = 0;
  while (track.scrollWidth < container.clientWidth * 2 && guard < 20) {
    track.insertAdjacentHTML('beforeend', seed);
    guard += 1;
  }
}

function initMarquee() {
  var container = document.querySelector('.marquee');
  var track = document.querySelector('.marquee__track');
  if (!container || !track) return;

  var PIXELS_PER_SECOND = 22;

  fillMarqueeTrack(container, track);

  if (typeof gsap === 'undefined') return;
  if (window.PortfolioUtils.prefersReducedMotion()) return;

  var tween = gsap.to(track, {
    xPercent: -50,
    duration: (track.scrollWidth / 2) / PIXELS_PER_SECOND,
    ease: 'none',
    repeat: -1
  });

  window.addEventListener('resize', function () {
    fillMarqueeTrack(container, track);
    tween.duration((track.scrollWidth / 2) / PIXELS_PER_SECOND);
  });
}

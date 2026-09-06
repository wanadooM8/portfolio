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

var REVEAL_WRAPPER_SELECTOR = '.projects__grid, .skills__grid, .timeline-wrap, .timeline, .contact__links, .about__content, #about-content';
var REVEAL_SKIP_SELECTOR = '.timeline__line';

function revealTargets(el) {
  function expand(nodes) {
    var result = [];
    nodes.forEach(function (node) {
      if (node.matches && node.matches(REVEAL_SKIP_SELECTOR)) {
        return;
      }
      if (node.matches && node.matches(REVEAL_WRAPPER_SELECTOR)) {
        result = result.concat(expand(Array.prototype.slice.call(node.children)));
      } else {
        result.push(node);
      }
    });
    return result;
  }
  return expand(Array.prototype.slice.call(el.children));
}

function initScrollReveals() {
  if (typeof gsap === 'undefined') return;
  if (window.PortfolioUtils.prefersReducedMotion()) return;
  if (typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.reveal').forEach(function (el) {
    gsap.from(revealTargets(el), {
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: 0.06,
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

function initTimelineLine() {
  var line = document.querySelector('.timeline__line');
  if (!line || typeof gsap === 'undefined') return;

  if (window.PortfolioUtils.prefersReducedMotion() || typeof ScrollTrigger === 'undefined') {
    gsap.set(line, { scaleY: 1 });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(line, { scaleY: 0 });
  gsap.to(line, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline-wrap',
      start: 'top 75%',
      end: 'bottom 75%',
      scrub: true
    }
  });
}

function initCardTilt() {
  if (typeof gsap === 'undefined') return;
  if (window.PortfolioUtils.prefersReducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.projects__grid .card').forEach(function (card) {
    gsap.set(card, { rotateX: 0, rotateY: 0 });
    var setRotateX = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power3.out' });
    var setRotateY = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power3.out' });

    card.addEventListener('mousemove', function (event) {
      var rect = card.getBoundingClientRect();
      var relX = (event.clientX - rect.left) / rect.width - 0.5;
      var relY = (event.clientY - rect.top) / rect.height - 0.5;
      setRotateY(relX * 10);
      setRotateX(relY * -10);
    });

    card.addEventListener('mouseleave', function () {
      setRotateX(0);
      setRotateY(0);
    });
  });
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

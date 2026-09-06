function killScrollAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;
  // Tue tous les ScrollTrigger sauf le pin du modele 3D du Hero, pour
  // pouvoir reconstruire proprement le reveal/la timeline/le tilt apres un
  // changement de langue (le contenu DOM sous-jacent est regenere).
  ScrollTrigger.getAll().forEach(function (st) {
    if (st.vars && st.vars.pin) return;
    st.kill();
  });
}

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

var REVEAL_WRAPPER_SELECTOR = '.projects__grid, .skills__grid, .contact__links, .about__content, #about-content';
var REVEAL_SKIP_SELECTOR = '.timeline-wrap';

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
  var tweens = [];
  document.querySelectorAll('.reveal').forEach(function (el) {
    tweens.push(gsap.from(revealTargets(el), {
      opacity: 0,
      y: 32,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }));
  });
  ScrollTrigger.refresh();
  // Si le seuil de déclenchement est déjà derrière la position de scroll
  // initiale (ex. section juste après un Hero plus court que 85% de l'écran),
  // toggleActions ne se déclenchera jamais car il réagit à un franchissement
  // de scroll, pas à un état déjà atteint : on affiche alors directement le résultat final.
  tweens.forEach(function (tween) {
    if (tween.scrollTrigger && tween.scrollTrigger.progress > 0) {
      tween.progress(1);
    }
  });
}

function initTimelineLine() {
  var line = document.querySelector('.timeline__line');
  var items = document.querySelectorAll('.timeline__item');
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

  // Chaque item s'illumine au fil du scroll, synchronisé avec la ligne qui
  // grandit — un scrub par item (plutôt qu'une seule animation pour tout le
  // bloc) pour que ça reste visible quel que soit le nombre d'entrées.
  items.forEach(function (item) {
    gsap.set(item, { opacity: 0.15, x: -16 });
    gsap.to(item, {
      opacity: 1,
      x: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        end: 'top 55%',
        scrub: true
      }
    });
  });
}

function initCardTilt() {
  if (typeof gsap === 'undefined') return;
  if (window.PortfolioUtils.prefersReducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.projects__grid .card').forEach(function (card) {
    gsap.set(card, { rotationX: 0, rotationY: 0 });
    var setRotateX = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' });
    var setRotateY = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' });

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

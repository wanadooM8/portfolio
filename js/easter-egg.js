var zeldaTheme = null;

function getZeldaTheme() {
  if (!zeldaTheme) {
    zeldaTheme = new Audio(encodeURI('assets/12 - Zelda Main Theme Song.mp3'));
    zeldaTheme.loop = true;
    zeldaTheme.volume = 0.4;
  }
  return zeldaTheme;
}

function logKonamiHint() {
  console.log(
    '%c👀 Un·e développeur·se curieux·se par ici ?%c\nEssayez : ↑ ↑ ↓ ↓ ← → ← → B A',
    'color:#DFE104;background:#131417;font-weight:bold;font-size:13px;padding:2px 6px;',
    'color:#3452E0;font-family:monospace;font-size:13px;'
  );
}

function initEasterEgg() {
  var SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var buffer = [];
  var overlay = document.getElementById('triforce-overlay');

  logKonamiHint();

  document.addEventListener('keydown', function (event) {
    buffer.push(event.key);
    if (buffer.length > SEQUENCE.length) {
      buffer = buffer.slice(buffer.length - SEQUENCE.length);
    }
    if (window.PortfolioUtils.matchesKeySequence(buffer, SEQUENCE)) {
      triggerEasterEgg();
      buffer = [];
    }
  });

  function triggerEasterEgg() {
    var music = getZeldaTheme();

    if (!music.paused) {
      music.pause();
      return;
    }

    music.currentTime = 0;
    music.play().catch(function () {});

    if (window.PortfolioUtils.prefersReducedMotion()) return;
    overlay.hidden = false;
    overlay.classList.add('triforce-overlay--visible');
    window.setTimeout(function () {
      overlay.classList.remove('triforce-overlay--visible');
      overlay.hidden = true;
    }, 1800);
  }
}

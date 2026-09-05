function playSecretChime() {
  if (typeof window.AudioContext === 'undefined' && typeof window.webkitAudioContext === 'undefined') return;
  var Ctx = window.AudioContext || window.webkitAudioContext;
  var ctx = new Ctx();
  var notes = [659.25, 783.99, 987.77];
  notes.forEach(function (freq, index) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime + index * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.12 + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + index * 0.12);
    osc.stop(ctx.currentTime + index * 0.12 + 0.3);
  });
}

function initEasterEgg() {
  var SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var buffer = [];
  var overlay = document.getElementById('triforce-overlay');

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
    playSecretChime();
    if (window.PortfolioUtils.prefersReducedMotion()) return;
    overlay.hidden = false;
    overlay.classList.add('triforce-overlay--visible');
    window.setTimeout(function () {
      overlay.classList.remove('triforce-overlay--visible');
      overlay.hidden = true;
    }, 1800);
  }
}

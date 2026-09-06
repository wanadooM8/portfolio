function matchesKeySequence(buffer, sequence) {
  if (buffer.length < sequence.length) return false;
  var tail = buffer.slice(buffer.length - sequence.length);
  for (var i = 0; i < sequence.length; i++) {
    if (tail[i] !== sequence[i]) return false;
  }
  return true;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function nextTheme(current) {
  return current === 'light' ? 'dark' : 'light';
}

var PortfolioUtils = {
  matchesKeySequence: matchesKeySequence,
  prefersReducedMotion: prefersReducedMotion,
  nextTheme: nextTheme
};

if (typeof window !== 'undefined') {
  window.PortfolioUtils = PortfolioUtils;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioUtils;
}

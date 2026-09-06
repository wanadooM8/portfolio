function initThemeToggle() {
  var STORAGE_KEY = 'portfolio-theme';
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  var ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>';
  var ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 14.5A8 8 0 119.5 4a6.5 6.5 0 0010.5 10.5z"/></svg>';

  function updateButton(theme) {
    if (theme === 'light') {
      button.innerHTML = ICON_MOON;
      button.setAttribute('aria-label', 'Activer le mode sombre');
    } else {
      button.innerHTML = ICON_SUN;
      button.setAttribute('aria-label', 'Activer le mode clair');
    }
  }

  updateButton(currentTheme());

  button.addEventListener('click', function () {
    var next = window.PortfolioUtils.nextTheme(currentTheme());
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    updateButton(next);
  });
}

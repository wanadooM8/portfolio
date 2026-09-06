function initThemeToggle() {
  var STORAGE_KEY = 'portfolio-theme';
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateButton(theme) {
    if (theme === 'light') {
      button.textContent = '☾';
      button.setAttribute('aria-label', 'Activer le mode sombre');
    } else {
      button.textContent = '☀';
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

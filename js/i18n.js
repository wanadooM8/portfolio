var I18N_STORAGE_KEY = 'portfolio-lang';

var I18N_STRINGS = {
  fr: {
    pageTitle: 'Ethan Bernier — Développeur Web',
    skipLink: 'Aller au contenu',
    navAbout: 'À propos',
    navProjects: 'Projets',
    navSkills: 'Compétences',
    navTimeline: 'Parcours',
    navContact: 'Contact',
    heroBadge: 'Étudiant en informatique — BUT, IUT Bayonne',
    heroTagline: 'Curieux. Autonome. Prêt à coder pour votre équipe.',
    ctaProjects: 'Voir mes projets',
    ctaCv: 'Télécharger mon CV',
    sectionAbout: 'À propos',
    sectionProjects: 'Projets',
    sectionSkills: 'Compétences',
    sectionTimeline: 'Parcours',
    sectionContact: 'Contact',
    themeToLight: 'Activer le mode clair',
    themeToDark: 'Activer le mode sombre',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    langSwitchLabel: 'EN',
    langSwitchAria: 'Switch to English',
    ariaSoftSkills: 'Soft skills',
    ariaInterests: "Centres d'intérêt",
    ariaGithub: 'Ouvrir le profil GitHub d\'Ethan Bernier (nouvel onglet)',
    ariaLinkedin: 'Ouvrir le profil LinkedIn d\'Ethan Bernier (nouvel onglet)',
    ariaStack: 'Compétences utilisées',
    ariaViewProjectPrefix: 'Voir le projet ',
    ariaViewProjectSuffix: ' (nouvel onglet)',
    downloadCv: 'Télécharger mon CV'
  },
  en: {
    pageTitle: 'Ethan Bernier — Web Developer',
    skipLink: 'Skip to content',
    navAbout: 'About',
    navProjects: 'Projects',
    navSkills: 'Skills',
    navTimeline: 'Journey',
    navContact: 'Contact',
    heroBadge: 'Computer science student — BUT, IUT Bayonne',
    heroTagline: 'Curious. Independent. Ready to code for your team.',
    ctaProjects: 'See my projects',
    ctaCv: 'Download my resume',
    sectionAbout: 'About',
    sectionProjects: 'Projects',
    sectionSkills: 'Skills',
    sectionTimeline: 'Journey',
    sectionContact: 'Contact',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langSwitchLabel: 'FR',
    langSwitchAria: 'Passer en français',
    ariaSoftSkills: 'Soft skills',
    ariaInterests: 'Interests',
    ariaGithub: 'Open Ethan Bernier\'s GitHub profile (new tab)',
    ariaLinkedin: 'Open Ethan Bernier\'s LinkedIn profile (new tab)',
    ariaStack: 'Technologies used',
    ariaViewProjectPrefix: 'View project ',
    ariaViewProjectSuffix: ' (new tab)',
    downloadCv: 'Download my resume'
  }
};

function i18nGetLang() {
  return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
}

function i18nSetLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  try {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
  } catch (e) {}
}

function i18nTranslate(key) {
  return I18N_STRINGS[i18nGetLang()][key];
}

function i18nApplyStaticTranslations() {
  var dict = I18N_STRINGS[i18nGetLang()];
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.title = dict.pageTitle;
}

var PortfolioI18n = {
  getLang: i18nGetLang,
  setLang: i18nSetLang,
  t: i18nTranslate,
  applyStaticTranslations: i18nApplyStaticTranslations
};

if (typeof window !== 'undefined') {
  window.PortfolioI18n = PortfolioI18n;
}

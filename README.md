# Portfolio — Ethan Bernier

Site portfolio personnel, one-page, pour la recherche d'un stage/alternance en
développement web (BUT informatique, IUT de Bayonne et du Pays Basque).

🔗 **[Voir le site en ligne](https://wanadoom8.github.io/portfolio/)**

## Stack

- HTML / CSS / JavaScript vanilla — aucun build, aucune dépendance npm
- [GSAP](https://gsap.com/) (+ ScrollTrigger, SplitText) via CDN pour toutes les animations
- [Three.js](https://threejs.org/) (ES modules, CDN) pour le modèle 3D du Hero
- [Tarteaucitron](https://tarteaucitron.io/) pour le consentement cookies (RGPD) + Google Analytics (GA4)
- Déploiement : GitHub Pages

## Fonctionnalités

- Bascule clair / sombre et français / anglais, mémorisées d'une visite à l'autre
- Contenu (à propos, compétences, parcours, projets, contact) piloté par des fichiers JSON
- Animations au scroll (fondu progressif, timeline qui se dessine, tilt des cartes projet)
- Modèle 3D interactif dans le Hero, dont la rotation suit le scroll
- Bandeau de consentement cookies avant tout chargement de Google Analytics
- Respecte `prefers-reduced-motion` (désactive les animations si demandé par le système)
- Un petit clin d'œil caché quelque part sur le site, pour les curieux 👀

## Structure du projet

```
index.html                              page principale
404.html                                page d'erreur personnalisée
mentions-legales.html
politique-de-confidentialite.html
css/                                    variables, reset, base, layout, components, animations
js/                                     utils, i18n, theme, easter-egg, animations, projects, content, main, hero-3d (module)
data/
  content.fr.json / content.en.json     à propos, compétences, parcours, contact
  projects.fr.json / projects.en.json   cartes projets
assets/                                 images, CV, icônes, modèle 3D, musique de l'easter egg
tests/                                  tests unitaires (node --test)
BERNIEREthan_CV_FR.pdf                  source de vérité pour le contenu du site
```

## Lancer en local

Le contenu est chargé dynamiquement via `fetch()`, donc ouvrir `index.html`
directement (`file://`) ne fonctionne pas — il faut un serveur local :

```bash
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Modifier le contenu

- Textes des sections (bio, compétences, parcours, contact) : `data/content.fr.json` et `data/content.en.json`
- Cartes projets : `data/projects.fr.json` et `data/projects.en.json`
- CV téléchargeable : `assets/cv.pdf`

Le contenu doit rester fidèle à `BERNIEREthan_CV_FR.pdf`.

## Tests

```bash
node --test "tests/*.test.js"
```

## Déploiement

Le site est servi par GitHub Pages depuis la branche `master`. Un simple
`git push` déclenche automatiquement un nouveau build.

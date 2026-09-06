var PROJECT_LINK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path stroke-linecap="square" stroke-linejoin="miter" d="M7 17L17 7M17 7H8M17 7V16"/></svg>';

function buildProjectCard(project) {
  var card = document.createElement('article');
  card.className = 'card';

  var visual = document.createElement('div');
  visual.className = 'card__visual';
  if (project.image) {
    var img = document.createElement('img');
    img.src = project.image;
    img.alt = window.PortfolioI18n.t('screenshotPrefix') + project.title;
    img.loading = 'lazy';
    visual.appendChild(img);
  } else {
    var mark = document.createElement('span');
    mark.className = 'card__visual-mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = project.title.slice(0, 2).toUpperCase();
    visual.appendChild(mark);
  }
  card.appendChild(visual);

  var header = document.createElement('div');
  header.className = 'card__header';

  var headings = document.createElement('div');
  var meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = project.year + ' — ' + project.org;
  var title = document.createElement('h3');
  title.textContent = project.title;
  headings.appendChild(meta);
  headings.appendChild(title);
  header.appendChild(headings);

  if (project.link) {
    var link = document.createElement('a');
    link.className = 'card__link';
    link.href = project.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', window.PortfolioI18n.t('ariaViewProjectPrefix') + project.title + window.PortfolioI18n.t('ariaViewProjectSuffix'));
    link.innerHTML = PROJECT_LINK_ICON;
    header.appendChild(link);
  }
  card.appendChild(header);

  var category = document.createElement('span');
  category.className = 'tag tag--category tag--' + project.category.type;
  category.textContent = project.category.label;
  card.appendChild(category);

  var description = document.createElement('p');
  description.textContent = project.description;
  card.appendChild(description);

  var stackList = document.createElement('ul');
  stackList.className = 'tag-list';
  stackList.setAttribute('aria-label', window.PortfolioI18n.t('ariaStack'));
  project.stack.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'tag';
    li.textContent = item;
    stackList.appendChild(li);
  });
  card.appendChild(stackList);

  return card;
}

function initProjects() {
  var grid = document.querySelector('.projects__grid');
  if (!grid) return Promise.resolve();

  return fetch('data/projects.' + window.PortfolioI18n.getLang() + '.json')
    .then(function (response) {
      if (!response.ok) throw new Error('Réponse HTTP ' + response.status);
      return response.json();
    })
    .then(function (projects) {
      grid.innerHTML = '';
      projects.forEach(function (project) {
        grid.appendChild(buildProjectCard(project));
      });
      grid.classList.remove('is-loading');
    })
    .catch(function (error) {
      console.error('Impossible de charger les projets :', error);
      grid.classList.remove('is-loading');
    });
}

function buildTagList(items, label) {
  var ul = document.createElement('ul');
  ul.className = 'tag-list';
  if (label) ul.setAttribute('aria-label', label);
  items.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'tag';
    li.textContent = item;
    ul.appendChild(li);
  });
  return ul;
}

function renderAbout(data) {
  var avatar = document.getElementById('about-avatar');
  var content = document.getElementById('about-content');
  if (!avatar || !content || !data) return;

  var img = document.createElement('img');
  img.src = data.photo;
  img.alt = data.photoAlt || '';
  img.addEventListener('error', function () {
    var fallback = document.createElement('div');
    fallback.className = 'avatar-fallback';
    fallback.textContent = 'EB';
    img.replaceWith(fallback);
  });
  avatar.appendChild(img);

  var bio = document.createElement('p');
  bio.textContent = data.bio;
  content.appendChild(bio);

  content.appendChild(buildTagList(data.softSkills, 'Soft skills'));

  var interestsHeading = document.createElement('h3');
  interestsHeading.textContent = data.interestsHeading;
  content.appendChild(interestsHeading);

  content.appendChild(buildTagList(data.interests, "Centres d'intérêt"));
}

function renderSkills(data) {
  var grid = document.getElementById('skills-grid');
  if (!grid || !data) return;

  data.groups.forEach(function (group) {
    var wrapper = document.createElement('div');
    wrapper.className = 'skills__group';

    var title = document.createElement('h3');
    title.textContent = group.title;
    wrapper.appendChild(title);
    wrapper.appendChild(buildTagList(group.items, null));

    grid.appendChild(wrapper);
  });
}

function renderTimeline(data) {
  var list = document.getElementById('timeline-list');
  if (!list || !data) return;

  data.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'timeline__item';

    var date = document.createElement('span');
    date.className = 'meta';
    date.textContent = item.date;
    li.appendChild(date);

    var title = document.createElement('h3');
    title.textContent = item.title;
    li.appendChild(title);

    var description = document.createElement('p');
    description.textContent = item.description;
    li.appendChild(description);

    list.appendChild(li);
  });
}

function renderContact(data) {
  var list = document.getElementById('contact-links');
  if (!list || !data) return;

  var links = [
    { text: data.email, href: 'mailto:' + data.email, variant: 'primary' },
    { text: data.phone, href: 'tel:' + data.phone.replace(/\s+/g, ''), variant: 'ghost' },
    { text: data.github.replace(/^https?:\/\//, ''), href: data.github, variant: 'ghost', external: true },
    { text: 'Télécharger mon CV', href: data.cvFile, variant: 'ghost', download: true }
  ];

  links.forEach(function (link) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.className = 'btn btn--' + link.variant;
    a.href = link.href;
    a.textContent = link.text;
    if (link.download) a.setAttribute('download', '');
    if (link.external) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', 'Ouvrir le profil GitHub d\'Ethan Bernier (nouvel onglet)');
    }
    li.appendChild(a);
    list.appendChild(li);
  });
}

function initContent() {
  return fetch('data/content.json')
    .then(function (response) {
      if (!response.ok) throw new Error('Réponse HTTP ' + response.status);
      return response.json();
    })
    .then(function (data) {
      renderAbout(data.about);
      renderSkills(data.skills);
      renderTimeline(data.timeline);
      renderContact(data.contact);
    })
    .catch(function (error) {
      console.error('Impossible de charger le contenu :', error);
    });
}

const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.tab-view');
const sourceButtons = document.querySelectorAll('.source-btn');
const apiBadge = document.querySelector('#api-badge');

const catalogGrid = document.querySelector('#catalog-grid');
const scheduleGrid = document.querySelector('#schedule-grid');
const dayFilters = document.querySelector('#day-filters');
const skeletonTpl = document.querySelector('#skeleton-tpl');

const authDialog = document.querySelector('#auth-dialog');
const authTabs = document.querySelectorAll('.auth-tab');
const authSubmit = document.querySelector('#auth-submit');

function showSkeletons(container, count = 8) {
  container.replaceChildren();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    fragment.appendChild(skeletonTpl.content.cloneNode(true));
  }
  container.appendChild(fragment);
}

function openTab(tabName) {
  navButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tabName));
  views.forEach((section) => {
    section.hidden = section.dataset.view !== tabName;
  });
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => openTab(btn.dataset.tab));
});

sourceButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    sourceButtons.forEach((b) => b.classList.toggle('active', b === btn));
    apiBadge.textContent = btn.dataset.provider === 'anilist' ? 'AniList' : 'Jikan';
  });
});

dayFilters.addEventListener('click', (event) => {
  const chip = event.target.closest('[data-day]');
  if (!chip) return;
  dayFilters.querySelectorAll('.chip').forEach((item) => item.classList.toggle('active', item === chip));
});

document.querySelector('#open-auth-btn').addEventListener('click', () => authDialog.showModal());
document.querySelector('#guest-auth-btn').addEventListener('click', () => authDialog.showModal());
document.querySelector('#close-auth-btn').addEventListener('click', () => authDialog.close());

authDialog.addEventListener('click', (event) => {
  if (event.target === authDialog) authDialog.close();
});

authTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    authTabs.forEach((t) => t.classList.toggle('active', t === tab));
    authSubmit.textContent = tab.dataset.mode === 'login' ? 'Войти' : 'Создать аккаунт';
  });
});

showSkeletons(catalogGrid, 12);
showSkeletons(scheduleGrid, 8);
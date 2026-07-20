// ============================================================
//  СТРАНИЦА СОСТАВА (новый дизайн). Данные: /data/roster_plhl.json, roster_skhl.json
// ============================================================

let allPlayers = { plhl: [], skhl: [] };

function calculateAge(birthDate) {
  const t = new Date(), b = new Date(birthDate);
  let a = t.getFullYear() - b.getFullYear();
  if (t.getMonth() < b.getMonth() || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate())) a--;
  return a;
}
function isPlaceholderPhoto(p) { return !p || p.includes('player-placeholder'); }
function getPhotoSrc(p) {
  if (isPlaceholderPhoto(p)) return '../images/players/player-placeholder.png';
  if (p.startsWith('http') || p.startsWith('../') || p.startsWith('/')) return p;
  return '../images/' + p;
}
function roleShort(role) {
  if (!role) return '';
  return role === 'Капитан' ? 'К' : 'А';
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const [a, b] = await Promise.all([fetch('/data/roster_plhl.json'), fetch('/data/roster_skhl.json')]);
    if (a.ok) allPlayers.plhl = (await a.json()).players || [];
    if (b.ok) allPlayers.skhl = (await b.json()).players || [];
  } catch (e) { console.warn('Не удалось загрузить состав:', e); }

  loadPlayers(allPlayers.plhl);
  setupPlayerCardListeners();
  setupLeagueTabs();
});

function setupLeagueTabs() {
  document.querySelectorAll('.league-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.league-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      loadPlayers(this.dataset.league === 'skhl' ? allPlayers.skhl : allPlayers.plhl);
    });
  });
}

function loadPlayers(data) {
  const grid = document.getElementById('playersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!data || !data.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;color:var(--dim);padding:40px 0">Состав скоро будет добавлен.</div>';
    return;
  }

  [['Вратарь','Вратари'],['Защитник','Защитники'],['Нападающий','Нападающие']].forEach(([key, plural]) => {
    const group = data.filter(p => p.position === key);
    if (!group.length) return;
    const h = document.createElement('div');
    h.className = 'pos-header';
    h.innerHTML = `<h2>${plural}</h2><span class="cnt">${group.length}</span>`;
    grid.appendChild(h);
    group.forEach(p => grid.appendChild(createPlayerCard(p)));
  });

  // Тренерский штаб
  const ch = document.createElement('div');
  ch.className = 'pos-header';
  ch.innerHTML = `<h2>Тренерский штаб</h2>`;
  grid.appendChild(ch);
  const coach = document.createElement('div');
  coach.className = 'coach-card';
  coach.innerHTML = `<img src="../images/coach.jpeg" alt="Вадим Вакивович">
    <div><div class="cn">Вадим Вакивович</div><div class="cr">Главный тренер</div></div>`;
  grid.appendChild(coach);

  revealCards();
}

// Появление карточек при попадании в экран (с лёгкой задержкой-каскадом)
function revealCards() {
  const cards = document.querySelectorAll('.rcard:not(.in)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const i = [...e.target.parentNode.children].filter(c => c.classList.contains('rcard')).indexOf(e.target);
        e.target.style.transitionDelay = Math.min(i % 5, 4) * 60 + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => io.observe(c));
}

function createPlayerCard(p) {
  const card = document.createElement('div');
  const ph = isPlaceholderPhoto(p.photo);
  card.className = 'rcard' + (ph ? ' is-placeholder' : '');
  card.dataset.playerId = p.id;
  const role = p.role ? `<span class="role">${roleShort(p.role)}</span>` : '';
  card.innerHTML = `
    <img src="${getPhotoSrc(p.photo)}" alt="${p.name}" loading="lazy"
         onerror="this.onerror=null;this.src='../images/players/player-placeholder.png';this.closest('.rcard').classList.add('is-placeholder')">
    <div class="grad"></div>
    <span class="no">${p.number}</span>
    ${role}
    <div class="info"><div class="name">${p.name}</div><div class="pos">${p.position}</div></div>`;
  return card;
}

function setupPlayerCardListeners() {
  document.addEventListener('click', function (e) {
    const card = e.target.closest('.rcard');
    if (!card) return;
    const id = parseInt(card.dataset.playerId);
    const player = [...allPlayers.plhl, ...allPlayers.skhl].find(p => p.id === id);
    if (player) showPlayerModal(player);
  });
}

function formatBirthDate(d) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  return `${day}.${m}.${y}`;
}

function showPlayerModal(p) {
  const photo = document.getElementById('modalPlayerPhoto');
  photo.src = getPhotoSrc(p.photo);
  photo.classList.toggle('is-placeholder', isPlaceholderPhoto(p.photo));
  const role = p.role ? `<span class="player-role">${roleShort(p.role)}</span>` : '';
  document.getElementById('modalPlayerName').innerHTML = p.name + role;
  document.getElementById('modalPlayerNumber').textContent = p.number;
  document.getElementById('modalPlayerPosition').textContent = p.position;
  document.getElementById('modalPlayerHand').textContent = p.hand || '—';
  document.getElementById('modalPlayerBirthDate').textContent = formatBirthDate(p.birthDate);
  document.getElementById('modalPlayerAge').textContent = p.birthDate ? calculateAge(p.birthDate) : '—';
  openModal('playerModal');
}

// ============================================================
//  ХК КГАСУ — Главная (новый дизайн). Подключение к /data/*.json
//  Контракт данных не меняем — те же эндпоинты, что и у остального сайта.
// ============================================================

const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_SHORT = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const logoSrc = (name, logos) => 'images/' + (name === 'КГАСУ' ? 'opponents/kgasu.jpg' : (logos[name] || 'opponents/kgasu.jpg'));

// ── Загрузка данных ─────────────────────────────────────────
async function loadData() {
  const get = async (u) => { try { const r = await fetch(u); return r.ok ? await r.json() : null; } catch { return null; } };
  const [games, standings, news, plhl] = await Promise.all([
    get('/data/games.json'),
    get('/data/standings.json'),
    get('/data/news.json'),
    get('/data/roster_plhl.json'),
  ]);
  return {
    games: (games && games.games) || [],
    logos: (games && games.team_logos) || {},
    standings: (standings && standings.standings) || [],
    posts: (news && news.posts) || [],
    players: (plhl && plhl.players) || [],
  };
}

// ── Блок «Следующий матч» / «Сезон завершён» ───────────────
let countdownTimer = null;
function renderNextMatch(d) {
  const el = document.getElementById('countBlock');
  if (!el) return;
  const now = new Date();
  const next = d.games.filter(g => g.homeScore === null && new Date(g.date) > now)
                      .sort((a, b) => a.date.localeCompare(b.date))[0];

  if (next) {
    el.classList.remove('season-over');
    const dt = new Date(next.date);
    el.innerHTML = `
      <div class="wrap count-inner">
        <div class="match">
          <img src="${logoSrc(next.home, d.logos)}" alt="">
          <div class="nm">${esc(next.home)} <span class="vs">VS</span> <span class="opp">${esc(next.away)}</span></div>
        </div>
        <div class="timer">
          <div class="u"><b id="dd">00</b><span>дней</span></div>
          <div class="u"><b id="hh">00</b><span>часов</span></div>
          <div class="u"><b id="mm">00</b><span>минут</span></div>
          <div class="u"><b id="ss">00</b><span>секунд</span></div>
        </div>
        <a class="cta" href="pages/calendar.html">Календарь игр →</a>
      </div>`;
    const tick = () => {
      let ms = Math.max(0, dt - new Date());
      const D = Math.floor(ms/864e5), H = Math.floor(ms%864e5/36e5), M = Math.floor(ms%36e5/6e4), S = Math.floor(ms%6e4/1e3);
      const set = (id, v) => { const n = document.getElementById(id); if (n) n.textContent = String(v).padStart(2,'0'); };
      set('dd',D); set('hh',H); set('mm',M); set('ss',S);
    };
    tick();
    clearInterval(countdownTimer);
    countdownTimer = setInterval(tick, 1000);
  } else {
    // Сезон завершён — показываем позицию КГАСУ в таблице
    const us = d.standings.find(s => s.team === 'КГАСУ');
    const place = us ? `${us.pos} место · ${us.points} очков` : 'Итоги сезона';
    el.classList.add('season-over');
    el.innerHTML = `
      <div class="wrap count-inner">
        <div class="summary">
          <div class="k">Сезон 2025 / 2026 завершён</div>
          <div class="big">ХК КГАСУ — ${esc(place)}</div>
        </div>
        <a class="cta" href="pages/archive.html">Архив сезона →</a>
      </div>`;
  }
}

// ── Бегущая строка ──────────────────────────────────────────
function renderTicker(d) {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const us = d.standings.find(s => s.team === 'КГАСУ');
  const items = [];
  if (us) {
    items.push(`<i>ХК КГАСУ · <b>${us.pos} МЕСТО В ДИВИЗИОНЕ</b></i>`);
    items.push(`<i class="sep">✦</i><i>${us.wins} ПОБЕД В ${us.games} МАТЧАХ</i>`);
    if (us.goals) items.push(`<i class="sep">✦</i><i>ШАЙБЫ · <b>${esc(us.goals)}</b></i>`);
    items.push(`<i class="sep">✦</i><i>СЕЗОН 2025/26</i><i class="sep">✦</i>`);
  } else {
    items.push('<i>ХК КГАСУ · СТРОИМ БУДУЩЕЕ<i class="sep">✦</i></i>');
  }
  const one = `<span>${items.join('')}</span>`;
  track.innerHTML = one + one; // дублируем для бесшовной прокрутки
}

// ── Статистика сезона ───────────────────────────────────────
function renderStats(d) {
  const us = d.standings.find(s => s.team === 'КГАСУ');
  const scored = us && us.goals ? parseInt(String(us.goals).split('-')[0], 10) || 0 : 0;
  const values = {
    games: us ? us.games : 0,
    wins:  us ? us.wins  : 0,
    scored: scored,
    players: d.players.length,
  };
  Object.entries(values).forEach(([k, v]) => {
    const el = document.querySelector(`.num[data-key="${k}"]`);
    if (el) el.dataset.to = v;
  });
}

// ── Новости (последние 3) ───────────────────────────────────
function renderNews(d) {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  const posts = d.posts.slice(0, 3);
  if (!posts.length) { grid.innerHTML = '<p style="color:var(--dim)">Новости скоро появятся.</p>'; return; }
  grid.innerHTML = posts.map(p => {
    const photo = (p.photos && p.photos[0]) || p.photo || '';
    const img = photo ? `<div class="ph"><img src="/${esc(photo)}" alt="" loading="lazy" onload="if(this.naturalHeight>this.naturalWidth)this.classList.add('portrait')"></div>` : '';
    const date = new Date(p.date);
    const dstr = `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    return `<a class="ncard" href="pages/news.html">
      ${img}
      <div class="body">
        <span class="date">${dstr}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </div>
    </a>`;
  }).join('');
}

// ── Стена состава: 1 вратарь + 2 защитника + 3 нападающих, случайно ──
// Игроки в слотах меняются при каждой загрузке; прошлый набор исключается,
// чтобы никто не повторялся два раза подряд.
function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function pickFrom(pool, n, exclude) {
  let fresh = pool.filter(p => !exclude.has(p.id));
  if (fresh.length < n) fresh = pool;          // без повторов не хватает — берём всех
  return shuffle(fresh).slice(0, n);
}
function renderRoster(d) {
  const wall = document.getElementById('rosterWall');
  if (!wall) return;
  const withPhoto = d.players.filter(p => p.photo && !p.photo.includes('placeholder'));
  const gk = withPhoto.filter(p => p.position === 'Вратарь');
  const df = withPhoto.filter(p => p.position === 'Защитник');
  const fw = withPhoto.filter(p => p.position === 'Нападающий');

  let prev = new Set();
  try { prev = new Set(JSON.parse(localStorage.getItem('homeRosterPrev') || '[]')); } catch (e) {}

  const chosen = [
    ...pickFrom(gk, 1, prev),
    ...pickFrom(df, 2, prev),
    ...pickFrom(fw, 3, prev),
  ];

  try { localStorage.setItem('homeRosterPrev', JSON.stringify(chosen.map(p => p.id))); } catch (e) {}

  if (!chosen.length) { wall.innerHTML = ''; return; }
  wall.innerHTML = chosen.map(p => {
    const src = p.photo.startsWith('http') ? p.photo : 'images/' + p.photo;
    return `<div class="pcard">
      <img src="${esc(src)}" alt="${esc(p.name)}" loading="lazy"
           onerror="this.onerror=null;this.src='images/players/player-placeholder.png'">
      <div class="grad"></div>
      <span class="no">${esc(p.number)}</span>
      <div class="info"><div class="name">${esc(p.name)}</div><div class="pos">${esc(p.position)}</div></div>
    </div>`;
  }).join('');
}

// ── Анимации: reveal + count-up ─────────────────────────────
function initMotion() {
  const io = new IntersectionObserver((es) => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const countUp = (el) => {
    const to = +el.dataset.to || 0; let n = 0;
    const step = Math.max(1, Math.round(to / 40));
    const t = setInterval(() => { n += step; if (n >= to) { n = to; clearInterval(t); } el.textContent = n; }, 28);
  };
  const io2 = new IntersectionObserver((es) => es.forEach(e => {
    if (e.isIntersecting) { countUp(e.target); io2.unobserve(e.target); }
  }), { threshold: 0.6 });
  document.querySelectorAll('.num[data-to]').forEach(el => io2.observe(el));
}

// ── Навигация ───────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });
  const burger = document.getElementById('burger');
  if (burger) burger.addEventListener('click', () => nav.classList.toggle('open'));
}

// ── Старт ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initNav();
  const d = await loadData();
  renderNextMatch(d);
  renderTicker(d);
  renderStats(d);
  renderNews(d);
  renderRoster(d);
  initMotion(); // после рендера — чтобы data-to уже проставились
});

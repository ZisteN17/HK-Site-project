// ============================================================
//  Баннер «С днём рождения!» — тянет состав из /data, показывает плашку.
//  Работает на любой странице, где подключён. Раз за сессию.
// ============================================================
(async function () {
  const demoParam = new URLSearchParams(location.search).get('bday');
  if (!demoParam && sessionStorage.getItem('bdayShown')) return;

  const get = async (u) => { try { const r = await fetch(u); return r.ok ? await r.json() : null; } catch (e) { return null; } };
  const [a, b] = await Promise.all([get('/data/roster_plhl.json'), get('/data/roster_skhl.json')]);
  const coaches = [ { name: 'Вадим Вакивович', birthDate: '1966-03-23' } ];
  const all = [ ...coaches, ...((a && a.players) || []), ...((b && b.players) || []) ];

  // уникальные по имени
  const seen = new Set();
  const uniq = all.filter(p => (seen.has(p.name) ? false : (seen.add(p.name), true)));

  const now = new Date();
  let m = now.getMonth() + 1, d = now.getDate();
  const demo = new URLSearchParams(location.search).get('bday'); // демо: ?bday=ММ-ДД
  if (demo && /^\d{1,2}-\d{1,2}$/.test(demo)) { const q = demo.split('-'); m = +q[0]; d = +q[1]; }
  const bdays = uniq.filter(p => {
    if (!p.birthDate) return false;
    const x = p.birthDate.split('-');
    return (+x[1]) === m && (+x[2]) === d;
  });
  if (!bdays.length) return;

  if (!demoParam) sessionStorage.setItem('bdayShown', '1');
  const names = bdays.map(p => p.name).join(' и ');

  const el = document.createElement('div');
  el.className = 'birthday-banner';
  el.innerHTML =
    '<div class="bd-in">' +
      '<span class="bd-star">🎉</span>' +
      '<div class="bd-txt"><span class="bd-label">С днём рождения!</span>' +
      '<span class="bd-names">' + names + '</span></div>' +
      '<button class="bd-close" aria-label="Закрыть">&times;</button>' +
    '</div>';
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));

  const hide = () => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); };
  el.querySelector('.bd-close').addEventListener('click', hide);
  setTimeout(hide, 11000);
})();

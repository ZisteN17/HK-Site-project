// Расписание игр КГАСУ — данные загружаются из /data/games.json
// Для обновления используйте панель управления (Telegram Mini App)

let TEAM_LOGOS = {};
let KGASU_GAMES = [];

let STANDINGS = [];

// Отрисовка турнирной таблицы из данных STANDINGS
function renderStandings() {
    const tbody = document.querySelector('.standings-table tbody');
    if (!tbody) return;

    const imagesPath = getImagesPath();
    tbody.innerHTML = STANDINGS.map(s => {
        const logo = s.team === 'КГАСУ' ? 'opponents/kgasu.jpg' : (TEAM_LOGOS[s.team] || '');
        const isKgasu = s.team === 'КГАСУ';
        return `<tr${isKgasu ? ' class="highlight-team"' : ''}>
            <td>${s.pos}</td>
            <td><img src="${imagesPath}${logo}" alt="" class="table-team-logo"></td>
            <td class="team-name">${s.team}</td>
            <td>${s.games}</td>
            <td>${s.wins}</td>
            <td>${s.draws}</td>
            <td>${s.losses}</td>
            <td>${s.goals}</td>
            <td class="points-cell">${s.points}</td>
        </tr>`;
    }).join('');
}

// Определяем путь к изображениям (главная или подстраница)
function getImagesPath() {
    const isSubpage = window.location.pathname.includes('/pages/');
    return isSubpage ? '../images/' : 'images/';
}

// Форматирование даты: "18 февраля 2026, 20:15"
function formatGameDate(dateStr) {
    const date = new Date(dateStr);
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

// Найти ближайшую будущую игру
function getNextGame() {
    const now = new Date();
    const futureGames = KGASU_GAMES.filter(g => new Date(g.date) > now && g.homeScore === null);
    return futureGames.length > 0 ? futureGames[0] : null;
}

// Обновить блок "Следующий матч" на главной
function updateNextGameBlock() {
    const dateEl = document.querySelector('.next-game-date');
    const teamsEl = document.querySelector('.next-game-teams');
    if (!dateEl || !teamsEl) return;

    const game = getNextGame();
    if (!game) {
        dateEl.textContent = 'Сезон завершён';
        teamsEl.innerHTML = '<span class="team-name">Все матчи сыграны</span>';
        return;
    }

    const imagesPath = getImagesPath();
    dateEl.textContent = formatGameDate(game.date);
    if (game.league) dateEl.textContent += ` · ${game.league}`;

    // Порядок: хозяева слева, гости справа
    teamsEl.innerHTML = `
        <div class="next-game-side">
            <img src="${imagesPath}${TEAM_LOGOS[game.home]}" alt="${game.home}" class="next-game-logo">
            <span class="team-name${game.home !== 'КГАСУ' ? ' opponent' : ''}">${game.home}</span>
        </div>
        <span class="vs">VS</span>
        <div class="next-game-side">
            <img src="${imagesPath}${TEAM_LOGOS[game.away]}" alt="${game.away}" class="next-game-logo">
            <span class="team-name${game.away !== 'КГАСУ' ? ' opponent' : ''}">${game.away}</span>
        </div>
    `;
}

// Подсчёт голов КГАСУ за сезон из сыгранных матчей
function renderSeasonStats() {
    const container = document.getElementById('season-stats');
    if (!container) return;

    let scored = 0;
    let conceded = 0;
    let played = 0;

    KGASU_GAMES.forEach(g => {
        if (g.homeScore === null) return;
        played++;
        if (g.home === 'КГАСУ') {
            scored += g.homeScore;
            conceded += g.awayScore;
        } else {
            scored += g.awayScore;
            conceded += g.homeScore;
        }
    });

    const diff = scored - conceded;
    const diffStr = diff > 0 ? `+${diff}` : `${diff}`;

    container.innerHTML = `
        <div class="stat-card">
            <span class="stat-value">${scored}</span>
            <span class="stat-label">Забито</span>
        </div>
        <div class="stat-card">
            <span class="stat-value">${conceded}</span>
            <span class="stat-label">Пропущено</span>
        </div>
        <div class="stat-card">
            <span class="stat-value ${diff > 0 ? 'positive' : diff < 0 ? 'negative' : ''}">${diffStr}</span>
            <span class="stat-label">Разница</span>
        </div>
        <div class="stat-card">
            <span class="stat-value">${played}</span>
            <span class="stat-label">Матчей</span>
        </div>
    `;
}

// Предстоящие игры на странице календаря
function renderUpcomingGames() {
    const container = document.getElementById('upcomingGamesList');
    if (!container) return;
    const imagesPath = getImagesPath();
    const upcoming = KGASU_GAMES.filter(g => g.homeScore === null);
    container.innerHTML = upcoming.map(g => {
        const homeLogo = TEAM_LOGOS[g.home] || '';
        const awayLogo = TEAM_LOGOS[g.away] || '';
        const leagueBadge = g.league ? `<div class="league-badge">${g.league}</div>` : '';
        return `
            <div class="game-card upcoming">
                ${leagueBadge}
                <div class="game-date">${formatGameDate(g.date)}</div>
                <div class="game-teams">
                    <div class="team home-team">
                        <img src="${imagesPath}${homeLogo}" alt="${g.home}" class="team-logo-small">
                        <span class="team-name">${g.home}</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team away-team">
                        <img src="${imagesPath}${awayLogo}" alt="${g.away}" class="team-logo-small">
                        <span class="team-name">${g.away}</span>
                    </div>
                </div>
            </div>`;
    }).join('');
}

// Сыгранные игры на странице календаря
function renderPastGames() {
    const container = document.getElementById('pastGamesList');
    if (!container) return;
    const imagesPath = getImagesPath();
    const played = KGASU_GAMES.filter(g => g.homeScore !== null).slice().reverse();
    container.innerHTML = played.map(g => {
        const kgasuScore = g.home === 'КГАСУ' ? g.homeScore : g.awayScore;
        const oppScore = g.home === 'КГАСУ' ? g.awayScore : g.homeScore;
        let resultClass, resultText;
        if (kgasuScore > oppScore) { resultClass = 'win'; resultText = 'Победа'; }
        else if (kgasuScore < oppScore) { resultClass = 'loss'; resultText = 'Поражение'; }
        else { resultClass = 'draw'; resultText = 'Ничья'; }
        const homeLogo = TEAM_LOGOS[g.home] || '';
        const awayLogo = TEAM_LOGOS[g.away] || '';
        return `
            <div class="game-card past ${resultClass}-card">
                <div class="game-date">${formatGameDate(g.date)}</div>
                <div class="game-teams">
                    <div class="team home-team">
                        <img src="${imagesPath}${homeLogo}" alt="${g.home}" class="team-logo-small">
                        <span class="team-name">${g.home}</span>
                    </div>
                    <div class="game-score">
                        <span class="score">${g.homeScore} : ${g.awayScore}</span>
                        <span class="result ${resultClass}">${resultText}</span>
                    </div>
                    <div class="team away-team">
                        <img src="${imagesPath}${awayLogo}" alt="${g.away}" class="team-logo-small">
                        <span class="team-name">${g.away}</span>
                    </div>
                </div>
            </div>`;
    }).join('');
}

// Плей-офф
function renderPlayoff(data) {
    const section = document.getElementById('playoffSection');
    const bracket = document.getElementById('playoffBracket');
    if (!section || !bracket) return;
    if (!data || !data.enabled) { section.style.display = 'none'; return; }
    section.style.display = '';

    const imagesPath = getImagesPath();

    function teamLogo(name) {
        if (!name || name === '?') return '';
        const logo = name === 'КГАСУ' || name === 'ХК КГАСУ'
            ? 'opponents/kgasu.jpg'
            : (TEAM_LOGOS[name] || '');
        return logo ? `<img src="${imagesPath}${logo}" alt="" class="bt-logo">` : '<span class="bt-logo-placeholder"></span>';
    }

    function matchCard(m) {
        const s1 = m.score1 !== null && m.score1 !== undefined ? m.score1 : '–';
        const s2 = m.score2 !== null && m.score2 !== undefined ? m.score2 : '–';
        const win1 = m.score1 !== null && m.score1 !== undefined && m.score1 > m.score2;
        const win2 = m.score1 !== null && m.score1 !== undefined && m.score2 > m.score1;
        const t1 = m.team1 || '?';
        const t2 = m.team2 || '?';
        const cls1 = `bt-team${win1 ? ' winner' : ''}${t1 === 'КГАСУ' || t1 === 'ХК КГАСУ' ? ' kgasu' : ''}`;
        const cls2 = `bt-team${win2 ? ' winner' : ''}${t2 === 'КГАСУ' || t2 === 'ХК КГАСУ' ? ' kgasu' : ''}`;
        return `<div class="bt-card">
            <div class="${cls1}">${teamLogo(t1)}<span class="bt-name">${t1}</span><span class="bt-score">${s1}</span></div>
            <div class="${cls2}">${teamLogo(t2)}<span class="bt-name">${t2}</span><span class="bt-score">${s2}</span></div>
        </div>`;
    }

    // Порядок: 1v8 и 4v5 → Полуфинал 1; 2v7 и 3v6 → Полуфинал 2
    const q = data.quarters; // [1v8, 2v7, 3v6, 4v5]
    bracket.innerHTML = `
        <div class="bt-scroll">
            <div class="bt-tree">
                <div class="bt-round">
                    <div class="bt-round-label">1/4 финала</div>
                    <div class="bt-col">
                        <div class="bt-group">
                            <div class="bt-slot">${matchCard(q[0])}</div>
                            <div class="bt-slot">${matchCard(q[3])}</div>
                        </div>
                        <div class="bt-group">
                            <div class="bt-slot">${matchCard(q[1])}</div>
                            <div class="bt-slot">${matchCard(q[2])}</div>
                        </div>
                    </div>
                </div>
                <div class="bt-round">
                    <div class="bt-round-label">1/2 финала</div>
                    <div class="bt-col">
                        <div class="bt-group">
                            <div class="bt-slot">${matchCard(data.semis[0])}</div>
                        </div>
                        <div class="bt-group">
                            <div class="bt-slot">${matchCard(data.semis[1])}</div>
                        </div>
                    </div>
                </div>
                <div class="bt-round">
                    <div class="bt-round-label">Финал</div>
                    <div class="bt-col">
                        <div class="bt-group bt-group-final">
                            <div class="bt-slot">${matchCard(data.final)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

// Запуск при загрузке страницы — данные берём из JSON-файлов
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const [gamesRes, standingsRes, playoffRes] = await Promise.all([
            fetch('/data/games.json'),
            fetch('/data/standings.json'),
            fetch('/data/playoff.json')
        ]);
        if (gamesRes.ok) {
            const gamesData = await gamesRes.json();
            KGASU_GAMES = (gamesData.games || []).sort((a, b) => a.date.localeCompare(b.date));
            TEAM_LOGOS = gamesData.team_logos || {};
        }
        if (standingsRes.ok) {
            const standingsData = await standingsRes.json();
            STANDINGS = standingsData.standings || [];
        }
        if (playoffRes.ok) {
            renderPlayoff(await playoffRes.json());
        }
    } catch (e) {
        console.warn('Не удалось загрузить данные:', e);
    }

    updateNextGameBlock();
    renderStandings();
    renderSeasonStats();
    renderUpcomingGames();
    renderPastGames();
});
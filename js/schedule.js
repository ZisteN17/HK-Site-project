// Расписание игр КГАСУ — Дивизион АБ ПЛХЛ 2025/2026
// Данные спарсены с plhl.ru (tournamentId=15651, teamId=1304107)
// Для обновления: используйте admin.html

const TEAM_LOGOS = {
    'КГАСУ': 'logo.jpeg',
    'Гагарин': 'opponents/gagarin.jpg',
    'Стрела - Дион': 'opponents/strela-dion.jpg',
    'Пестрецы': 'opponents/pestrecy.jpg',
    'КАИ': 'opponents/kai.jpg',
    'Ядран - AB': 'opponents/yadran-ab.jpg',
    'Сигма': 'opponents/sigma.jpg',
    'Казанские Юлбарсы': 'opponents/yulbarsy.jpg',
    'Ак Буре': 'opponents/ak-bure.jpg',
    'Зилант': 'opponents/zilant.jpg',
    'Тимерхан': 'opponents/timerhan.jpg',
    'Армеец': 'opponents/armeec.jpg'
};

const KGASU_GAMES = [
    { date: '2025-10-12T18:30', home: 'Ак Буре', away: 'КГАСУ', homeScore: 2, awayScore: 8 },
    { date: '2025-10-16T22:00', home: 'КГАСУ', away: 'Пестрецы', homeScore: 7, awayScore: 3 },
    { date: '2025-10-22T21:30', home: 'Зилант', away: 'КГАСУ', homeScore: 0, awayScore: 4 },
    { date: '2025-11-04T21:30', home: 'КГАСУ', away: 'Сигма', homeScore: 1, awayScore: 0 },
    { date: '2025-11-14T21:15', home: 'Ядран - AB', away: 'КГАСУ', homeScore: 3, awayScore: 3 },
    { date: '2025-11-20T21:30', home: 'КГАСУ', away: 'Тимерхан', homeScore: 5, awayScore: 2 },
    { date: '2025-11-23T21:30', home: 'Гагарин', away: 'КГАСУ', homeScore: 2, awayScore: 1 },
    { date: '2025-11-26T22:00', home: 'Казанские Юлбарсы', away: 'КГАСУ', homeScore: 6, awayScore: 2 },
    { date: '2025-12-04T21:45', home: 'КГАСУ', away: 'КАИ', homeScore: 2, awayScore: 1 },
    { date: '2025-12-09T22:30', home: 'Стрела - Дион', away: 'КГАСУ', homeScore: 4, awayScore: 3 },
    { date: '2025-12-18T22:30', home: 'КГАСУ', away: 'Армеец', homeScore: 17, awayScore: 2 },
    { date: '2026-01-15T19:45', home: 'Пестрецы', away: 'КГАСУ', homeScore: 3, awayScore: 5 },
    { date: '2026-01-24T20:30', home: 'КГАСУ', away: 'Зилант', homeScore: 4, awayScore: 3 },
    { date: '2026-01-28T22:30', home: 'КГАСУ', away: 'Ак Буре', homeScore: 8, awayScore: 4 },
    { date: '2026-02-10T22:00', home: 'Сигма', away: 'КГАСУ', homeScore: 1, awayScore: 2 },
    { date: '2026-02-18T20:15', home: 'Тимерхан', away: 'КГАСУ', homeScore: 4, awayScore: 6 },
    { date: '2026-02-26T22:00', home: 'КГАСУ', away: 'Гагарин', homeScore: null, awayScore: null },
    { date: '2026-03-02T21:30', home: 'КГАСУ', away: 'Казанские Юлбарсы', homeScore: null, awayScore: null },
    { date: '2026-03-04T21:30', home: 'КАИ', away: 'КГАСУ', homeScore: null, awayScore: null },
    { date: '2026-03-12T21:30', home: 'КГАСУ', away: 'Стрела - Дион', homeScore: null, awayScore: null },
    { date: '2026-03-16T20:00', home: 'Армеец', away: 'КГАСУ', homeScore: null, awayScore: null },
    { date: '2026-03-20T21:15', home: 'Ядран - AB', away: 'КГАСУ', homeScore: null, awayScore: null }
];

const STANDINGS = [
    { pos: 1, team: 'Стрела - Дион', games: 18, wins: 12, draws: 2, losses: 4, goals: '71-32', points: 26 },
    { pos: 2, team: 'Гагарин', games: 17, wins: 12, draws: 2, losses: 3, goals: '58-21', points: 26 },
    { pos: 3, team: 'КГАСУ', games: 16, wins: 12, draws: 1, losses: 3, goals: '72-36', points: 25 },
    { pos: 4, team: 'Пестрецы', games: 18, wins: 10, draws: 3, losses: 5, goals: '45-43', points: 23 },
    { pos: 5, team: 'Ядран - AB', games: 16, wins: 10, draws: 1, losses: 5, goals: '68-50', points: 21 },
    { pos: 6, team: 'КАИ', games: 18, wins: 8, draws: 4, losses: 6, goals: '87-44', points: 20 },
    { pos: 7, team: 'Сигма', games: 17, wins: 9, draws: 1, losses: 7, goals: '47-36', points: 19 },
    { pos: 8, team: 'Казанские Юлбарсы', games: 17, wins: 7, draws: 3, losses: 7, goals: '75-49', points: 17 },
    { pos: 9, team: 'Ак Буре', games: 17, wins: 5, draws: 1, losses: 11, goals: '38-59', points: 11 },
    { pos: 10, team: 'Зилант', games: 18, wins: 4, draws: 2, losses: 12, goals: '42-73', points: 10 },
    { pos: 11, team: 'Тимерхан', games: 17, wins: 4, draws: 0, losses: 13, goals: '29-58', points: 8 },
    { pos: 12, team: 'Армеец', games: 17, wins: 0, draws: 0, losses: 17, goals: '19-150', points: 0 }
];

// Отрисовка турнирной таблицы из данных STANDINGS
function renderStandings() {
    const tbody = document.querySelector('.standings-table tbody');
    if (!tbody) return;

    const imagesPath = getImagesPath();
    tbody.innerHTML = STANDINGS.map(s => {
        const logo = TEAM_LOGOS[s.team] || '';
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
    const opponent = game.home === 'КГАСУ' ? game.away : game.home;
    const opponentLogo = TEAM_LOGOS[opponent] || '';
    const kgasuLogo = TEAM_LOGOS['КГАСУ'];

    dateEl.textContent = formatGameDate(game.date);

    // Порядок: хозяева слева, гости справа
    teamsEl.innerHTML = `
        <img src="${imagesPath}${TEAM_LOGOS[game.home]}" alt="${game.home}" class="next-game-logo">
        <span class="team-name${game.home !== 'КГАСУ' ? ' opponent' : ''}">${game.home}</span>
        <span class="vs">VS</span>
        <span class="team-name${game.away !== 'КГАСУ' ? ' opponent' : ''}">${game.away}</span>
        <img src="${imagesPath}${TEAM_LOGOS[game.away]}" alt="${game.away}" class="next-game-logo">
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

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateNextGameBlock();
    renderStandings();
    renderSeasonStats();
});
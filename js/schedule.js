// Расписание игр КГАСУ — Дивизион АБ ПЛХЛ 2025/2026
// Данные спарсены с plhl.ru (tournamentId=15651, teamId=1304107)
// Для обновления: заменить массив KGASU_GAMES актуальными данными

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
    { date: '2026-02-18T20:15', home: 'Тимерхан', away: 'КГАСУ', homeScore: null, awayScore: null },
    { date: '2026-02-26T22:00', home: 'КГАСУ', away: 'Гагарин', homeScore: null, awayScore: null },
    { date: '2026-03-02T21:30', home: 'КГАСУ', away: 'Казанские Юлбарсы', homeScore: null, awayScore: null },
    { date: '2026-03-04T21:30', home: 'КАИ', away: 'КГАСУ', homeScore: null, awayScore: null },
    { date: '2026-03-12T21:30', home: 'КГАСУ', away: 'Стрела - Дион', homeScore: null, awayScore: null },
    { date: '2026-03-16T20:00', home: 'Армеец', away: 'КГАСУ', homeScore: null, awayScore: null },
    { date: '2026-03-20T21:15', home: 'Ядран - AB', away: 'КГАСУ', homeScore: null, awayScore: null }
];

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

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', updateNextGameBlock);

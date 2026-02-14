// ============================
// СТРАНИЦА КАЛЕНДАРЬ
// ============================

// Пример данных (в будущем будет загружаться из Supabase)
const seasonsData = {
    "2025-2026": {
        standings: [
            { place: 1, team: "ХК КГАСУ", games: 10, wins: 8, losses: 2, goals: "40:15", points: 24 },
            { place: 2, team: "Команда 2", games: 10, wins: 7, losses: 3, goals: "35:20", points: 21 },
            { place: 3, team: "Команда 3", games: 10, wins: 5, losses: 5, goals: "30:30", points: 15 }
        ],
        upcomingGames: [
            {
                id: 1,
                date: "15 февраля 2026, 18:00",
                homeTeam: "ХК КГАСУ",
                homeLogo: "../images/logo.jpeg",
                awayTeam: "Соперник 1",
                awayLogo: "../images/opponents/opponent-placeholder.png",
                location: "Ледовая арена КГАСУ"
            },
            {
                id: 2,
                date: "20 февраля 2026, 19:00",
                homeTeam: "Соперник 2",
                homeLogo: "../images/opponents/opponent-placeholder.png",
                awayTeam: "ХК КГАСУ",
                awayLogo: "../images/logo.jpeg",
                location: "Выездная игра"
            }
        ],
        pastGames: [
            {
                id: 1,
                date: "10 февраля 2026",
                homeTeam: "ХК КГАСУ",
                homeLogo: "../images/logo.jpeg",
                homeScore: 5,
                awayTeam: "Соперник 1",
                awayLogo: "../images/opponents/opponent-placeholder.png",
                awayScore: 3,
                result: "win"
            },
            {
                id: 2,
                date: "5 февраля 2026",
                homeTeam: "Соперник 2",
                homeLogo: "../images/opponents/opponent-placeholder.png",
                homeScore: 2,
                awayTeam: "ХК КГАСУ",
                awayLogo: "../images/logo.jpeg",
                awayScore: 4,
                result: "win"
            }
        ]
    }
};

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const seasonSelect = document.getElementById('seasonSelect');
    if (seasonSelect) {
        loadSeasonData(seasonSelect.value);

        // Слушатель изменения сезона
        seasonSelect.addEventListener('change', function() {
            loadSeasonData(this.value);
        });
    }
});

function loadSeasonData(season) {
    const data = seasonsData[season];
    if (!data) return;

    loadStandings(data.standings);
    loadUpcomingGames(data.upcomingGames);
    loadPastGames(data.pastGames);
}

// Турнирная таблица
function loadStandings(standings) {
    const tbody = document.getElementById('standingsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    standings.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.place}</td>
            <td class="team-name">${team.team}</td>
            <td>${team.games}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.goals}</td>
            <td><strong>${team.points}</strong></td>
        `;
        tbody.appendChild(row);
    });
}

// Предстоящие игры
function loadUpcomingGames(games) {
    const container = document.getElementById('upcomingGames');
    if (!container) return;

    container.innerHTML = '';

    games.forEach(game => {
        const gameCard = createUpcomingGameCard(game);
        container.appendChild(gameCard);
    });
}

function createUpcomingGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card upcoming';

    card.innerHTML = `
        <div class="game-date">${game.date}</div>
        <div class="game-teams">
            <div class="team home-team">
                <img src="${game.homeLogo}" alt="${game.homeTeam}" class="team-logo-small">
                <span class="team-name">${game.homeTeam}</span>
            </div>
            <div class="vs">VS</div>
            <div class="team away-team">
                <img src="${game.awayLogo}" alt="${game.awayTeam}" class="team-logo-small">
                <span class="team-name">${game.awayTeam}</span>
            </div>
        </div>
        <div class="game-location">Место: ${game.location}</div>
    `;

    return card;
}

// Сыгранные матчи
function loadPastGames(games) {
    const container = document.getElementById('pastGames');
    if (!container) return;

    container.innerHTML = '';

    games.forEach(game => {
        const gameCard = createPastGameCard(game);
        container.appendChild(gameCard);
    });
}

function createPastGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card past';

    // Определяем результат для ХК КГАСУ
    let resultText = '';
    let resultClass = '';

    if (game.homeTeam === "ХК КГАСУ") {
        resultText = game.homeScore > game.awayScore ? "Победа" : "Поражение";
        resultClass = game.homeScore > game.awayScore ? "win" : "loss";
    } else {
        resultText = game.awayScore > game.homeScore ? "Победа" : "Поражение";
        resultClass = game.awayScore > game.homeScore ? "win" : "loss";
    }

    card.innerHTML = `
        <div class="game-date">${game.date}</div>
        <div class="game-teams">
            <div class="team home-team">
                <img src="${game.homeLogo}" alt="${game.homeTeam}" class="team-logo-small">
                <span class="team-name">${game.homeTeam}</span>
            </div>
            <div class="game-score">
                <span class="score">${game.homeScore} : ${game.awayScore}</span>
                <span class="result ${resultClass}">${resultText}</span>
            </div>
            <div class="team away-team">
                <img src="${game.awayLogo}" alt="${game.awayTeam}" class="team-logo-small">
                <span class="team-name">${game.awayTeam}</span>
            </div>
        </div>
    `;

    return card;
}

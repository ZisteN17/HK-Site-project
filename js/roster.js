// ============================
// СТРАНИЦА ОСНОВНОГО СОСТАВА
// ============================

// Пример данных игроков (в будущем будет загружаться из Supabase)
const playersData = [
    {
        id: 1,
        name: "Иван Иванов",
        number: 17,
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        height: 185,
        weight: 82,
        age: 21,
        bio: "Студент 3 курса, играет в хоккей с 7 лет. Лучший бомбардир команды в сезоне 2024/2025."
    },
    {
        id: 2,
        name: "Петр Петров",
        number: 5,
        position: "Защитник",
        photo: "../images/players/player-placeholder.jpg",
        height: 188,
        weight: 90,
        age: 22,
        bio: "Надежный защитник с отличным чтением игры. Капитан команды."
    },
    {
        id: 3,
        name: "Сергей Сергеев",
        number: 1,
        position: "Вратарь",
        photo: "../images/players/player-placeholder.jpg",
        height: 183,
        weight: 78,
        age: 20,
        bio: "Молодой перспективный вратарь. Лучший процент отбитых бросков в лиге."
    }
];

// Загрузка игроков на страницу
document.addEventListener('DOMContentLoaded', function() {
    loadPlayers();
    setupPlayerCardListeners();
});

function loadPlayers() {
    const playersGrid = document.getElementById('playersGrid');
    if (!playersGrid) return;

    // Очищаем сетку
    playersGrid.innerHTML = '';

    // Загружаем игроков из данных
    playersData.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersGrid.appendChild(playerCard);
    });
}

function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.dataset.playerId = player.id;

    card.innerHTML = `
        <div class="player-photo">
            <img src="${player.photo}" alt="${player.name}">
        </div>
        <div class="player-info">
            <h3 class="player-name">${player.name}</h3>
            <p class="player-number">#${player.number}</p>
            <p class="player-position">${player.position}</p>
        </div>
    `;

    return card;
}

function setupPlayerCardListeners() {
    document.addEventListener('click', function(event) {
        const playerCard = event.target.closest('.player-card');
        if (playerCard) {
            const playerId = parseInt(playerCard.dataset.playerId);
            const player = playersData.find(p => p.id === playerId);
            if (player) {
                showPlayerModal(player);
            }
        }
    });
}

function showPlayerModal(player) {
    // Заполняем модальное окно данными игрока
    document.getElementById('modalPlayerPhoto').src = player.photo;
    document.getElementById('modalPlayerName').textContent = player.name;
    document.getElementById('modalPlayerNumber').textContent = player.number;
    document.getElementById('modalPlayerPosition').textContent = player.position;
    document.getElementById('modalPlayerBio').textContent = player.bio;
    document.getElementById('modalPlayerHeight').textContent = player.height;
    document.getElementById('modalPlayerWeight').textContent = player.weight;
    document.getElementById('modalPlayerAge').textContent = player.age;

    // Открываем модальное окно
    openModal('playerModal');
}

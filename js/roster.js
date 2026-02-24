// ============================
// СТРАНИЦА ОСНОВНОГО СОСТАВА
// Данные загружены из заявки ПЛХЛ (plhl.ru), турнир 2025/2026
// ============================

const playersData = [
    // === ВРАТАРИ ===
    {
        id: 1,
        name: "Карим Агзамов",
        number: 69,
        position: "Вратарь",
        photo: "../images/players/Агзамов_Карим.jpg",
        height: 185,
        weight: 77,
        birthDate: "2005-08-16",
        hand: "Левый"
    },
    {
        id: 2,
        name: "Аяз Гараев",
        number: 1,
        position: "Вратарь",
        photo: "../images/players/Гараев_Аяз.jpg",
        height: 181,
        weight: 79,
        birthDate: "2006-02-08",
        hand: "Левый"
    },
    {
        id: 3,
        name: "Даниил Михалаш",
        number: 31,
        position: "Вратарь",
        photo: "../images/players/Михалаш_Даниил.jpg",
        height: 198,
        weight: 80,
        birthDate: "2005-06-02",
        hand: "Правый"
    },
    {
        id: 4,
        name: "Эмиль Халиуллин",
        number: 21,
        position: "Вратарь",
        photo: "../images/players/Халиуллин_Эмиль.jpg",
        height: 190,
        weight: 90,
        birthDate: "2004-03-06",
        hand: "Левый"
    },

    // === ЗАЩИТНИКИ ===
    {
        id: 5,
        name: "Тимур Алтымбаев",
        number: 85,
        position: "Защитник",
        photo: "../images/players/Алтымбаев_Тимур.jpg",
        height: 175,
        weight: 70,
        birthDate: "2006-06-08",
        hand: "Левый"
    },
    {
        id: 6,
        name: "Руслан Газдалеев",
        number: 33,
        position: "Защитник",
        photo: "../images/players/Газдалеев_Руслан.jpg",
        height: 173,
        weight: 95,
        birthDate: "2006-02-04",
        hand: "Левый"
    },
    {
        id: 7,
        name: "Рустем Зарипов",
        number: 71,
        position: "Защитник",
        photo: "../images/players/Зарипов_Рустем.jpg",
        height: 178,
        weight: 76,
        birthDate: "2001-02-10",
        hand: "Левый"
    },
    {
        id: 8,
        name: "Ринель Зиннатов",
        number: 55,
        position: "Защитник",
        photo: "../images/players/Зиннатов_Ринель.jpg",
        height: 177,
        weight: 71,
        birthDate: "2006-12-06",
        hand: "Левый"
    },
    {
        id: 9,
        name: "Никита Климовских",
        number: 7,
        position: "Защитник",
        photo: "../images/players/Климовских_Никита.jpg",
        height: 183,
        weight: 83,
        birthDate: "2004-08-03",
        hand: "Правый"
    },
    {
        id: 10,
        name: "Ярослав Коловский",
        number: 85,
        position: "Защитник",
        photo: "../images/players/Коловский_Ярослав.jpg",
        height: 185,
        weight: 91,
        birthDate: "2005-12-03",
        hand: "Левый"
    },
    {
        id: 11,
        name: "Андрей Комлев",
        number: 76,
        position: "Защитник",
        photo: "../images/players/Комлев_Андрей.jpg",
        height: 190,
        weight: 85,
        birthDate: "2006-12-08",
        hand: "Левый"
    },
    {
        id: 12,
        name: "Ильдар Мутигуллин",
        number: 8,
        position: "Защитник",
        role: "Ассистент капитана",
        photo: "../images/players/Мутигуллин_Ильдар.jpg",
        height: 191,
        weight: 72,
        birthDate: "2002-02-18",
        hand: "Левый"
    },
    {
        id: 13,
        name: "Рузаль Муниров",
        number: 14,
        position: "Защитник",
        photo: "../images/players/Муниров_Рузаль.jpg",
        height: 171,
        weight: 75,
        birthDate: "2005-05-13",
        hand: "Левый"
    },
    {
        id: 14,
        name: "Ранис Хуснутдинов",
        number: 95,
        position: "Защитник",
        photo: "../images/players/Хуснутдинов_Ранис.jpg",
        height: 178,
        weight: 89,
        birthDate: "2006-08-04",
        hand: "Левый"
    },

    // === НАПАДАЮЩИЕ ===
    {
        id: 15,
        name: "Леонид Алдошин",
        number: 44,
        position: "Нападающий",
        photo: "../images/players/Алдошин_Леонид.jpg",
        height: 177,
        weight: 68,
        birthDate: "2004-08-04",
        hand: "Левый"
    },
    {
        id: 16,
        name: "Айдар Загрутдинов",
        number: 10,
        position: "Нападающий",
        photo: "../images/players/Загрутдинов_Айдар.jpg",
        height: 180,
        weight: 73,
        birthDate: "2002-10-19",
        hand: "Левый"
    },
    {
        id: 17,
        name: "Денис Клименко",
        number: 13,
        position: "Нападающий",
        photo: "../images/players/Клименко_Денис.jpg",
        height: 183,
        weight: 75,
        birthDate: "2005-11-11",
        hand: "Левый"
    },
    {
        id: 18,
        name: "Семен Красин",
        number: 20,
        position: "Нападающий",
        photo: "../images/players/Красин_Семен.jpg",
        height: 182,
        weight: 82,
        birthDate: "2004-06-14",
        hand: "Левый"
    },
    {
        id: 19,
        name: "Марат Лашек",
        number: 26,
        position: "Нападающий",
        photo: "../images/players/Лашек_Марат.jpg",
        height: 180,
        weight: 66,
        birthDate: "2007-07-20",
        hand: "Левый"
    },
    {
        id: 20,
        name: "Никита Лунин",
        number: 76,
        position: "Нападающий",
        photo: "../images/players/Лунин_Никита.jpg",
        height: 190,
        weight: 75,
        birthDate: "2007-01-21",
        hand: "Левый"
    },
    {
        id: 21,
        name: "Станислав Мокрополов",
        number: 87,
        position: "Нападающий",
        photo: "../images/players/Мокрополов_Станислав.jpg",
        height: 185,
        weight: 81,
        birthDate: "2005-08-23",
        hand: "Левый"
    },
    {
        id: 22,
        name: "Айнур Мударисов",
        number: 68,
        position: "Нападающий",
        photo: "../images/players/Мударисов_Айнур.jpg",
        height: 186,
        weight: 75,
        birthDate: "1999-03-14",
        hand: "Левый"
    },
    {
        id: 23,
        name: "Фанзиль Муниров",
        number: 81,
        position: "Нападающий",
        photo: "../images/players/Муниров_Фанзиль.jpg",
        height: 176,
        weight: 77,
        birthDate: "2001-07-22",
        hand: "Левый"
    },
    {
        id: 24,
        name: "Данила Мусаев",
        number: 73,
        position: "Нападающий",
        photo: "../images/players/Мусаев_Данила.jpg",
        height: 190,
        weight: 75,
        birthDate: "2001-05-16",
        hand: "Левый"
    },
    {
        id: 25,
        name: "Амир Мухитов",
        number: 17,
        position: "Нападающий",
        role: "Капитан",
        photo: "../images/players/Мухитов_Амир.jpg",
        height: 187,
        weight: 77,
        birthDate: "2005-12-16",
        hand: "Левый"
    },
    {
        id: 26,
        name: "Сергей Сорокин",
        number: 47,
        position: "Нападающий",
        photo: "../images/players/Сорокин_Сергей.jpg",
        height: 192,
        weight: 93,
        birthDate: "2007-01-27",
        hand: "Левый"
    },
    {
        id: 27,
        name: "Данил Устимкин",
        number: 18,
        position: "Нападающий",
        role: "Ассистент капитана",
        photo: "../images/players/Устимкин_Данил.jpg",
        height: 172,
        weight: 65,
        birthDate: "2004-07-18",
        hand: "Левый"
    },
    {
        id: 28,
        name: "Данил Хайрутдинов",
        number: 99,
        position: "Нападающий",
        photo: "../images/players/Хайрутдинов_Данил.jpg",
        height: 173,
        weight: 62,
        birthDate: "1999-07-12",
        hand: "Правый"
    },
    {
        id: 29,
        name: "Рамзан Хайрутдинов",
        number: 9,
        position: "Нападающий",
        photo: "../images/players/Хайрутдинов_Рамзан.jpg",
        height: 175,
        weight: 75,
        birthDate: "2006-05-07",
        hand: "Левый"
    },
    {
        id: 30,
        name: "Савелий Храмов",
        number: 77,
        position: "Нападающий",
        photo: "../images/players/Храмов_Савелий.jpg",
        height: 180,
        weight: 72,
        birthDate: "2007-11-09",
        hand: "Правый"
    }
];

// Вычисление возраста из даты рождения
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Загрузка игроков на страницу
document.addEventListener('DOMContentLoaded', function() {
    loadPlayers();
    setupPlayerCardListeners();
});

function loadPlayers() {
    const playersGrid = document.getElementById('playersGrid');
    if (!playersGrid) return;

    playersGrid.innerHTML = '';

    // Группируем по позициям
    const positions = [
        { key: 'Вратарь', plural: 'Вратари' },
        { key: 'Защитник', plural: 'Защитники' },
        { key: 'Нападающий', plural: 'Нападающие' }
    ];
    positions.forEach(({ key, plural }) => {
        const positionPlayers = playersData.filter(p => p.position === key);
        if (positionPlayers.length === 0) return;

        // Заголовок группы
        const header = document.createElement('div');
        header.className = 'position-header';
        header.innerHTML = `<h2>${plural} <span class="position-count">(${positionPlayers.length})</span></h2>`;
        playersGrid.appendChild(header);

        // Карточки игроков
        positionPlayers.forEach(player => {
            const playerCard = createPlayerCard(player);
            playersGrid.appendChild(playerCard);
        });
    });

    // Тренерский штаб
    const coachHeader = document.createElement('div');
    coachHeader.className = 'position-header';
    coachHeader.innerHTML = `<h2>Тренерский штаб</h2>`;
    playersGrid.appendChild(coachHeader);

    const coachCard = document.createElement('div');
    coachCard.className = 'player-card coach-card';
    coachCard.innerHTML = `
        <div class="player-photo">
            <img src="../images/coach.jpeg" alt="Вадим Вакивович">
        </div>
        <div class="player-info">
            <h3 class="player-name">Вадим Вакивович</h3>
            <p class="player-position" style="color: var(--primary-red); font-weight: 700;">Тренер</p>
        </div>
    `;
    playersGrid.appendChild(coachCard);
}

function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.dataset.playerId = player.id;

    const roleLabel = player.role ? `<span class="player-role">${player.role === 'Капитан' ? 'К' : 'А'}</span>` : '';

    card.innerHTML = `
        <div class="player-photo">
            <img src="${player.photo}" alt="${player.name}" onerror="this.src='../images/players/player-placeholder.jpg'">
        </div>
        <div class="player-info">
            <h3 class="player-name">${player.name}${roleLabel}</h3>
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
    const age = calculateAge(player.birthDate);

    document.getElementById('modalPlayerPhoto').src = player.photo;
    document.getElementById('modalPlayerName').textContent = player.name + (player.role ? ` (${player.role})` : '');
    document.getElementById('modalPlayerNumber').textContent = player.number;
    document.getElementById('modalPlayerPosition').textContent = player.position;
    document.getElementById('modalPlayerHeight').textContent = player.height;
    document.getElementById('modalPlayerWeight').textContent = player.weight;
    document.getElementById('modalPlayerAge').textContent = age;

    // Биография
    const bioText = `${player.position}, ${player.height} см, ${player.weight} кг. Хват: ${player.hand}.`;
    document.getElementById('modalPlayerBio').textContent = bioText;

    openModal('playerModal');
}

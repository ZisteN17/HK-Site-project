// ============================
// СТРАНИЦА ВЕТЕРАНОВ
// ============================

// Пример данных ветеранов (в будущем будет загружаться из Supabase)
const veteransData = [
    {
        id: 1,
        name: "Алексей Алексеев",
        position: "Нападающий",
        photo: "../images/veterans/veteran-placeholder.jpg",
        years: "2018-2022",
        bio: "Выпускник КГАСУ 2022 года. Провел в команде 4 сезона, стал одним из лучших бомбардиров в истории клуба.",
        achievements: "Чемпион студенческой лиги 2020, лучший снайпер сезона 2021/2022"
    },
    {
        id: 2,
        name: "Дмитрий Дмитриев",
        position: "Вратарь",
        photo: "../images/veterans/veteran-placeholder.jpg",
        years: "2015-2019",
        bio: "Легенда ХК КГАСУ. Первый вратарь команды, который провел более 100 матчей.",
        achievements: "Лучший вратарь студенческой лиги 2018, 3-кратный чемпион"
    }
];

// Загрузка ветеранов на страницу
document.addEventListener('DOMContentLoaded', function() {
    loadVeterans();
    setupVeteranCardListeners();
});

function loadVeterans() {
    const veteransGrid = document.getElementById('veteransGrid');
    if (!veteransGrid) return;

    // Очищаем сетку
    veteransGrid.innerHTML = '';

    // Загружаем ветеранов из данных
    veteransData.forEach(veteran => {
        const veteranCard = createVeteranCard(veteran);
        veteransGrid.appendChild(veteranCard);
    });
}

function createVeteranCard(veteran) {
    const card = document.createElement('div');
    card.className = 'player-card veteran-card';
    card.dataset.playerId = veteran.id;

    card.innerHTML = `
        <div class="player-photo">
            <img src="${veteran.photo}" alt="${veteran.name}">
        </div>
        <div class="player-info">
            <h3 class="player-name">${veteran.name}</h3>
            <p class="player-years">Годы в команде: ${veteran.years}</p>
            <p class="player-position">${veteran.position}</p>
        </div>
    `;

    return card;
}

function setupVeteranCardListeners() {
    document.addEventListener('click', function(event) {
        const veteranCard = event.target.closest('.veteran-card');
        if (veteranCard) {
            const veteranId = parseInt(veteranCard.dataset.playerId);
            const veteran = veteransData.find(v => v.id === veteranId);
            if (veteran) {
                showVeteranModal(veteran);
            }
        }
    });
}

function showVeteranModal(veteran) {
    // Заполняем модальное окно данными ветерана
    document.getElementById('modalVeteranPhoto').src = veteran.photo;
    document.getElementById('modalVeteranName').textContent = veteran.name;
    document.getElementById('modalVeteranYears').textContent = veteran.years;
    document.getElementById('modalVeteranPosition').textContent = veteran.position;
    document.getElementById('modalVeteranBio').textContent = veteran.bio;
    document.getElementById('modalVeteranAchievements').textContent = veteran.achievements;

    // Открываем модальное окно
    openModal('veteranModal');
}

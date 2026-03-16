// ============================
// СТРАНИЦА ОСНОВНОГО СОСТАВА
// Данные загружаются из /data/roster_plhl.json и /data/roster_skhl.json
// ============================

let allPlayers = { plhl: [], skhl: [] };

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
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const [plhlRes, skhlRes] = await Promise.all([
            fetch('/data/roster_plhl.json'),
            fetch('/data/roster_skhl.json')
        ]);
        if (plhlRes.ok) {
            const data = await plhlRes.json();
            allPlayers.plhl = data.players || [];
        }
        if (skhlRes.ok) {
            const data = await skhlRes.json();
            allPlayers.skhl = data.players || [];
        }
    } catch (e) {
        console.warn('Не удалось загрузить состав:', e);
    }

    loadPlayers(allPlayers.plhl);
    setupPlayerCardListeners();
    setupLeagueTabs();
});

function setupLeagueTabs() {
    const tabs = document.querySelectorAll('.league-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const league = this.dataset.league;
            loadPlayers(league === 'skhl' ? allPlayers.skhl : allPlayers.plhl);
        });
    });
}

// Нормализация пути к фото (JSON хранит "players/xxx.jpg", нужно "../images/players/xxx.jpg")
function isPlaceholderPhoto(photo) {
    return !photo || photo.includes('player-placeholder');
}

function getPhotoSrc(photo) {
    if (isPlaceholderPhoto(photo)) return '../images/players/player-placeholder.png';
    if (photo.startsWith('http') || photo.startsWith('../') || photo.startsWith('/')) return photo;
    return '../images/' + photo;
}

function loadPlayers(data) {
    const playersGrid = document.getElementById('playersGrid');
    if (!playersGrid) return;

    playersGrid.innerHTML = '';

    if (!data || data.length === 0) {
        playersGrid.innerHTML = '<div class="roster-empty">Состав скоро будет добавлен</div>';
        return;
    }

    // Группируем по позициям
    const positions = [
        { key: 'Вратарь', plural: 'Вратари' },
        { key: 'Защитник', plural: 'Защитники' },
        { key: 'Нападающий', plural: 'Нападающие' }
    ];
    positions.forEach(({ key, plural }) => {
        const positionPlayers = data.filter(p => p.position === key);
        if (positionPlayers.length === 0) return;

        const header = document.createElement('div');
        header.className = 'position-header';
        header.innerHTML = `<h2>${plural} <span class="position-count">(${positionPlayers.length})</span></h2>`;
        playersGrid.appendChild(header);

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

    // Выделяем именинников после отрисовки карточек
    if (typeof highlightBirthdayCards === 'function') {
        highlightBirthdayCards(getTodayBirthdays());
    }
}

function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.dataset.playerId = player.id;

    const roleLabel = player.role ? `<span class="player-role">${player.role === 'Капитан' ? 'К' : 'А'}</span>` : '';
    const isPlaceholder = isPlaceholderPhoto(player.photo);
    const placeholderClass = isPlaceholder ? ' is-placeholder' : '';

    card.innerHTML = `
        <div class="player-photo">
            <img src="${getPhotoSrc(player.photo)}" alt="${player.name}" class="${placeholderClass.trim()}" onerror="this.onerror=null; this.src='../images/players/player-placeholder.png'; this.classList.add('is-placeholder')">
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
            const player = [...allPlayers.plhl, ...allPlayers.skhl].find(p => p.id === playerId);
            if (player) {
                showPlayerModal(player);
            }
        }
    });
}

function formatBirthDate(birthDate) {
    if (!birthDate) return '—';
    const [year, month, day] = birthDate.split('-');
    return `${day}.${month}.${year}`;
}

function showPlayerModal(player) {
    const age = player.birthDate ? calculateAge(player.birthDate) : '—';

    const modalPhoto = document.getElementById('modalPlayerPhoto');
    modalPhoto.src = getPhotoSrc(player.photo);
    if (isPlaceholderPhoto(player.photo)) {
        modalPhoto.classList.add('is-placeholder');
    } else {
        modalPhoto.classList.remove('is-placeholder');
    }
    const roleLabel = player.role ? `<span class="player-role">${player.role === 'Капитан' ? 'К' : 'А'}</span>` : '';
    document.getElementById('modalPlayerName').innerHTML = player.name + roleLabel;
    document.getElementById('modalPlayerNumber').textContent = player.number;
    document.getElementById('modalPlayerPosition').textContent = player.position;
    document.getElementById('modalPlayerHand').textContent = player.hand || '—';
    document.getElementById('modalPlayerBirthDate').textContent = formatBirthDate(player.birthDate);
    document.getElementById('modalPlayerAge').textContent = age;

    openModal('playerModal');
}

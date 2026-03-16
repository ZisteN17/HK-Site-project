// ============================
// СТРАНИЦА ВЕТЕРАНОВ
// Данные загружаются из /api/veterans
// ============================

let veteransData = [];

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const res = await fetch('/api/veterans');
        if (res.ok) {
            const data = await res.json();
            veteransData = data.veterans || [];
        }
    } catch (e) {
        console.warn('Не удалось загрузить ветеранов:', e);
    }

    loadVeterans();
    setupVeteranCardListeners();
});

function getVeteranPhoto(photo) {
    if (!photo) return '../images/players/player-placeholder.png';
    if (photo.startsWith('http') || photo.startsWith('../') || photo.startsWith('/')) return photo;
    return '/' + photo;
}

function loadVeterans() {
    const veteransGrid = document.getElementById('veteransGrid');
    if (!veteransGrid) return;

    veteransGrid.innerHTML = '';

    if (veteransData.length === 0) {
        veteransGrid.innerHTML = '<div class="roster-empty">Ветераны скоро будут добавлены</div>';
        return;
    }

    veteransData.forEach(veteran => {
        veteransGrid.appendChild(createVeteranCard(veteran));
    });
}

function createVeteranCard(veteran) {
    const card = document.createElement('div');
    card.className = 'player-card veteran-card';
    card.dataset.playerId = veteran.id;

    const isPlaceholder = !veteran.photo;
    card.innerHTML = `
        <div class="player-photo">
            <img src="${getVeteranPhoto(veteran.photo)}" alt="${veteran.name}"
                 class="${isPlaceholder ? 'is-placeholder' : ''}"
                 onerror="this.onerror=null; this.src='../images/players/player-placeholder.png'; this.classList.add('is-placeholder')">
        </div>
        <div class="player-info">
            <h3 class="player-name">${veteran.name}</h3>
            ${veteran.years ? `<p class="player-years">Годы в команде: ${veteran.years}</p>` : ''}
            <p class="player-position">${veteran.position}</p>
        </div>
    `;

    return card;
}

function setupVeteranCardListeners() {
    document.addEventListener('click', function (event) {
        const veteranCard = event.target.closest('.veteran-card');
        if (veteranCard) {
            const veteranId = parseInt(veteranCard.dataset.playerId);
            const veteran = veteransData.find(v => v.id === veteranId);
            if (veteran) showVeteranModal(veteran);
        }
    });
}

function showVeteranModal(veteran) {
    document.getElementById('modalVeteranPhoto').src = getVeteranPhoto(veteran.photo);
    document.getElementById('modalVeteranName').textContent = veteran.name;
    document.getElementById('modalVeteranYears').textContent = veteran.years || '—';
    document.getElementById('modalVeteranPosition').textContent = veteran.position;
    document.getElementById('modalVeteranBio').textContent = veteran.bio || '—';
    document.getElementById('modalVeteranAchievements').textContent = veteran.achievements || '—';

    openModal('veteranModal');
}

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

    // показать карточки (они стартуют скрытыми)
    requestAnimationFrame(() => {
        veteransGrid.querySelectorAll('.rcard').forEach((c, i) => {
            c.style.transitionDelay = Math.min(i, 5) * 55 + 'ms';
            c.classList.add('in');
        });
    });
}

function createVeteranCard(veteran) {
    const card = document.createElement('div');
    const isPlaceholder = !veteran.photo;
    card.className = 'rcard veteran-card' + (isPlaceholder ? ' is-placeholder' : '');
    card.dataset.playerId = veteran.id;

    const years = veteran.years ? `<div class="pos" style="color:var(--dim);border:0;padding:0;margin-top:2px">${veteran.years}</div>` : '';
    card.innerHTML = `
        <img src="${getVeteranPhoto(veteran.photo)}" alt="${veteran.name}" loading="lazy"
             onerror="this.onerror=null; this.src='../images/players/player-placeholder.png'; this.closest('.rcard').classList.add('is-placeholder')">
        <div class="grad"></div>
        <div class="info">
            <div class="name">${veteran.name}</div>
            <div class="pos">${veteran.position}</div>
            ${years}
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

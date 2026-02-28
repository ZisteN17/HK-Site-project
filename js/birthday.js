// ============================
// ФУНКЦИЯ ДНЯ РОЖДЕНИЯ
// ============================

function getTodayBirthdays() {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const all = [
        ...(typeof plhlPlayers !== 'undefined' ? plhlPlayers : []),
        ...(typeof skhlPlayers !== 'undefined' ? skhlPlayers : [])
    ];

    // Убираем дубликаты по имени (игрок может быть в обоих составах)
    const seen = new Set();
    const unique = all.filter(p => {
        if (seen.has(p.name)) return false;
        seen.add(p.name);
        return true;
    });

    return unique.filter(p => {
        if (!p.birthDate) return false;
        const parts = p.birthDate.split('-');
        return parseInt(parts[1]) === todayMonth && parseInt(parts[2]) === todayDay;
    });
}

function showBirthdayBanner(birthdays) {
    const banner = document.createElement('div');
    banner.className = 'birthday-banner';

    const names = birthdays.map(p => p.name).join(' и ');

    banner.innerHTML = `
        <div class="birthday-banner-content">
            <div class="birthday-star">&#9733;</div>
            <div class="birthday-text">
                <span class="birthday-label">День рождения!</span>
                <span class="birthday-names">${names}</span>
            </div>
            <button class="birthday-close">&times;</button>
        </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector('.birthday-close').addEventListener('click', () => {
        banner.classList.add('birthday-banner-hidden');
        setTimeout(() => banner.remove(), 400);
    });

    // Автоскрытие через 10 секунд
    setTimeout(() => {
        if (banner.parentNode) {
            banner.classList.add('birthday-banner-hidden');
            setTimeout(() => banner.remove(), 400);
        }
    }, 10000);
}

function highlightBirthdayCards(birthdays) {
    if (!birthdays.length) return;
    const birthdayNames = new Set(birthdays.map(p => p.name));

    document.querySelectorAll('.player-card').forEach(card => {
        const nameEl = card.querySelector('.player-name');
        if (!nameEl) return;
        // Берём только текстовый узел (без span бейджика роли)
        const name = Array.from(nameEl.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent.trim())
            .join('');
        if (birthdayNames.has(name)) {
            card.classList.add('birthday-card');
            const badge = document.createElement('span');
            badge.className = 'birthday-badge';
            badge.textContent = 'ДР';
            card.appendChild(badge);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const birthdays = getTodayBirthdays();
    if (birthdays.length === 0) return;

    // Баннер — показываем после экрана загрузки
    setTimeout(() => showBirthdayBanner(birthdays), 1200);

    // Выделение карточек (только на странице состава)
    // На roster.html карточки рисуются в DOMContentLoaded из roster.js,
    // который зарегистрирован раньше — поэтому здесь карточки уже есть
    if (document.getElementById('playersGrid')) {
        highlightBirthdayCards(birthdays);
    }
});

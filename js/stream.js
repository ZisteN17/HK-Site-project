// ============================
// ТРАНСЛЯЦИИ ХК КГАСУ
// Ссылка обновляется СММ-менеджером через бота
// ============================

const streamData = {
    active: false,       // true — когда идёт трансляция
    url: '',             // ссылка на ВКонтакте
    title: '',           // название матча, например "КГАСУ vs КАИ"
    description: ''      // дополнительный текст
};

// Загрузка блока трансляции
document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('streamSection');
    if (!section) return;

    if (streamData.active && streamData.url) {
        section.innerHTML = `
            <div class="stream-active">
                <div class="stream-live-badge">● LIVE</div>
                <h2 class="stream-title">${streamData.title || 'Прямая трансляция'}</h2>
                ${streamData.description ? `<p class="stream-description">${streamData.description}</p>` : ''}
                <a href="${streamData.url}" target="_blank" class="stream-btn">
                    Смотреть трансляцию ВКонтакте
                </a>
            </div>
        `;
    } else {
        section.innerHTML = `
            <div class="stream-inactive">
                <div class="stream-icon">📺</div>
                <h2>Трансляций нет</h2>
                <p>Следите за расписанием матчей — ссылка на трансляцию появится здесь перед игрой.</p>
            </div>
        `;
    }
});

// ============================
// ТРАНСЛЯЦИИ ХК КГАСУ
// Данные читаются с сервера через fetch
// ============================

document.addEventListener('DOMContentLoaded', async function () {
    const section = document.getElementById('streamSection');
    if (!section) return;

    let streamData = { active: false, url: '', title: '' };

    try {
        const res = await fetch('/data/stream.json');
        if (res.ok) {
            const data = await res.json();
            // Проверяем не истёк ли срок трансляции
            const notExpired = !data.expires_at || new Date(data.expires_at) > new Date();
            if (data.active && notExpired) {
                streamData = data;
            }
        }
    } catch (e) {
        console.warn('stream.json недоступен:', e);
    }

    if (streamData.active && streamData.url) {
        section.innerHTML = `
            <div class="stream-active">
                <div class="stream-live-badge">● LIVE</div>
                <h2 class="stream-title">${streamData.title || 'Прямая трансляция'}</h2>
                <a href="${streamData.url}" target="_blank" class="stream-btn">
                    Смотреть трансляцию
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

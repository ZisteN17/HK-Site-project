// ============================
// НОВОСТИ ХК КГАСУ
// Данные будут загружаться через бота СММ-менеджера
// ============================

const newsData = [
    // Пример поста (удалить после подключения бота):
    // {
    //     id: 1,
    //     title: "Заголовок новости",
    //     date: "2026-02-26",
    //     text: "Текст новости...",
    //     photo: "../images/news/photo.jpg"  // null если фото нет
    // }
];

// Форматирование даты
function formatNewsDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Загрузка новостей на страницу
document.addEventListener('DOMContentLoaded', function() {
    const feed = document.getElementById('newsFeed');
    if (!feed) return;

    if (newsData.length === 0) {
        feed.innerHTML = '<div class="news-empty">Новости скоро появятся</div>';
        return;
    }

    // Новые посты сверху
    const sorted = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(post => {
        const card = document.createElement('article');
        card.className = 'news-card';

        const photoHTML = post.photo
            ? `<div class="news-photo"><img src="${post.photo}" alt="${post.title}"></div>`
            : '';

        card.innerHTML = `
            ${photoHTML}
            <div class="news-body">
                <div class="news-meta">
                    <span class="news-date">${formatNewsDate(post.date)}</span>
                </div>
                <h2 class="news-title">${post.title}</h2>
                <p class="news-text">${post.text}</p>
            </div>
        `;
        feed.appendChild(card);
    });
});

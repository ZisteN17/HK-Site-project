// ============================
// НОВОСТИ ХК КГАСУ
// Данные читаются с сервера через fetch
// ============================

function formatNewsDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getPhotos(post) {
    if (post.photos && post.photos.length > 0) return post.photos;
    if (post.photo) return [post.photo];
    return [];
}

function buildCarousel(photos, postId) {
    if (photos.length === 0) return '';
    if (photos.length === 1) {
        return `<div class="news-photo">
            <img src="/${photos[0]}" alt="">
        </div>`;
    }
    const slides = photos.map((src, i) =>
        `<div class="carousel-slide${i === 0 ? ' active' : ''}">
            <img src="/${src}" alt="">
        </div>`
    ).join('');
    const dots = photos.map((_, i) =>
        `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}"></button>`
    ).join('');
    return `<div class="news-carousel" data-id="${postId}">
        <div class="carousel-track">${slides}</div>
        <button class="carousel-btn carousel-prev" aria-label="Назад">&#8249;</button>
        <button class="carousel-btn carousel-next" aria-label="Вперёд">&#8250;</button>
        <div class="carousel-dots">${dots}</div>
    </div>`;
}

function initCarousels() {
    document.querySelectorAll('.news-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        let current = 0;

        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        carousel.querySelector('.carousel-prev').addEventListener('click', () => goTo(current - 1));
        carousel.querySelector('.carousel-next').addEventListener('click', () => goTo(current + 1));
        dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));

        // Свайп
        let startX = 0;
        carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        carousel.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        });
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    const feed = document.getElementById('newsFeed');
    if (!feed) return;

    feed.innerHTML = '<div class="news-empty">Загрузка...</div>';

    try {
        const res = await fetch('/data/news.json');
        if (!res.ok) throw new Error();
        const data = await res.json();
        const posts = data.posts || [];

        if (posts.length === 0) {
            feed.innerHTML = '<div class="news-empty">Новости скоро появятся</div>';
            return;
        }

        feed.innerHTML = '';
        posts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'news-card';
            const photos = getPhotos(post);
            card.innerHTML = `
                ${buildCarousel(photos, post.id)}
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

        initCarousels();
    } catch {
        feed.innerHTML = '<div class="news-empty">Новости скоро появятся</div>';
    }
});

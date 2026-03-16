const API = '/api';

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatGameDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

async function loadSeasonsList() {
    const section = document.getElementById('seasonsList');
    try {
        const res = await fetch(API + '/seasons');
        const data = await res.json();
        const seasons = data.seasons || [];

        if (seasons.length === 0) {
            section.innerHTML = '<p class="archive-empty">Архивных сезонов пока нет.</p>';
            return;
        }

        section.innerHTML = `
            <div class="archive-grid">
                ${seasons.map(s => `
                    <div class="archive-card" onclick="loadSeason('${s.filename.replace('.json', '')}', '${s.season}')">
                        <div class="archive-card-season">Сезон ${s.season}</div>
                        <div class="archive-card-date">Архивирован: ${formatDate(s.archived_at)}</div>
                        <div class="archive-card-arrow">→</div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (e) {
        section.innerHTML = '<p class="archive-empty">Ошибка загрузки архива.</p>';
    }
}

async function loadSeason(id, name) {
    document.getElementById('seasonsList').style.display = 'none';
    const detail = document.getElementById('seasonDetail');
    detail.style.display = 'block';
    document.getElementById('seasonDetailTitle').textContent = `Сезон ${name}`;
    document.getElementById('archiveStandings').innerHTML = '<tr><td colspan="8">Загрузка...</td></tr>';
    document.getElementById('archiveGames').innerHTML = '';

    try {
        const res = await fetch(API + '/seasons/' + id);
        const data = await res.json();

        // Турнирная таблица
        const standings = data.standings?.standings || [];
        const tbody = document.getElementById('archiveStandings');
        if (standings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;opacity:.5">Нет данных</td></tr>';
        } else {
            tbody.innerHTML = standings.map(row => `
                <tr>
                    <td>${row.pos}</td>
                    <td class="team-col">${row.team}</td>
                    <td>${row.games}</td>
                    <td>${row.wins}</td>
                    <td>${row.draws}</td>
                    <td>${row.losses}</td>
                    <td>${row.goals}</td>
                    <td><strong>${row.points}</strong></td>
                </tr>
            `).join('');
        }

        // Матчи
        const games = data.games?.games || [];
        const gamesEl = document.getElementById('archiveGames');
        const played = games.filter(g => g.homeScore !== null && g.awayScore !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (played.length === 0) {
            gamesEl.innerHTML = '<p style="opacity:.5;text-align:center">Нет данных</p>';
        } else {
            gamesEl.innerHTML = played.map(g => {
                const isHome = g.home === 'КГАСУ';
                const homeScore = g.homeScore;
                const awayScore = g.awayScore;
                const win = isHome ? homeScore > awayScore : awayScore > homeScore;
                const resultClass = win ? 'win' : 'loss';
                return `
                    <div class="game-card played">
                        <div class="game-date">${formatGameDate(g.date)}</div>
                        <div class="game-teams">
                            <span class="${g.home === 'КГАСУ' ? 'our-team' : ''}">${g.home}</span>
                            <span class="game-score ${resultClass}">${homeScore} : ${awayScore}</span>
                            <span class="${g.away === 'КГАСУ' ? 'our-team' : ''}">${g.away}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

    } catch (e) {
        document.getElementById('archiveStandings').innerHTML = '<tr><td colspan="8">Ошибка загрузки</td></tr>';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSeasonsList() {
    document.getElementById('seasonDetail').style.display = 'none';
    document.getElementById('seasonsList').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

loadSeasonsList();

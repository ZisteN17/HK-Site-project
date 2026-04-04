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

function renderArchivePlayoff(data, teamLogos) {
    const section = document.getElementById('archivePlayoffSection');
    const bracket = document.getElementById('archivePlayoffBracket');
    if (!section || !bracket || !data || !data.enabled) {
        if (section) section.style.display = 'none';
        return;
    }
    section.style.display = '';

    const imgBase = '/images/';
    const placeholder = '/images/players/player-placeholder.jpg';

    function teamLogo(name) {
        if (!name || name === '?') return '<span class="bt-logo-placeholder"></span>';
        const logo = teamLogos[name];
        return logo
            ? `<img src="${imgBase}${logo}" alt="" class="bt-logo">`
            : '<span class="bt-logo-placeholder"></span>';
    }

    function matchCard(m) {
        if (!m) return '';
        const s1 = m.score1 !== null && m.score1 !== undefined ? m.score1 : '–';
        const s2 = m.score2 !== null && m.score2 !== undefined ? m.score2 : '–';
        const win1 = m.score1 !== null && m.score1 !== undefined && m.score1 > m.score2;
        const win2 = m.score1 !== null && m.score1 !== undefined && m.score2 > m.score1;
        const t1 = m.team1 || '?', t2 = m.team2 || '?';
        const cls1 = `bt-team${win1 ? ' winner' : ''}${t1 === 'КГАСУ' ? ' kgasu' : ''}`;
        const cls2 = `bt-team${win2 ? ' winner' : ''}${t2 === 'КГАСУ' ? ' kgasu' : ''}`;
        return `<div class="bt-card">
            <div class="${cls1}">${teamLogo(t1)}<span class="bt-name">${t1}</span><span class="bt-score">${s1}</span></div>
            <div class="${cls2}">${teamLogo(t2)}<span class="bt-name">${t2}</span><span class="bt-score">${s2}</span></div>
        </div>`;
    }

    const q = data.quarters || [];
    const semis = data.semis || [{}, {}];
    bracket.innerHTML = `
        <div class="bt-scroll">
            <div class="bt-tree">
                <div class="bt-round">
                    <div class="bt-round-label">1/4 финала</div>
                    <div class="bt-col">
                        <div class="bt-group"><div class="bt-slot">${matchCard(q[0])}</div><div class="bt-slot">${matchCard(q[3])}</div></div>
                        <div class="bt-group"><div class="bt-slot">${matchCard(q[1])}</div><div class="bt-slot">${matchCard(q[2])}</div></div>
                    </div>
                </div>
                <div class="bt-round">
                    <div class="bt-round-label">1/2 финала</div>
                    <div class="bt-col">
                        <div class="bt-group"><div class="bt-slot">${matchCard(semis[0])}</div></div>
                        <div class="bt-group"><div class="bt-slot">${matchCard(semis[1])}</div></div>
                    </div>
                </div>
                <div class="bt-round">
                    <div class="bt-round-label">Финал</div>
                    <div class="bt-col">
                        <div class="bt-group bt-group-final"><div class="bt-slot">${matchCard(data.final)}</div></div>
                    </div>
                </div>
            </div>
        </div>`;
}

async function loadSeason(id, name) {
    document.getElementById('seasonsList').style.display = 'none';
    const detail = document.getElementById('seasonDetail');
    detail.style.display = 'block';
    document.getElementById('seasonDetailTitle').textContent = `Сезон ${name}`;
    document.getElementById('archiveStandings').innerHTML = '<tr><td colspan="8">Загрузка...</td></tr>';
    document.getElementById('archiveGames').innerHTML = '';
    document.getElementById('archivePlayoffSection').style.display = 'none';

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

        // Плей-офф
        renderArchivePlayoff(data.playoff, data.games?.team_logos || {});

        // Матчи
        const games = data.games?.games || [];
        const teamLogos = data.games?.team_logos || {};
        const gamesEl = document.getElementById('archiveGames');
        const played = games.filter(g => g.homeScore !== null && g.awayScore !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        const imgBase = '/images/';

        if (played.length === 0) {
            gamesEl.innerHTML = '<p style="opacity:.5;text-align:center">Нет данных</p>';
        } else {
            gamesEl.innerHTML = played.map(g => {
                const kgasuScore = g.home === 'КГАСУ' ? g.homeScore : g.awayScore;
                const oppScore  = g.home === 'КГАСУ' ? g.awayScore : g.homeScore;
                let resultClass, resultText;
                if (kgasuScore > oppScore)      { resultClass = 'win';  resultText = 'Победа'; }
                else if (kgasuScore < oppScore) { resultClass = 'loss'; resultText = 'Поражение'; }
                else                            { resultClass = 'draw'; resultText = 'Ничья'; }
                const homeLogo = teamLogos[g.home] ? imgBase + teamLogos[g.home] : '';
                const awayLogo = teamLogos[g.away] ? imgBase + teamLogos[g.away] : '';
                return `
                    <div class="game-card past ${resultClass}-card">
                        <div class="game-date">${formatGameDate(g.date)}</div>
                        <div class="game-teams">
                            <div class="team home-team">
                                <img src="${homeLogo}" alt="${g.home}" class="team-logo-small">
                                <span class="team-name${g.home === 'КГАСУ' ? '' : ' opponent'}">${g.home}</span>
                            </div>
                            <div class="game-score">
                                <span class="score">${g.homeScore} : ${g.awayScore}</span>
                                <span class="result ${resultClass}">${resultText}</span>
                            </div>
                            <div class="team away-team">
                                <img src="${awayLogo}" alt="${g.away}" class="team-logo-small">
                                <span class="team-name${g.away === 'КГАСУ' ? '' : ' opponent'}">${g.away}</span>
                            </div>
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

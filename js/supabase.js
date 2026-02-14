// ============================
// ИНТЕГРАЦИЯ С SUPABASE
// ============================

// Этот файл будет использоваться для подключения к Supabase
// Когда вы настроите Supabase, замените данные ниже на ваши

/*
ИНСТРУКЦИЯ ПО НАСТРОЙКЕ SUPABASE:

1. Зарегистрируйтесь на https://supabase.com
2. Создайте новый проект
3. Создайте таблицы:

   - players (основной состав):
     - id (int, primary key)
     - name (text)
     - number (int)
     - position (text)
     - photo_url (text)
     - height (int)
     - weight (int)
     - age (int)
     - bio (text)
     - is_active (boolean)

   - veterans (ветераны):
     - id (int, primary key)
     - name (text)
     - position (text)
     - photo_url (text)
     - years (text)
     - bio (text)
     - achievements (text)

   - games (матчи):
     - id (int, primary key)
     - season (text)
     - date (text)
     - home_team (text)
     - home_logo (text)
     - home_score (int, nullable)
     - away_team (text)
     - away_logo (text)
     - away_score (int, nullable)
     - location (text)
     - is_played (boolean)

   - standings (турнирная таблица):
     - id (int, primary key)
     - season (text)
     - place (int)
     - team (text)
     - games (int)
     - wins (int)
     - losses (int)
     - goals (text)
     - points (int)

4. Получите API ключи из Settings -> API
5. Вставьте их ниже
*/

// Замените эти значения на ваши из Supabase
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Инициализация Supabase клиента
// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Пример функций для работы с базой данных:

/*
// Получить всех активных игроков
async function getActivePlayers() {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('is_active', true)
        .order('number', { ascending: true });

    if (error) {
        console.error('Ошибка загрузки игроков:', error);
        return [];
    }

    return data;
}

// Получить всех ветеранов
async function getVeterans() {
    const { data, error } = await supabase
        .from('veterans')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Ошибка загрузки ветеранов:', error);
        return [];
    }

    return data;
}

// Получить игры по сезону
async function getGamesBySeason(season) {
    const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('season', season)
        .order('date', { ascending: false });

    if (error) {
        console.error('Ошибка загрузки игр:', error);
        return [];
    }

    return data;
}

// Получить турнирную таблицу по сезону
async function getStandingsBySeason(season) {
    const { data, error } = await supabase
        .from('standings')
        .select('*')
        .eq('season', season)
        .order('place', { ascending: true });

    if (error) {
        console.error('Ошибка загрузки таблицы:', error);
        return [];
    }

    return data;
}

// Добавить нового игрока (для админ-панели)
async function addPlayer(playerData) {
    const { data, error } = await supabase
        .from('players')
        .insert([playerData]);

    if (error) {
        console.error('Ошибка добавления игрока:', error);
        return null;
    }

    return data;
}

// Обновить результат матча (для админ-панели)
async function updateGameScore(gameId, homeScore, awayScore) {
    const { data, error } = await supabase
        .from('games')
        .update({
            home_score: homeScore,
            away_score: awayScore,
            is_played: true
        })
        .eq('id', gameId);

    if (error) {
        console.error('Ошибка обновления счёта:', error);
        return null;
    }

    return data;
}
*/

console.log('Supabase интеграция готова к настройке. Следуйте инструкциям в файле js/supabase.js');

// ============================
// ДАННЫЕ ИГРОКОВ (ПЛХЛ + СХЛ)
// ============================

// --- ПЛХЛ (plhl.ru, турнир 2025/2026) ---
const plhlPlayers = [
    // === ВРАТАРИ ===
    {
        id: 1,
        name: "Карим Агзамов",
        number: 69,
        position: "Вратарь",
        photo: "../images/players/Агзамов_Карим.jpg",
        height: 185,
        weight: 77,
        birthDate: "2005-08-16",
        hand: "Левый"
    },
    {
        id: 2,
        name: "Аяз Гараев",
        number: 1,
        position: "Вратарь",
        photo: "../images/players/Гараев_Аяз.jpg",
        height: 181,
        weight: 79,
        birthDate: "2006-02-08",
        hand: "Левый"
    },
    {
        id: 3,
        name: "Даниил Михалаш",
        number: 31,
        position: "Вратарь",
        photo: "../images/players/Михалаш_Даниил.jpg",
        birthDate: "2005-06-02",
        hand: "Правый"
    },
    {
        id: 4,
        name: "Эмиль Халиуллин",
        number: 21,
        position: "Вратарь",
        photo: "../images/players/Халиуллин_Эмиль.jpg",
        height: 190,
        weight: 90,
        birthDate: "2004-03-06",
        hand: "Левый"
    },

    // === ЗАЩИТНИКИ ===
    {
        id: 5,
        name: "Тимур Алтымбаев",
        number: 85,
        position: "Защитник",
        photo: "../images/players/Алтымбаев_Тимур.jpg",
        height: 175,
        weight: 70,
        birthDate: "2006-06-08",
        hand: "Левый"
    },
    {
        id: 6,
        name: "Руслан Газдалеев",
        number: 33,
        position: "Защитник",
        photo: "../images/players/Газдалеев_Руслан.jpg",
        height: 173,
        weight: 95,
        birthDate: "2006-02-04",
        hand: "Левый"
    },
    {
        id: 7,
        name: "Рустем Зарипов",
        number: 71,
        position: "Защитник",
        photo: "../images/players/Зарипов_Рустем.jpg",
        height: 178,
        weight: 76,
        birthDate: "2001-02-10",
        hand: "Левый"
    },
    {
        id: 8,
        name: "Ринель Зиннатов",
        number: 55,
        position: "Защитник",
        photo: "../images/players/Зиннатов_Ринель.jpg",
        height: 177,
        weight: 71,
        birthDate: "2006-12-06",
        hand: "Левый"
    },
    {
        id: 9,
        name: "Никита Климовских",
        number: 7,
        position: "Защитник",
        photo: "../images/players/Климовских_Никита.jpg",
        height: 183,
        weight: 83,
        birthDate: "2004-08-03",
        hand: "Правый"
    },
    {
        id: 10,
        name: "Ярослав Коловский",
        number: 85,
        position: "Защитник",
        photo: "../images/players/Коловский_Ярослав.jpg",
        height: 185,
        weight: 91,
        birthDate: "2005-12-03",
        hand: "Левый"
    },
    {
        id: 11,
        name: "Андрей Комлев",
        number: 76,
        position: "Защитник",
        photo: "../images/players/Комлев_Андрей.jpg",
        height: 190,
        weight: 85,
        birthDate: "2006-12-08",
        hand: "Левый"
    },
    {
        id: 12,
        name: "Ильдар Мутигуллин",
        number: 8,
        position: "Защитник",
        role: "Ассистент капитана",
        photo: "../images/players/Мутигуллин_Ильдар.jpg",
        height: 191,
        weight: 72,
        birthDate: "2002-02-18",
        hand: "Левый"
    },
    {
        id: 13,
        name: "Рузаль Муниров",
        number: 14,
        position: "Защитник",
        photo: "../images/players/Муниров_Рузаль.jpg",
        height: 171,
        weight: 75,
        birthDate: "2005-05-13",
        hand: "Левый"
    },
    {
        id: 14,
        name: "Ранис Хуснутдинов",
        number: 95,
        position: "Защитник",
        photo: "../images/players/Хуснутдинов_Ранис.jpg",
        height: 178,
        weight: 89,
        birthDate: "2006-08-04",
        hand: "Левый"
    },

    // === НАПАДАЮЩИЕ ===
    {
        id: 15,
        name: "Леонид Алдошин",
        number: 44,
        position: "Нападающий",
        photo: "../images/players/Алдошин_Леонид.jpg",
        height: 177,
        weight: 68,
        birthDate: "2004-08-04",
        hand: "Левый"
    },
    {
        id: 16,
        name: "Айдар Загрутдинов",
        number: 10,
        position: "Нападающий",
        photo: "../images/players/Загрутдинов_Айдар.jpg",
        height: 180,
        weight: 73,
        birthDate: "2002-10-19",
        hand: "Левый"
    },
    {
        id: 17,
        name: "Денис Клименко",
        number: 13,
        position: "Нападающий",
        photo: "../images/players/Клименко_Денис.jpg",
        height: 183,
        weight: 75,
        birthDate: "2005-11-11",
        hand: "Левый"
    },
    {
        id: 18,
        name: "Семен Красин",
        number: 20,
        position: "Нападающий",
        photo: "../images/players/Красин_Семен.jpg",
        height: 182,
        weight: 82,
        birthDate: "2004-06-14",
        hand: "Левый"
    },
    {
        id: 19,
        name: "Марат Лашек",
        number: 26,
        position: "Нападающий",
        photo: "../images/players/Лашек_Марат.jpg",
        height: 180,
        weight: 66,
        birthDate: "2007-07-20",
        hand: "Левый"
    },
    {
        id: 20,
        name: "Никита Лунин",
        number: 76,
        position: "Нападающий",
        photo: "../images/players/Лунин_Никита.jpg",
        height: 190,
        weight: 75,
        birthDate: "2007-01-21",
        hand: "Левый"
    },
    {
        id: 21,
        name: "Станислав Мокрополов",
        number: 87,
        position: "Нападающий",
        photo: "../images/players/Мокрополов_Станислав.jpg",
        height: 185,
        weight: 81,
        birthDate: "2005-08-23",
        hand: "Левый"
    },
    {
        id: 22,
        name: "Айнур Мударисов",
        number: 68,
        position: "Нападающий",
        photo: "../images/players/Мударисов_Айнур.jpg",
        height: 186,
        weight: 75,
        birthDate: "1999-03-14",
        hand: "Левый"
    },
    {
        id: 23,
        name: "Фанзиль Муниров",
        number: 81,
        position: "Нападающий",
        photo: "../images/players/Муниров_Фанзиль.jpg",
        height: 176,
        weight: 77,
        birthDate: "2001-07-22",
        hand: "Левый"
    },
    {
        id: 24,
        name: "Данила Мусаев",
        number: 73,
        position: "Нападающий",
        photo: "../images/players/Мусаев_Данила.jpg",
        height: 190,
        weight: 75,
        birthDate: "2001-05-16",
        hand: "Левый"
    },
    {
        id: 25,
        name: "Амир Мухитов",
        number: 17,
        position: "Нападающий",
        role: "Капитан",
        photo: "../images/players/Мухитов_Амир.jpg",
        height: 187,
        weight: 77,
        birthDate: "2005-12-16",
        hand: "Левый"
    },
    {
        id: 26,
        name: "Сергей Сорокин",
        number: 47,
        position: "Нападающий",
        photo: "../images/players/Сорокин_Сергей.jpg",
        height: 192,
        weight: 93,
        birthDate: "2007-01-27",
        hand: "Левый"
    },
    {
        id: 27,
        name: "Данил Устимкин",
        number: 18,
        position: "Нападающий",
        role: "Ассистент капитана",
        photo: "../images/players/Устимкин_Данил.jpg",
        height: 172,
        weight: 65,
        birthDate: "2004-07-18",
        hand: "Левый"
    },
    {
        id: 28,
        name: "Данил Хайрутдинов",
        number: 99,
        position: "Нападающий",
        photo: "../images/players/Хайрутдинов_Данил.jpg",
        height: 173,
        weight: 62,
        birthDate: "1999-07-12",
        hand: "Правый"
    },
    {
        id: 29,
        name: "Рамзан Хайрутдинов",
        number: 9,
        position: "Нападающий",
        photo: "../images/players/Хайрутдинов_Рамзан.jpg",
        height: 175,
        weight: 75,
        birthDate: "2006-05-07",
        hand: "Левый"
    },
    {
        id: 30,
        name: "Савелий Храмов",
        number: 77,
        position: "Нападающий",
        photo: "../images/players/Храмов_Савелий.jpg",
        height: 180,
        weight: 72,
        birthDate: "2007-11-09",
        hand: "Правый"
    }
];

// --- СХЛ (Студенческая хоккейная лига) ---
const skhlPlayers = [
    // === ВРАТАРИ ===
    {
        id: 101,
        name: "Даниил Михалаш",
        number: 31,
        position: "Вратарь",
        photo: "../images/players/Михалаш_Даниил.jpg",
        birthDate: "2005-06-02",
        hand: "Правый"
    },

    // === ЗАЩИТНИКИ ===
    {
        id: 102,
        name: "Рузаль Муниров",
        number: 14,
        position: "Защитник",
        role: "Ассистент капитана",
        photo: "../images/players/Муниров_Рузаль.jpg",
        birthDate: "2005-05-13",
        hand: "Левый"
    },
    {
        id: 103,
        name: "Ринель Зиннатов",
        number: 55,
        position: "Защитник",
        photo: "../images/players/Зиннатов_Ринель.jpg",
        birthDate: "2006-12-06",
        hand: "Левый"
    },
    {
        id: 104,
        name: "Ранис Хуснутдинов",
        number: 95,
        position: "Защитник",
        photo: "../images/players/Хуснутдинов_Ранис.jpg",
        birthDate: "2006-08-04",
        hand: "Левый"
    },

    // === НАПАДАЮЩИЕ ===
    {
        id: 105,
        name: "Данил Устимкин",
        number: 18,
        position: "Нападающий",
        role: "Ассистент капитана",
        photo: "../images/players/Устимкин_Данил.jpg",
        birthDate: "2004-07-18",
        hand: "Левый"
    },
    {
        id: 106,
        name: "Леонид Алдошин",
        number: 44,
        position: "Нападающий",
        photo: "../images/players/Алдошин_Леонид.jpg",
        birthDate: "2004-08-04",
        hand: "Левый"
    },
    {
        id: 107,
        name: "Никита Лунин",
        number: 76,
        position: "Нападающий",
        photo: "../images/players/Лунин_Никита.jpg",
        birthDate: "2007-01-21",
        hand: "Левый"
    },
    {
        id: 109,
        name: "Данис Мухаметшин",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2005-10-15",
        hand: "—"
    },
    {
        id: 110,
        name: "Денис Клименко",
        number: 13,
        position: "Нападающий",
        photo: "../images/players/Клименко_Денис.jpg",
        birthDate: "2005-11-11",
        hand: "Левый"
    },
    {
        id: 111,
        name: "Данила Никитцов",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2007-09-11",
        hand: "—"
    },
    {
        id: 112,
        name: "Самат Зямалов",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2007-06-08",
        hand: "—"
    },
    {
        id: 113,
        name: "Данил Алексеев",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2007-04-06",
        hand: "—"
    },
    {
        id: 114,
        name: "Савелий Храмов",
        number: 77,
        position: "Нападающий",
        photo: "../images/players/Храмов_Савелий.jpg",
        birthDate: "2007-11-09",
        hand: "Правый"
    },
    {
        id: 115,
        name: "Роман Андреев",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2003-01-30",
        hand: "—"
    },
    {
        id: 116,
        name: "Аскар Самиев",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2007-01-22",
        hand: "—"
    },
    {
        id: 117,
        name: "Станислав Мокрополов",
        number: 87,
        position: "Нападающий",
        photo: "../images/players/Мокрополов_Станислав.jpg",
        birthDate: "2005-08-23",
        hand: "Левый"
    },
    {
        id: 118,
        name: "Ильдан Салахов",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2005-05-14",
        hand: "—"
    },
    {
        id: 119,
        name: "Амир Мухитов",
        number: 17,
        position: "Нападающий",
        role: "Капитан",
        photo: "../images/players/Мухитов_Амир.jpg",
        birthDate: "2005-12-16",
        hand: "Левый"
    },
    {
        id: 120,
        name: "Сергей Сорокин",
        number: 47,
        position: "Нападающий",
        photo: "../images/players/Сорокин_Сергей.jpg",
        birthDate: "2007-01-27",
        hand: "Левый"
    },
    {
        id: 121,
        name: "Искандар Габдулхаков",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2004-07-15",
        hand: "—"
    },
    {
        id: 122,
        name: "Егор Богдарин",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2007-12-05",
        hand: "—"
    },
    {
        id: 123,
        name: "Айдар Загрутдинов",
        number: 10,
        position: "Нападающий",
        photo: "../images/players/Загрутдинов_Айдар.jpg",
        birthDate: "2002-10-19",
        hand: "Левый"
    },
    {
        id: 124,
        name: "Кирилл Иванов",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2005-07-15",
        hand: "—"
    },
    {
        id: 125,
        name: "Динар Талипов",
        number: "—",
        position: "Нападающий",
        photo: "../images/players/player-placeholder.jpg",
        birthDate: "2004-07-09",
        hand: "—"
    }
];

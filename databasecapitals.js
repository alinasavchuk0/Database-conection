const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.env.APPDATA, 'DBeaverData', 'workspace6', '.metadata', 'sample-database-sqlite-1', 'Chinook.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Помилка підключення:', err.message);
    }
});

async function getAllCapitals() {
    console.log('⏳ Запит до бази даних...');
    
    db.all("SELECT * FROM capitals ORDER BY id ASC", [], (err, rows) => {
        if (err) {
            console.error('❌ Сталася помилка при читанні таблиці:', err.message);
            console.log('💡 Підказка: Переконайтеся, що ви створили таблицю саме в цій базі в DBeaver.');
            return;
        }

        if (rows.length === 0) {
            console.log('📭 Таблиця порожня.');
        } else {
            console.log('🌍 Список столиць (дані з SQLite):');
            console.table(rows);
        }
       
        db.close();
    });
}

getAllCapitals();
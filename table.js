const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');
const createTableComent = ` 
    CREATE TABLE IF NOT EXISTS coment ( 
        id_comm INTEGER PRIMARY KEY AUTOINCREMENT, 
        comm TEXT NOT NULL, 
        img TEXT NULL, 
        user_id INTEGER NOT NULL 
    )`; 

// Выполнить оператор SQL для создания таблицы 
db.run(createTableComent, (err) => { 
    if (err) { 
        return console.error('Ошибка создания таблицы:', err.message); 
    }
    else{
        console.log('Таблица создана успешно');
    }
});
const createTableForuser = ` 
    CREATE TABLE IF NOT EXISTS foruser ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        email TEXT NOT NULL, 
        quantity TEXT NOT NULL 
    )`; 

// Выполнить оператор SQL для создания таблицы 
db.run(createTableForuser, (err) => { 
    if (err) { 
        return console.error('Ошибка создания таблицы:', err.message); 
    }
    else{
        console.log('Таблица создана успешно'); 
    }
});
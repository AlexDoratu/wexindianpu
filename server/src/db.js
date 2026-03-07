const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'data', 'leads.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      wechatId TEXT NOT NULL,
      productId TEXT,
      productName TEXT NOT NULL,
      color TEXT,
      size TEXT,
      remark TEXT,
      createdAt TEXT NOT NULL
    )
  `);
});

module.exports = db;

import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, './database.sqlite');
const db = new Database(dbPath);

console.log({ dbPath });

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    priority INTEGER NOT NULL DEFAULT 0
  );
`);

export default db;

import sqlite3 from "sqlite3";
import { run, all } from "./db.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
    "こうじの大冒険",
  ]);
  console.log(result.lastID);
  const rows = await all(db, "SELECT * FROM books");
  console.log(rows);
  await run(db, "DROP TABLE books");
}

main();

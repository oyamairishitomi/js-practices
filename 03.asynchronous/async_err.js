import sqlite3 from "sqlite3";
import { run, all } from "./db.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  await run(db, "INSERT INTO books (title) VALUES (?)", ["こうじの大冒険"]);
  try {
    await run(db, "INSERT INTO books (title) VALUES (?)", ["こうじの大冒険"]);
  } catch (err) {
    if (err.code !== "SQLITE_CONSTRAINT") {
      throw err;
    }
    console.error(err.message);
  }
  try {
    await all(db, "SELECT * FROM boooooooks");
  } catch (err) {
    console.error(err.message);
  }
  await run(db, "DROP TABLE books");
}

main();

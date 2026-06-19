import sqlite3 from "sqlite3";
import { run, all } from "./db.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    run(db, "INSERT INTO books (title) VALUES (?)", ["こうじの大冒険"]),
  )
  .then(() =>
    run(db, "INSERT INTO books (title) VALUES (?)", ["こうじの大冒険"]),
  )
  .catch((error) => console.error(error.message))
  .then(() => all(db, "SELECT * FROM booooooks"))
  .catch((error) => console.error(error.message))
  .then(() => run(db, "DROP TABLE books"));

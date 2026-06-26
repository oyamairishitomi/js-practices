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
  .then((result) => {
    console.log(result.lastID);
    return all(db, "SELECT * FROM books");
  })
  .then((rows) => {
    console.log(rows);
    return run(db, "DROP TABLE books");
  });

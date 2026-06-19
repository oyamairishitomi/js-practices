import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["こうじの大冒険"],
      function () {
        console.log(this.lastID);
        db.all("SELECT * FROM books", (_err, rows) => {
          console.log(rows);
          db.run("DROP TABLE books", () => {});
        });
      },
    );
  },
);

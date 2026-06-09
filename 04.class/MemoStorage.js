import Database from "better-sqlite3";
import { Memo } from "./Memo.js";

export class MemoStorage {
  constructor() {
    this.db = new Database("memos.db");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS memos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT
        )
    `);
  }

  create(content) {
    const title = content.split("\n")[0];
    const result = this.db
      .prepare("INSERT INTO memos (title,content) VALUES(?, ?)")
      .run([title, content]);
    return new Memo(result.lastInsertRowid, title, content);
  }

  findAll() {
    const rows = this.db.prepare("SELECT * FROM memos").all();
    return rows.map((row) => new Memo(row.id, row.title, row.content));
  }

  destroy(id) {
    this.db.prepare("DELETE FROM memos WHERE id = ?").run([id]);
  }
}

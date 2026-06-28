import Database from "better-sqlite3";
import { Memo } from "./MemoModel.js";
import { fileURLToPath } from "url";
import path from "path";

export class MemoStorage {
  constructor() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    this.db = new Database(path.join(__dirname, "memos.db"));
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)",
    );
  }

  create(content) {
    const result = this.db
      .prepare("INSERT INTO memos (content) VALUES (?)")
      .run([content]);
    return new Memo(result.lastInsertRowid, content);
  }

  findAll() {
    const rows = this.db.prepare("SELECT * FROM memos ORDER BY id").all();
    return rows.map((row) => new Memo(row.id, row.content));
  }

  delete(id) {
    this.db.prepare("DELETE FROM memos WHERE id = ?").run([id]);
  }
}

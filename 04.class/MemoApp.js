import minimist from "minimist";
import inquirer from "inquirer";
import { MemoStorage } from "./MemoStorage.js";

export class MemoApp {
  constructor() {
    this.argv = minimist(process.argv.slice(2));
    this.storage = new MemoStorage();
  }

  async run() {
    if (this.argv.l) {
      this.list();
    } else if (this.argv.r) {
      await this.read();
    } else if (this.argv.d) {
      await this.delete();
    } else {
      await this.add();
    }
  }

  async add() {
    const content = await this.readStdin();
    await this.storage.create(content);
  }

  readStdin() {
    return new Promise((resolve) => {
      const chunks = [];
      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (chunk) => {
        chunks.push(chunk);
      });
      process.stdin.on("end", () => {
        resolve(chunks.join(""));
      });
    });
  }

  list() {
    const memos = this.storage.findAll();
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  }

  async read() {
    const memos = this.storage.findAll();
    if (memos.length === 0) {
      console.log("メモがありません");
    } else {
      const answer = await inquirer.prompt([
        {
          type: "select",
          name: "memo",
          message: "Choose a note you want to see:",
          choices: memos.map((memo) => ({ name: memo.title, value: memo })),
        },
      ]);
      console.log(answer.memo.content);
    }
  }

  async delete() {
    const memos = this.storage.findAll();
    if (memos.length === 0) {
      console.log("メモがありません");
    } else {
      const answer = await inquirer.prompt([
        {
          type: "select",
          name: "memo",
          message: "Choose a note you want to delete:",
          choices: memos.map((memo) => ({ name: memo.title, value: memo })),
        },
      ]);
      this.storage.destroy(answer.memo.id);
    }
  }
}

import minimist from "minimist";
import inquirer from "inquirer";
import { MemoStorage } from "./MemoStorage.js";

export class MemoApp {
  constructor() {
    this.options = minimist(process.argv.slice(2));
    this.storage = new MemoStorage();
  }

  async run() {
    if (this.options.l) {
      this.#list();
    } else if (this.options.r) {
      await this.#read();
    } else if (this.options.d) {
      await this.#delete();
    } else {
      await this.#add();
    }
  }

  #list() {
    const memos = this.storage.findAll();
    memos.forEach((memo) => {
      console.log(memo.firstLine);
    });
  }

  async #read() {
    const memos = this.storage.findAll();
    if (memos.length === 0) {
      console.log("メモがありません");
      return;
    }
    const answer = await inquirer.prompt([
      {
        type: "select",
        name: "memo",
        message: "Choose a memo you want to see:",
        choices: memos.map((memo) => ({ name: memo.firstLine, value: memo })),
      },
    ]);
    console.log(answer.memo.content);
  }

  async #delete() {
    const memos = this.storage.findAll();
    if (memos.length === 0) {
      console.log("メモがありません");
      return;
    }
    const answer = await inquirer.prompt([
      {
        type: "select",
        name: "memo",
        message: "Choose a memo you want to delete:",
        choices: memos.map((memo) => ({ name: memo.firstLine, value: memo })),
      },
    ]);
    this.storage.delete(answer.memo.id);
  }

  async #add() {
    const content = await this.#readStdin();
    const memo = await this.storage.create(content);
    console.log(`${memo.firstLine} を保存しました`);
  }

  #readStdin() {
    return new Promise((resolve, reject) => {
      const chunks = [];
      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (chunk) => {
        chunks.push(chunk);
      });
      process.stdin.on("end", () => {
        resolve(chunks.join(""));
      });
      process.stdin.on("error", (err) => {
        reject(err);
      });
    });
  }

}

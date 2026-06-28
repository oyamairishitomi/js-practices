export class Memo {
  #id;
  #content;

  constructor(id, content) {
    this.#id = id;
    this.#content = content;
  }

  get id() {
    return this.#id;
  }

  get content() {
    return this.#content;
  }

  get firstLine() {
    return this.content.split("\n")[0];
  }
}

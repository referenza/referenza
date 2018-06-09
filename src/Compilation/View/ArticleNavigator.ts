import {View} from "./View";
import {escapeHTML} from "../../Util/HTML/escapeHTML";

export class ArticleNavigator extends View {
  dir: number;
  href: string;
  name: string;

  constructor(dir: number, href: string, name: string) {
    super();
    this.dir = dir;
    this.href = href;
    this.name = name;
  }

  static DIR_PREV = 1;
  static DIR_NEXT = 2;

  render() {
    return `
      <a
        href="${escapeHTML(this.href)}"
        title="${this.dir == ArticleNavigator.DIR_PREV ? "Previous" : "Next"} article">
        ${this.dir == ArticleNavigator.DIR_PREV ? "&lt;   " : ""}
        ${escapeHTML(this.name)}
        ${this.dir == ArticleNavigator.DIR_NEXT ? "   &gt;" : ""}
      </a>
    `;
  }
}

import {View} from "./View";
import {escapeHTML} from "../../Util/HTML/escapeHTML";

export class ArticleHeader extends View {
  category: string;
  name: string;

  constructor(category: string, name: string) {
    super();
    this.category = category;
    this.name = name;
  }

  render() {
    // category-label is for reader view in browsers
    return `
    <header>
      <a href="#pane" class="category"><span class="category-label">In category:<zc-space /></span>${escapeHTML(this.category)}</a>
      <h1>${escapeHTML(this.name)}</h1>
    </header>
  `;
  }
}

import {View} from "./View";
import {escapeHTML} from "../../Util/HTML/escapeHTML";

export class PaneTocCategoryEntry extends View {
  url: string;
  name: string;
  description: string;
  isActive: boolean;

  constructor(url: string, name: string, description: string, isActive: boolean) {
    super();
    this.url = url;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }

  render() {
    return `
      <li class="toc-category-entry ${ this.isActive ? "active" : "" }" title="${ escapeHTML(this.description) }">
        <a href="${ this.isActive ? "#" : escapeHTML(this.url) }">${ escapeHTML(name) }</a>
      </li>
    `;
  };
}

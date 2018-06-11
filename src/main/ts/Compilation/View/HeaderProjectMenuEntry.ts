import {View} from "./View";
import {escapeHTML} from "../../Util/HTML/escapeHTML";

export class HeaderProjectMenuEntry extends View {
  url: string;
  name: string;

  constructor (url: string, name: string) {
    super();
    this.url = url;
    this.name = name;
  }

  render () {
    return `
      <li class="header-project-menu-entry">
        <a class="header-project-menu-entry-link" href="${ this.url }">${ escapeHTML(this.name) }</a>
      </li>
    `;
  }
}

import {escapeHTML} from "../../Util/HTML/escapeHTML";
import {View} from "./View";

export class PaneTocCategory extends View {
  name: string;
  isActive: boolean;
  entriesHtml: string;

  constructor(name: string, isActive: boolean, entriesHtml: string) {
    super();
    this.name = name;
    this.isActive = isActive;
    this.entriesHtml = entriesHtml;
  }

  render() {
    return `
      <label class="toc-category">
        <input type="radio" hidden name="toc-category-expanded" ${ this.isActive ? "checked" : "" }>
        <div class="toc-category-name-wrapper ${ this.isActive ? "active" : "" }">
          <div class="toc-category-name">${ escapeHTML(name) }</div>
        </div>
        <ul class="toc-category-entries">
          ${ this.entriesHtml }
        </ul>
      </label>
    `;
  };
}

import {escapeHTML} from "../../Util/HTML/escapeHTML";
import {View} from "./View";

export class ReferenceArticleArgument extends View {
  name: string;
  descriptionHtml: string;

  constructor(name: string, descriptionHtml: string) {
    super();
    this.name = name;
    this.descriptionHtml = descriptionHtml;
  }

  render() {
    // Use div instead of p as p doesn't support some types of children elements
    // Don't wrap in div because it's no longer necessary and Firefox doesn't support it
    return `
      <dt class="argument-name">${ escapeHTML(name) }</dt>
      <dd>
          <div class="argument-description">${ this.descriptionHtml }</div>
      </dd>
    `;
  };
}

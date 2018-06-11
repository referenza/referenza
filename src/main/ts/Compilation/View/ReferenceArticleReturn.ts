import {View} from "./View";

export class ReferenceArticleReturn extends View {
  valueHtml: string;

  constructor(valueHtml: string) {
    super();
    this.valueHtml = valueHtml;
  }

  render() {
    return `
      <li>${ this.valueHtml }</li>
    `;
  };
}

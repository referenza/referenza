"use strict";

import {View} from "./View";

export class ReferenceArticleSignature extends View {
  codeHtml: string;

  constructor(codeHtml: string) {
    super();
    this.codeHtml = codeHtml;
  }

  render() {
    return `
      <pre class="signature">${ this.codeHtml }</pre>
    `;
  };
}

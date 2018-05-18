"use strict";

const ReferenceArticleSignature = codeHtml => {
  return `
        <pre class="signature">${ codeHtml }</pre>
    `;
};

module.exports = ReferenceArticleSignature;

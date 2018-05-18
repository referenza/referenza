"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const ReferenceArticleArgument = (name, descriptionHtml) => {
  // Use div instead of p as p doesn't support some types of children elements
  // Don't wrap in div because it's no longer necessary and Firefox doesn't support it
  return `
        <dt class="argument-name">${ escapeHTML(name) }</dt>
        <dd>
            <div class="argument-description">${ descriptionHtml }</div>
        </dd>
    `;
};

module.exports = ReferenceArticleArgument;

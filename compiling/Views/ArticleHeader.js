"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const ArticleHeader = ({category, name}) => {
  // category-label is for reader view in browsers
  return `
    <header>
      <a href="#pane" class="category"><span class="category-label">In category:<zc-space /></span>${escapeHTML(category)}</a>
      <h1>${escapeHTML(name)}</h1>
    </header>
  `;
};

module.exports = ArticleHeader;

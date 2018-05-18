"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const ArticleNavigator = ({dir, href, name}) => {
  return `
    <a
      href="${escapeHTML(href)}"
      title="${dir == ArticleNavigator.DIR_PREV ? "Previous" : "Next"} article">
    ${dir == ArticleNavigator.DIR_PREV ? "&lt;   " : ""}
    ${escapeHTML(name)}
    ${dir == ArticleNavigator.DIR_NEXT ? "   &gt;" : ""}
    </a>
  `;
};

ArticleNavigator.DIR_PREV = 1;
ArticleNavigator.DIR_NEXT = 2;

module.exports = ArticleNavigator;

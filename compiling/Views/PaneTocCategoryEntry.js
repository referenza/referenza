"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const PaneTocCategoryEntry = ({url, name, description, isActive}) => {
  return `
    <li class="toc-category-entry ${ isActive ? "active" : "" }" title="${ escapeHTML(description) }">
      <a href="${ isActive ? "#" : escapeHTML(url) }">${ escapeHTML(name) }</a>
    </li>
  `;
};

module.exports = PaneTocCategoryEntry;

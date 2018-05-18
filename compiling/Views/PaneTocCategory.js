"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const PaneTocCategory = (name, isActive, entriesHtml) => {
  return `
    <label class="toc-category">
      <input type="radio" hidden name="toc-category-expanded" ${ isActive ? "checked" : "" }>
      <div class="toc-category-name-wrapper ${ isActive ? "active" : "" }">
        <div class="toc-category-name">${ escapeHTML(name) }</div>
      </div>
      <ul class="toc-category-entries">
        ${ entriesHtml }
      </ul>
    </label>
  `;
};

module.exports = PaneTocCategory;

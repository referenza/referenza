"use strict";

const HTMLEntities = require("html-entities").AllHtmlEntities;

const unescapeHTML = str => {
  return new HTMLEntities().decode(str);
};

module.exports = unescapeHTML;

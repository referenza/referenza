"use strict";

const HTMLEntities = require("html-entities").AllHtmlEntities;

const escapeHTML = str => {
  return new HTMLEntities().encode(str);
};

module.exports = escapeHTML;

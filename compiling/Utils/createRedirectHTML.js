"use strict";

const escapeHTML = require("./escapeHTML");

const createRedirectHTML = to => {
  return `<meta http-equiv="refresh"content="0;url=${escapeHTML(to)}">`;
};

module.exports = createRedirectHTML;

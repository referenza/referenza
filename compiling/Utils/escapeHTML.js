"use strict";

const escapeHTML = str => {
  let entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  };
  return ("" + str).replace(/[&<>"']/g, entity => entityMap[entity]);
};

module.exports = escapeHTML;

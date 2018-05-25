"use strict";

const hljs = require("highlight.js");
const parseTypedCodeLine = require("./parseTypedCodeLine");
const escapeHTML = require("./escapeHTML");

const parseCode = (code, language) => {
  let html;

  if (language && language.indexOf("x-referenza-") == 0) {
    switch (language.slice(8)) {
    case "typedline":
      html = parseTypedCodeLine(code);
      break;
    }
  } else if (language) {
    html = hljs.highlight(language, code, true).value;
  } else {
    html = escapeHTML(code);
  }

  return `<pre>${html}</pre>`;
};

module.exports = parseCode;

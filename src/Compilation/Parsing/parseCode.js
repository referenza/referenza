"use strict";

const hljs = require("highlight.js");
const parseTypedCodeLine = require("./parseTypedCodeLine");
const escapeHTML = require("../../Util/HTML/escapeHTML");
const generateMermaidSVG = require("./generateMermaidSVG");

const parseCode = (code, language) => {
  if (language == "mermaid") {
    return generateMermaidSVG(resolve);

  } else {
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

    return Promise.resolve(`<pre>${html}</pre>`);
  }
};

module.exports = parseCode;

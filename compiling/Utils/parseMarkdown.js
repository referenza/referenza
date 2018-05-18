"use strict";

const marked = require("marked");
const hljs = require("highlight.js");
const parseTypedCodeLine = require("./parseTypedCodeLine");
const escapeHTML = require("./escapeHTML");

const parseMarkdown = (mdText, removeParagraphTags, internalLinkCallback) => {
  let renderer = new marked.Renderer();

  renderer.code = (code, language) => {
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

  renderer.heading = (text, level) => {
    let ret = marked(text).slice(3, -5); // Remove <p> wrapping
    ret = ret;
    let tag = `h${level + 1}`; // The only <h1> should be the article's title
    return `<${tag}>${ret}</${tag}>`;
  };

  renderer.paragraph = text => {
    let ret = marked(text);
    if (removeParagraphTags) {
      ret = ret.slice(3, -5); // Remove <p> wrapping
    }
    return ret;
  };

  renderer.list = (body, ordered) => {
    let ret = marked(body);
    let tagName = ordered ? "ol" : "ul";
    return `<${tagName}>${ret}</${tagName}>`;
  };

  renderer.link = (href, title, text) => {
    let html = `<a `;

    if (href[0] != "#") {
      html += "target=_blank ";
    } else {
      href = internalLinkCallback(href.slice(1));
    }
    // Don't need to escape href, as it already is by renderer
    html += "href=\"" + href + "\" ";

    title = (title || "").trim();
    if (title) {
      html += "title=\"" + escapeHTML(title) + "\" ";
    }

    html += ">";
    if (text) {
      // No need to escape text, as it already is by renderer
      html += text;
    }
    html += "</a>";
    return html;
  };

  return marked(mdText, {
    renderer: renderer,
  })
    .replace(/ </g, "<zc-space /><").replace(/> /g, "><zc-space />")
    .replace(/<table>/g, `<div class=table-container><table>`)
    .replace(/<\/table>/g, `</table></div>`);
};

module.exports = parseMarkdown;

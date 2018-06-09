"use strict";

const marked = require("marked");
const parseCode = require("./parseCode");
const escapeHTML = require("../../Util/HTML/escapeHTML");
const cryptoRandomHex = require("../../Util/Random/cryptoRandomHex");

const parseMarkdown = (mdText, removeParagraphTags, internalLinkCallback) => {
  return new Promise((resolve, reject) => {
    let renderer = new marked.Renderer();

    let async_substitutions = [];

    let currentTabbedSectionLabels;
    let currentTabbedSectionsID;

    renderer.code = (code, language) => {
      let async_id = cryptoRandomHex(32);
      async_substitutions.push([async_id, parseCode(code, language)]);
      return `__referenza_async_${async_id}`;
    };

    renderer.html = html => {
      let html_comment_directive = /^\s*<!--\s*(begin|end)\s+([a-zA-Z0-9-_\s]+)-->\s*$/.exec(html);
      if (html_comment_directive) {
        let start = html_comment_directive[1] == "begin";
        let dir = html_comment_directive[2].trim();

        if (dir == "tabbed sections") {
          if (start) {
            currentTabbedSectionsID = cryptoRandomHex();
            currentTabbedSectionLabels = [];
            return `
            <div class="tabbed-sections">
              <div class="tabbed-sections-content">
          `;

          } else {
            let compiled = `
                </div>
              </div>
            </div>
            <ul class="tabbed-sections-labels">
              ${currentTabbedSectionLabels.map(l => `<li>${l}</li>`).join("")}
            </ul>
          </div>
          `;
            currentTabbedSectionsID = currentTabbedSectionLabels = undefined;
            return compiled;
          }

        } else {
          throw new TypeError(`Unknown referenza HTML comment directive "${dir}"`);
        }

      } else {
        return html;
      }
    };

    renderer.heading = (text, level) => {
      let content = marked(text).slice(3, -5); // Remove <p> wrapping

      if (currentTabbedSectionsID && level == 1) {
        // End last tabbed section and start new one
        let currentTabbedSectionsCount = currentTabbedSectionLabels.length;
        let radioID = "tabbed-section-radio-" + cryptoRandomHex();
        let generated = `
          ${ currentTabbedSectionsCount ? "</div></div>" : "" }
          <div class="tabbed-section">
            <input id="${radioID}" class="tabbed-section-radio"
              name="${currentTabbedSectionsID}" type="radio"
              ${ currentTabbedSectionsCount ? "" : "checked" }>
            <div class="tabbed-section-content">
        `;
        currentTabbedSectionLabels.push(`
          <label class="tabbed-section-label ${ currentTabbedSectionsCount ?
          "" :
          "active" }" for="${radioID}">${escapeHTML(content)}</label>
        `);
        return generated;

      } else {
        let tag = `h${level + 1}`; // The only <h1> should be the article's title
        return `<${tag}>${content}</${tag}>`;
      }
    };

    renderer.paragraph = text => {
      let content = marked(text);
      if (removeParagraphTags) {
        content = content.slice(3, -5); // Remove <p> wrapping
      }
      return content;
    };

    renderer.list = (body, ordered) => {
      let content = marked(body);
      let tagName = ordered ? "ol" : "ul";
      return `<${tagName}>${content}</${tagName}>`;
    };

    renderer.link = (href, title, text) => {
      let html = `<a `;

      if (href[0] != "#") {
        html += `target=_blank `;
      } else {
        href = internalLinkCallback(href.slice(1));
      }
      // Don't need to escape href, as it already is by renderer
      html += `href="${href}" `;

      title = (title || "").trim();
      if (title) {
        html += `title="${escapeHTML(title)}" `;
      }

      html += ">";
      if (text) {
        // No need to escape text, as it already is by renderer
        html += text;
      }
      html += "</a>";
      return html;
    };

    let md = marked(mdText, {
      renderer: renderer,
    })
      .replace(/ </g, "<zc-space /><").replace(/> /g, "><zc-space />")
      .replace(/<table>/g, `<div class=table-container><table>`)
      .replace(/<\/table>/g, `</table></div>`);

    Promise.all(async_substitutions.map(s => s[1]))
      .then(substitutions => {
        substitutions.forEach((s, i) => {
          md = md.replace(`__referenza_async_${async_substitutions[i][0]}`, s);
        });
      })
      .then(() => {
        resolve(md);
      })
      .catch(reject);
  });
};

module.exports = parseMarkdown;

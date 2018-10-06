import {cryptoRandomHex} from "../../Util/Random/cryptoRandomHex";
import {parseCode} from "./parseCode";
import marked from "marked";
import {generateAsyncContentPlaceholder} from "./asyncContentPlaceholder";

export function parseMarkdown (mdText: string, removeParagraphTags: boolean, internalLinkCallback?: (hash: string) => string): Promise<string> {
  return new Promise((resolve, reject) => {
    let renderer = new marked.Renderer();

    let asyncContent: Array<[string, Promise<string>]> = [];

    let currentTabbedSectionLabels: Array<string> | undefined;
    let currentTabbedSectionsID : string | undefined;

    renderer.code = (code: string, language: string) => {
      let async_id = cryptoRandomHex(32);
      asyncContent.push([async_id, parseCode(code, language)]);
      return generateAsyncContentPlaceholder(async_id);
    };

    renderer.html = (html: string) => {
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
                ${currentTabbedSectionLabels!.map(l => `<li>${l}</li>`).join("")}
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

    renderer.heading = (content: string, level: number) => {
      // $content is already HTML

      if (currentTabbedSectionsID && level == 1) {
        // End last tabbed section and start new one
        let currentTabbedSectionsCount = currentTabbedSectionLabels!.length;
        let radioID = "tabbed-section-radio-" + cryptoRandomHex();

        let generated = (currentTabbedSectionsCount ? "</div></div>" : "") +
          `<div class="tabbed-section">` +
          HTMLInputElement({
            ID: radioID,
            classes: ["tabbed-section-radio"],
            name: currentTabbedSectionsID,
            type: "radio",
            // Make the first section active
            checked: !currentTabbedSectionsCount,
          }) +
          `<div class="tabbed-section-content">`;

        currentTabbedSectionLabels!.push(HTMLLabelElement({
          classes: ["tabbed-section-label", currentTabbedSectionsCount ? "" : "active"],
          forID: radioID,
          content: content,
        }));

        return generated;

      } else {
        return HTMLHeadingElement({
          level: level + 1, // The only <h1> should be the article's title
          content: content,
        });
      }
    };

    renderer.paragraph = (content: string) => {
      if (!removeParagraphTags) {
        content = `<p>${content}</p>`;
      }
      return content;
    };

    renderer.table = (header, body) => {
      return `<div class=table-container><table>${header}${body}</table></div>`;
    };

    renderer.link = (href: string, title: string, content: string) => {
      let newTab = false;
      let url;

      if (href[0] != "#") {
        newTab = true;
        // Don't need to escape href, as it already is by renderer
        url = href;
      } else {
        if (!internalLinkCallback) {
          throw new Error(`INTERR No internal link callback provided`)
        }
        url = internalLinkCallback(href.slice(1));
      }

      return HTMLAnchorElement({
        // No need to escape content, as it already is by renderer
        content: {HTML: content},
        URL: url,
        newTab: newTab,
        // No need to escape title, as it already is by renderer
        tooltip: {HTML: title},
      });
    };

    let parsed = marked(mdText, {renderer});

    Promise.all(asyncContent.map(s => s[1]))
      .then(substitutions => {
        substitutions.forEach((s, i) => {
          parsed = parsed.replace(generateAsyncContentPlaceholder(asyncContent[i][0]), s);
        });
      })
      .then(() => {
        resolve(parsed);
      })
      .catch(reject);
  });
}

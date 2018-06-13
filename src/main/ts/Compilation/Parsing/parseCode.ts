import {escapeHTML} from "../../Util/HTML/escapeHTML";
import * as hljs from "highlight.js";
import {parseTypedCodeLine} from "./parseTypedCodeLine";
import {generateMermaidSVG} from "./generateMermaidSVG";

export function parseCode (code: string, language: string): Promise<string> {
  if (language == "mermaid") {
    return generateMermaidSVG(code);

  } else {
    let html;

    if (language && /^x-referenza-/.test(language)) {
      switch (language.slice(12)) {
      case "typedline":
        html = parseTypedCodeLine(code);
        break;

      default:
        throw new SyntaxError(`Unknown custom language "${language}"`);
      }

    } else if (language) {
      html = hljs.highlight(language, code, true).value;

    } else {
      html = escapeHTML(code);
    }

    return Promise.resolve(`<pre>${html}</pre>`);
  }
}

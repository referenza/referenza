import {escapeHTML} from "../../Util/HTML/escapeHTML";
import * as hljs from "highlight.js";
import {generateMermaidSVG} from "./generateMermaidSVG";

const HLJS_LANGUAGES = hljs.listLanguages();

const LANGUAGE_MAPPINGS = Object.assign({}, ...[...HLJS_LANGUAGES.map(l => ({[l]: l})), {
  "c": "c++",
}]);

export function parseCode (code: string, language: string): Promise<string> {
  if (language == "mermaid") {
    return generateMermaidSVG(code);

  } else {
    let html;

    if (language && LANGUAGE_MAPPINGS[language]) {
      html = hljs.highlight(LANGUAGE_MAPPINGS[language], code, true).value;
    } else {
      html = escapeHTML(code);
    }

    return Promise.resolve(`<pre>${html}</pre>`);
  }
}

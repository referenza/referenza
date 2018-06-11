import {escapeHTML} from "../../Util/HTML/escapeHTML";

export type TextOrHTML = string | HTMLValue;

export function prepareTextOrHTML (content: TextOrHTML) {
  if (typeof content == "string") {
    return escapeHTML(content);
  }
  return content.HTML;
}

export interface HTMLValue {
  HTML: string;
}

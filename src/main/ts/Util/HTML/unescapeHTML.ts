import {AllHtmlEntities} from "html-entities";

export function unescapeHTML (str: string): string {
  return new AllHtmlEntities().decode(str);
}

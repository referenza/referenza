import {AllHtmlEntities} from "html-entities";

export function escapeHTML (str: string): string {
  return new AllHtmlEntities().encode(str);
}

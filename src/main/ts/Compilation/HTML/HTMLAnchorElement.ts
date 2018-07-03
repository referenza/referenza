import {prepareTextOrHTML, TextOrHTML} from "../../Util/HTML/HTMLValue";
import {generateCoreAttrs, HTMLElementConfig} from "./HTMLElement";

export interface HTMLAnchorElementConfig extends HTMLElementConfig {
  content: TextOrHTML;
  URL: TextOrHTML;
  newTab: boolean;
}

export function HTMLAnchorElement (
  {
    ID,
    classes,
    tooltip,

    content,
    URL,
    newTab,
  }: HTMLAnchorElementConfig
): string {
  let coreAttrs = generateCoreAttrs({ID, classes, tooltip});

  let href = prepareTextOrHTML(URL);
  let targetAttr = newTab ? "target=_blank" : "";
  let innerHTML = prepareTextOrHTML(content);

  return `<a ${coreAttrs} href="${href}" ${targetAttr}>${innerHTML}</a>`;
}

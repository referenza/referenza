import {prepareTextOrHTML, TextOrHTML} from "../../Util/HTML/HTMLValue";
import {generateCoreAttrs, HTMLElementConfig} from "./HTMLElement";

export interface HTMLLabelElementConfig extends HTMLElementConfig {
  content: TextOrHTML,
  forID?: TextOrHTML;
}

export function HTMLLabelElement (
  {
    ID,
    classes,
    tooltip,

    content,
    forID,
  }: HTMLLabelElementConfig
): string {
  let coreAttrs = generateCoreAttrs({ID, classes, tooltip});

  let forIDAttr = forID != undefined ? `for="${prepareTextOrHTML(forID)}"` : "";
  let innerHTML = prepareTextOrHTML(content);

  return `<label ${coreAttrs} ${forIDAttr}>${innerHTML}</label>`;
}

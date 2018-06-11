import {prepareTextOrHTML, TextOrHTML} from "./HTMLValue";
import {generateCoreAttrs, TagConfig} from "./Tag";

export interface LabelConfig extends TagConfig {
  content: TextOrHTML,
  forID?: TextOrHTML;
}

export function Label (
  {
    ID,
    classes,
    tooltip,

    content,
    forID,
  }: LabelConfig
): string {
  let coreAttrs = generateCoreAttrs({ID, classes, tooltip});

  let forIDAttr = forID != undefined ? `for=${prepareTextOrHTML(forID)}"` : "";
  let innerHTML = prepareTextOrHTML(content);

  return `<label ${coreAttrs} ${forIDAttr}>${innerHTML}</label>`;
}

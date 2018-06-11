import {prepareTextOrHTML, TextOrHTML} from "./HTMLValue";
import {generateCoreAttrs, TagConfig} from "./Tag";

export interface AnchorConfig extends TagConfig {
  content: TextOrHTML;
  URL: TextOrHTML;
  newTab: boolean;
}

export function Anchor (
  {
    ID,
    classes,
    tooltip,

    content,
    URL,
    newTab,
  }: AnchorConfig
): string {
  let coreAttrs = generateCoreAttrs({ID, classes, tooltip});

  let href = prepareTextOrHTML(URL);
  let targetAttr = newTab ? "target=_blank" : "";
  let innerHTML = prepareTextOrHTML(content);

  return `<a ${coreAttrs} href="${href}" ${targetAttr}>${innerHTML}</a>`;
}

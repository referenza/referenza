import {prepareTextOrHTML, TextOrHTML} from "../../Util/HTML/HTMLValue";
import {generateCoreAttrs, HTMLElementConfig} from "./HTMLElement";

export interface HeadingConfig extends HTMLElementConfig {
  level: number;
  content: TextOrHTML,
}

export function HTMLHeadingElement (
  {
    ID,
    classes,
    tooltip,

    level,
    content,
  }: HeadingConfig
): string {
  let coreAttrs = generateCoreAttrs({ID, classes, tooltip});

  if (level < 1 || level > 6) {
    throw new TypeError(`Heading level ${level} is out-of-range`);
  }

  let innerHTML = prepareTextOrHTML(content);

  return `<h${level} ${coreAttrs}>${innerHTML}</h${level}>`;
}

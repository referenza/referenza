import {prepareTextOrHTML, TextOrHTML} from "../../Util/HTML/HTMLValue";
import {generateCoreAttrs, TagConfig} from "./Tag";

export interface HeadingConfig extends TagConfig {
  level: number;
  content: TextOrHTML,
}

export function H (
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

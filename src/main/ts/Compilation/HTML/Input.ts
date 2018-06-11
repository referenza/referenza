import {prepareTextOrHTML, TextOrHTML} from "./HTMLValue";
import {generateCoreAttrs, TagConfig} from "./Tag";

export interface InputConfig extends TagConfig {
  type?: "text" | "password" | "radio" | "checkbox" | "range" | "file";
  name?: TextOrHTML;
  checked?: boolean;
}

export function Input (
  {
    ID,
    classes,
    tooltip,

    type,
    name,
    checked,
  }: InputConfig
): string {
  let coreAttrs = generateCoreAttrs({ID, classes, tooltip});

  let nameAttr = name != undefined ? `name=${prepareTextOrHTML(name)}"` : "";
  let checkedAttr = checked ? "checked" : "";

  return `<input ${coreAttrs} type="${type}" ${nameAttr} ${checkedAttr}>`;
}

import {prepareTextOrHTML, TextOrHTML} from "../../Util/HTML/HTMLValue";
import {generateCoreAttrs, HTMLElementConfig} from "./HTMLElement";

export interface HTMLInputElementConfig extends HTMLElementConfig {
  type?: "text" | "password" | "radio" | "checkbox" | "range" | "file";
  name?: TextOrHTML;
  checked?: boolean;
}

export function HTMLInputElement (
  {
    ID,
    classes,
    tooltip,

    type,
    name,
    checked,
  }: HTMLInputElementConfig
): string {
  let coreAttrs = generateCoreAttrs({ID, classes, tooltip});

  let nameAttr = name != undefined ? `name="${prepareTextOrHTML(name)}"` : "";
  let checkedAttr = checked ? "checked" : "";

  return `<input ${coreAttrs} type="${type}" ${nameAttr} ${checkedAttr}>`;
}

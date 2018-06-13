import { TextOrHTML } from "../../Util/HTML/HTMLValue";
import { TagConfig } from "./Tag";
export interface InputConfig extends TagConfig {
    type?: "text" | "password" | "radio" | "checkbox" | "range" | "file";
    name?: TextOrHTML;
    checked?: boolean;
}
export declare function INPUT({ ID, classes, tooltip, type, name, checked, }: InputConfig): string;

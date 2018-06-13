import { TextOrHTML } from "../../Util/HTML/HTMLValue";
import { TagConfig } from "./Tag";
export interface LabelConfig extends TagConfig {
    content: TextOrHTML;
    forID?: TextOrHTML;
}
export declare function LABEL({ ID, classes, tooltip, content, forID, }: LabelConfig): string;

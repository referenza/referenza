import { TextOrHTML } from "../../Util/HTML/HTMLValue";
import { TagConfig } from "./Tag";
export interface AnchorConfig extends TagConfig {
    content: TextOrHTML;
    URL: TextOrHTML;
    newTab: boolean;
}
export declare function A({ ID, classes, tooltip, content, URL, newTab, }: AnchorConfig): string;

import { TextOrHTML } from "../../Util/HTML/HTMLValue";
import { TagConfig } from "./Tag";
export interface HeadingConfig extends TagConfig {
    level: number;
    content: TextOrHTML;
}
export declare function H({ ID, classes, tooltip, level, content, }: HeadingConfig): string;

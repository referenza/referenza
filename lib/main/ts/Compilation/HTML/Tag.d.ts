import { TextOrHTML } from "../../Util/HTML/HTMLValue";
export declare function generateCoreAttrs({ ID, classes, tooltip }: TagConfig): string;
export interface TagConfig {
    ID?: TextOrHTML;
    classes?: ReadonlyArray<TextOrHTML>;
    tooltip?: TextOrHTML;
}

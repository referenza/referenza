import { View } from "../../View";
import { TextOrHTML } from "../../../../Util/HTML/HTMLValue";
export interface VReferenceArticleReturnProps {
    value: TextOrHTML;
}
export declare class VReferenceArticleReturn extends View {
    props: VReferenceArticleReturnProps;
    constructor(props: VReferenceArticleReturnProps);
    render(): string;
}

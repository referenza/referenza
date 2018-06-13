import { View } from "../../View";
import { TextOrHTML } from "../../../../Util/HTML/HTMLValue";
export interface VReferenceArticleSignatureProps {
    code: TextOrHTML;
}
export declare class VReferenceArticleSignature extends View {
    props: VReferenceArticleSignatureProps;
    constructor(props: VReferenceArticleSignatureProps);
    render(): string;
}

import { View } from "../../View";
import { TextOrHTML } from "../../../../Util/HTML/HTMLValue";
export interface VReferenceArticleArgumentProps {
    name: string;
    description: TextOrHTML;
}
export declare class VReferenceArticleArgument extends View {
    props: VReferenceArticleArgumentProps;
    constructor(props: VReferenceArticleArgumentProps);
    render(): string;
}

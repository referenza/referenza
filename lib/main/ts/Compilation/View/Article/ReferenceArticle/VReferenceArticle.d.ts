import { VReferenceArticleSignature } from "./VReferenceArticleSignature";
import { VReferenceArticleArgument } from "./VReferenceArticleArgument";
import { VReferenceArticleReturn } from "./VReferenceArticleReturn";
import { VArticle, VArticleProps } from "../VArticle";
export interface VReferenceArticleProps extends VArticleProps {
    description: string;
    signatures: ReadonlyArray<VReferenceArticleSignature>;
    parameters: ReadonlyArray<VReferenceArticleArgument>;
    returns: ReadonlyArray<VReferenceArticleReturn>;
}
export declare class VReferenceArticle extends VArticle {
    props: VReferenceArticleProps;
    constructor(props: VReferenceArticleProps);
    render(): string;
}

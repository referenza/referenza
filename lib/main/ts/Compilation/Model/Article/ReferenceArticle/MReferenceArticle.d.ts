import { MArticle } from "../MArticle";
import { MReferenceArticleSignature } from "./MReferenceArticleSignature";
import { MReferenceArticleParameter } from "./MReferenceArticleParameter";
import { MReferenceArticleReturn } from "./MReferenceArticleReturn";
export declare class MReferenceArticle extends MArticle {
    description: string;
    signatures: Array<MReferenceArticleSignature>;
    parameters: Array<MReferenceArticleParameter>;
    returns: Array<MReferenceArticleReturn>;
    constructor(name: string, category: string, description: string);
    addSignature(signature: MReferenceArticleSignature): void;
    addParameter(parameter: MReferenceArticleParameter): void;
    addReturn(ret: MReferenceArticleReturn): void;
}

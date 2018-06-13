import { MDocumentation } from "../MDocumentation";
export declare enum MArticleType {
    ARTICLE_TYPE_REFERENCE = "reference",
    ARTICLE_TYPE_CONTENT = "content"
}
export declare abstract class MArticle {
    type: MArticleType;
    name: string;
    category: string;
    stateChanged: boolean;
    protected constructor(type: MArticleType, name: string, category: string);
    createURLPath(documentation: MDocumentation): string;
}

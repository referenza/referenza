export declare enum ArticleStateType {
    REFERENCE_ARTICLE_STATE = "ReferenceArticleState",
    CONTENT_ARTICLE_STATE = "ContentArticleState"
}
export declare abstract class ArticleState {
    objtype: ArticleStateType;
    protected constructor(objtype: ArticleStateType);
    abstract isDiffTo(other: ArticleState): boolean;
}

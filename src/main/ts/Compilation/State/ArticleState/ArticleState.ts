export enum ArticleStateType {
  REFERENCE_ARTICLE_STATE = "ReferenceArticleState",
  CONTENT_ARTICLE_STATE = "ContentArticleState",
}

export abstract class ArticleState {
  objtype: ArticleStateType;

  protected constructor (objtype: ArticleStateType) {
    this.objtype = objtype;
  }

  abstract isDiffTo (other: ArticleState): boolean;
}

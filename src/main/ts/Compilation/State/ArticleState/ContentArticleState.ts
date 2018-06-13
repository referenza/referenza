import {ArticleState, ArticleStateType} from "./ArticleState";

export class ContentArticleState extends ArticleState {
  mtime: number;

  constructor (mtime: number) {
    super(ArticleStateType.CONTENT_ARTICLE_STATE);

    this.mtime = mtime;
  }

  isDiffTo (other: ArticleState): boolean {
    return !(other instanceof ContentArticleState) ||
      this.mtime != other.mtime;
  }
}

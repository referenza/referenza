import {ArticleState} from "./ArticleState";
import {StateObjectType} from "./StateObjectType";

export class ContentArticleState extends ArticleState {
  mtime: number;

  constructor(mtime: number) {
    super();

    this.__objtype = StateObjectType.CONTENT_ARTICLE_STATE;
    this.mtime = mtime;
  }

  isDiffTo(other: ArticleState) {
    return !(other instanceof ContentArticleState) ||
      this.mtime != other.mtime;
  }
}

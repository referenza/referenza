import {Article} from "./Article";
import {ArticleType} from "./ArticleType";

export class ContentArticle extends Article {
  content?: string | undefined = undefined;

  constructor () {
    super(ArticleType.ARTICLE_TYPE_CONTENT);
  }
}

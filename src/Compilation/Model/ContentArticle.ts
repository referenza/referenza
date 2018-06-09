import {Article} from "./Article";
import {Documentation} from "./Documentation";
import {ArticleType} from "./ArticleType";

export class ContentArticle extends Article {
  content?: string = undefined;

  constructor(documentation: Documentation, category: string, name: string) {
    super(ArticleType.ARTICLE_TYPE_CONTENT, documentation, category, name);
  }
}

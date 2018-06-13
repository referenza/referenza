import {MArticle} from "../MArticle";
import {MArticleType} from "../MArticle";

export class MContentArticle extends MArticle {
  content?: string | null = null;

  constructor (name: string, category: string) {
    super(MArticleType.ARTICLE_TYPE_CONTENT, name, category);
  }
}

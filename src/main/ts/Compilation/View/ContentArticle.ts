import {ArticleNavigator} from "./ArticleNavigator";
import {View} from "./View";
import {ArticleHeader} from "./ArticleHeader";
import {ArticleFooter} from "./ArticleFooter";

export class ContentArticle extends View {
  category: string;
  name: string;
  contentHtml: string;
  articleNavPrev: ArticleNavigator;
  articleNavNext: ArticleNavigator;

  constructor(category: string, name: string, contentHtml: string, articleNavPrev: ArticleNavigator, articleNavNext: ArticleNavigator) {
    super();
    this.category = category;
    this.name = name;
    this.contentHtml = contentHtml;
    this.articleNavPrev = articleNavPrev;
    this.articleNavNext = articleNavNext;
  }

  render() {
    return `
      ${new ArticleHeader(this.category, this.name)}
  
      <section>${this.contentHtml}</section>
      
      ${new ArticleFooter(this.articleNavPrev, this.articleNavNext)}
    `;
  }
}

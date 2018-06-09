import {View} from "./View";
import {ArticleNavigator} from "./ArticleNavigator";

export class ArticleFooter extends View {
  articleNavPrev: ArticleNavigator;
  articleNavNext: ArticleNavigator;

  constructor(articleNavPrev: ArticleNavigator, articleNavNext: ArticleNavigator) {
    super();
    this.articleNavPrev = articleNavPrev;
    this.articleNavNext = articleNavNext;
  }

  render() {
    return `
    <footer>
      <div class="article-nav">
        <div class="article-nav-left">${this.articleNavPrev}</div>
        <div class="article-nav-right">${this.articleNavNext}</div>
      </div>
    </footer>
`
  }
}

import {escapeHTML} from "../../Util/HTML/escapeHTML";
import {ArticleNavigator} from "./ArticleNavigator";
import {View} from "./View";
import {ArticleHeader} from "./ArticleHeader";
import {ArticleFooter} from "./ArticleFooter";

export class ReferenceArticle extends View {
  category: string;
  name: string;
  description: string;
  signaturesHtml: string;
  argumentsHtml?: string;
  returnsHtml?: string;
  articleNavPrev: ArticleNavigator;
  articleNavNext: ArticleNavigator;

  constructor(category: string, name: string, description: string, signaturesHtml: string, argumentsHtml: string, returnsHtml: string, articleNavPrev: ArticleNavigator, articleNavNext: ArticleNavigator) {
    super();
    this.category = category;
    this.name = name;
    this.description = description;
    this.signaturesHtml = signaturesHtml;
    this.argumentsHtml = argumentsHtml;
    this.returnsHtml = returnsHtml;
    this.articleNavPrev = articleNavPrev;
    this.articleNavNext = articleNavNext;
  }

  render() {
    return `
      ${new ArticleHeader(this.category, this.name)}
  
      <section class="section-synopsis">
          <h2>Synopsis</h2>
          <p class="description">${escapeHTML(this.description)}</p>
          ${this.signaturesHtml}
      </section>
  
      ${ !this.argumentsHtml ? "" : `<section>
          <h2>Arguments</h2>
          <dl class="arguments-list">
              ${this.argumentsHtml}
          </dl>
      </section>` }
  
      ${ !this.returnsHtml ? "" : `<section>
          <h2>Returns</h2>
          <ul class="returns-list">
              ${this.returnsHtml}
          </ul>
      </section>` }
      
      ${new ArticleFooter(this.articleNavPrev, this.articleNavNext)}
    `;
  };
}

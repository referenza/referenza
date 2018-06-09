import {Article} from "./Article";
import {createURLPathComponent} from "../../Util/URL/createURLPathComponent";

export class Documentation {
  name: string;
  major: number;
  minor: number;
  orderOfCategories?: ReadonlyArray<string>;
  articlesByCategory: Map<string, Array<Article>>;
  articles: Array<Article>;
  urlDirPath: string;

  constructor(name: string, major: number, minor: number) {
    this.name = name;
    this.major = major;
    this.minor = minor;

    this.orderOfCategories = undefined;
    this.articlesByCategory = new Map();

    // Articles must be in order for navigation to work
    this.articles = [];
    // urlDirPath must have trailing slash, as S3 Website will redirect no-trailing-slash to trailing-slash
    this.urlDirPath = "/" + [name, major, minor].map(createURLPathComponent).join("/") + "/";
  }

  setCategories(orderOfCategories: Array<string>): void {
    if (!Array.isArray(orderOfCategories) || orderOfCategories.length < 1) {
      throw new TypeError(`Invalid categories array`);
    }

    this.orderOfCategories = orderOfCategories.slice();
    orderOfCategories.forEach(category => {
      this.articlesByCategory.set(category, []);
    });
  }

  addArticle(article: Article): void {
    if (this.orderOfCategories === undefined) {
      throw new Error(`Categories has not been set yet`);
    }

    let category = article.category;
    if (!this.articlesByCategory.has(category)) {
      throw new ReferenceError(`Category "${category}" does not exist`);
    }

    this.articles.push(article);
    this.articlesByCategory.get(category)!.push(article);
  }

  getLandingArticle(): Article {
    if (this.orderOfCategories === undefined) {
      throw new Error(`Categories has not been set yet`);
    }

    let firstCategory = this.orderOfCategories[0];
    return this.articlesByCategory.get(firstCategory)![0];
  }
}

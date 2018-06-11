import {Article} from "./Article";
import {OrderedMap} from "../../Util/Structure/OrderedMap";

export class Documentation {
  name: string;
  version: string;
  metadataStateChanged: boolean;
  articles: OrderedMap<string, Array<Article>>;

  // TODO
  // urlDirPath: string;

  constructor (name: string, version: string, metadataStateChanged: boolean) {
    this.name = name;
    this.version = version;
    this.metadataStateChanged = metadataStateChanged;

    // Articles must be in order for navigation to work
    this.articles = new OrderedMap();

    // urlDirPath must have trailing slash, as S3 Website will redirect no-trailing-slash to trailing-slash
    // this.urlDirPath = "/" + [name, version].map(createURLPathComponent).join("/") + "/";
  }

  extendCategoryArticles (category: string, articles: ReadonlyArray<Article>): void {
    if (!this.articles.has(category)) {
      this.articles.set(category, []);
    }

    Array.prototype.push.apply(this.articles.get(category), articles);
  }

  getLandingArticle (): Article {
    return this.articles.values().next().value[0];
  }
}

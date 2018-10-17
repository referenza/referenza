import {MArticle} from "./Article/MArticle";
import {OrderedMap} from "../../Util/Structure/OrderedMap";
import {createURLPathComponent} from "../../Util/URL/createURLPathComponent";

// TODO Delete
export class MDocumentation {
  name: string;
  version: string;
  metadataStateChanged: boolean;
  articles: OrderedMap<string, Array<MArticle>>;

  constructor (name: string, version: string, metadataStateChanged: boolean) {
    this.name = name;
    this.version = version;
    this.metadataStateChanged = metadataStateChanged;

    // Articles must be in order for navigation to work
    this.articles = new OrderedMap();
  }

  extendCategoryArticles (category: string, articles: ReadonlyArray<MArticle>): void {
    if (!this.articles.has(category)) {
      this.articles.set(category, []);
    }

    Array.prototype.push.apply(this.articles.get(category), articles);
  }

  getLandingArticle (): MArticle {
    return this.articles.firstValue![0];
  }

  createURLPath (): string {
    return "/" + [this.name, this.version].map(createURLPathComponent).join("/") + "/";
  }
}

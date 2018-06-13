import {createURLPathComponent} from "../../../Util/URL/createURLPathComponent";
import {MDocumentation} from "../MDocumentation";

export enum MArticleType {
  ARTICLE_TYPE_REFERENCE = "reference",
  ARTICLE_TYPE_CONTENT = "content",
}

export abstract class MArticle {
  type: MArticleType;
  name: string;
  category: string;
  stateChanged: boolean = false;

  protected constructor (type: MArticleType, name: string, category: string) {
    this.type = type;
    this.name = name;
    this.category = category;
  }

  createURLPath (documentation: MDocumentation): string {
    return documentation.createURLPath() + [this.category, this.name].map(createURLPathComponent).join("/") + "/";
  }
}

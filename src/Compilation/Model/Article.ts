import {ArticleType} from "./ArticleType";
import {Documentation} from "./Documentation";
import {createURLPathComponent} from "../../Util/URL/createURLPathComponent";

export abstract class Article {
  type: ArticleType;
  documentation: Documentation;
  category: string;
  name: string;
  stateChanged: boolean = false;
  urlDirPath: string;

  constructor(type: ArticleType, documentation: Documentation, category: string, name: string) {
    this.type = type;
    this.documentation = documentation;
    this.category = category;
    this.name = name;

    let pathComponents = [category, name];
    // urlDirPath must have trailing slash, as S3 Website will redirect no-trailing-slash to trailing-slash
    this.urlDirPath = documentation.urlDirPath + pathComponents.map(createURLPathComponent).join("/") + "/";
  }
}

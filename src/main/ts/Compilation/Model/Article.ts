import {ArticleType} from "./ArticleType";

export abstract class Article {
  type: ArticleType;
  stateChanged: boolean = false;

  protected constructor (type: ArticleType) {
    this.type = type;
    // TODO
    // this.documentation = documentation;
    // this.category = category;
    // this.name = name;
    //
    // let pathComponents = [category, name];
    // // urlDirPath must have trailing slash, as S3 Website will redirect no-trailing-slash to trailing-slash
    // this.urlDirPath = documentation.urlDirPath + pathComponents.map(createURLPathComponent).join("/") + "/";
  }
}

"use strict";

const createURLPathComponent = require("../Utils/createURLPathComponent");

class Article {
  constructor (type, documentation, category, name) {
    if (Object.getPrototypeOf(this) === Article.prototype) {
      throw new Error(`Article is an abstract class`);
    }

    this.type = type;
    this.documentation = documentation;
    this.category = category;
    this.name = name;
    this.stateChanged = false;

    let pathComponents = [category, name];
    // urlDirPath must have trailing slash, as S3 Website will redirect no-trailing-slash to trailing-slash
    this.urlDirPath = documentation.urlDirPath + pathComponents.map(createURLPathComponent).join("/") + "/";
  }
}

module.exports = Article;

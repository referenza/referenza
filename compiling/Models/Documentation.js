"use strict";

const createURLPathComponent = require("../Utils/createURLPathComponent");

class Documentation {
  constructor (name, major, minor) {
    this.name = name;
    this.major = major;
    this.minor = minor;

    this.orderOfCategories = undefined;
    this.articlesByCategory = new Map();

    // Articles must be in order for navigation to work
    this.articles = [];
    // urlDirPath must have trailing slash, as S3 Website will redirect no-trailing-slash to trailing-slash
    this.urlDirPath = "/" + [name, major, minor].map(createURLPathComponent).join("/") + "/";

    Object.seal(this);
  }

  setCategories (orderOfCategories) {
    if (!Array.isArray(orderOfCategories) || orderOfCategories.length < 1) {
      throw new TypeError(`Invalid categories array`);
    }

    this.orderOfCategories = orderOfCategories.slice();
    orderOfCategories.forEach(category => {
      this.articlesByCategory.set(category, []);
    });
  }

  addArticle (article) {
    if (this.orderOfCategories === undefined) {
      throw new Error(`Categories has not been set yet`);
    }

    let category = article.category;
    if (!this.articlesByCategory.has(category)) {
      throw new ReferenceError(`The "${category}" category does not exist`);
    }

    this.articles.push(article);
    this.articlesByCategory.get(category).push(article);
  }

  getLandingArticle () {
    let firstCategory = this.orderOfCategories[0];
    return this.articlesByCategory.get(firstCategory)[0];
  }
}

module.exports = Documentation;

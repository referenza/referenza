"use strict";

const Article = require("./Article");

const {

  ARTICLE_TYPE_CONTENT,

} = require("../constants");

class ContentArticle extends Article {
  constructor (documentation, category, name) {
    super(ARTICLE_TYPE_CONTENT, documentation, category, name);

    this.content = undefined;

    Object.seal(this);
  }
}

module.exports = ContentArticle;

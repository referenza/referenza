"use strict";

const Article = require("./Article");

const {

  ARTICLE_TYPE_REFERENCE,

} = require("../constants");

class ReferenceArticle extends Article {
  constructor (documentation, category, name) {
    super(ARTICLE_TYPE_REFERENCE, documentation, category, name);

    this.description = undefined;
    this.signatures = [];
    this.parameters = [];
    this.returns = [];

    Object.seal(this);
  }

  addSignature (signature) {
    this.signatures.push(signature);
  }

  addParameter (parameter) {
    this.parameters.push(parameter);
  }

  addReturn (ret) {
    this.returns.push(ret);
  }
}

module.exports = ReferenceArticle;

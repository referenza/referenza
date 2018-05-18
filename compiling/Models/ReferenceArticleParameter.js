"use strict";

class ReferenceArticleParameter {
  constructor (name, definition) {
    this.name = name;
    this.definition = definition;

    Object.freeze(this);
  }
}

module.exports = ReferenceArticleParameter;

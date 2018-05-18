"use strict";

const isNumber = require("../Utils/isNumber");

const ArticleState = require("./ArticleState");

class ContentArticleState extends ArticleState {
  constructor ({mtime}) {
    super();

    if (!isNumber(mtime)) {
      throw new Error("Invalid content article state modification time");
    }

    this.__objtype = "ContentArticleState";
    this.mtime = mtime;

    Object.freeze(this);
  }

  isDiffTo (other) {
    if (!other || typeof other != "object" || !(other instanceof ArticleState)) {
      throw new Error("Invalid state object");
    }

    return !(other instanceof ContentArticleState) ||
           this.mtime != other.mtime;
  }
}

module.exports = ContentArticleState;

"use strict";

class ArticleState {
  toObject () {
    return Object.assign(...Object.keys(this).map(k => ({[k]: this[k]})));
  }
}

module.exports = ArticleState;

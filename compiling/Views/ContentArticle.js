"use strict";

const ArticleHeader = require("./ArticleHeader");
const ArticleFooter = require("./ArticleFooter");

const ContentArticle = ({category, name, contentHtml, articleNavPrev, articleNavNext}) => {
  return `
    ${ArticleHeader({category, name})}

    <section>${contentHtml}</section>
    
    ${ArticleFooter({articleNavPrev, articleNavNext})}
  `;
};

module.exports = ContentArticle;

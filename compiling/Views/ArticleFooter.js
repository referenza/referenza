"use strict";

const ArticleFooter = ({articleNavPrev, articleNavNext}) => {
  return `
    <footer>
      <div class="article-nav">
        <div class="article-nav-left">${articleNavPrev}</div>
        <div class="article-nav-right">${articleNavNext}</div>
      </div>
    </footer>
  `;
};

module.exports = ArticleFooter;

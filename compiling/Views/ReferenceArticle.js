"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const ArticleHeader = require("./ArticleHeader");
const ArticleFooter = require("./ArticleFooter");

const ReferenceArticle = ({category, name, description, signaturesHtml, argumentsHtml, returnsHtml, articleNavPrev, articleNavNext}) => {
  return `
    ${ArticleHeader({category, name})}

    <section class="section-synopsis">
        <h2>Synopsis</h2>
        <p class="description">${escapeHTML(description)}</p>
        ${signaturesHtml}
    </section>

    ${ !argumentsHtml ? "" : `<section>
        <h2>Arguments</h2>
        <dl class="arguments-list">
            ${argumentsHtml}
        </dl>
    </section>` }

    ${ !returnsHtml ? "" : `<section>
        <h2>Returns</h2>
        <ul class="returns-list">
            ${returnsHtml}
        </ul>
    </section>` }
    
    ${ArticleFooter({articleNavPrev, articleNavNext})}
  `;
};

module.exports = ReferenceArticle;

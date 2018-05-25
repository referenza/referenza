"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const Page = ({url, urlPathPrefix, feedbackUrl, logo, viewportTitle, activeProject, tocCategoriesHtml, articleHtml}) => {
  return `
    <!DOCTYPE html>
    <html lang="en-gb">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

      <title>${viewportTitle}</title>

      <link rel="stylesheet" href="${escapeHTML(urlPathPrefix)}/_common/app.css">
      <noscript>
        <link rel="stylesheet" href="${escapeHTML(urlPathPrefix)}/_common/app.noscript.css">
      </noscript>

      <script defer src="${escapeHTML(urlPathPrefix)}/_common/app.js"></script>
    </head>

    <body>
      <div id="feedback" class="no-select">
        <form id="feedback-form" method="post" action="${escapeHTML(feedbackUrl)}">
          <input type="hidden" name="page" value="${escapeHTML(url)}">

          <div>
            <a href="#" id="feedback-close">Close</a>
            <h2>Help improve this page</h2>
          </div>

          <label>
            <span class="feedback-form-section-heading">Title</span>
            <input class="feedback-form-text-input" name="title" maxlength="200" placeholder="Optional">
          </label>

          <label>
            <span class="feedback-form-section-heading">Message</span>
            <textarea class="feedback-form-text-input" name="message" rows="8" maxlength="1000" placeholder="Optional"></textarea>
          </label>

          <div>
            <span class="feedback-form-section-heading">Rating</span>
            <input name="rating" type="range" min="1" max="5" step="0.01">
          </div>

          <div id="feedback-form-keywords">
            <span class="feedback-form-section-heading">Keywords</span>
            <label>
              <input type="checkbox" name="keywords" value="Incomplete">
              <span>Incomplete</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Lacklustre">
              <span>Lacklustre</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Verbose">
              <span>Verbose</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Unclear">
              <span>Unclear</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Confusing">
              <span>Confusing</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Digressive">
              <span>Digressive</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Misleading">
              <span>Misleading</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Misplaced">
              <span>Misplaced</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Disorganised">
              <span>Disorganised</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Erroneous">
              <span>Erroneous</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Substandard">
              <span>Substandard</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Stale">
              <span>Stale</span>
            </label>
          </div>

          <button type="submit">Send feedback</button>
        </form>
      </div>

      <header id="header" class="no-select">
        <span id="header-logo">${escapeHTML(logo)}</span>
        ${activeProject}

        <div id="header-controls">
          <a href="#feedback">Feedback</a>
        </div>
      </header>

      <main id="main">
        <nav id="pane" class="no-select">
          <label id="toc-search-wrapper">
            <input id="toc-search" placeholder="Search for an article" title="Search for an article">
          </label>
          <div id="toc-categories">
            ${tocCategoriesHtml}
          </div>
        </nav>

        <div id="article-container">
          <article id="article">
            ${articleHtml}
          </article>
        </div>
      </main>
    </body>

    </html>
  `;
};

module.exports = Page;

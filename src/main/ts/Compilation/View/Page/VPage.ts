import {View} from "../View";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";
import {VPaneTocCategory} from "../Pane/VPaneTocCategory";
import {VArticle} from "../Article/VArticle";
import {VHeaderProject} from "../Header/VHeaderProject";
import {VFeedback} from "../Feedback/VFeedback";

export interface VPageProps {
  URL: string;
  urlPathPrefix: string;
  feedback: VFeedback | null;
  logo: string;
  viewportTitle: string;
  activeProject: VHeaderProject;
  tocCategories: ReadonlyArray<VPaneTocCategory>;
  article: VArticle;
}

export class VPage extends View {
  props: VPageProps;

  constructor (props: VPageProps) {
    super();
    this.props = props;
  }

  render () {
    let urlPathPrefixHTML = escapeHTML(this.props.urlPathPrefix);
    let feedbackHTML = `${this.props.feedback || ""}`;
    let logoHTML = escapeHTML(this.props.logo);
    let viewportTitleHTML = escapeHTML(this.props.viewportTitle);
    let activeProjectHTML = this.props.activeProject.render();
    let tocCategoriesHTML = this.props.tocCategories.join("");
    let articleHTML = this.props.article.render();

    return `
      <!DOCTYPE html>
      <html lang="en-gb">
  
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  
        <title>${viewportTitleHTML}</title>
  
        <link rel="stylesheet" href="${urlPathPrefixHTML}/_common/app.css">
        <noscript>
          <link rel="stylesheet" href="${urlPathPrefixHTML}/_common/app.noscript.css">
        </noscript>
  
        <script defer src="${urlPathPrefixHTML}/_common/app.js"></script>
      </head>
  
      <body>
        ${feedbackHTML}
  
        <header id="header" class="no-select">
          <span id="header-logo">${logoHTML}</span>
          ${activeProjectHTML}
  
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
              ${tocCategoriesHTML}
            </div>
          </nav>
  
          <div id="article-container">
            <article id="article">
              ${articleHTML}
            </article>
          </div>
        </main>
      </body>
  
      </html>
    `;
  }
}

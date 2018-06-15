import {View} from "../View";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";
import {VPaneTocCategory} from "../Pane/VPaneTocCategory";
import {VArticle} from "../Article/VArticle";
import {VHeaderProject} from "../Header/VHeaderProject";
import {VFeedback} from "../Feedback/VFeedback";
import {ThemePack} from "../../Configuration/ThemePack";
import {ThemePackUnitType} from "../../Configuration/ThemePackUnit";

export interface VPageProps {
  URL: string;
  prefix: string;
  feedback: VFeedback | null;
  themes: ReadonlyArray<ThemePack>;
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
    let prefixHTML = escapeHTML(this.props.prefix);
    let feedbackHTML = `${this.props.feedback || ""}`;
    let logoHTML = escapeHTML(this.props.logo);
    let viewportTitleHTML = escapeHTML(this.props.viewportTitle);
    let activeProjectHTML = this.props.activeProject.render();
    let tocCategoriesHTML = this.props.tocCategories.join("");
    let articleHTML = this.props.article.render();

    let themesHTML = "";
    for (let themePack of this.props.themes) {
      let themePackPrefixHTML = escapeHTML(themePack.prefix);

      for (let unit of themePack.units) {
        let fileNameHTML = escapeHTML(unit.fileName);
        let unitPathHTML = `${prefixHTML}/_common/${themePackPrefixHTML}/${fileNameHTML}`;

        switch (unit.type) {
        case ThemePackUnitType.SCRIPT:
          themesHTML += `<script defer src="${unitPathHTML}"></script>`;
          break;

        case ThemePackUnitType.STYLE:
          themesHTML += `<link rel="stylesheet" href="${unitPathHTML}">`;
          break;

        case ThemePackUnitType.NOSCRIPT_STYLE:
          themesHTML += `<noscript><link rel="stylesheet" href="${unitPathHTML}"></noscript>`;
          break;

        default:
          throw new Error(`INTERR Unknown theme pack unit type: ${unit.type}`);
        }
      }
    }

    return `
      <!DOCTYPE html>
      <html lang="en-gb">
  
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  
        <title>${viewportTitleHTML}</title>
  
        ${themesHTML}
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

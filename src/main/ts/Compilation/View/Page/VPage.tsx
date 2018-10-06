import {VPaneTocCategory, VPaneTocCategoryProps} from "../Pane/VPaneTocCategory";
import {VHeaderProject, VHeaderProjectProps} from "../Header/VHeaderProject";
import {VFeedback, VFeedbackProps} from "../Feedback/VFeedback";
import React from "react";
import {VArticle, VArticleProps} from "../Article/VArticle";
import {IReferenzaExtension} from "referenza-extension/dist/Extension";
import {ReferenzaExtensionUnitType} from "referenza-extension/dist/ExtensionUnit";

export interface VPageProps {
  prefix: string;
  feedback: VFeedbackProps | null;
  themes: ReadonlyArray<IReferenzaExtension>;
  logo: string;
  viewportTitle: string;
  activeProject: VHeaderProjectProps;
  tocCategories: ReadonlyArray<VPaneTocCategoryProps>;
  article: VArticleProps;
}

export const VPage = ({prefix, feedback, themes, logo, viewportTitle, activeProject, tocCategories, article}: VPageProps) => {
  let extensionTags = [];
  for (let themePack of themes) {
    for (let unit of themePack.units) {
      let unitURL;
      let unitContent;
      if ("file" in unit) {
        unitURL = `${prefix}/_common/${themePack.prefix}/${unit.file}`;
      } else if ("URL" in unit) {
        unitURL = unit.URL;
      } else if ("content" in unit) {
        unitContent = unit.content;
      } else {
        throw new Error(`Neither URL, file name, nor content provided for theme pack unit`);
      }

      switch (unit.type) {
      case ReferenzaExtensionUnitType.SCRIPT:
        extensionTags.push(unitContent ? <script>{unitContent}</script> : <script defer src={unitURL}/>);
        break;

      case ReferenzaExtensionUnitType.STYLE:
        extensionTags.push(unitContent ? <style>{unitContent}</style> : <link rel="stylesheet" href={unitURL}/>);
        break;

      case ReferenzaExtensionUnitType.NOSCRIPT_STYLE:
        extensionTags.push(<noscript>
          {unitContent ? <style>{unitContent}</style> : <link rel="stylesheet" href={unitURL}/>}
        </noscript>);
        break;

      default:
        throw new Error(`INTERR Unknown theme pack unit type: ${unit.type}`);
      }
    }
  }

  return (
    <html lang="en-gb">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>

        <title>{viewportTitle}</title>

        {extensionTags}
      </head>

      <body>
        {feedback && <VFeedback {...feedback}/>}

        <header id="header" className="no-select">
          <span id="header-logo">{logo}</span>
          <VHeaderProject {...activeProject}/>

          <div id="header-controls">
            <a href="#feedback">Feedback</a>
          </div>
        </header>

        <main id="main">
          <nav id="pane" className="no-select">
            <label id="toc-search-wrapper">
              <input id="toc-search" placeholder="Search for an article" title="Search for an article"/>
            </label>
            <div id="toc-categories">
              {tocCategories.map(c => <VPaneTocCategory {...c}/>)}
            </div>
          </nav>

          <div id="article-container">
            <article id="article">
              <VArticle {...article}/>
            </article>
          </div>
        </main>
      </body>
    </html>
  );
};

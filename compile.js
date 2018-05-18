"use strict";

const fs = require("fs-extra");
const Path = require("path");
const os = require("os");
const zcompile = require("zcompile");

const parseMarkdown = require("./compiling/Utils/parseMarkdown");
const parseTypedCodeLine = require("./compiling/Utils/parseTypedCodeLine");
const loadDocumentation = require("./compiling/Utils/loadDocumentation");
const createURLPathComponent = require("./compiling/Utils/createURLPathComponent");
const createRedirectHTML = require("./compiling/Utils/createRedirectHTML");

const StateSession = require("./compiling/State/StateSession");

const ArticleNavigator = require("./compiling/Views/ArticleNavigator");
const ContentArticle = require("./compiling/Views/ContentArticle");
const HeaderActiveProject = require("./compiling/Views/HeaderActiveProject");
const Page = require("./compiling/Views/Page");
const PaneTocCategory = require("./compiling/Views/PaneTocCategory");
const PaneTocCategoryEntry = require("./compiling/Views/PaneTocCategoryEntry");
const ReferenceArticle = require("./compiling/Views/ReferenceArticle");
const ReferenceArticleArgument = require("./compiling/Views/ReferenceArticleArgument");
const ReferenceArticleReturn = require("./compiling/Views/ReferenceArticleReturn");
const ReferenceArticleSignature = require("./compiling/Views/ReferenceArticleSignature");

const {

  ARTICLE_TYPE_CONTENT,
  ARTICLE_TYPE_REFERENCE,

} = require("./compiling/constants");

const compile = (
  {
    clean,

    sourceDir,
    intermediateDir,
    outputDir,

    statePath,

    metadataFileName,

    feedbackUrl,

    projectNames,

    urlPathPrefix,
  }
) => {
  // Ensure clean intermediate directory
  // WARNING: Don't erase output directory if not clean, otherwise state is lost
  if (intermediateDir) {
    fs.removeSync(intermediateDir);
  } else {
    intermediateDir = fs.mkdtempSync(Path.join(os.tmpdir(), "referenza-intermediate-"));
  }
  if (clean) {
    console.warn(`====================== CLEAN COMPILE ======================`);
    fs.writeFileSync(statePath, "{}");
    fs.removeSync(outputDir);
  }

  // Check $sourceDir before StateSession is started and a lock file is created
  if (!sourceDir || !fs.lstatSync(sourceDir).isDirectory()) {
    throw new TypeError(`Invalid source directory "${sourceDir}"`);
  }

  if (urlPathPrefix) {
    if (!/^\//.test(urlPathPrefix)) {
      throw new TypeError("Invalid URL path prefix");
    }
  } else {
    urlPathPrefix = "/";
  }

  if (!metadataFileName) {
    metadataFileName = "__metadata__.js";
  }

  let generatedHtmlFiles = [];
  let redirects = [];

  for (let projectName of projectNames) {
    let stateSession = new StateSession({statePath, metadataFileName});

    try {
      let versions = loadDocumentation({sourceDir, projectName, stateSession, metadataFileName});
      let versionsSorted = Array.from(versions).sort((a, b) => {
        if (a.major < b.major) {
          return -1;
        }
        if (a.major === b.major) {
          if (a.minor < b.minor) {
            return -1;
          }
          if (a.minor === b.minor) {
            return 0;
          }
        }
        return 1;
      });
      let latestVersionDoc = versionsSorted[versionsSorted.length - 1];

      // Redirect from "/project" to "/project/latestMajor/latestMinor"
      redirects.push({
        from: "/" + createURLPathComponent(projectName),
        to: latestVersionDoc.urlDirPath,
      });

      for (let doc of versions) {
        let activeProject = HeaderActiveProject({
          name: doc.name,
          otherProjects: projectNames.filter(pn => doc.name !== pn).map(pn => ({
            name: pn,
            url: urlPathPrefix + "/" + createURLPathComponent(pn) + "/",
          })),
          activeVersion: `${latestVersionDoc.major}.${latestVersionDoc.minor}`,
          otherVersions: versionsSorted.filter(v => !(v.major === doc.major && v.minor === doc.minor)).map(v => ({
            url: v.urlDirPath,
            name: `${v.major}.${v.minor}`,
          })),
        });

        // Called when a link in a documentation is an internal one
        let internalLinkCallback = id => {
          for (let article of doc.articles) {
            if (article.name === id) {
              return urlPathPrefix + article.urlDirPath;
            }
          }

          throw new ReferenceError(`Non-existent internal link reference "${id}"`);
        };

        let landingArticle = doc.getLandingArticle();

        // Add redirect from "/project/maj/min" to "/project/maj/min/firstCategory/firstCategoryArticle"
        redirects.push({
          from: doc.urlDirPath,
          to: landingArticle.urlDirPath,
        });

        for (let articleIdx = 0; articleIdx < doc.articles.length; articleIdx++) {
          let prevArticle = articleIdx == 0 ? null : doc.articles[articleIdx - 1];
          let article = doc.articles[articleIdx];
          let nextArticle = articleIdx == doc.articles.length - 1 ? null : doc.articles[articleIdx + 1];

          if (article.stateChanged) {
            // Regenerate the table of contents for every article, as isActive changes every time
            let tocCategoriesHtml = "";

            for (let tocCategoryName of doc.orderOfCategories) {
              let tocCategoryEntriesHtml = "";

              for (let tocEntry of doc.articlesByCategory.get(tocCategoryName)) {
                let tocEntryName = tocEntry.name;
                let tocEntryDescription = tocEntry.description || "";
                let tocArticlePathRelToUrlPrefix = tocEntry.urlDirPath;

                tocCategoryEntriesHtml += PaneTocCategoryEntry({
                  url: urlPathPrefix + tocArticlePathRelToUrlPrefix,
                  name: tocEntryName,
                  description: tocEntryDescription,
                  isActive: tocCategoryName == article.category && article.name == tocEntryName,
                });
              }

              tocCategoriesHtml += PaneTocCategory(tocCategoryName,
                tocCategoryName == article.category, tocCategoryEntriesHtml);
            }

            let articleHtml;
            let articleNavPrev = prevArticle ? ArticleNavigator({
              dir: ArticleNavigator.DIR_PREV,
              href: urlPathPrefix + prevArticle.urlDirPath,
              name: prevArticle.name,
            }) : "";
            let articleNavNext = nextArticle ? ArticleNavigator({
              dir: ArticleNavigator.DIR_NEXT,
              href: urlPathPrefix + nextArticle.urlDirPath,
              name: nextArticle.name,
            }) : "";

            if (article.type == ARTICLE_TYPE_REFERENCE) {
              let signaturesHtml = article.signatures
                .map(s => ReferenceArticleSignature(parseTypedCodeLine(s.definition)))
                .join("");

              let argumentsHtml = article.parameters
                .map(p => ReferenceArticleArgument(p.name, parseMarkdown(p.definition, true, internalLinkCallback)))
                .join("");

              let returnsHtml = article.returns
                .map(r => ReferenceArticleReturn(parseMarkdown(r.definition, true, internalLinkCallback)))
                .join("");

              articleHtml = ReferenceArticle({
                category: article.category,
                name: article.name,
                description: article.description,
                signaturesHtml: signaturesHtml,
                argumentsHtml: argumentsHtml,
                returnsHtml: returnsHtml,
                articleNavPrev, articleNavNext
              });

            } else if (article.type == ARTICLE_TYPE_CONTENT) {
              let contentHtml = parseMarkdown(article.content, false, internalLinkCallback);

              articleHtml = ContentArticle({
                category: article.category,
                name: article.name,
                contentHtml: contentHtml,
                articleNavPrev, articleNavNext
              });

            } else {
              throw new Error(`Unrecognised article type "${article.type}"`);
            }

            let pageHtml = Page({
              url: urlPathPrefix + article.urlDirPath,
              feedbackUrl: feedbackUrl,
              viewportTitle: `${article.name} | ${projectName} Documentation`,
              activeProject: activeProject,
              tocCategoriesHtml: tocCategoriesHtml,
              articleHtml: articleHtml,
            });

            let articleUrlFilePath = article.urlDirPath + "index.html";

            fs.ensureDirSync(intermediateDir + article.urlDirPath);
            fs.writeFileSync(intermediateDir + articleUrlFilePath, pageHtml);
            generatedHtmlFiles.push(articleUrlFilePath);
          }
        }
      }

      stateSession.end(true);

    } catch (e) {
      // This is not the same as `finally`
      // If `finally`, `.end` will be called twice
      stateSession.end(false);
      throw e;
    }
  }

  zcompile({
    source: __dirname + "/src",
    destination: outputDir,

    minifySelectors: false,
    minifyHTML: {
      minifyInlineCSS: true,
      minifyInlineJS: true,
    },
    files: [
      "_common/app.css",
      "_common/app.noscript.css",
      "_common/app.js",
    ],
  });

  if (generatedHtmlFiles.length) {
    zcompile({
      source: intermediateDir,
      destination: outputDir,

      minifySelectors: false,
      minifyHTML: {
        minifyInlineCSS: true,
        minifyInlineJS: true,
      },
      files: generatedHtmlFiles,
    });
  }

  for (let redirect of redirects) {
    let {from, to} = redirect;

    let from_noslash = from.replace(/\/+$/, "");
    let from_slash = from_noslash + "/";
    let to_noslash = to.replace(/\/+$/, "");
    let to_slash = to_noslash + "/";

    fs.outputFileSync(outputDir + from_slash + "index.html", createRedirectHTML(urlPathPrefix + to_slash));
  }

  fs.removeSync(intermediateDir);
};

module.exports = compile;

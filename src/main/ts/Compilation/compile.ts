import {CompilerSettings} from "./Configuration/CompilerSettings";
import * as fs from "fs-extra";
import {createTempDir} from "../Util/FS/createTempDir";
import {isDirectory} from "../Util/FS/isDirectory";
import {normaliseDirPath} from "../Util/FS/normaliseDirPath";
import {createURLPathComponent} from "../Util/URL/createURLPathComponent";
import {createRedirectHTML} from "../Util/URL/createRedirectHTML";
import {MArticleType} from "./Model/Article/MArticle";
import {VArticleNavigator, VArticleNavigatorDirection} from "./View/Article/VArticleNavigator";
import {VReferenceArticle} from "./View/Article/ReferenceArticle/VReferenceArticle";
import {StateSession} from "./State/StateSession";
import {loadProject} from "./Enumeration/0/loadProject";
import {VHeaderProject} from "./View/Header/VHeaderProject";
import {VHeaderProjectMenuEntry} from "./View/Header/VHeaderProjectMenuEntry";
import {parseTypedCodeLine} from "./Parsing/parseTypedCodeLine";
import {parseMarkdown} from "./Parsing/parseMarkdown";
import {VReferenceArticleSignature} from "./View/Article/ReferenceArticle/VReferenceArticleSignature";
import {VReferenceArticleArgument} from "./View/Article/ReferenceArticle/VReferenceArticleArgument";
import {VReferenceArticleReturn} from "./View/Article/ReferenceArticle/VReferenceArticleReturn";
import {VPage} from "./View/Page/VPage";
import {VContentArticle} from "./View/Article/ContentArticle/VContentArticle";
import {VPaneTocCategory} from "./View/Pane/VPaneTocCategory";
import {VPaneTocCategoryEntry} from "./View/Pane/VPaneTocCategoryEntry";
import {MReferenceArticle} from "./Model/Article/ReferenceArticle/MReferenceArticle";
import {MContentArticle} from "./Model/Article/ContentArticle/MContentArticle";
import {VArticleHeader} from "./View/Article/VArticleHeader";
import {VArticleFooter} from "./View/Article/VArticleFooter";
import {VFormFeedback} from "./View/Feedback/VFormFeedback";
import {createBlankStateFileContents} from "./State/StateFile";
import {ThemePackUnitType} from "./Configuration/ThemePackUnit";

const zcompile = require("zcompile");

export async function compile (
  {
    clean = false,

    sourceDir,
    intermediateDir = null,
    outputDir,

    statePath,

    metadataFileName = "__metadata__.js",

    themePacks = [
      {
        prefix: "common",
        sourceDir: __dirname + "/../../resources/theme/common",
        units: [
          {
            fileName: "app.js",
            type: ThemePackUnitType.SCRIPT,
          },
          {
            fileName: "app.css",
            type: ThemePackUnitType.STYLE,
          },
          {
            fileName: "app.noscript.css",
            type: ThemePackUnitType.NOSCRIPT_STYLE,
          },
        ],
      },
      {
        prefix: "solarised",
        sourceDir: __dirname + "/../../resources/theme/solarised",
        units: [
          {
            fileName: "app.css",
            type: ThemePackUnitType.STYLE,
          },
          {
            fileName: "app.noscript.css",
            type: ThemePackUnitType.NOSCRIPT_STYLE,
          },
        ],
      },
    ],

    logo = "Docs",
    feedback = null,

    projects,

    prefix = "",
  }: CompilerSettings
) {
  // Ensure clean intermediate directory
  // WARNING: Don't erase output directory if not clean, otherwise state is lost
  if (intermediateDir) {
    fs.removeSync(intermediateDir);
  } else {
    intermediateDir = createTempDir("referenza-intermediate-");
  }

  if (clean) {
    fs.writeFileSync(statePath, createBlankStateFileContents());
    fs.removeSync(outputDir);
  }

  // Check $sourceDir before StateSession is started and a lock file is created
  if (!isDirectory(sourceDir)) {
    throw new TypeError(`Invalid source directory "${sourceDir}"`);
  }

  // Normalise directory paths and ensure trailing slash
  [sourceDir, intermediateDir, outputDir] = [sourceDir, intermediateDir, outputDir].map(normaliseDirPath);

  if (prefix != "" && !/^\//.test(prefix)) {
    throw new TypeError("Invalid URL path prefix");
  }

  let generatedHtmlFiles = [];
  let redirects = [];

  for (let projectName of projects) {
    let stateSession = new StateSession(statePath);

    try {
      let versions = await loadProject({sourceDir, projectName, stateSession, metadataFileName});
      let latestVersionDoc = versions[versions.length - 1];

      // Redirect from "/project" to "/project/latestVersion/"
      redirects.push({
        from: "/" + createURLPathComponent(projectName),
        to: latestVersionDoc.createURLPath(),
      });

      for (let doc of versions) {
        let activeProject = new VHeaderProject({
          name: doc.name,
          otherProjects: projects.filter(pn => doc.name != pn).map(pn => new VHeaderProjectMenuEntry({
            URL: prefix + "/" + createURLPathComponent(pn) + "/",
            name: pn,
          })),
          activeVersion: `${latestVersionDoc.version}`,
          otherVersions: versions.filter(v => v.version !== doc.version).map(v => new VHeaderProjectMenuEntry({
            URL: v.createURLPath(),
            name: `${v.version}`,
          })),
        });

        // Called when a link in a documentation is an internal one
        let internalLinkCallback = (id: string) => {
          for (let articles of doc.articles.values()) {
            for (let article of articles) {
              if (article.name === id) {
                return prefix + article.createURLPath(doc);
              }
            }
          }

          throw new ReferenceError(`Non-existent internal link reference "${id}"`);
        };

        let landingArticle = doc.getLandingArticle();

        // Add redirect from "/project/version/" to "/project/version/firstCategory/firstCategoryArticle/"
        redirects.push({
          from: doc.createURLPath(),
          to: landingArticle.createURLPath(doc),
        });

        let flatArticlesList = Array.from(doc.articles.values()).reduce((f, a) => f.concat(a), []);

        for (let articleIdx = 0; articleIdx < flatArticlesList.length; articleIdx++) {
          let prevArticle = articleIdx == 0 ? null : flatArticlesList[articleIdx - 1];
          let article = flatArticlesList[articleIdx];
          let nextArticle = articleIdx == flatArticlesList.length - 1 ? null : flatArticlesList[articleIdx + 1];

          if (article.stateChanged) {
            // Regenerate the table of contents for every article, as isActive changes every time
            let tocCategoriesHtml = [];

            for (let tocCategoryName of doc.articles.keys()) {
              let tocCategoryEntries = [];

              for (let tocEntry of doc.articles.get(tocCategoryName)!) {
                let tocEntryName = tocEntry.name;
                let tocEntryDescription = (tocEntry as MReferenceArticle).description || "";
                let tocArticlePathRelToUrlPrefix = tocEntry.createURLPath(doc);

                tocCategoryEntries.push(new VPaneTocCategoryEntry({
                  URL: prefix + tocArticlePathRelToUrlPrefix,
                  name: tocEntryName,
                  description: tocEntryDescription,
                  isActive: tocCategoryName == article.category && article.name == tocEntryName,
                }));
              }

              tocCategoriesHtml.push(new VPaneTocCategory({
                name: tocCategoryName,
                isActive: tocCategoryName == article.category,
                entries: tocCategoryEntries,
              }));
            }

            let articleHtml;
            let articleNavPrev = prevArticle ? new VArticleNavigator({
              dir: VArticleNavigatorDirection.PREV,
              href: prefix + prevArticle.createURLPath(doc),
              name: prevArticle.name,
            }) : null;
            let articleNavNext = nextArticle ? new VArticleNavigator({
              dir: VArticleNavigatorDirection.NEXT,
              href: prefix + nextArticle.createURLPath(doc),
              name: nextArticle.name,
            }) : null;

            let vArticleHeader = new VArticleHeader({
              category: article.category,
              name: article.name,
            });
            let vArticleFooter = new VArticleFooter({
              navPrev: articleNavPrev,
              navNext: articleNavNext,
            });

            switch (article.type) {
            case MArticleType.ARTICLE_TYPE_REFERENCE:
              article = article as MReferenceArticle;
              let loadedSignatures = (article as MReferenceArticle).signatures
                .map(s => new VReferenceArticleSignature({
                  code: parseTypedCodeLine(s.definition),
                }));

              let loadedArguments = await Promise.all((article as MReferenceArticle).parameters
                .map(p => parseMarkdown(p.definition, true, internalLinkCallback)
                  .then(md => new VReferenceArticleArgument({
                    name: p.name,
                    description: md,
                  }))));

              let loadedReturns = await Promise.all((article as MReferenceArticle).returns
                .map(r => parseMarkdown(r.definition, true, internalLinkCallback)
                  .then(md => new VReferenceArticleReturn({
                    value: md,
                  }))));

              articleHtml = new VReferenceArticle({
                header: vArticleHeader,
                footer: vArticleFooter,
                description: (article as MReferenceArticle).description,
                signatures: loadedSignatures,
                parameters: loadedArguments,
                returns: loadedReturns,
              });

              break;

            case MArticleType.ARTICLE_TYPE_CONTENT:
              let contentHtml = await parseMarkdown((article as MContentArticle).content!, false, internalLinkCallback);

              articleHtml = new VContentArticle({
                header: vArticleHeader,
                footer: vArticleFooter,
                content: {HTML: contentHtml},
              });

              break;

            default:
              throw new Error(`INTERR Unknown article type`);
            }

            let url = prefix + article.createURLPath(doc);

            let vFeedback = null;
            if (feedback) {
              switch (feedback.type) {
              case FeedbackType.FORM:
                vFeedback = new VFormFeedback({
                  pageID: url,
                  endpointURL: (feedback as FormFeedbackSettings).endpointURL,
                });
                break;

              case FeedbackType.GITHUB:
                vFeedback = new VGitHubFeedback({
                  repoOwner: (feedback as GitHubFeedbackSettings).repoOwner,
                  repoName: (feedback as GitHubFeedbackSettings).repoName,
                });
                break;
              }
            }

            let pageHtml = new VPage({
              URL: url,
              prefix: prefix,
              feedback: vFeedback,
              themes: themePacks,
              logo: logo,
              viewportTitle: `${article.name} | ${projectName} Documentation`,
              activeProject: activeProject,
              tocCategories: tocCategoriesHtml,
              article: articleHtml,
            });

            let articleUrlFilePath = article.createURLPath(doc) + "index.html";

            fs.ensureDirSync(intermediateDir + article.createURLPath(doc));
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

  for (let themePack of themePacks) {
    zcompile({
      source: themePack.sourceDir,
      destination: outputDir + "/_common/" + themePack.prefix,

      minifySelectors: false,
      minifyHTML: {
        minifyInlineCSS: true,
        minifyInlineJS: true,
      },
      files: themePack.units.map(u => u.fileName),
    });
  }

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

    fs.outputFileSync(outputDir + from_slash + "index.html", createRedirectHTML(prefix + to_slash));
  }

  fs.removeSync(intermediateDir);
}

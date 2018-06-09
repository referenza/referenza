"use strict";

const fs = require("fs-extra");
const sortNumerically = require("../../Util/Comparator/compareNatively");
const sortOrderPrefixedFilenames = require("../../Util/Comparator/compareOrderPrefixedFilenames");
const nullableStat = require("../../Util/FS/nullableStat");
const nullableReaddir = require("../../Util/FS/nullableReaddir");

const ContentArticleState = require("../State/ContentArticleState");
const ReferenceArticleState = require("../State/ReferenceArticleState");

const ReferenceArticleSignature = require("../Model/ReferenceArticleSignature");
const ReferenceArticleParameter = require("../Model/ReferenceArticleParameter");
const ReferenceArticleReturn = require("../Model/ReferenceArticleReturn");
const ReferenceArticle = require("../Model/ReferenceArticle");
const ContentArticle = require("../Model/ContentArticle");
const Documentation = require("../Model/Documentation");

const loadDocumentation = ({sourceDir, projectName, stateSession, metadataFileName}) => {
  let documentationSourceDir = sourceDir + projectName + "/";
  let documentationCommonSourceDir = documentationSourceDir + "_common/";

  let versions = new Set();

  let majorNumbers = fs.readdirSync(documentationSourceDir)
    .map(v => Number.parseInt(v, 10))
    .filter(v => !Number.isNaN(v))
    .sort(sortNumerically);

  majorNumbers.forEach(majorNumber => {
    let majorSourceDir = documentationSourceDir + majorNumber + "/";
    let majorCommonSourceDir = majorSourceDir + "_common/";

    let minorVersions = fs.readdirSync(majorSourceDir).map(v => Number.parseInt(v, 10)).sort(sortNumerically);

    minorVersions.forEach(minorNumber => {
      let minorSourceDir = majorSourceDir + minorNumber + "/";

      let doc = new Documentation(projectName, majorNumber, minorNumber);
      versions.add(doc);

      let metadata = require(minorSourceDir + metadataFileName);
      let metadataStateChanged = stateSession.updateMetadataState(projectName, majorNumber, minorNumber, metadata);

      let orderOfCategories = metadata.categories.map(c => c.name);
      doc.setCategories(orderOfCategories);

      let substituteVariables = content => {
        return content
          .replace(/<VAR\[([A-Z0-9\-_]+)]>/g, (_, variableName) => {
            switch (variableName) {
            case "VERSION-MAJOR":
              return majorNumber;

            case "VERSION-MINOR":
              return minorNumber;

            default:
              throw new ReferenceError(`Unrecognised variable "${variableName}"`);
            }
          });
      };

      let duplicateArticleNames = new Set();

      metadata.categories.forEach(categoryMetadata => {
        let categoryName = categoryMetadata.name;
        let categorySourceDir = minorSourceDir + categoryName + "/";

        let categoryEntriesMetadata = categoryMetadata.entries;

        let extraneousFilesInCategorySourceDir = new Set(nullableReaddir(categorySourceDir));
        let extraneousEntriesInCategoryState = stateSession.categoryEntryNames(projectName, majorNumber, minorNumber, categoryName);

        categoryEntriesMetadata.forEach(entryName => {
          if (!duplicateArticleNames.has(entryName)) {
            duplicateArticleNames.add(entryName);
          } else {
            throw new Error(`Duplicate article name "${entryName}"`);
          }

          let entryFSName = entryName + ".md";
          let originalEntryFSPath = categorySourceDir + entryFSName;
          let entryFSPath = originalEntryFSPath;
          let stats;

          extraneousFilesInCategorySourceDir.delete(entryFSName);
          extraneousEntriesInCategoryState.delete(entryName);

          stats = nullableStat(originalEntryFSPath);
          if (!stats) {
            // Look in common directory for major version
            entryFSPath = `${majorCommonSourceDir}${categoryName}/${entryFSName}`;
            stats = nullableStat(entryFSPath);
          }
          if (!stats) {
            // Look in common directory for documentation
            entryFSPath = `${documentationCommonSourceDir}${categoryName}/${entryFSName}`;
            stats = nullableStat(entryFSPath);
          }
          if (!stats) {
            entryFSPath = null;
            throw new ReferenceError(`${originalEntryFSPath} not found`);
          }

          let articleLastState = stateSession.getState(projectName, majorNumber, minorNumber, categoryName, entryName);
          let articleCurrentState;

          let article;

          if (stats.isDirectory()) {
            // If it's a directory, then it's a reference article
            let entrySourceDir = entryFSPath + "/";

            article = new ReferenceArticle(doc, categoryName, entryName);

            // Check state first before getting contents (it may not have changed)

            let articleDescriptionPath = entrySourceDir + "description.txt";
            // Descriptions always need to be loaded, as other articles use them for TOC entry titles
            // NOTE: Descriptions must exist
            article.description = fs.readFileSync(articleDescriptionPath, "utf8").trim();
            let articleDescriptionMtime = fs.lstatSync(articleDescriptionPath).mtimeMs;

            let articleSignaturesPath = entrySourceDir + "signatures/";
            // WARNING: This will not work if 2 signatures are swapped and both have an identical mtime
            let articleSignatureMtimes = (nullableReaddir(articleSignaturesPath) || [])
              .sort(sortOrderPrefixedFilenames)
              .map(fn => fs.lstatSync(articleSignaturesPath + fn).mtimeMs);

            // WARNING: This will not work if 2 arguments are swapped and both have an identical name and mtime or the names are kept
            let articleArgumentsPath = entrySourceDir + "arguments/";
            let _articleArguments = (nullableReaddir(articleArgumentsPath) || [])
              .sort(sortOrderPrefixedFilenames);
            let articleArgumentNames = _articleArguments
              .map(fn => fn.slice(fn.indexOf(".") + 1, fn.lastIndexOf(".")));
            let articleArgumentMtimes = _articleArguments
              .map(fn => fs.lstatSync(articleArgumentsPath + fn).mtimeMs);

            // WARNING: This will not work if 2 returns are swapped and both have an identical mtime
            let articleReturnsPath = entrySourceDir + "returns/";
            let articleReturnMtimes = (nullableReaddir(articleReturnsPath) || [])
              .sort(sortOrderPrefixedFilenames)
              .map(fn => fs.lstatSync(articleReturnsPath + fn).mtimeMs);

            articleCurrentState = new ReferenceArticleState({
              descriptionMtime: articleDescriptionMtime,
              signatureMtimes: articleSignatureMtimes,
              argumentNames: articleArgumentNames,
              argumentMtimes: articleArgumentMtimes,
              returnMtimes: articleReturnMtimes,
            });

            if (metadataStateChanged || !articleLastState || articleLastState.isDiffTo(articleCurrentState)) {
              // Article state has changed, so need to load data and recompile
              article.stateChanged = true;

              if (articleSignatureMtimes.length) {
                fs.readdirSync(articleSignaturesPath)
                  .sort(sortOrderPrefixedFilenames)
                  .forEach(f => {
                    let code = fs.readFileSync(articleSignaturesPath + f, "utf8");

                    article.addSignature(new ReferenceArticleSignature(code));
                  });
              }

              if (articleArgumentMtimes.length) {
                fs.readdirSync(articleArgumentsPath)
                  .sort(sortOrderPrefixedFilenames)
                  .forEach(f => {
                    let name = f.slice(f.indexOf(".") + 1, f.lastIndexOf("."));
                    let markdown = fs.readFileSync(articleArgumentsPath + f, "utf8");

                    article.addParameter(new ReferenceArticleParameter(name, markdown));
                  });
              }

              if (articleReturnMtimes.length) {
                fs.readdirSync(articleReturnsPath)
                  .sort(sortOrderPrefixedFilenames)
                  .forEach(f => {
                    let markdown = fs.readFileSync(articleReturnsPath + f, "utf8");

                    article.addReturn(new ReferenceArticleReturn(markdown));
                  });
              }

            }

          } else {
            // Otherwise, it's a content article
            article = new ContentArticle(doc, categoryName, entryName);

            // Check state first before getting contents (it may not have changed)

            // TODO: Find edge cases where this fails
            let articleMtime = stats.mtimeMs;

            articleCurrentState = new ContentArticleState({
              mtime: articleMtime,
            });

            if (metadataStateChanged || !articleLastState || articleLastState.isDiffTo(articleCurrentState)) {
              // Article state has changed, so need to load data and recompile
              article.stateChanged = true;

              article.content = substituteVariables(fs.readFileSync(entryFSPath, "utf8"));
            }

          }

          if (article.stateChanged) {
            stateSession.setState(projectName, majorNumber, minorNumber, categoryName, entryName, articleCurrentState);
          }

          doc.addArticle(article);
        });

        if (extraneousFilesInCategorySourceDir.size > 0) {
          throw new Error(`Extraneous files in "${projectName}/${majorNumber}/${minorNumber}/${categoryName}": ${Array.from(extraneousFilesInCategorySourceDir)
            .join(", ")}`);
        }

        extraneousEntriesInCategoryState.forEach(entry => {
          stateSession.deleteState(projectName, majorNumber, minorNumber, categoryName, entry);
        });
      });
    });
  });

  return versions;
};

module.exports = loadDocumentation;

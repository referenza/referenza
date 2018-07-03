import {MReferenceArticle} from "../../Model/Article/ReferenceArticle/MReferenceArticle";
import * as fs from "fs";
import {MReferenceArticleReturn} from "../../Model/Article/ReferenceArticle/MReferenceArticleReturn";
import {nullableReaddir} from "../../../Util/FS/nullableReaddir";
import {ReferenceArticleState} from "../../State/ArticleState/ReferenceArticleState";
import {compareOrderPrefixedFilenames} from "../../../Util/Comparator/compareOrderPrefixedFilenames";
import {MReferenceArticleSignature} from "../../Model/Article/ReferenceArticle/MReferenceArticleSignature";
import {MReferenceArticleParameter} from "../../Model/Article/ReferenceArticle/MReferenceArticleParameter";
import {loadSpecificArticleArgs, loadSpecificArticleReturn} from "./loadArticle";
import {ArticleStateType, equalArticleStates} from "../../State/ArticleState/ArticleState";

export function loadReferenceArticle (
  {
    name,
    category,
    path,
    lastState,
  }: loadSpecificArticleArgs
): loadSpecificArticleReturn {
  // Check state first before getting contents (it may not have changed)

  let articleDescriptionPath = path + "/description.txt";
  // Descriptions always need to be loaded, as other articles use them for TOC entry titles
  // NOTE: Descriptions must exist
  let articleDescription = fs.readFileSync(articleDescriptionPath, "utf8").trim();
  let articleDescriptionMtime = fs.lstatSync(articleDescriptionPath).mtimeMs;

  let article = new MReferenceArticle(name, category, articleDescription);

  let articleSignaturesPath = path + "/signatures/";
  // TODO WARNING: This will not work if 2 signatures are swapped and both have an identical mtime
  let articleSignatureMtimes = (nullableReaddir(articleSignaturesPath) || [])
    .sort(compareOrderPrefixedFilenames)
    .map(fn => fs.lstatSync(articleSignaturesPath + fn).mtimeMs);

  // TODO WARNING: This will not work if 2 arguments are swapped and both have an identical name and mtime or the names are kept
  let articleArgumentsPath = path + "/arguments/";
  let articleArguments = (nullableReaddir(articleArgumentsPath) || []).sort(compareOrderPrefixedFilenames);
  let articleArgumentNames = articleArguments.map(fn => fn.slice(fn.indexOf(".") + 1, fn.lastIndexOf(".")));
  let articleArgumentMtimes = articleArguments.map(fn => fs.lstatSync(articleArgumentsPath + fn).mtimeMs);

  // TODO WARNING: This will not work if 2 returns are swapped and both have an identical mtime
  let articleReturnsPath = path + "/returns/";
  let articleReturnMtimes = (nullableReaddir(articleReturnsPath) || [])
    .sort(compareOrderPrefixedFilenames)
    .map(fn => fs.lstatSync(articleReturnsPath + fn).mtimeMs);

  let articleCurrentState: ReferenceArticleState = {
    objtype: ArticleStateType.REFERENCE_ARTICLE_STATE,
    descriptionMtime: articleDescriptionMtime,
    signatureMtimes: articleSignatureMtimes,
    argumentNames: articleArgumentNames,
    argumentMtimes: articleArgumentMtimes,
    returnMtimes: articleReturnMtimes
  };

  // TODO Move metadata state changed to compiler
  if (!equalArticleStates(lastState, articleCurrentState)) {
    // Article state has changed, so need to load data to recompile later
    article.stateChanged = true;

    if (articleSignatureMtimes.length) {
      fs.readdirSync(articleSignaturesPath)
        .sort(compareOrderPrefixedFilenames)
        .forEach(f => {
          let code = fs.readFileSync(articleSignaturesPath + f, "utf8");

          article.addSignature(new MReferenceArticleSignature(code));
        });
    }

    if (articleArgumentMtimes.length) {
      fs.readdirSync(articleArgumentsPath)
        .sort(compareOrderPrefixedFilenames)
        .forEach(f => {
          let name = f.slice(f.indexOf(".") + 1, f.lastIndexOf("."));
          let markdown = fs.readFileSync(articleArgumentsPath + f, "utf8");

          article.addParameter(new MReferenceArticleParameter(name, markdown));
        });
    }

    if (articleReturnMtimes.length) {
      fs.readdirSync(articleReturnsPath)
        .sort(compareOrderPrefixedFilenames)
        .forEach(f => {
          let markdown = fs.readFileSync(articleReturnsPath + f, "utf8");

          article.addReturn(new MReferenceArticleReturn(markdown));
        });
    }
  }

  return {
    model: article,
    state: articleCurrentState,
  };
}

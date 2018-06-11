import {ReferenceArticle} from "../Model/ReferenceArticle";
import * as fs from "fs";
import {ReferenceArticleReturn} from "../Model/ReferenceArticleReturn";
import {nullableReaddir} from "../../Util/FS/nullableReaddir";
import {ReferenceArticleState} from "../State/ReferenceArticleState";
import {compareOrderPrefixedFilenames} from "../../Util/Comparator/compareOrderPrefixedFilenames";
import {ReferenceArticleSignature} from "../Model/ReferenceArticleSignature";
import {ReferenceArticleParameter} from "../Model/ReferenceArticleParameter";
import {loadSpecificArticleArgs, loadSpecificArticleReturn} from "./loadArticle";

export function loadReferenceArticle (
  {
    path,
    stats,
    lastState,
  }: loadSpecificArticleArgs
): loadSpecificArticleReturn {
  let article = new ReferenceArticle();

  // Check state first before getting contents (it may not have changed)

  let articleDescriptionPath = path + "description.txt";
  // Descriptions always need to be loaded, as other articles use them for TOC entry titles
  // NOTE: Descriptions must exist
  article.description = fs.readFileSync(articleDescriptionPath, "utf8").trim();
  let articleDescriptionMtime = fs.lstatSync(articleDescriptionPath).mtimeMs;

  let articleSignaturesPath = path + "signatures/";
  // TODO WARNING: This will not work if 2 signatures are swapped and both have an identical mtime
  let articleSignatureMtimes = (nullableReaddir(articleSignaturesPath) || [])
    .sort(compareOrderPrefixedFilenames)
    .map(fn => fs.lstatSync(articleSignaturesPath + fn).mtimeMs);

  // TODO WARNING: This will not work if 2 arguments are swapped and both have an identical name and mtime or the names are kept
  let articleArgumentsPath = path + "arguments/";
  let articleArguments = (nullableReaddir(articleArgumentsPath) || []).sort(compareOrderPrefixedFilenames);
  let articleArgumentNames = articleArguments.map(fn => fn.slice(fn.indexOf(".") + 1, fn.lastIndexOf(".")));
  let articleArgumentMtimes = articleArguments.map(fn => fs.lstatSync(articleArgumentsPath + fn).mtimeMs);

  // TODO WARNING: This will not work if 2 returns are swapped and both have an identical mtime
  let articleReturnsPath = path + "returns/";
  let articleReturnMtimes = (nullableReaddir(articleReturnsPath) || [])
    .sort(compareOrderPrefixedFilenames)
    .map(fn => fs.lstatSync(articleReturnsPath + fn).mtimeMs);

  let articleCurrentState = new ReferenceArticleState(
    articleDescriptionMtime,
    articleSignatureMtimes,
    articleArgumentNames,
    articleArgumentMtimes,
    articleReturnMtimes
  );

  // TODO Move metadata state changed to compiler
  if (lastState || lastState!.isDiffTo(articleCurrentState)) {
    // Article state has changed, so need to load data to recompile later
    article.stateChanged = true;

    if (articleSignatureMtimes.length) {
      fs.readdirSync(articleSignaturesPath)
        .sort(compareOrderPrefixedFilenames)
        .forEach(f => {
          let code = fs.readFileSync(articleSignaturesPath + f, "utf8");

          article.addSignature(new ReferenceArticleSignature(code));
        });
    }

    if (articleArgumentMtimes.length) {
      fs.readdirSync(articleArgumentsPath)
        .sort(compareOrderPrefixedFilenames)
        .forEach(f => {
          let name = f.slice(f.indexOf(".") + 1, f.lastIndexOf("."));
          let markdown = fs.readFileSync(articleArgumentsPath + f, "utf8");

          article.addParameter(new ReferenceArticleParameter(name, markdown));
        });
    }

    if (articleReturnMtimes.length) {
      fs.readdirSync(articleReturnsPath)
        .sort(compareOrderPrefixedFilenames)
        .forEach(f => {
          let markdown = fs.readFileSync(articleReturnsPath + f, "utf8");

          article.addReturn(new ReferenceArticleReturn(markdown));
        });
    }
  }

  return {
    model: article,
    state: articleCurrentState,
  };
}

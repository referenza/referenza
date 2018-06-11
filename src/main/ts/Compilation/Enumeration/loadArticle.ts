import {loadContentArticle} from "./loadContentArticle";
import {loadReferenceArticle} from "./loadReferenceArticle";
import {nullableStat} from "../../Util/FS/nullableStat";
import {StateSession} from "../State/StateSession";
import {Article} from "../Model/Article";
import * as fs from "fs";
import {ArticleState} from "../State/ArticleState";

export interface loadSpecificArticleArgs {
  path: string;
  stats: fs.Stats;
  lastState: ArticleState | null;
}

export interface loadSpecificArticleReturn {
  state: ArticleState;
  model: Article;
}

export interface loadArticleArgs {
  stateSession: StateSession;
  projectName: string;
  versionName: string;
  categorySourceDir: string;
  categoryName: string;
  entryName: string;
}

export interface loadArticleReturn {
  model: Article;
  fileName: string;
}

export async function loadArticle (
  {
    stateSession,
    projectName,
    categorySourceDir,
    versionName,
    categoryName,
    entryName,
  }: loadArticleArgs
): loadArticleReturn {
  // Article may be content (`entryName.md` file) or reference (`entryName/` folder)
  let contentEntryFileName = entryName + ".md";
  let contentEntryFilePath = categorySourceDir + contentEntryFileName;
  let contentStats;

  let referenceEntryFileName = entryName;
  let referenceEntryFilePath = categorySourceDir + referenceEntryFileName;
  let referenceStats;

  contentStats = nullableStat(contentEntryFilePath);
  referenceStats = nullableStat(referenceEntryFilePath);

  if (
    !(!referenceStats ^ !contentStats) ||
    referenceStats && !referenceStats.isDirectory() ||
    contentStats && !contentStats.isFile()
  ) {
    throw new ReferenceError(`${categorySourceDir}/${entryName} not found or conflicting`);
  }

  let lastState = stateSession.getArticleState({
    project: projectName,
    version: versionName,
    category: categoryName,
    entry: entryName,
  });

  let article;
  let articleFileName;

  let specificArticleLoaderArgs: loadSpecificArticleArgs = {
    path: contentEntryFilePath,
    stats: contentStats!,
    lastState: lastState,
  };

  if (referenceStats) {
    articleFileName = referenceEntryFileName;
    article = loadReferenceArticle(specificArticleLoaderArgs);

  } else {
    articleFileName = contentEntryFileName;
    article = loadContentArticle(specificArticleLoaderArgs);
  }

  let articleCurrentState = article.state;

  if (article.model.stateChanged) {
    stateSession.setArticleState({
      project: projectName,
      version: versionName,
      category: categoryName,
      entry: entryName
    }, articleCurrentState);
  }

  return {
    model: article,
    fileName: articleFileName,
  };
}

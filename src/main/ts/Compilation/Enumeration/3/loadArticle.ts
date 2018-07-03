import {loadContentArticle} from "./loadContentArticle";
import {loadReferenceArticle} from "./loadReferenceArticle";
import {nullableStat} from "../../../Util/FS/nullableStat";
import {StateSession} from "../../State/StateSession";
import {MArticle} from "../../Model/Article/MArticle";
import * as fs from "fs";
import {ArticleState} from "../../State/ArticleState/ArticleState";

export interface loadSpecificArticleArgs {
  name: string;
  category: string;
  path: string;
  stats: fs.Stats;
  lastState: ArticleState | null;
}

export interface loadSpecificArticleReturn {
  state: ArticleState;
  model: MArticle;
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
  model: MArticle;
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
): Promise<loadArticleReturn> {
  // Article may be content (`entryName.md` file) or reference (`entryName.md/` folder)
  // Folder must end with `.md` in case both `content.md#content` and `reference.md.md#reference` exist
  let entryFileName = entryName + ".md";
  let entryFilePath = categorySourceDir + entryFileName;
  let entryStats = nullableStat(entryFilePath);

  if (!entryStats ||
    (!entryStats.isFile() && !entryStats.isDirectory())
  ) {
    throw new ReferenceError(`${categorySourceDir}/${entryName} not found`);
  }

  let lastState = stateSession.getArticleState({
    project: projectName,
    version: versionName,
    category: categoryName,
    article: entryName,
  });

  let article;

  let specificArticleLoaderArgs: loadSpecificArticleArgs = {
    name: entryName,
    category: categoryName,
    path: entryFilePath,
    stats: entryStats,
    lastState: lastState,
  };

  if (entryStats.isDirectory()) {
    article = loadReferenceArticle(specificArticleLoaderArgs);
  } else {
    article = loadContentArticle(specificArticleLoaderArgs);
  }

  let articleCurrentState = article.state;

  if (article.model.stateChanged) {
    stateSession.setArticleState({
      project: projectName,
      version: versionName,
      category: categoryName,
      article: entryName
    }, articleCurrentState);
  }

  return {
    model: article.model,
    fileName: entryFileName,
  };
}

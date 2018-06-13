import * as fs from "fs";
import {MContentArticle} from "../../Model/Article/ContentArticle/MContentArticle";
import {ContentArticleState} from "../../State/ArticleState/ContentArticleState";
import {loadSpecificArticleArgs, loadSpecificArticleReturn} from "./loadArticle";

export function loadContentArticle (
  {
    name,
    category,
    path,
    stats,
    lastState,
  }: loadSpecificArticleArgs
): loadSpecificArticleReturn {
  let article = new MContentArticle(name, category);

  // Check state first before getting contents (it may not have changed)

  // TODO: Find edge cases where this fails
  let articleMtime = stats.mtimeMs;

  let articleCurrentState = new ContentArticleState(
    articleMtime
  );

  // TODO Move metadata state changed to compiler
  if (!lastState || lastState!.isDiffTo(articleCurrentState)) {
    // Article state has changed, so need to load data to recompile later
    article.stateChanged = true;

    article.content = fs.readFileSync(path, "utf8");
  }

  return {
    model: article,
    state: articleCurrentState,
  };
}

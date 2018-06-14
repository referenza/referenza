import {_ArticleState, ArticleStateType} from "./ArticleState";

export interface ContentArticleState extends _ArticleState {
  objtype: ArticleStateType.CONTENT_ARTICLE_STATE;
  mtime: number;
}

export function equalContentArticleStates (a: ContentArticleState, b: ContentArticleState): boolean {
  return a.mtime == b.mtime;
}

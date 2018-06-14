import {ContentArticleState, equalContentArticleStates} from "./ContentArticleState";
import {equalReferenceArticleStates, ReferenceArticleState} from "./ReferenceArticleState";

export enum ArticleStateType {
  REFERENCE_ARTICLE_STATE = "ReferenceArticleState",
  CONTENT_ARTICLE_STATE = "ContentArticleState",
}

export interface _ArticleState {
  objtype: ArticleStateType;
}

export type ArticleState = ContentArticleState | ReferenceArticleState;


export function equalArticleStates (a: ArticleState | null, b: ArticleState | null): boolean {
  if (!a || !b) {
    return false;
  }

  if (a.objtype != b.objtype) {
    return false;
  }

  switch (a.objtype) {
  case ArticleStateType.CONTENT_ARTICLE_STATE:
    return equalContentArticleStates(a, b as ContentArticleState);

  case ArticleStateType.REFERENCE_ARTICLE_STATE:
    return equalReferenceArticleStates(a, b as ReferenceArticleState);
  }
}

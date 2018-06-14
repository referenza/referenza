import {_ArticleState, ArticleStateType} from "./ArticleState";
import {shallowArrayEquals} from "../../../Util/Equality/shallowArrayEquals";

export interface ReferenceArticleState extends _ArticleState {
  objtype: ArticleStateType.REFERENCE_ARTICLE_STATE;
  descriptionMtime: number;
  signatureMtimes: ReadonlyArray<number>;
  argumentNames: ReadonlyArray<string>;
  argumentMtimes: ReadonlyArray<number>;
  returnMtimes: ReadonlyArray<number>;
}

export function equalReferenceArticleStates (a: ReferenceArticleState, b: ReferenceArticleState): boolean {
  return a.descriptionMtime == b.descriptionMtime &&
    shallowArrayEquals(a.signatureMtimes, b.signatureMtimes) &&
    shallowArrayEquals(a.argumentNames, b.argumentNames) &&
    shallowArrayEquals(a.argumentMtimes, b.argumentMtimes) &&
    shallowArrayEquals(a.returnMtimes, b.returnMtimes);
}

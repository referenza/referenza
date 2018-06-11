import {ArticleState} from "./ArticleState";
import {StateObjectType} from "./StateObjectType";
import {shallowArrayEquals} from "../../Util/Equality/shallowArrayEquals";

export class ReferenceArticleState extends ArticleState {
  descriptionMtime: number;
  signatureMtimes: ReadonlyArray<number>;
  argumentNames: ReadonlyArray<string>;
  argumentMtimes: ReadonlyArray<number>;
  returnMtimes: ReadonlyArray<number>;

  constructor(descriptionMtime: number, signatureMtimes: ReadonlyArray<number>, argumentNames: ReadonlyArray<string>, argumentMtimes: ReadonlyArray<number>, returnMtimes: ReadonlyArray<number>) {
    super();

    this.objtype = StateObjectType.REFERENCE_ARTICLE_STATE;
    this.descriptionMtime = descriptionMtime;
    this.signatureMtimes = signatureMtimes;
    this.argumentNames = argumentNames;
    this.argumentMtimes = argumentMtimes;
    this.returnMtimes = returnMtimes;
  }

  isDiffTo(other: ArticleState): boolean {
    return !(other instanceof ReferenceArticleState) ||
      this.descriptionMtime != other.descriptionMtime ||
      !shallowArrayEquals(this.signatureMtimes, other.signatureMtimes) ||
      !shallowArrayEquals(this.argumentNames, other.argumentNames) ||
      !shallowArrayEquals(this.argumentMtimes, other.argumentMtimes) ||
      !shallowArrayEquals(this.returnMtimes, other.returnMtimes);
  }
}

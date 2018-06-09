import {ArticleState} from "./ArticleState";
import {StateObjectType} from "./StateObjectType";
import {equalArrays} from "../../Util/Equality/equalArrays";

export class ReferenceArticleState extends ArticleState {
  descriptionMtime: number;
  signatureMtimes: ReadonlyArray<number>;
  argumentNames: ReadonlyArray<string>;
  argumentMtimes: ReadonlyArray<number>;
  returnMtimes: ReadonlyArray<number>;

  constructor(descriptionMtime: number, signatureMtimes: ReadonlyArray<number>, argumentNames: ReadonlyArray<string>, argumentMtimes: ReadonlyArray<number>, returnMtimes: ReadonlyArray<number>) {
    super();

    this.__objtype = StateObjectType.REFERENCE_ARTICLE_STATE;
    this.descriptionMtime = descriptionMtime;
    this.signatureMtimes = signatureMtimes;
    this.argumentNames = argumentNames;
    this.argumentMtimes = argumentMtimes;
    this.returnMtimes = returnMtimes;
  }

  isDiffTo(other: ArticleState): boolean {
    return !(other instanceof ReferenceArticleState) ||
      this.descriptionMtime != other.descriptionMtime ||
      !equalArrays(this.signatureMtimes, other.signatureMtimes) ||
      !equalArrays(this.argumentNames, other.argumentNames) ||
      !equalArrays(this.argumentMtimes, other.argumentMtimes) ||
      !equalArrays(this.returnMtimes, other.returnMtimes);
  }
}

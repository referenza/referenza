import { ArticleState } from "./ArticleState";
export declare class ReferenceArticleState extends ArticleState {
    descriptionMtime: number;
    signatureMtimes: ReadonlyArray<number>;
    argumentNames: ReadonlyArray<string>;
    argumentMtimes: ReadonlyArray<number>;
    returnMtimes: ReadonlyArray<number>;
    constructor(descriptionMtime: number, signatureMtimes: ReadonlyArray<number>, argumentNames: ReadonlyArray<string>, argumentMtimes: ReadonlyArray<number>, returnMtimes: ReadonlyArray<number>);
    isDiffTo(other: ArticleState): boolean;
}

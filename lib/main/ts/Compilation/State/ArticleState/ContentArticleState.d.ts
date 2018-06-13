import { ArticleState } from "./ArticleState";
export declare class ContentArticleState extends ArticleState {
    mtime: number;
    constructor(mtime: number);
    isDiffTo(other: ArticleState): boolean;
}

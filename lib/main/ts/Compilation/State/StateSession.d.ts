import { ArticleState } from "./ArticleState/ArticleState";
import { MetadataState } from "./MetadataState/MetadataState";
import { VersionReference } from "../../Util/Reference/VersionReference";
import { ArticleReference } from "../../Util/Reference/ArticleReference";
import { CategoryReference } from "../../Util/Reference/CategoryReference";
export declare class StateSession {
    private static readonly keyDelimiter;
    private readonly file;
    private readonly statePath;
    private readonly stateLockPath;
    private ended;
    constructor(statePath: string);
    private static createKey;
    updateMetadataState({ project, version }: VersionReference, metadata: MetadataState): boolean;
    getArticleState({ project, version, category, article }: ArticleReference): ArticleState | null;
    setArticleState({ project, version, category, article }: ArticleReference, state: ArticleState): void;
    categoryEntryNames({ project, version, category }: CategoryReference): Set<string>;
    deleteArticleState({ project, version, category, article }: ArticleReference): void;
    end(save: boolean): void;
}

import { MArticle } from "../../Model/Article/MArticle";
import { StateSession } from "../../State/StateSession";
export interface loadCategoryArgs {
    stateSession: StateSession;
    projectName: string;
    versionSourceDir: string;
    versionName: string;
    categoryName: string;
    categoryEntries: ReadonlyArray<string>;
}
export declare function loadCategory({ stateSession, projectName, versionSourceDir, versionName, categoryName, categoryEntries, }: loadCategoryArgs): Promise<ReadonlyArray<MArticle>>;

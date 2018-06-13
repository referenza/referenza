/// <reference types="node" />
import { StateSession } from "../../State/StateSession";
import { MArticle } from "../../Model/Article/MArticle";
import * as fs from "fs";
import { ArticleState } from "../../State/ArticleState/ArticleState";
export interface loadSpecificArticleArgs {
    name: string;
    category: string;
    path: string;
    stats: fs.Stats;
    lastState: ArticleState | null;
}
export interface loadSpecificArticleReturn {
    state: ArticleState;
    model: MArticle;
}
export interface loadArticleArgs {
    stateSession: StateSession;
    projectName: string;
    versionName: string;
    categorySourceDir: string;
    categoryName: string;
    entryName: string;
}
export interface loadArticleReturn {
    model: MArticle;
    fileName: string;
}
export declare function loadArticle({ stateSession, projectName, categorySourceDir, versionName, categoryName, entryName, }: loadArticleArgs): Promise<loadArticleReturn>;

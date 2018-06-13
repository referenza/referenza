import { ArticleState } from "./ArticleState/ArticleState";
import { MetadataState } from "./MetadataState/MetadataState";
export interface StateFile {
    metadataStates: {
        [key: string]: MetadataState;
    };
    articleStates: {
        [key: string]: ArticleState;
    };
}
export declare function createBlankStateFileContents(): string;

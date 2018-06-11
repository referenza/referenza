import {ArticleState} from "./ArticleState";
import {VersionMetadata} from "../Metadata/VersionMetadata";

export interface StateFile {
  metadataStates: { [key: string]: VersionMetadata };
  articleStates: { [key: string]: ArticleState };
}

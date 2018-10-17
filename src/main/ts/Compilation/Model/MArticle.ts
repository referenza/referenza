import {RawContentFolder, RawContentFile} from "../Article/RawContent";

export interface MArticle<T> {
  category: string;
  // Extension of the file
  type: string;
  // Name and description of the article, both found in the name of the file
  name: string;
  description: string;
  // Raw data of the current article
  data: RawContentFile | RawContentFolder;
  // Model data, built by the article type handler, loaded only if exipred
  model?: T;
  // Rendering of the current article, loaded only if exipred
  render?: string;
}

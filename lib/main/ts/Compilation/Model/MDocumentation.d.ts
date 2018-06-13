import { MArticle } from "./Article/MArticle";
import { OrderedMap } from "../../Util/Structure/OrderedMap";
export declare class MDocumentation {
    name: string;
    version: string;
    metadataStateChanged: boolean;
    articles: OrderedMap<string, Array<MArticle>>;
    constructor(name: string, version: string, metadataStateChanged: boolean);
    extendCategoryArticles(category: string, articles: ReadonlyArray<MArticle>): void;
    getLandingArticle(): MArticle;
    createURLPath(): string;
}

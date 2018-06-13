import { View } from "../View";
import { VArticleFooter } from "./VArticleFooter";
import { VArticleHeader } from "./VArticleHeader";
export interface VArticleProps {
    header: VArticleHeader;
    footer: VArticleFooter;
}
export declare abstract class VArticle extends View {
    protected constructor();
}

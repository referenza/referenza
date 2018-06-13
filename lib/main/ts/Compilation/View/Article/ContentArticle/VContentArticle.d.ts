import { TextOrHTML } from "../../../../Util/HTML/HTMLValue";
import { VArticle, VArticleProps } from "../VArticle";
export interface VContentArticleProps extends VArticleProps {
    content: TextOrHTML;
}
export declare class VContentArticle extends VArticle {
    props: VContentArticleProps;
    constructor(props: VContentArticleProps);
    render(): string;
}

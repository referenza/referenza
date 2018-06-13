import { View } from "../View";
import { VArticleNavigator } from "./VArticleNavigator";
export interface VArticleFooterProps {
    navPrev: VArticleNavigator | null;
    navNext: VArticleNavigator | null;
}
export declare class VArticleFooter extends View {
    props: VArticleFooterProps;
    constructor(props: VArticleFooterProps);
    render(): string;
}

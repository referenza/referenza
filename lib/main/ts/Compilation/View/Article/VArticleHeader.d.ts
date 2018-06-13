import { View } from "../View";
export interface VArticleHeaderProps {
    category: string;
    name: string;
}
export declare class VArticleHeader extends View {
    props: VArticleHeaderProps;
    constructor(props: VArticleHeaderProps);
    render(): string;
}

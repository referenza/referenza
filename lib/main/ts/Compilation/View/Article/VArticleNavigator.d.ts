import { View } from "../View";
export declare enum VArticleNavigatorDirection {
    PREV = 0,
    NEXT = 1
}
export interface VArticleNavigatorProps {
    dir: VArticleNavigatorDirection;
    href: string;
    name: string;
}
export declare class VArticleNavigator extends View {
    props: VArticleNavigatorProps;
    constructor(props: VArticleNavigatorProps);
    render(): string;
}

import { View } from "../View";
export interface VPaneTocCategoryEntryProps {
    URL: string;
    name: string;
    description: string;
    isActive: boolean;
}
export declare class VPaneTocCategoryEntry extends View {
    props: VPaneTocCategoryEntryProps;
    constructor(props: VPaneTocCategoryEntryProps);
    render(): string;
}

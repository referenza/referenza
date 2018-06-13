import { View } from "../View";
import { VPaneTocCategoryEntry } from "./VPaneTocCategoryEntry";
export interface VPaneTocCategoryProps {
    name: string;
    isActive: boolean;
    entries: ReadonlyArray<VPaneTocCategoryEntry>;
}
export declare class VPaneTocCategory extends View {
    props: VPaneTocCategoryProps;
    constructor(props: VPaneTocCategoryProps);
    render(): string;
}

import { View } from "../View";
export interface VHeaderProjectMenuEntryProps {
    URL: string;
    name: string;
}
export declare class VHeaderProjectMenuEntry extends View {
    props: VHeaderProjectMenuEntryProps;
    constructor(props: VHeaderProjectMenuEntryProps);
    render(): string;
}

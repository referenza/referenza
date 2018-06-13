import { View } from "../View";
import { VHeaderProjectMenuEntry } from "./VHeaderProjectMenuEntry";
export interface VHeaderProjectProps {
    name: string;
    otherProjects: ReadonlyArray<VHeaderProjectMenuEntry>;
    activeVersion: string;
    otherVersions: ReadonlyArray<VHeaderProjectMenuEntry>;
}
export declare class VHeaderProject extends View {
    props: VHeaderProjectProps;
    constructor(props: VHeaderProjectProps);
    render(): string;
}

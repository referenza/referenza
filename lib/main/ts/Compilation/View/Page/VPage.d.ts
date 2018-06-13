import { View } from "../View";
import { VPaneTocCategory } from "../Pane/VPaneTocCategory";
import { VArticle } from "../Article/VArticle";
import { VHeaderProject } from "../Header/VHeaderProject";
import { VFeedback } from "../Feedback/VFeedback";
export interface VPageProps {
    URL: string;
    urlPathPrefix: string;
    feedback: VFeedback | null;
    logo: string;
    viewportTitle: string;
    activeProject: VHeaderProject;
    tocCategories: ReadonlyArray<VPaneTocCategory>;
    article: VArticle;
}
export declare class VPage extends View {
    props: VPageProps;
    constructor(props: VPageProps);
    render(): string;
}

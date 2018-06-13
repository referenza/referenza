import { VFeedback } from "./VFeedback";
export interface VFormFeedbackProps {
    endpointURL: string;
    pageID: string;
}
export declare class VFormFeedback extends VFeedback {
    props: VFormFeedbackProps;
    constructor(props: VFormFeedbackProps);
    render(): string;
}

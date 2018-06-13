import { MDocumentation } from "../../Model/MDocumentation";
import { StateSession } from "../../State/StateSession";
export interface loadDocumentationArgs {
    stateSession: StateSession;
    projectName: string;
    metadataFileName: string;
    sourceDir: string;
}
export declare function loadProject({ stateSession, projectName, metadataFileName, sourceDir, }: loadDocumentationArgs): Promise<ReadonlyArray<MDocumentation>>;

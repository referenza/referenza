import { MDocumentation } from "../../Model/MDocumentation";
import { StateSession } from "../../State/StateSession";
export interface loadMajorArgs {
    stateSession: StateSession;
    projectName: string;
    metadataFileName: string;
    documentationSourceDir: string;
    versionName: string;
}
export declare function loadVersion({ stateSession, projectName, metadataFileName, documentationSourceDir, versionName, }: loadMajorArgs): Promise<MDocumentation>;

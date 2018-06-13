import * as fs from "fs";
import {MDocumentation} from "../../Model/MDocumentation";
import {compareNaturally} from "../../../Util/Comparator/compareNaturally";
import {loadVersion} from "../1/loadVersion";
import {StateSession} from "../../State/StateSession";

export interface loadDocumentationArgs {
  stateSession: StateSession,
  projectName: string;
  metadataFileName: string;
  sourceDir: string;
}

export async function loadProject (
  {
    stateSession,
    projectName,
    metadataFileName,
    sourceDir,
  }: loadDocumentationArgs
): Promise<ReadonlyArray<MDocumentation>> {
  let documentationSourceDir = sourceDir + projectName + "/";

  let versions: Array<MDocumentation> = [];

  let versionNames = fs.readdirSync(documentationSourceDir).sort(compareNaturally);

  for (let versionName of versionNames) {
    versions.push(await loadVersion({
      stateSession: stateSession,
      projectName: projectName,
      metadataFileName: metadataFileName,
      documentationSourceDir: documentationSourceDir,
      versionName: versionName,
    }));
  }

  return versions;
}

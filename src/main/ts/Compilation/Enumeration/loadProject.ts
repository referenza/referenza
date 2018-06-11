import * as fs from "fs";
import {compareNatively} from "../../Util/Comparator/compareNatively";
import {Documentation} from "../Model/Documentation";
import {compareNaturally} from "../../Util/Comparator/compareNaturally";
import {loadVersion} from "./loadVersion";
import {StateSession} from "../State/StateSession";

export interface loadDocumentationArgs {
  stateSession: StateSession,
  projectName: string;
  metadataFileName: string;
  sourceDir: string;
}

export function loadProject (
  {
    stateSession,
    projectName,
    metadataFileName,
    sourceDir,
  }: loadDocumentationArgs
): ReadonlyArray<Documentation> {
  let documentationSourceDir = sourceDir + projectName + "/";

  let versions = [];

  let versionNames = fs.readdirSync(documentationSourceDir).sort(compareNaturally);

  versionNames.forEach(versionName => {
    // TODO
    loadVersion({
      stateSession: stateSession,
      projectName: projectName,
      metadataFileName: metadataFileName,
      documentationSourceDir: documentationSourceDir,
      versionName: versionName,
    });
  });

  return versions;
}

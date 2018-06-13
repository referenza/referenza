import {MDocumentation} from "../../Model/MDocumentation";
import {StateSession} from "../../State/StateSession";
import {MetadataState} from "../../State/MetadataState/MetadataState";
import {loadCategory} from "../2/loadCategory";

function assertVersionUniqueArticleNames (projectName: string, versionName: string, versionMetadata: MetadataState): void {
  let articleNames = new Map();

  versionMetadata.categories.forEach(category => {
    category.entries.forEach(entryName => {
      let existingCategory = articleNames.get(entryName);

      if (existingCategory == undefined) {
        articleNames.set(entryName, category);

      } else {
        let versionPath = `${projectName}/${versionName}`;
        throw new Error(`"${entryName}" for "${versionPath}" found in both "${category}" and "${existingCategory}"`);
      }
    });
  });
}

export interface loadMajorArgs {
  stateSession: StateSession,
  projectName: string,
  metadataFileName: string,
  documentationSourceDir: string;
  versionName: string;
}

export async function loadVersion (
  {
    stateSession,
    projectName,
    metadataFileName,
    documentationSourceDir,
    versionName,
  }: loadMajorArgs
): Promise<MDocumentation> {
  let versionSourceDir = documentationSourceDir + versionName + "/";

  let metadata: MetadataState = require(versionSourceDir + metadataFileName);

  let metadataStateChanged = stateSession.updateMetadataState({
    project: projectName,
    version: versionName,
  }, metadata);

  let documentation = new MDocumentation(projectName, versionName, metadataStateChanged);

  assertVersionUniqueArticleNames(projectName, versionName, metadata);

  for (let {name: categoryName, entries: categoryEntries} of metadata.categories) {
    let categoryArticles = await loadCategory({
      stateSession: stateSession,
      projectName: projectName,
      versionSourceDir: versionSourceDir,
      versionName: versionName,
      categoryName: categoryName,
      categoryEntries: categoryEntries,
    });

    documentation.extendCategoryArticles(categoryName, categoryArticles);
  }

  return documentation;
}

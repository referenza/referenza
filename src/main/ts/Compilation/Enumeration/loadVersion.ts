import {Documentation} from "../Model/Documentation";
import {StateSession} from "../State/StateSession";
import {VersionMetadata} from "../Metadata/VersionMetadata";
import {loadCategory} from "./loadCategory";

function assertVersionUniqueArticleNames (projectName: string, versionName: string, versionMetadata: VersionMetadata): void {
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

export function loadVersion (
  {
    stateSession,
    projectName,
    metadataFileName,
    documentationSourceDir,
    versionName,
  }: loadMajorArgs
): Documentation {
  let versionSourceDir = documentationSourceDir + versionName + "/";

  let metadata: VersionMetadata = require(versionSourceDir + metadataFileName);

  let metadataStateChanged = stateSession.updateMetadataState({
    project: projectName,
    version: versionName,
  }, metadata);

  let documentation = new Documentation(projectName, versionName, metadataStateChanged);

  assertVersionUniqueArticleNames(projectName, versionName, metadata);

  metadata.categories.forEach(({name: categoryName, entries: categoryEntries}) => {
    let categoryArticles = loadCategory({
      stateSession: stateSession,
      projectName: projectName,
      versionSourceDir: versionSourceDir,
      versionName: versionName,
      categoryName: categoryName,
      categoryEntries: categoryEntries,
    });

    documentation.extendCategoryArticles(categoryName, categoryArticles);
  });

  return documentation;
}

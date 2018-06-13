import * as fs from "fs";
import {MArticle} from "../../Model/Article/MArticle";
import {StateSession} from "../../State/StateSession";
import {loadArticle} from "../3/loadArticle";

export interface loadCategoryArgs {
  stateSession: StateSession;
  projectName: string,
  versionSourceDir: string;
  versionName: string;
  categoryName: string;
  categoryEntries: ReadonlyArray<string>;
}

export async function loadCategory (
  {
    stateSession,
    projectName,
    versionSourceDir,
    versionName,
    categoryName,
    categoryEntries,
  }: loadCategoryArgs
): Promise<ReadonlyArray<MArticle>> {
  // Get category name and absolute path to folder
  let categorySourceDir = versionSourceDir + categoryName + "/";

  // Ensure state and folder matches metadata
  let extraFiles = new Set(fs.readdirSync(categorySourceDir));
  let extraState = stateSession.categoryEntryNames({
    project: projectName,
    version: versionName,
    category: categoryName,
  });

  let articles = [];

  for (let entryName of categoryEntries) {
    // Load article associated with entry
    let {model: article, fileName: articleFileName} = await loadArticle({
      stateSession: stateSession,
      projectName: projectName,
      categorySourceDir: categorySourceDir,
      versionName: versionName,
      categoryName: categoryName,
      entryName: entryName,
    });

    // Account for entry
    extraFiles.delete(articleFileName);
    extraState.delete(entryName);

    articles.push(article);
  }

  // Throw error for unrecognised files
  if (extraFiles.size > 0) {
    let extraFilesStr = `"${Array.from(extraFiles).join(", ")}"`;
    let categoryPath = `${projectName}/${versionName}/${categoryName}`;
    throw new Error(`Extraneous files in "${categoryPath}": ${extraFilesStr}`);
  }

  // Clean up non-existent entries in state
  extraState.forEach(entry => {
    stateSession.deleteArticleState({
      project: projectName,
      version: versionName,
      category: categoryName,
      article: entry,
    });
  });

  return articles;
}

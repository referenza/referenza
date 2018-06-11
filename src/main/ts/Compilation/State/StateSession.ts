import * as fs from "fs-extra";
import {deepEquals} from "../../Util/Equality/deepEquals";
import {ArticleState} from "./ArticleState";
import {escapeRegExp} from "../../Util/RegExp/escapeRegExp";
import {StateFile} from "./StateFile";
import {FQA} from "../../Util/Referenza/FQA";
import {VersionMetadata} from "../Metadata/VersionMetadata";

export class StateSession {
  private readonly file: StateFile;
  private readonly statePath: string;
  private readonly stateLockPath: string;
  private ended: boolean = false;

  private static readonly keyDelimiter = "/";

  private static createKey (...parts: (string | number)[]): string {
    for (let p of parts) {
      if (`${p}`.indexOf(StateSession.keyDelimiter) > -1) {
        throw new SyntaxError(`Invalid component name "${p}"`);
      }
    }
    return parts.join(StateSession.keyDelimiter);
  }

  constructor (statePath: string) {
    if (!statePath || /[\/\\]$/.test(statePath)) {
      throw new TypeError(`Invalid state file path`);
    }

    let stateLockPath = statePath + ".lock";
    if (fs.existsSync(stateLockPath)) {
      throw new Error(`State is currently in use`);
    }
    fs.writeFileSync(stateLockPath, process.pid);

    try {
      this.file = fs.readJsonSync(statePath);
    } catch (e) {
      if (e.code == "ENOENT") {
        this.file = {metadataStates: {}, articleStates: {}};
      } else {
        throw e;
      }
    }

    this.statePath = statePath;
    this.stateLockPath = stateLockPath;
  }

  updateMetadataState ({project, version}: FQA, metadata: VersionMetadata): boolean {
    let key = StateSession.createKey(project, version);
    let currentMeta = this.file.metadataStates[key];

    if (!currentMeta) {
      this.file.metadataStates[key] = metadata;
      return true;
    }

    if (!deepEquals(currentMeta, metadata)) {
      this.file.metadataStates[key] = metadata;
      return true;
    } else {
      return false;
    }
  }

  getArticleState ({project, version, category, entry}: FQA): ArticleState | null {
    let key = StateSession.createKey(project, version, entry);
    let state = this.file.articleStates[key];
    return state || null;
  }

  setArticleState ({project, version, category, entry}: FQA, state: ArticleState): void {
    let key = StateSession.createKey(project, version, entry);
    this.file.articleStates[key] = state;
  }

  categoryEntryNames ({project, version, category}: FQA): Set<string> {
    let key_prefix = StateSession.createKey(project, version, category);
    let regexp = new RegExp(`^${escapeRegExp(key_prefix)}${escapeRegExp(StateSession.keyDelimiter)}.+$`);
    return new Set(
      Object.keys(this.file.articleStates)
        .filter(key => regexp.test(key))
        .map(key => key.split(StateSession.keyDelimiter).pop())
    );
  }

  deleteArticleState ({project, version, category, entry}: FQA): void {
    let key = StateSession.createKey(project, version, entry);
    delete this.file.articleStates[key];
  }

  end (save: boolean): void {
    if (this.ended) {
      throw new Error(`State already ended`);
    }

    if (save) {
      fs.writeJsonSync(this.statePath, this.file);
    }

    fs.unlinkSync(this.stateLockPath);

    this.ended = true;
  }
}

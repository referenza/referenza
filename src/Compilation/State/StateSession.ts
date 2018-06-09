import * as fs from "fs";

export class StateSession {
  private data?: object;
  private statePath: string;
  private stateLockPath: string;
  private metadataFileName: string;

  constructor(statePath: string, metadataFileName: string) {
    if (!statePath || /[\/\\]$/.test(statePath)) {
      throw new TypeError(`Invalid state file path`);
    }

    let stateLockPath = statePath + ".lock";
    if (fs.existsSync(stateLockPath)) {
      throw new Error(`State is currently in use`);
    }
    fs.writeFileSync(stateLockPath, "1");

    try {
      this.data = fs.readJsonSync(statePath);
    } catch (e) {
      if (e.code == "ENOENT") {
        this.data = {};
      } else {
        throw e;
      }
    }

    this.statePath = statePath;
    this.stateLockPath = stateLockPath;
    this.metadataFileName = metadataFileName;
  }

  private iter(levels: Array<string>) {
    let data = this.data;
    while (levels.length && data) {
      data = data[levels.shift()];
    }
    return data || null;
  }

  private dig(levels: Array<string>, value: string) {
    let data = this.data;
    let last = levels.pop();
    while (levels.length) {
      let lvl = levels.shift();
      if (!data[lvl]) {
        data[lvl] = {};
      }
      data = data[lvl];
    }
    data[last] = value;
  }

  updateMetadataState(project, major, minor, metadata) {
    let currentMeta = this.iter([project, major, minor, this.metadataFileName]);

    if (!currentMeta) {
      this.dig([project, major, minor, this.metadataFileName], metadata);
      return true;
    }

    if (!deepEquals(currentMeta, metadata)) {
      this.data[project][major][minor][this.metadataFileName] = metadata;
      return true;
    } else {
      return false;
    }
  }

  getState(project, major, minor, category, entry) {
    let state = this.iter([project, major, minor, category, entry]);
    if (!state) {
      return null;
    }

    let objType = state.__objtype;

    switch (objType) {
      case "ContentArticleState":
        return new ContentArticleState(state);

      case "ReferenceArticleState":
        return new ReferenceArticleState(state);

      default:
        throw new Error(`Unknown state object type: ${objType}`);
    }
  }

  setState(project, major, minor, category, entry, state): void {
    this.dig([project, major, minor, category, entry], state.toObject());
  }

  categoryEntryNames(project, major, minor, category): Set<string> {
    return new Set(Object.keys(this.iter([project, major, minor, category]) || {}));
  }

  deleteState(project, major, minor, category, entry): boolean {
    let data = this.iter([project, major, minor, category]);
    if (!data) {
      return false;
    }

    return delete data[entry];
  }

  end(save: boolean): void {
    if (save) {
      fs.writeJsonSync(this.statePath, this.data);
    }
    this.data = undefined;
    fs.unlinkSync(this.stateLockPath);
  }
}

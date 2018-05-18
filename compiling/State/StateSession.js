"use strict";

const fs = require("fs-extra");
const deepEquals = require("../Utils/deepEquals");

const ContentArticleState = require("./ContentArticleState");
const ReferenceArticleState = require("./ReferenceArticleState");

class StateSession {
  constructor ({statePath, metadataFileName}) {
    if (!statePath || /[\/\\]$/.test(statePath)) {
      throw new TypeError(`Invalid state file path`);
    }

    let stateLockPath = statePath + ".lock";
    if (fs.existsSync(stateLockPath)) {
      throw new Error(`State is currently in use`);
    }
    fs.writeFileSync(stateLockPath, "1");

    try {
      this._data = fs.readJsonSync(statePath);
    } catch (e) {
      if (e.code == "ENOENT") {
        this._data = {};
      } else {
        throw e;
      }
    }

    this._statePath = statePath;
    this._stateLockPath = stateLockPath;
    this._metadataFileName = metadataFileName;
  }

  _iter (levels) {
    let data = this._data;
    while (levels.length && data) {
      data = data[levels.shift()];
    }
    return data || null;
  }

  _dig (levels, value) {
    let data = this._data;
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

  updateMetadataState (project, major, minor, metadata) {
    let currentMeta = this._iter([project, major, minor, this._metadataFileName]);

    if (!currentMeta) {
      this._dig([project, major, minor, this._metadataFileName], metadata);
      return true;
    }

    if (!deepEquals(currentMeta, metadata)) {
      this._data[project][major][minor][this._metadataFileName] = metadata;
      return true;
    } else {
      return false;
    }
  }

  getState (project, major, minor, category, entry) {
    let state = this._iter([project, major, minor, category, entry]);
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

  setState (project, major, minor, category, entry, state) {
    this._dig([project, major, minor, category, entry], state.toObject());
  }

  categoryEntryNames (project, major, minor, category) {
    return new Set(Object.keys(this._iter([project, major, minor, category]) || {}));
  }

  deleteState (project, major, minor, category, entry) {
    let data = this._iter([project, major, minor, category]);
    if (!data) {
      return false;
    }

    return delete data[entry];
  }

  end (save) {
    if (save) {
      fs.writeJsonSync(this._statePath, this._data);
    }
    this._data = null;
    fs.unlinkSync(this._stateLockPath);
  }
}

module.exports = StateSession;

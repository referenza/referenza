import * as fs from "fs";

export function nullableStat (path: string): fs.Stats | null {
  try {
    return fs.lstatSync(path);
  } catch (err) {
    if (err.code == "ENOENT") {
      return null;
    } else {
      throw err;
    }
  }
}

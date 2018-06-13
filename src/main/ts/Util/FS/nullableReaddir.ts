import * as fs from "fs";

export function nullableReaddir (path: string): Array<string> | null {
  try {
    return fs.readdirSync(path);
  } catch (e) {
    if (e.code === "ENOENT") {
      return null;
    }
    throw e;
  }
}

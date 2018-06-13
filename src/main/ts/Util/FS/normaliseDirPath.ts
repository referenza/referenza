import * as Path from "path";

export function normaliseDirPath (path: string): string {
  return Path.normalize(path) + Path.sep;
}

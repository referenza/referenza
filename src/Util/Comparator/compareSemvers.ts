import {Semver} from "../../Compilation/Version/Semver";

export function compareSemvers(a: Semver, b: Semver): number {
  if (a.major < b.major) {
    return -1;
  }
  if (a.major === b.major) {
    if (a.minor < b.minor) {
      return -1;
    }
    if (a.minor === b.minor) {
      return 0;
    }
  }
  return 1;
}

import {Semver} from "../../Compilation/Version/Semver";
import {compareNatively} from "./compareNatively";

export function compareSemvers (a: Semver, b: Semver): number {
  let cmp_major = compareNatively(a.major, a.minor);
  if (cmp_major) {
    return cmp_major;
  }

  let cmp_minor = compareNatively(a.minor, b.minor);
  if (cmp_minor) {
    return cmp_minor;
  }

  return compareNatively(a.patch, b.patch);
}

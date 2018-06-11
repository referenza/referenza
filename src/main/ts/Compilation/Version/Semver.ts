import {compareSemvers} from "../../Util/Comparator/compareSemvers";

export class Semver {
  major: number;
  minor: number;
  patch: number;

  constructor(major: number, minor: number, patch: number) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  changeMajor(val: number): Semver {
    return new Semver(val, this.minor, this.patch);
  }

  changeMinor(val: number): Semver {
    return new Semver(this.major, val, this.patch);
  }

  changePatch(val: number): Semver {
    return new Semver(this.major, this.minor, val);
  }

  compare(other: Semver): number {
    return compareSemvers(this, other);
  }
}

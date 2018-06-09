export class Semver {
  major: number;
  minor: number;
  patch?: number | undefined;

  constructor(major: number, minor: number, patch?: number) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }
}

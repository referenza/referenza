export declare class Semver {
    major: number;
    minor: number;
    patch: number;
    constructor(major: number, minor: number, patch: number);
    changeMajor(val: number): Semver;
    changeMinor(val: number): Semver;
    changePatch(val: number): Semver;
    compare(other: Semver): number;
}

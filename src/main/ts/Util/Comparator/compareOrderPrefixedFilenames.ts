import {compareNatively} from "./compareNatively";

export function compareOrderPrefixedFilenames (a: string, b: string): number {
  let idA = Number.parseInt(a.slice(0, a.indexOf(".")), 10);
  let idB = Number.parseInt(b.slice(0, b.indexOf(".")), 10);

  return compareNatively(idA, idB);
}

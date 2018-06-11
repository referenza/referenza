export function shallowArrayEquals(a: ReadonlyArray<any>, b: ReadonlyArray<any>): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

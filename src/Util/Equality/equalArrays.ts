export function equalArrays(a, b): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

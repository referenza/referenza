type SortablePrimitive = number | string | boolean;

export function compareNatively(a: SortablePrimitive, b: SortablePrimitive): number {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

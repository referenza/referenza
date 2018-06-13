export function deepEquals (a: any, b: any): boolean {
  let typeof_a = typeof a;
  let typeof_b = typeof b;

  if (typeof_a != typeof_b) {
    return false;
  }

  // This handles direct comparisons between
  // undefined, null, strings, numbers, booleans, and functions
  // (although this function shouldn't be used to compare functions)
  if (a == null || typeof_a != "object") {
    return a === b;
  }

  if (Object.getPrototypeOf(a) == Object.prototype) {
    return Object.getPrototypeOf(b) == Object.prototype &&
      Object.keys(a).every(k => b.hasOwnProperty(k) && deepEquals(a[k], b[k])) &&
      Object.keys(b).every(k => a.hasOwnProperty(k));

  } else if (Array.isArray(a)) {
    return Array.isArray(b) &&
      a.length == b.length &&
      a.every((v, i) => deepEquals(v, b[i]));

  } else {
    throw new TypeError(`Incompatible type for deep-checking equality`);
  }
}

import {transformIterator} from "../Iterator/transformIterator";

export class OrderedMap<K, V> extends Map<K, V> {
  // Cannot initialise here or in constructor, because native constructor (`super`)
  // calls `.set` if initial entries provided; `.set` depends on `.order` but `.order`
  // can't be created before or even in `super` call, and initialising here does
  // not run before `super`
  private order!: Array<K>;

  constructor (iterable: Iterable<[K, V]> = []) {
    // `super` will call `.set`, so no need to initialise `this.order`
    super(iterable);
  }

  [Symbol.iterator] (): IterableIterator<[K, V]> {
    return this.entries();
  }

  entries (): IterableIterator<[K, V]> {
    return transformIterator(this.keys(), k => [k, this.get(k)] as [K, V]);
  }

  keys (): IterableIterator<K> {
    return this.order[Symbol.iterator]();
  }

  values (): IterableIterator<V> {
    return transformIterator(this.keys(), k => this.get(k) as V);
  }

  clear (): void {
    super.clear();
    this.order = [];
  }

  delete (key: K): boolean {
    let deleted = super.delete(key);
    if (deleted) {
      // TODO Improve performance
      this.order.splice(this.order.indexOf(key), 1);
    }
    return deleted;
  }

  forEach (callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    super.forEach(callbackfn, thisArg);
  }

  get (key: K): V | undefined {
    return super.get(key);
  }

  has (key: K): boolean {
    return super.has(key);
  }

  set (key: K, value: V): this {
    if (!this.order) {
      // For constructor (see `.order` comment)
      this.order = [];
    }
    if (!this.has(key)) {
      this.order.push(key);
    }
    return super.set(key, value) as this;
  }
}

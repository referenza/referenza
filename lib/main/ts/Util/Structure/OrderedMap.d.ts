export declare class OrderedMap<K, V> extends Map<K, V> {
    private order;
    constructor(iterable?: Iterable<[K, V]>);
    readonly firstKey: K;
    readonly firstValue: V | undefined;
    readonly lastKey: K;
    readonly lastValue: V | undefined;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
}

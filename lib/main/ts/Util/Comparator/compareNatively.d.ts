declare type SortablePrimitive = number | string | boolean;
export declare function compareNatively<T extends SortablePrimitive>(a: T, b: T): number;
export {};

export type { Chain } from "wagmi";

export type ValueOrArray<T> = T | ValueOrArray<T>[];

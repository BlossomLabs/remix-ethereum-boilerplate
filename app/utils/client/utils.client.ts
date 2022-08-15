import type { ValueOrArray } from "~/types";

export const DEBOUNCE_TIME = 300; // ms

export const buildHref = (
  href: string,
  searchParams: [string, any][]
): string => {
  const urlSearchParams = new URLSearchParams(searchParams);

  return `${href}?${urlSearchParams.toString()}`;
};

export const accessMultidimensionalArray = <T>(
  valueOrArray: ValueOrArray<T>,
  indexes: number[]
): ValueOrArray<T> | undefined => {
  if (!indexes.length || !Array.isArray(valueOrArray)) {
    return;
  }

  let valueOrArray_: ValueOrArray<T> = valueOrArray;

  for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];

    if (!Array.isArray(valueOrArray_) && i < indexes.length - 1) {
      return;
    }

    valueOrArray_ = valueOrArray_[
      index as keyof typeof valueOrArray_
    ] as ValueOrArray<T>;
  }

  return valueOrArray_;
};

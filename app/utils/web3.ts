import { utils } from "ethers";
import type { Fragment } from "ethers/lib/utils";

export const getFnSelector = (fragment: Fragment): string =>
  utils.id(fragment.format("sighash")).substring(0, 10);

export const toDecimals = (
  value: number | string,
  decimals: string | number
): string => {
  const [integer, decimal] = String(value).split(".");
  const decimals_ = Number(decimals);

  return (
    (integer != "0" ? integer : "") + (decimal || "").padEnd(decimals_, "0") ||
    "0"
  );
};

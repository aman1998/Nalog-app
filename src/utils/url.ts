import { keys, forEach, reduce } from "lodash";

import { TTransactionsFilterState } from "store/filter/types";

type TKey = keyof TTransactionsFilterState;
export type TQueryParams = { key: string; value: string };

export const convertTransactionsFilterToList = (params: TTransactionsFilterState): TQueryParams[] =>
  reduce<TKey, TQueryParams[]>(
    keys(params) as TKey[],
    (memo: TQueryParams[], key: TKey) => {
      const value = params[key] as string;
      return memo.concat({ key, value }).filter((item: TQueryParams) => Boolean(item.value));
    },
    []
  );

export const convertUrlParams = (params: TQueryParams[]): URLSearchParams => {
  const urlParams = new URLSearchParams();

  forEach(params, (item: TQueryParams) => {
    if (Array.isArray(item.value)) {
      item.value.forEach(value => {
        urlParams.append(item.key, value);
      });
    } else {
      urlParams.append(item.key, item.value);
    }
  });
  return urlParams;
};

export const isHere =
  (path: string): boolean => window.location.pathname === path || window.location.pathname === `${path}/`;

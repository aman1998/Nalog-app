import { AxiosDataError } from "API/types";

import { TNullable } from "config/types";

import { TAuthStoreState } from "./auth/types";
import { TFilterStoreState } from "./filter/types";
import { TTransactionStoreState } from "./transactions/types";
import { TAssetsStoreState } from "./assets/types";
import { TUserStoreState } from "./user/types";
import { TReportsStoreState } from "./reports/types";
import { TModalsStoreState } from "./modals/types";
import { TServicesStoreState } from "./services/types";
import { TCommonStoreState } from "./common/types";

export interface IApplicationState {
  auth: TAuthStoreState;
  user: TUserStoreState;
  assets: TAssetsStoreState;
  filter: TFilterStoreState;
  transactions: TTransactionStoreState;
  reports: TReportsStoreState;
  modals: TModalsStoreState;
  services: TServicesStoreState;
  common: TCommonStoreState;
}

export declare type IPayloadAction<P = void, T extends string = string, M = never, E = never> = {
  payload: P;
  type: T;
} & ([M] extends [never]
  ? Record<string, unknown>
  : {
      meta: M;
    }) &
  ([E] extends [never]
    ? Record<string, unknown>
    : {
        error: E;
      });

export interface IPaginationResponse<T> {
  next: TNullable<number>;
  previous: TNullable<number>;
  count: number;
  pages	: TNullable<number>;
  results: T[];
}

export type TRequestHandler<T> = {
  fetching: boolean;
  data: TNullable<T>;
  failure: TNullable<AxiosDataError>;
};

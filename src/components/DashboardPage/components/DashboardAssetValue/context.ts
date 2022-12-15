import { createContext, Dispatch, useContext } from "react";

import { EAssetsDashboardValueHistoryOptions } from "../../../../store/assets/types";

import { TAction, TLocalState } from "./types";
import { INITIAL_VALUE } from "./constants";

export type TDashboardAssetValueContextValue =  {
  localState: TLocalState,
  localDispatch: Dispatch<TAction>|null,
  dateRange: EAssetsDashboardValueHistoryOptions
}
export const DashboardAssetValueContext = createContext<TDashboardAssetValueContextValue>({
  localState: INITIAL_VALUE,
  localDispatch: null,
  dateRange: {}
});

export const useDashboardAssetValue = (): TDashboardAssetValueContextValue => useContext(DashboardAssetValueContext);

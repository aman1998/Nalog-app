import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { TNullable } from "config/types";

import { TAssetsDashboardAvailableSymbolData } from "store/assets/types";


export type DashboardSymbolsSetSequenceFormContextProps = {
  symbols?: TNullable<TAssetsDashboardAvailableSymbolData>,
  setSymbols?: Dispatch<SetStateAction<TNullable<TAssetsDashboardAvailableSymbolData>>>
}
export const DashboardSymbolsSetSequenceFormContext = createContext<DashboardSymbolsSetSequenceFormContextProps>({});
export const useDashboardSymbols = (): DashboardSymbolsSetSequenceFormContextProps =>
  useContext(DashboardSymbolsSetSequenceFormContext);

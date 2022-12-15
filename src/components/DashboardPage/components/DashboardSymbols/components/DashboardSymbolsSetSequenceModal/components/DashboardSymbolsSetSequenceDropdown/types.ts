import { TAssetsDashboardAvailableSymbol } from "store/assets/types";


export type DashboardSymbolsSetSequenceDropdownProps = {
  symbol: TAssetsDashboardAvailableSymbol;
  index: number
}

export type DashboardSymbolsSetSequenceDropdownOption = {
  icon: JSX.Element,
  label: JSX.Element,
  value: string,
  active: boolean
}
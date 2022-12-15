import { TAssetsDashboardAvailableSymbol } from "store/assets/types";

export type DashboardSymbolsSetSequenceItemProps = {
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  symbol: TAssetsDashboardAvailableSymbol;
}
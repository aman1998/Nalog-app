import { FC, useCallback } from "react";
import update from 'immutability-helper';

import {
  TAssetsDashboardAvailableSymbol,
} from "store/assets/types";

import DashboardSymbolsSetSequenceItem from "../DashboardSymbolsSetSequenceItem";
import { useDashboardSymbols } from "../DashboardSymbolsSetSequenceForm/hooks";

import { DashboardSymbolsSetSequenceArrayFieldsProps } from "./types";

const DashboardSymbolsSetSequenceItems: FC<DashboardSymbolsSetSequenceArrayFieldsProps> = ({
  symbols 
}) => {
  const { setSymbols } = useDashboardSymbols();

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    if (setSymbols) {
      setSymbols(prevSymbols => {
        if (!prevSymbols) {
          return prevSymbols;
        }
        return update(prevSymbols, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevSymbols[dragIndex]],
          ],
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCard = useCallback((symbol: TAssetsDashboardAvailableSymbol, index: number) => (
    <DashboardSymbolsSetSequenceItem
      key={symbol.id}
      index={index}
      symbol={symbol}
      moveCard={moveCard}
    />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), []);

  return (
    <div className="dashboard-symbols-set-sequence-items">
      {symbols && symbols.length > 0 && symbols.map((symbol, index) => (
        renderCard(symbol, index))
      )}
    </div>
  );
};

export default DashboardSymbolsSetSequenceItems;
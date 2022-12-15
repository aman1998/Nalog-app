import { FC } from "react";

import { TTransactionResult } from "store/transactions/types";

import { useTransactionsListItem } from "../../hooks";

import { TransactionOperationTypeItemProps } from "./types";
import TransactionOperationTypeItemDefault from "./components/TransactionOperationTypeItemDefault";
import TransactionOperationTypeItemMarginTrading from "./components/TransactionOperationTypeItemMarginTrading";
import TransactionOperationTypeItemMarginTradingOpened
  from "./components/TransactionOperationTypeItemMarginTradingOpened";


const TransactionOperationTypeItem: FC<TransactionOperationTypeItemProps> = (
  {
    blocksType,
    title,
    asset,
    cost,
    name,
    showBtns = false,
    isExternalType,
    editOpen,
    symbol,
    isLoss,
    longName,
    classify,
  }
) => {
  const { transaction } = useTransactionsListItem();
  const {
    position_opening_price,
    position_closing_price,
    formedInfo
  } = transaction as TTransactionResult;

  const {
    btnIconColors,
    errorMsg,
    isMarginTrading,
  } = formedInfo;

  if (blocksType === "leftBlock" && isMarginTrading) {
    return <TransactionOperationTypeItemMarginTrading
      title={title}
      asset={asset}
      name={name}
      isExternalType={isExternalType}
      symbol={symbol}
    />;
  }

  if (blocksType === "rightBlock" && position_opening_price && !position_closing_price) {
    return <TransactionOperationTypeItemMarginTradingOpened asset={asset} title={title}/>;
  }
  
  return <TransactionOperationTypeItemDefault
    title={title}
    asset={asset}
    cost={cost}
    name={name}
    showBtns={showBtns}
    editOpen={editOpen}
    btnIconColors={btnIconColors}
    isExternalType={isExternalType}
    isLoss={isLoss}
    longName={longName}
    classify={classify}
    errorMsg={blocksType === "leftBlock" ? errorMsg : ""}
  />;
 
};

export default TransactionOperationTypeItem;

import { FC } from "react";

import { colors } from "config/constants";

import TradeIcon from "components/Icons/TradeIcon";
import ArrowIcon from "components/Icons/TransactionArrowIcon";
import TransferIcon from "components/Icons/TransferIcon";
import ExclamationIcon from "components/Icons/ExclamationIcon";
import MarginTradingOpening from "components/Icons/MarginTradingOpening";
import MarginTradingClosing from "components/Icons/MarginTradingClosing";
import ClassifyOperationIcon from "components/Icons/ClassifyOperationIcon";

import { ETransactionsIcon } from "../../../../types";

import { TransactionIconProps } from "./types";

const TransactionIcon: FC<TransactionIconProps> = ({ value, needDetails }) => {
  if(needDetails) {
    return <ExclamationIcon />;
  }
  switch (value) {
  case ETransactionsIcon.classifyOperationIcon:
    return <ClassifyOperationIcon />;
  case ETransactionsIcon.arrowDown:
    return <ArrowIcon fill={colors.green3} />;
  case ETransactionsIcon.arrowUp:
    return <ArrowIcon fill={colors.complementary} />;
  case ETransactionsIcon.tradeIcon:
    return <TradeIcon />;
  case ETransactionsIcon.transferIcon:
    return <TransferIcon />;
  case ETransactionsIcon.marginTradingOpening:
    return <MarginTradingOpening />;
  case ETransactionsIcon.marginTradingClosing:
    return <MarginTradingClosing />;
  default:
    return <></>;
  }
};

export default TransactionIcon;

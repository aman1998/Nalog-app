import { FC } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { TNullable } from "config/types";
import { maxMobileMediaWidth } from "config/constants";

import CryptoIcon from "components/CryptoIcon";
import ArrowIcon from "components/Icons/TransactionArrowIcon";

import { TTransactionResult } from "store/transactions/types";

import { formatExchangeRate } from "utils/fractions";

import { useTransactionsListItem } from "../../../../hooks";


export type TransactionOperationTypeItemMarginTradingProps = {
  title?: TNullable<string>;
  symbol?: TNullable<string>;
  asset?: TNullable<string>;
  name: string;
  isExternalType: boolean;
}

const TransactionOperationTypeItemMarginTrading: FC<TransactionOperationTypeItemMarginTradingProps> = ({
  title,
  name,
  asset,
  symbol,
  isExternalType,
}) =>{
  const { t } = useTranslation();
  const { transaction } = useTransactionsListItem();

  const {
    position_opening_price,
    position_closing_price,
    position_closing_pnl,
    position_amount,
  } = transaction as TTransactionResult;

  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });
  const negativePosition = position_closing_pnl && Number(position_closing_pnl) < 0;
  const formPrice = (value?: string | null) => formatExchangeRate(Number(value));
  const isLong = Number(position_amount) >= 0;
  const position = isLong
    ? t("transactionOperationTypeItemMarginTrading.long")
    : t("transactionOperationTypeItemMarginTrading.short");

  return (
    <>
      <div className="transactions-item-center__margin-trading__header">
        <div className={cn("transactions-item-center__margin-trading__symbol", { short: !isLong } )}>
          <CryptoIcon
            isExternalType={isExternalType}
            className="transactions-item-center__margin-trading__crypto-currency"
            asset={asset}
          />
          <span>{symbol}</span>
        </div>
        {!isMobile && <h3 className="transactions-item-center__margin-trading__title">{title}</h3>}
      </div>
      <div className="transactions-item-center__margin-trading__content">
        <div className="transactions-item-center__margin-trading__position">
          {position}: <span>{name}</span>
        </div>
        <div className={cn("transactions-item-center__margin-trading__price", {
          negativePosition: negativePosition && position_closing_price,
          positivePosition: !negativePosition && position_closing_price
        })}>
          {t("transactionOperationTypeItemMarginTrading.price")}: <span>{formPrice(position_opening_price)}</span>
          {position_closing_price && <><ArrowIcon />
            <span>{formPrice(position_closing_price)}</span></>}
        </div>
      </div>
    </>
  );};

export default TransactionOperationTypeItemMarginTrading;

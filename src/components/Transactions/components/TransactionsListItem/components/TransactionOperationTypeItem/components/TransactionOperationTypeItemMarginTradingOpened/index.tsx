import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { TNullable } from "config/types";
import { mobileMediaWidth } from "config/constants";

export type TransactionOperationTypeItemMarginTradingOpenedProps = {
  asset?: TNullable<string>
  title?: TNullable<string>
}

const TransactionOperationTypeItemMarginTradingOpened: FC<TransactionOperationTypeItemMarginTradingOpenedProps> = 
  ({ asset, title }) =>{
    const { t } = useTranslation();
    const isMobile = useMediaQuery({
      query: `(max-width: ${mobileMediaWidth}px)`,
    });
    return (
      <>
        {isMobile && <div className="transactions-item-center__margin-trading-opened__title">
          {title}
        </div>}
        <div className="transactions-item-center__margin-trading-opened__content">
          <div className="transactions-item-center__margin-trading-opened__text">
            {t("transactionOperationTypeItemMarginTradingOpened.positionOpened")}
          </div>
          <div className="transactions-item-center__margin-trading-opened__asset">
            {asset} {t("transactionOperationTypeItemMarginTradingOpened.collateral")}
          </div>
        </div>
      </>
    );};

export default TransactionOperationTypeItemMarginTradingOpened;
import { FC } from "react";
import { useTranslation } from "react-i18next";

import CryptoIcon from "components/CryptoIcon";

import { TBalance } from "store/assets/types";

import { formatAssetAmount, formatWithCurrencies } from "utils/fractions";

import { ECurrency } from "../../../../config/types";

export type CryptoItemProps = {
  currency: ECurrency;
} & TBalance

const CryptoItem: FC<CryptoItemProps> = ({ asset, amount, transactions, cost, currency }) => {
  const { t } = useTranslation();
  
  return (
    <div className="crypto-item_wrapper">
      {<CryptoIcon asset={asset} className="crypto-item_icon" />}
      <div className="crypto-item_data">
        <div className="crypto-item_name">{asset}</div>
        <div className="crypto-item_transactions">
          {t('naming.transactionCount', { count: transactions || 0 })}
        </div>
      </div>
      <div className="crypto-item_balance">
        <div className="crypto-item_balance_crypto">
          {formatAssetAmount(amount, asset)}
        </div>
        {asset !== ECurrency.rub
          && <div className="crypto-item_balance_usd">{formatWithCurrencies(cost, currency)}</div>
        }
      </div>
    </div>
  );
};

export default CryptoItem;

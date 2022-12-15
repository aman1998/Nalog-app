import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { ECurrency } from "config/types";

import { TBalance } from "store/assets/types";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import CryptoItem from "../CryptoItem";

export type CryptoItemsListProps = {
  balances: TBalance[];
  currency: ECurrency;
  showMoreBtn?: boolean;
}

const CryptoItemsList: FC<CryptoItemsListProps> = ({ balances, showMoreBtn, currency }): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showCount, setShowCount] = useState<number>(5);

  const handleButtonClick = () => {
    setShowCount(prev => prev+20);
    dispatch(analyticEvent(EEventType.WALLETS_ACCOUNT_SHOW_MORE_ASSETS));
  };

  return (
    <>
      {showMoreBtn
        ? balances.slice(0,showCount).map((item, i) => <CryptoItem key={i} {...item} currency={currency}/>)
        : balances.map((item, i) => <CryptoItem key={i} {...item} currency={currency} />)
      }
      {(showMoreBtn && balances.length > showCount) &&
        <button
          onClick={handleButtonClick}
          className="crypto-assets-list__show-more"
        >
          {t('action.showMore')}
        </button>
      }
    </>
  );};

export default CryptoItemsList;

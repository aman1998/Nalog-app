import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { useHistory, useParams } from "react-router-dom";
import MediaQuery from "react-responsive";
import { useTranslation } from "react-i18next";
import { MouseEvent } from "react";

import { minLaptopMediaWidth } from "config/constants";
import { paths } from "config/paths";
import { ECurrency } from "config/types";

import { getSingleAssetDataSelector } from "store/assets/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { formatDollars, formatWithCurrencies } from "utils/fractions";

import AssetsNote from "../AssetsNote";

import { TotalData } from "./types";

const AssetsSingleBalance = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const singleAsset = useSelector(getSingleAssetDataSelector(id));
  let totalData: TotalData = {
    total_usd: singleAsset?.total_usd || 0,
    total_cost: singleAsset?.total_cost || 0,
    transactions: singleAsset?.transactions || 0,
  };
  
  totalData = singleAsset?.subaccounts?.reduce((acc: TotalData, current) => ({
    total_usd: acc.total_usd + current.total_usd,
    total_cost: acc.total_cost + current.total_cost,
    transactions: acc.transactions + current.transactions
  }), totalData) || totalData;

  const showUsd = singleAsset?.currency !== ECurrency.usd;

  const handleNavigate = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(analyticEvent(EEventType.WALLETS_ACCOUNT_SHOW_MORE_TRANSACTIONS));
    history.push(`${paths.TRANSACTIONS}?account=${singleAsset?.id}`);
  };

  return (
    <div className="assets-single__total-balance_wrapper">
      <div className="assets-single__total-balance_currency">
        <div className="assets-single__total-balance_rub">
          <span>{t('naming.total')}:</span>
          <span>{formatWithCurrencies(totalData?.total_cost, singleAsset?.currency || ECurrency.rub)}</span>
        </div>
        {showUsd && <div className="assets-single__total-balance_usd">{formatDollars(totalData?.total_usd)}</div>}
      </div>

      <div className="assets-single__total-balance_transactions">
        <a
          onClick={handleNavigate}
          className={cn({ underline: totalData?.transactions })}
        >
          {t('naming.transactionCount', { count: totalData?.transactions || 0 })}
        </a>
      </div>
      { singleAsset?.stock_note && (
        <MediaQuery minWidth={minLaptopMediaWidth + 1}>
          <AssetsNote text={singleAsset?.stock_note} />
        </MediaQuery>
      )}
    </div>
  );
};

export default AssetsSingleBalance;

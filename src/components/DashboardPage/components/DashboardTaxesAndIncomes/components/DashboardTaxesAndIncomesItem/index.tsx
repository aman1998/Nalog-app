import { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";

import { paths } from "config/paths";
import { maxMobileMediaWidth } from "config/constants";

import ArrowIcon from "components/Icons/ArrowIcon";

import { getMyAssetsSelector } from "store/assets/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { formatWithCurrencies } from "utils/fractions";

import { DashboardTaxesAndIncomesItemProps } from "./types";

const DashboardTaxesAndIncomesItem: FC<DashboardTaxesAndIncomesItemProps> = memo(({
  year,
  income,
  amount,
  currency,
  redirectIsAvailable
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { data: myAssets, fetching: myAssetsLoading } = useSelector(getMyAssetsSelector);
  const dispatch = useDispatch();
  const showDots = !myAssetsLoading && !myAssets?.length;
  const isNotFormed = new Date().getFullYear() === year;
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  const onClick = () => {
    if (redirectIsAvailable) {
      dispatch(analyticEvent(EEventType.DASHBOARD_TAXES_SHOW_DETAILS));
      history.push(paths.DOCUMENTS);
    }
  };

  return (
    <div className={cn("dashboard-taxes-item", { "disabled-event": !redirectIsAvailable })} onClick={onClick}>
      <div className="dashboard-taxes-item__year">{year}</div>
      {!isMobile && <div className="dashboard-taxes-item__border" />}
      {!isMobile && <div className="dashboard-taxes-item__data">
        <div className="dashboard-taxes-item__data_title">{t('naming.income')}</div>
        <div className="dashboard-taxes-item__data_value">
          {showDots ? "..." : formatWithCurrencies(Number(income) || 0, currency)}
        </div>
      </div>}
      <div className="dashboard-taxes-item__data">
        {!isMobile && <div className="dashboard-taxes-item__data_title">{t('naming.tax')}</div>}
        <div className={cn("dashboard-taxes-item__data_value_tax", { "not-formed": isNotFormed })}>
          {showDots ? "..." : `${isNotFormed ? "~" : ""}${formatWithCurrencies(Number(amount) || 0, currency)}`}
        </div>
      </div>
      {!!redirectIsAvailable && !isMobile && (
        <div className="dashboard-taxes-item__arrow-wrapper">
          <ArrowIcon />
        </div>
      )}
    </div>
  );
});

export default DashboardTaxesAndIncomesItem;

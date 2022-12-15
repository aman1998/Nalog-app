import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ArrowIcon from "components/Icons/ArrowIcon";

import { getReportTaxAmountRequest } from "store/reports/reducers";
import { getReportsTaxAmountDataSelector } from "store/reports/selectors";
import { getMyAssetsRequest, showModal as showModalAction } from "store/assets/reducers";
import { getMyAssetsSelector } from "store/assets/selectors";
import { setDashboardOnboardingAssetsShowAll } from "store/common/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import DashboardTaxesAndIncomesItem from "./components/DashboardTaxesAndIncomesItem";

const DashboardTaxesAndIncomes: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taxAmountByYear = useSelector(getReportsTaxAmountDataSelector);
  const { data: myAssets, fetching: myAssetsLoading } = useSelector(getMyAssetsSelector);
  const showCap = !myAssetsLoading && !myAssets?.length;

  useEffect(() => {
    dispatch(getReportTaxAmountRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMyAssetsRequest({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickCap = () => {
    dispatch(analyticEvent(EEventType.DASHBOARD_TAXES_ADD_ACCOUNT));
    dispatch(showModalAction(true));
    dispatch(setDashboardOnboardingAssetsShowAll());
  };

  return (
    <div className="dashboard-taxes">
      <div className="dashboard-taxes__header">
        <div className="dashboard-taxes__header__title">
          {t("naming.yourTaxes")}
        </div>
      </div>
      <div className="dashboard-taxes__items">
        {
          taxAmountByYear?.map(item => (
            <DashboardTaxesAndIncomesItem
              key={item.year}
              {...item}
              redirectIsAvailable={!!myAssets?.length && process.env.REACT_APP_DOCUMENTS_DISABLED !== "true"}
            />
          ))
        }
      </div>
      {showCap && <div className="dashboard-taxes__cap" onClick={onClickCap}>
        <div className="dashboard-taxes__cap__content">
          <span className="dashboard-taxes__cap__text">{t("action.calculateMyTaxes")}</span> <ArrowIcon/>
        </div>
      </div>}
    </div>
  );
};

export default DashboardTaxesAndIncomes;

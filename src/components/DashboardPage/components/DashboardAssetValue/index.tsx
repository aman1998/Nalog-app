import { FC, useEffect, useMemo, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { getAssetsDashboardPortfolioStatsRequest, getAssetsDashboardValueHistoryRequest } from "store/assets/reducers";

import DashboardCard from "../DashboardCard";

import DashboardLineChart from "./components/DashboardLineChart";
import DashboardAssetValueFilters from "./components/DashboardAssetValueFilters";
import DashboardAssetValueScoreboard from "./components/DashboardAssetValueScoreboard";
import { reducer } from "./reducer";
import { INITIAL_VALUE } from "./constants";
import { DashboardAssetValueContext } from "./context";
import { formPayload } from "./components/DashboardAssetValueFilters/utils";

const DashboardAssetValue: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [localState, localDispatch] = useReducer(reducer, INITIAL_VALUE);

  const payload = useMemo(() => formPayload(localState), [localState]);

  useEffect(() => {
    dispatch(getAssetsDashboardValueHistoryRequest(payload));
    dispatch(getAssetsDashboardPortfolioStatsRequest(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localState]);

  return (
    <DashboardCard title={t('naming.assetsValue')} className="dashboard-assets-value">
      <DashboardAssetValueContext.Provider value={{ localState, localDispatch, dateRange: payload }}>
        <div className="dashboard-assets-value__headed">
          <DashboardAssetValueFilters/>
          <DashboardAssetValueScoreboard/>
        </div>
        <DashboardLineChart/>
      </DashboardAssetValueContext.Provider>
    </DashboardCard>
  );
};

export default DashboardAssetValue;
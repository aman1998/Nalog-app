import { useTranslation } from "react-i18next";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { TNullable } from "config/types";

import { getAssetsDashboardP2PStatsRequest } from "store/assets/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import DashboardCard from "../DashboardCard";

import DashboardP2PExchangeScoreboard from "./components/DashboardP2PExchangeScoreboard";
import DashboardP2PExchangeFilter from "./components/DashboardP2PExchangeFilter";
import DashboardP2PExchangeDatatable from "./components/DashboardP2PExchangeDatatable";
import { EFilterTubs } from "./types";
import { formPayload } from "./utils";

const DashboardP2PExchange: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fixedDate, setFixedDate] = useState<TNullable<EFilterTubs>>(EFilterTubs.sevenDays);

  const setFilter = (value: TNullable<EFilterTubs>) => {
    switch (value) {
    case EFilterTubs.today:
      dispatch(analyticEvent(EEventType.DASHBOARD_P2P_SHOW_TODAY));
      break;
    case EFilterTubs.sevenDays:
      dispatch(analyticEvent(EEventType.DASHBOARD_P2P_SHOW_7_DAYS));
      break;
    case EFilterTubs.fourteenDays:
      dispatch(analyticEvent(EEventType.DASHBOARD_P2P_SHOW_14_DAYS));
      break;
    case EFilterTubs.thirtyDays:
      dispatch(analyticEvent(EEventType.DASHBOARD_P2P_SHOW_30_DAYS));
      break;
    }
    setFixedDate(value);
  }; 
  
  useEffect(() => {
    const payload = formPayload(fixedDate);
    dispatch(getAssetsDashboardP2PStatsRequest(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixedDate]);
  
  return <DashboardCard title={t('naming.p2pExchange')} className="dashboard-p2p-exchange">
    <div className="dashboard-p2p=exchange__headed">
      <DashboardP2PExchangeFilter fixedDate={fixedDate} setFixedDate={setFilter}/>
      <DashboardP2PExchangeScoreboard/>
    </div>
    {fixedDate && <DashboardP2PExchangeDatatable fixedDate={fixedDate}/>}
  </DashboardCard>;
};

export default DashboardP2PExchange;
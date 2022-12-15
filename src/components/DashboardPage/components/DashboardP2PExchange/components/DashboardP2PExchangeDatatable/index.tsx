import { FC, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { ECurrency } from "config/types";

import { assetsDashboardP2PStatsSelector } from "store/assets/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { formLangOptions } from "utils/highcharts";

import { EFilterTubs } from "../../types";

import { formOptions, formSeries } from "./utils";

export type DashboardP2PExchangeDatatableProps = {
  fixedDate: EFilterTubs
}

const DashboardP2PExchangeDatatable: FC<DashboardP2PExchangeDatatableProps> = ({ fixedDate }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const extraSmall = useMediaQuery({ query: `(max-width: 381px)` });
  const hoverCounter = useRef(0);
  const { data } = useSelector(assetsDashboardP2PStatsSelector);

  const options = useMemo(() => {
    const _options = formOptions({
      fixedDate, currency: data?.currency || ECurrency.rub, days: data?.days, extraSmall
    });
    return {
      ..._options,
      series: formSeries(data?.days || [])
    };
  }, [data?.days]);

  Highcharts.setOptions({
    lang: formLangOptions(i18n.language)
  });

  const handleOnMouseEnter = () => {
    hoverCounter.current++;
    if (hoverCounter.current===1) {
      dispatch(analyticEvent(EEventType.DASHBOARD_P2P_INTERACTION));
    }
  };

  return <div className="dashboard-p2p-exchange__column" onMouseEnter={handleOnMouseEnter}>
    <HighchartsReact highcharts={Highcharts} options={options} />
  </div>; 
};

export default DashboardP2PExchangeDatatable;
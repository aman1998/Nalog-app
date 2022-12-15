import { FC, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import variablePie from "highcharts/modules/variable-pie.js";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { colors, maxMobileMediaWidth } from "config/constants";

import {
  dashboardDiagramSelectedValuesSelector,
} from "store/assets/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { getDefaultVariablePieOptions } from "./constants";

variablePie(Highcharts);

export type DashboardPolarAreaProps = {
  showDiagram: boolean
}

const DashboardPolarArea: FC<DashboardPolarAreaProps> = ({ showDiagram }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)`, });
  const valuesByDiagram = useSelector(dashboardDiagramSelectedValuesSelector) || [];
  const hoverCounter = useRef(0);

  const data = useMemo(() => {
    if (!valuesByDiagram.length) {
      return [{
        name: "BTC",
        y: 3,
        z: 100,
        x: 10,
        percent: 0,
        color: colors.gray5,
        sliced: true
      },
      {
        name: t("dashboardPolarArea.noAssets"),
        y: 97,
        z: 60,
        percent: 100,
        color: "#9E83F8",
        sliced: true
      }];
    }

    const maxRatio = valuesByDiagram.reduce(
      (prev, current) => (prev.ratio > current.ratio) ? prev : current).ratio;

    return valuesByDiagram.map(value => ({
      name: value.name,
      y: Math.max(value.ratio, 1.2),
      z: value.ratio + Math.sin(value.ratio - maxRatio) * 16,
      percent: value.ratio,
      color: value.color
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesByDiagram]);

  const options = {
    ...getDefaultVariablePieOptions(isMobile),
    series: [{
      innerSize: 48,
      minPointSize: 72,
      data
    }],
  };

  const handleOnMouseEnter = () => {
    hoverCounter.current++;
    if (hoverCounter.current===1) {
      dispatch(analyticEvent(EEventType.DASHBOARD_DISTRIBUTION_SHOW_INTERACTION));
    }
  };

  
  return <div className="dashboard-diagram__variable-radius-pie" onMouseEnter={handleOnMouseEnter}>
    {showDiagram && <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />}
  </div>;
};

export default DashboardPolarArea;

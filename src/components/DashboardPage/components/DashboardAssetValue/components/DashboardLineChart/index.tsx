import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, useMemo, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth } from "config/constants";

import { assetsDashboardValueHistorySelector } from "store/assets/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { formLangOptions } from "utils/highcharts";

import { useDashboardAssetValue } from "../../context";

import { formData, formOptions } from "./utils";

const DashboardLineChart: FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const hoverCounter = useRef(0);
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });
  const { data, initialLoading } = useSelector(assetsDashboardValueHistorySelector);
  const { dateRange } = useDashboardAssetValue();

  const options = useMemo(() => {
    const $options = formOptions({ currency: data?.currency, data: data?.days, isMobile });
    return ({
      ...$options,
      series: [{
        type: 'areaspline',
        data: [...formData(data?.days, dateRange)]
      }]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.days, dateRange]);

  Highcharts.setOptions({
    lang: formLangOptions(i18n.language)
  });

  const handleOnMouseEnter = () => {
    hoverCounter.current++;
    if (hoverCounter.current===1) {
      dispatch(analyticEvent(EEventType.DASHBOARD_ASSETS_VALUE_INTERACTION));
    }
  };

  return <div className="dashboard-assets-value__line-chart" onMouseEnter={handleOnMouseEnter}>
    {!initialLoading && <HighchartsReact highcharts={Highcharts} options={options} />}
  </div>;
};

export default DashboardLineChart;

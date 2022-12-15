import moment from "moment";
import Highcharts, { SeriesColumnOptions } from "highcharts";

import { ECurrency } from "config/types";
import { colors } from "config/constants";

import { TAssetsDashboardP2PStatsDay } from "store/assets/types";

import { formatWithCurrencies, formPrice } from "utils/fractions";
import { setDateTimeLocale } from "utils/dateHelpers";

import i18n from "../../../../../../i18n";

import { EFilterTubs } from "../../types";

const daysAgo = (days: number) => {
  const now = new Date();
  const ago = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  return moment(ago).format("DD.MM");
}; 

const formCategories = (fixedDate: EFilterTubs, days?: TAssetsDashboardP2PStatsDay[]) => {
  if (!days || days.length < 1) {
    return [...Array(7)].map(item => daysAgo(item+1));
  }

  setDateTimeLocale();

  if (fixedDate === EFilterTubs.today) {
    return days.map(day => moment(day.timestamp).format("hh.mm"));
  }
  return days.map(day => moment(day.date).format("DD.MM"));
};

const DEFAULT_MIN_POINT_LENGTH = 16;
const getMinPointLength = (days?: TAssetsDashboardP2PStatsDay[]) => {
  if (!days) return DEFAULT_MIN_POINT_LENGTH;
  if (days.every(day => Number(day.sent) < 1 && Number(day.received) < 1 )) {
    return DEFAULT_MIN_POINT_LENGTH;
  }

  return 0;
};

const DEFAULT_Y_AXIS_MAX = 3000;
const getYAxisMax = (days?: TAssetsDashboardP2PStatsDay[]) => {
  if (!days) return DEFAULT_Y_AXIS_MAX;
  
  let max = 0;
  for (const day of days) {
    if (Number(day.received) > max) {
      max = Number(day.received);
    }
    if (Number(day.sent) > max) {
      max = Number(day.sent);
    }
  }
  
  if (max === 0) {
    return DEFAULT_Y_AXIS_MAX;
  }
  return max;
};

const getSteps = (fixedDate: EFilterTubs) => {
  switch (fixedDate) {
  case EFilterTubs.today:
    return 3;
  case EFilterTubs.sevenDays:
    return 1;
  case EFilterTubs.fourteenDays:
    return 2;
  case EFilterTubs.thirtyDays:
    return 4;
  default:
    return 0;
  }
};

export const formOptions = ({
  fixedDate,
  currency,
  days,
  extraSmall
}: {
  fixedDate: EFilterTubs, currency: ECurrency, days?: TAssetsDashboardP2PStatsDay[], extraSmall: boolean
}): Highcharts.Options => ({
  chart: {
    backgroundColor: 'rgba(0,0,0,0)',
    type: 'column',
    height: 305,
  },
  title: {
    text: ''
  },
  xAxis: {
    type: 'datetime',
    lineColor: 'transparent',
    tickLength: 0,
    labels: {
      style: {
        color: colors.gray7
      },
      step: getSteps(fixedDate)
    },
    categories: formCategories(fixedDate, days),
    crosshair: true,
    tickInterval: extraSmall ? 2 : undefined
  },
  yAxis: {
    minPadding: 0,
    maxPadding: 0,
    min: 0,
    max: getYAxisMax(days),
    title: {
      text: ""
    },
    labels: {
      style: {
        color: colors.gray7
      },
      formatter() {
        return formPrice(Number(this.value), currency);
      }
    },
    gridLineColor: 'transparent',
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormatter() {
      return `<tr><td style="padding:0">${i18n.t(`dashboardP2PExchangeScoreboard.${this.series.name}`)}: </td>` +
          `<td style="padding:0"><b>${formatWithCurrencies(Number(this.y), currency)}</b></td></tr>`;
    },
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.13,
      borderWidth: 0,
      minPointLength: getMinPointLength(days),
      borderRadius: 2
    },
    line: {
      softThreshold: false
    }
  },
});

type TFormSeriesResult = [SeriesColumnOptions, SeriesColumnOptions]
export const formSeries = (days: TAssetsDashboardP2PStatsDay[]): TFormSeriesResult => {
  const initialValue: TFormSeriesResult = [
    {
      'type': "column",
      'name': 'sent',
      'data': [],
      'color': colors.complementary,
    },
    {
      'type': "column",
      'name': 'received',
      'data': [],
      'color': '#69E299',
    },
  ];
  return days.reduce((acc, current) => {
    if (acc[0].data) {
      acc[0].data.push(Number(current.sent) || 0);
    }
    if (acc[1].data) {
      acc[1].data.push(Number(current.received) || 0);
    }
    return acc;
  }, initialValue);
};
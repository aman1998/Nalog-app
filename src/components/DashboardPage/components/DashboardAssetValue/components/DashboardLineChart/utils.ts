import Highcharts from "highcharts";
import moment, { Moment } from "moment";

import { ECurrency } from "config/types";
import { colors } from "config/constants";

import {
  EAssetsDashboardValueHistoryOptions,
  TAssetsDashboardValueHistoryDay
} from "store/assets/types";

import { formPrice } from "utils/fractions";
import { setDateTimeLocale } from "utils/dateHelpers";

import { DEFAULT_SERIES_DATA } from "./constants";

function onDraw() {
  const path = [
    'M',
    0,
    this.chartHeight-36,
    'L',
    this.chartWidth,
    this.chartHeight-36,

    this.chartWidth,
    this.chartHeight-37,
    0,
    this.chartHeight-37,
  ];
  if (this.compassrose) {
    this.compassrose.animate({
      d: path
    });
  } else {
    this.compassrose = this.renderer.path(path)
      .attr({
        fill: colors.gray4,
      })
      .add();
  }
}

export const formOptions = ({
  currency,
  isMobile,
  // data
}: {
  currency?: ECurrency,
  data?: TAssetsDashboardValueHistoryDay[] | null,
  isMobile: boolean
}): Highcharts.Options => ({
  chart: {
    height: 300,
    backgroundColor: 'rgba(0,0,0,0)',
    type: 'areaspline',
    events: {
      load: isMobile ? onDraw : undefined
    }
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
      }
    },
    plotBands: [{ // visualize the weekend
      from: 4.5,
      to: 6.5,
      color: "rgba(68, 170, 213, .2)"
    }],
  },
  yAxis: {
    title: {
      text: ''
    },
    labels: {
      enabled: !isMobile,
      style: {
        color: colors.gray7
      },
      formatter() {
        return formPrice(Number(this.value), currency);
      }
    },
    visible: !isMobile,
    gridLineColor: 'transparent'
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  tooltip: {
    formatter() {
      return `<p><b>${moment(this.x).format("DD MMM")}</b></p>
            <p><b>${formPrice(Number(this.y), currency)}</b></p>`;
    }
  },
  plotOptions: {
    areaspline: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, "#748ADA"],
          [1, String(Highcharts.color("white").setOpacity(0).get('rgba'))]
        ]
      },
      marker: {
        enabled: false,
        radius: 2,
        fillColor: colors.pink,
        lineColor: colors.pink,
        states: {
          hover:{
            animation:{
              duration:50
            },
            enabled:true,
            fillColor:colors.pink,
            lineColor:colors.pink,
            lineWidth:undefined,
            lineWidthPlus:1,
            radius:undefined,
            radiusPlus:2,
          },
          select: {
            enabled:true,
            fillColor:colors.pink,
            lineColor:colors.pink,
            lineWidth:2,
            radius:undefined,
          }
        }
      },
      lineWidth: 1,
      lineColor: colors.gray8,
      states: {
        hover: {
          lineWidth: 1
        }
      },
      threshold: null,
      crisp: false
    },
  },
});

const formEmptyDays = (from: Moment, to: Moment): [number, number][] => {
  const days: [number, number][] = [];
  for (const m = moment(from); m.isBefore(to); m.add(1, 'days')) {
    days.push([m.valueOf(), 0]);
  }

  return days;
};

const formDefaultSeriesData = (dateRange: EAssetsDashboardValueHistoryOptions) => {
  setDateTimeLocale();
  const from = dateRange?.date_from && moment(dateRange.date_from);
  const to = dateRange?.date_to && moment(dateRange.date_to);

  return (from && to) ? formEmptyDays(from, to) : [];
};

const fillMissedDates = (days: TAssetsDashboardValueHistoryDay[]) => {
  setDateTimeLocale();
  const from = moment(days[0].date);
  const to = moment(days[days.length - 1].date);

  const res: [number, number][] = [];
  let index = 0;

  for (const m = moment(from); m.diff(to, 'days') <= 0; m.add(1, 'days')) {
    const iDay = days[index];
    const iDate = moment(days[index].date);
    if (m.isSame(iDate)) {
      res.push([iDate.valueOf(), iDay.value]);
      index = index + 1;

    } else if (iDate > m) {
      const emptyDays = formEmptyDays(m, iDate);
      res.push(...emptyDays, [iDate.valueOf(), iDay.value]);
      index = index + 1;
      m.add(emptyDays.length, 'days');
    }
  }
  return res;
};

export const formData = (
  days?: TAssetsDashboardValueHistoryDay[] | null,
  dateRange?: EAssetsDashboardValueHistoryOptions
): [number, number][] => (days && days.length > 0)
  ? fillMissedDates(days)
  : dateRange ? formDefaultSeriesData(dateRange) : DEFAULT_SERIES_DATA;


import { colors } from "config/constants";

import i18n from "../../../../i18n";

import { EDashboardProgressStatuses } from "./types";

export const getPathColor = (status: EDashboardProgressStatuses): string | string[] => {
  switch (status) {
  case EDashboardProgressStatuses.ok:
    return "#5BE02D";
  case EDashboardProgressStatuses.almost:
    return ["#5BE02D", "#DBFF00"];
  default:
    return ['#E6D542', '#FF1F00'];
  }
};

export const getProgressStatus = (
  percentage: number
): { status: EDashboardProgressStatuses, statusText: string, fill?: string, stroke?: string } => {
  if (percentage >= 95) {
    return {
      status: EDashboardProgressStatuses.ok,
      statusText: i18n.t("dashboardRiskScore.statusTextOk"),
      fill: colors.main,
      stroke: colors.main
    };
  } else if (percentage >= 46) {
    return {
      status: EDashboardProgressStatuses.almost,
      statusText: i18n.t("dashboardRiskScore.statusTextAlmost"),
      stroke: "#5CE02D"
    };
  } else if (percentage >= 30) {
    return {
      status: EDashboardProgressStatuses.some,
      statusText: i18n.t("dashboardRiskScore.statusTextSome"),
      stroke: "#F5E022"
    };
  } else if (percentage === 0) {
    return {
      status: EDashboardProgressStatuses.zero,
      statusText: i18n.t("dashboardRiskScore.statusTextNot"),
      stroke: "#FF1F01"
    };
  }
  return {
    status: EDashboardProgressStatuses.not,
    statusText: i18n.t("dashboardRiskScore.statusTextNot"),
    stroke: "#FF1F01"
  };
};
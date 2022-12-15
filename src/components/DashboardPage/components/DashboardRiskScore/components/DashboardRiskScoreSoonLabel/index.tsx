import { useTranslation } from "react-i18next";

import EmptyLabelIcon from "components/Icons/EmptyLabelIcon";

const DashboardRiskScoreSoonLabel = (): JSX.Element => {
  const { t } = useTranslation();
  return <span className="dashboard-risk-score__soon">
    <EmptyLabelIcon/>
    <span>{t("dashboardRiskScore.soon")}</span>
  </span>;
};

export default DashboardRiskScoreSoonLabel;
import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { assetsDashboardPortfolioStatsSelector, valueByAssetsDataSelector } from "store/assets/selectors";

import { abbreviateCurrency, currencyFormat } from "utils/fractions";

import DashboardAssetValueScoreboardItem from "./components/DashboardAssetValueScoreboardItem";

const DashboardAssetValueScoreboard: FC = () => {
  const { t } = useTranslation();
  const valueByAssets = useSelector(valueByAssetsDataSelector);
  const { data } = useSelector(assetsDashboardPortfolioStatsSelector);

  const getGainValue = (): string => {
    const gain = Number(data?.gain.replace("-", ""));
    const isNegative = Number(data?.gain) < 0;
    const value = data?.currency
      ? abbreviateCurrency(data?.currency, gain) : currencyFormat(gain, 0);
    if (isNegative) {
      return `- ${value}`;
    }
    return value;
  };

  return (
    <div className="dashboard-assets-value__scoreboard">
      <DashboardAssetValueScoreboardItem
        title={t("dashboardAssetValueScoreboard.totalValue")}
        value={valueByAssets?.currency
          ? abbreviateCurrency(valueByAssets?.currency, Number(valueByAssets?.total_cost))
          : currencyFormat(Number(valueByAssets?.total_cost), 0)}
        tooltip={t("dashboardAssetValueScoreboard.totalValueTooltip")}
      />
      <DashboardAssetValueScoreboardItem
        title={t("dashboardAssetValueScoreboard.gain")}
        value={getGainValue()}
        red={Number(data?.gain) < 0}
        green={Number(data?.gain) >= 0}
        tooltip={t("dashboardAssetValueScoreboard.gainTooltip")}
      />
      <DashboardAssetValueScoreboardItem
        title={t("dashboardAssetValueScoreboard.turnover")}
        value={data?.currency
          ? abbreviateCurrency(data?.currency, Number(data?.turnover)) : currencyFormat(Number(data?.turnover), 0)}
        tooltip={t("dashboardAssetValueScoreboard.turnoverTooltip")}
      />
      <DashboardAssetValueScoreboardItem
        title={t("dashboardAssetValueScoreboard.transactions")}
        value={currencyFormat(data?.transactions, 0)}
        tooltip={t("dashboardAssetValueScoreboard.transactionsTooltip")}
      />
    </div>
  );
};

export default DashboardAssetValueScoreboard;
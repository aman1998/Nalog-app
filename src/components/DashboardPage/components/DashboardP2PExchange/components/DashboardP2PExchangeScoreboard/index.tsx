import { FC } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { assetsDashboardP2PStatsSelector } from "store/assets/selectors";

import { abbreviateCurrency, currencyFormat } from "utils/fractions";

import DashboardP2PExchangeScoreboardItem from "./components/DashboardP2PExchangeScoreboardItem";

const DashboardP2PExchangeScoreboard: FC = () => {
  const { t } = useTranslation();
  const { data } = useSelector(assetsDashboardP2PStatsSelector);

  return (
    <div className="dashboard-p2p-exchange__scoreboard">
      <DashboardP2PExchangeScoreboardItem
        title={t("dashboardP2PExchangeScoreboard.sent")}
        value={data?.currency
          ? abbreviateCurrency(data?.currency, Number(data?.sent)) : currencyFormat(Number(data?.sent), 0)}
        tooltip={t("dashboardP2PExchangeScoreboard.sentTooltip")}
      />
      <DashboardP2PExchangeScoreboardItem
        title={t("dashboardP2PExchangeScoreboard.received")}
        value={data?.currency
          ? abbreviateCurrency(data?.currency, Number(data?.received)) : currencyFormat(Number(data?.received), 0)}
        tooltip={t("dashboardP2PExchangeScoreboard.receivedTooltip")}
      />
      <DashboardP2PExchangeScoreboardItem
        title={t("dashboardP2PExchangeScoreboard.profit")}
        value={data?.currency
          ? abbreviateCurrency(data?.currency, Number(data?.profit)) : currencyFormat(Number(data?.profit), 0)}
        green={true}
        tooltip={t("dashboardP2PExchangeScoreboard.profitTooltip")}
      />
      <DashboardP2PExchangeScoreboardItem
        title={t("dashboardP2PExchangeScoreboard.transactions")}
        value={currencyFormat(data?.transactions, 0)}
        tooltip={t("dashboardP2PExchangeScoreboard.transactionsTooltip")}
      />
    </div>
  );
};

export default DashboardP2PExchangeScoreboard;
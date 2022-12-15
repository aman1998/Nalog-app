import { FC } from "react";

import DashboardAssetValue from "../DashboardAssetValue";
import DashboardTaxesAndIncomes from "../DashboardTaxesAndIncomes";
import DashboardAssets from "../DashboardAssets";
import DashboardDiagram from "../DashboardDiagram";
import DashboardTransactions from "../DashboardTransactions";
import DashboardRiskScore from "../DashboardRiskScore";
import DashboardYourAccounts from "../DashboardYourAccounts";
import DashboardP2PExchange from "../DashboardP2PExchange";

const DashboardMobile: FC = () => (
  <div className="dashboard-mobile">
    <DashboardRiskScore/>
    <DashboardYourAccounts/>
    <DashboardTaxesAndIncomes/>
    <DashboardAssets/>
    <DashboardAssetValue/>
    <DashboardP2PExchange/>
    <DashboardDiagram/>
    <DashboardTransactions/>
  </div>
);

export default DashboardMobile;
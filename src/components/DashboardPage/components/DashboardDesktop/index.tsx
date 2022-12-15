import { FC } from "react";

import DashboardAssetValue from "../DashboardAssetValue";
import DashboardTaxesAndIncomes from "../DashboardTaxesAndIncomes";
import DashboardAssets from "../DashboardAssets";
import DashboardDiagram from "../DashboardDiagram";
import DashboardTransactions from "../DashboardTransactions";
import DashboardRiskScore from "../DashboardRiskScore";
import DashboardYourAccounts from "../DashboardYourAccounts";
import DashboardP2PExchange from "../DashboardP2PExchange";

const DashboardDesktop: FC = () => (
  <div className="dashboard-desktop">
    <div className="dashboard-top row">
      <DashboardRiskScore/>
      <DashboardYourAccounts/>
      <DashboardTaxesAndIncomes/>
    </div>
    <div className="row">
      <DashboardAssetValue/>
      <DashboardAssets/>
    </div>
    <div className="row">
      <DashboardP2PExchange/>
      <DashboardDiagram/>
    </div>

    <DashboardTransactions/>
  </div>
);

export default DashboardDesktop;
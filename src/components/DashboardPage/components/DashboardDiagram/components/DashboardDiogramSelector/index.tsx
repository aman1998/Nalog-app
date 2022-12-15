import { FC } from "react";

import DashboardDiagramRadio from "../DashboardDiagramRadio";
import DashboardDiagramAssets from "../DashboardDiagramAssets";

const DashboardDiagramSelector: FC = () => (
  <div className="dashboard-diagram-selector">
    <DashboardDiagramRadio />
    <DashboardDiagramAssets />
  </div>
);

export default DashboardDiagramSelector;
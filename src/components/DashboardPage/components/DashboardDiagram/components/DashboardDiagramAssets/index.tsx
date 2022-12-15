import { FC } from "react";
import { useSelector } from "react-redux";

import { ECurrency } from "config/types";

import { dashboardDiagramSelectedValuesSelector, valueByAssetsDataSelector } from "store/assets/selectors";

import DashboardDiagramAssetsItem from "./componets/DashboardDiagramAssetsItem";

const DashboardDiagramAssets: FC = () => {
  const valuesByDiagram = useSelector(dashboardDiagramSelectedValuesSelector);
  const data = useSelector(valueByAssetsDataSelector);

  return (
    <table className="dashboard-diagram-assets">
      <tbody>
        {!valuesByDiagram?.length && (
          <DashboardDiagramAssetsItem
            name="BTC"
            color="#9E83F8"
            ratio={0}
            value="0"
            currency={data?.currency || ECurrency.rub}
          />
        )}
        {!!valuesByDiagram?.length && valuesByDiagram?.map(value => (
          <DashboardDiagramAssetsItem
            key={value.id || value.name}
            name={value.name}
            color={value.color}
            ratio={value.ratio}
            value={value.value}
            currency={value.currency}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DashboardDiagramAssets;
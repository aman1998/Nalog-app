import { FC } from 'react';

import { formatWithCurrencies } from "utils/fractions";

import { DashboardDiagramAssetsItemProps } from "./types";


const DashboardDiagramAssetsItem: FC<DashboardDiagramAssetsItemProps> = ({
  name, ratio, value, color, currency 
}) => {
  const formName = (n: string) => {
    if (n.length > 18) {
      return n.slice(0,18) + '...';
    }
    return n;
  };
  
  return <tr>
    <td className="dashboard-diagram-assets__name">
      <div style={{
        top: 8,
        left: 0,
        width: 6,
        height: 6,
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: color
      }}/>
      {formName(name)}
    </td>
    <td className="dashboard-diagram-assets__ratio">
      {ratio}%
    </td>
    <td className="dashboard-diagram-assets__amount">
      {formatWithCurrencies(Number(value), currency)}
    </td>
  </tr>;
};

export default DashboardDiagramAssetsItem;
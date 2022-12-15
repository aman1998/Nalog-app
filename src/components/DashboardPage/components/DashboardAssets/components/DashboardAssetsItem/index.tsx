import { FC } from "react";

import CryptoIcon from "components/CryptoIcon";

import { abbreviateFormatAmount, formatWithCurrencies } from "utils/fractions";

import { DashboardAssetsItemProps } from "./types";

const DashboardAssetsItem: FC<DashboardAssetsItemProps> = ({ name, amount, value, currency }) => (
  <div className="dashboard-assets-item">
    <div className="dashboard-assets-item__crypto">
      <CryptoIcon asset={name} />
      <div className="dashboard-assets-item__name">
        {name}
      </div>
    </div>
    <div className="dashboard-assets-item__amounts">
      {amount && <div className="dashboard-assets-item__amount">
        {abbreviateFormatAmount(Number(amount))}<span className="dashboard-assets-item__name">{name}</span>
      </div>}
      <div className="dashboard-assets-item__value_rub">{formatWithCurrencies(Number(value), currency)}</div>
    </div>
  </div>
);

export default DashboardAssetsItem;
import { FC } from "react";
import cn from "classnames";

import BNTooltip from "components/BNTooltip";
import AssetNoteIcon from "components/Icons/AssetNoteIcon";

export type DashboardP2PExchangeScoreboardItemProps = {
  title: string;
  value: string;
  tooltip: string;
  green?: boolean;
}

const DashboardP2PExchangeScoreboardItem: FC<DashboardP2PExchangeScoreboardItemProps> = (
  { title, value, green, tooltip }
) => (
  <div className="dashboard-p2p-exchange__scoreboard__item">
    <div className="dashboard-p2p-exchange__scoreboard__item__header">
      <span className="dashboard-p2p-exchange__scoreboard__item__title">{title}</span>
      <BNTooltip title={tooltip}>
        <span>
          <AssetNoteIcon />
        </span>
      </BNTooltip>
    </div>
    <div className={cn("dashboard-p2p-exchange__scoreboard__item__content", { green })}>
      {value}
    </div>
  </div>
);

export default DashboardP2PExchangeScoreboardItem;
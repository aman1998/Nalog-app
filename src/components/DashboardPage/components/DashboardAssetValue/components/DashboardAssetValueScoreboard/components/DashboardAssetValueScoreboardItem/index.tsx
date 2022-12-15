import { FC } from "react";
import cn from "classnames";

import BNTooltip from "components/BNTooltip";
import AssetNoteIcon from "components/Icons/AssetNoteIcon";

export type DashboardAssetValueScoreboardItemProps = {
  title: string;
  value: string;
  tooltip: string;
  green?: boolean;
  red?: boolean;
}

const DashboardAssetValueScoreboardItem: FC<DashboardAssetValueScoreboardItemProps> = (
  { title, value, green, red, tooltip }
) => (
  <div className="dashboard-assets-value__scoreboard__item">
    <div className="dashboard-assets-value__scoreboard__item__header">
      <span className="dashboard-assets-value__scoreboard__item__title">{title}</span>
      <BNTooltip title={tooltip}>
        <span>
          <AssetNoteIcon />
        </span>
      </BNTooltip>
    </div>
    <div className={cn("dashboard-assets-value__scoreboard__item__content", { green, red })}>
      {value}
    </div>
  </div>
);

export default DashboardAssetValueScoreboardItem;
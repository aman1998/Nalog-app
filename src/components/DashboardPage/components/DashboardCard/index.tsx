import { FC } from "react";
import cn from "classnames";

import { DashboardCardProps } from "./types";

const DashboardCard: FC<DashboardCardProps> = ({ 
  title, className,  children, isEmpty 
}) => (
  <div className={cn("dashboard-card", className, { empty: isEmpty })}>
    <h4 className="dashboard-card__title">
      {title}
    </h4>
    <div className="dashboard-card__content">
      {children}
    </div>
  </div>
);

export default DashboardCard;
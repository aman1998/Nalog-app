import { FC } from "react";
import { Skeleton } from "antd";

const DashboardAssetsItemsSkeleton: FC = () => (
  <div className="dashboard-assets-skeleton">
    {[...Array(6)].map((_, index) => (
      <Skeleton key={index} avatar={true} paragraph={{ rows: 1 }} active={true} />
    ))}
  </div>
);

export default DashboardAssetsItemsSkeleton;


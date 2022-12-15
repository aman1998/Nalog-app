import { Skeleton } from "antd";

const AssetsSingleSkeleton = (): JSX.Element => (
  <Skeleton
    avatar={true}
    paragraph={{ rows: 8 }}
    className="assets-single-skeleton"
  />
);

export default AssetsSingleSkeleton;

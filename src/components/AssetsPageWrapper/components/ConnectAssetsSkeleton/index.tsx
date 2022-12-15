import { Skeleton, Space } from "antd";

const ConnectAssetsSkeleton = (): JSX.Element => <Space className="connect-modal_content__skeleton">
  <Skeleton.Button active={true} />
  <Skeleton.Button active={true} />
  <Skeleton.Button active={true} />
</Space>;

export default ConnectAssetsSkeleton;
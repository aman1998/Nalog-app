import { Skeleton, Space } from "antd";

const TransactionListSkeleton = (): JSX.Element => ( 
  <Space direction="vertical" className="transactions-list__skeleton">
    <Skeleton.Button className="transactions-list__skeleton__title" active={true}/>
    <div className="transactions-list__skeleton__items">
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
    </div>
    <Skeleton.Button className="transactions-list__skeleton__title" active={true}/>
    <div className="transactions-list__skeleton__items">
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
    </div>
    <Skeleton.Button className="transactions-list__skeleton__title" active={true}/>
    <div className="transactions-list__skeleton__items">
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
    </div>
    <Skeleton.Button className="transactions-list__skeleton__title" active={true}/>
    <div className="transactions-list__skeleton__items">
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
      <Skeleton.Button className="transactions-list__skeleton__item" active={true}/>
    </div>
  </Space>
);

export default TransactionListSkeleton;
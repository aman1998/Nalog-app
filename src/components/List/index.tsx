import { Spin } from "antd";
import isEmpty from "lodash/isEmpty";

import { TListProps } from "./types";

const List = <T extends unknown>({
  component,
  loading,
  preloader = <Spin />,
  emptyText = <span/>,
  data,
}: TListProps<T>): JSX.Element => {
  if (loading) return preloader;
  if (!isEmpty(data)) return component;
  if (isEmpty(data)) return emptyText;

  return <></>;
};

export default List;

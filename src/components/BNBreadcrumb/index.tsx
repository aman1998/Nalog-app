import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Breadcrumb } from 'antd';
import cn from "classnames";

import { TBreadcrumbProps } from "./types";

const BNBreadcrumb: FC<TBreadcrumbProps> = ({ items }) => {
  const history = useHistory();

  const goTo = (link: string | undefined) => {
    if(!!link) history.push(link);
  };

  return (
    <Breadcrumb className="breadcrumb">
      {
        items.map(item => (
          <Breadcrumb.Item
            className={cn("breadcrumb-item", {
              breadcrumbItemActive: !item.to
            })}
            key={item.label}
            onClick={() => goTo(item.to)}
          >
            {item.label}
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
};

export default BNBreadcrumb;

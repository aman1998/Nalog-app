import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { maxMobileMediaWidth } from "config/constants";
import { ECurrency } from "config/types";

import { valueByAssetsDataSelector, } from "store/assets/selectors";

import DashboardAssetsItem from "../DashboardAssetsItem";

import { DashboardAssetsProps } from "./types";

const DashboardAssetsItems: FC<DashboardAssetsProps> = memo(({ isModal }) => {
  const data = useSelector(valueByAssetsDataSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  const assets = (() => {
    if (isModal) {
      return data?.assets;
    }
    if (isMobile && data?.count === 0) {
      return data?.assets.slice(0, 1);
    }
    if (isMobile) {
      return data?.assets.slice(0, 3);
    }
    return data?.assets.slice(0, 8);
  })();

  return (
    <>
      {
        assets?.map((item, index) =>
          (<DashboardAssetsItem 
            key={index} 
            name={item.name}
            amount={item.amount}
            value={item.value} 
            currency={data?.currency ? data?.currency : ECurrency.rub}
          />)
        )
      }
    </>
  );
});


export default DashboardAssetsItems;
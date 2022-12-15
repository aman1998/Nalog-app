import cn from "classnames";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isNull from "lodash/isNull";

import SoonLabelIcon from "components/Icons/SoonLabelIcon";

import { TAssetsData } from "store/assets/types";
import { getAssetsDataSelector } from "store/assets/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { filterListBySearch } from "utils/filters";

import { AddAccountModalListProps } from "./types";

const AddAccountModalList: FC<AddAccountModalListProps> = ({ type, searchValue, setSelectedAsset }) => {
  const data = useSelector(getAssetsDataSelector);
  const filteredListByType = data?.filter((item: TAssetsData) => isNull(type) || item.type === type );
  const dispatch = useDispatch();

  const handleAddAssets = (item: TAssetsData): void => {
    if (item.soon) return;
    dispatch(analyticEvent(`${EEventType.WALLET_NEW_ACCOUNT_STEP_2_START}:${item.code}`));
    setSelectedAsset(item);
  };

  const filteredListBySearch = filterListBySearch<TAssetsData>(filteredListByType, searchValue, "name");

  useEffect(() => {
    if (filteredListBySearch.length === 0 && searchValue?.trim()) {
      dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_1_NOT_FOUND));
    }
  }, [searchValue]);

  return <>
    {filteredListBySearch?.map(
      (item: TAssetsData) =>
        !item?.archived && (
          <div className="item-wrapper" key={item.id}>
            <div
              className={cn("item", { soon: item.soon })}
              key={item.name}
              onClick={() => handleAddAssets(item)}
            >
              <img src={item.icon} alt="assets-icon" className="item-logo" />
              <h3 className={cn("item-title", { soon: item.soon })}>{item.name}</h3>
              {item.soon && <SoonLabelIcon className="item-soon" />}
            </div>
          </div>
        )
    )}
  </>;
};

export default AddAccountModalList;

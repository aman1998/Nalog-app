import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { getAssetsSinglePath } from "config/paths";

import { getAssetsDataSelector } from "store/assets/selectors";
import { TMyAssetsData } from "store/assets/types";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { formAssetsName } from "utils/assetsHelper";

const AssetsListItem: React.FC<TMyAssetsData> = item => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const assets = useSelector(getAssetsDataSelector);

  const getAssetType = (myAsset?: TMyAssetsData) => assets?.find(asset => asset.id === myAsset?.stock)?.type;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (item.id !== id) {
      history.push(getAssetsSinglePath(item.id));
      dispatch(analyticEvent(EEventType.WALLET_SHOW_ACCOUNT_INFO));
    }
  };

  return (
    <a
      className={cn("assets-item", { active: item.id === id })}
      key={item.id}
      onClick={onClick}
    >
      <img src={item.icon} alt="assets-icon" className="assets-item-logo" />
      <h3 className="item-title">{formAssetsName(item.name, getAssetType(item))}</h3>
    </a>
  );
};

export default AssetsListItem;

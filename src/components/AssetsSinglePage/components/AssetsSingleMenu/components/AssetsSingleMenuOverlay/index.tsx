import { FC, useRef } from 'react';
import { Menu } from "antd";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { EAssetsTypes } from "config/types";
import { maxMobileMediaWidth } from "config/constants";

import useOnClickOutside from "hooks/useOnClickOutside";

import {
  getSingleAssetDataSelector,
  getSingleAssetDeleteFetchingSelector,
  startAccountSyncLoadingSelector
} from "store/assets/selectors";
import { startAccountSyncRequest } from "store/assets/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { EAssetsSingleMenuStatesKeys } from "../../types";

import { AssetsSingleMenuOverlayProps } from "./types";

const AssetsSingleMenuOverlay: FC<AssetsSingleMenuOverlayProps> = ({ setVisibleTrue, setVisibleFalse }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const loading = useSelector(startAccountSyncLoadingSelector(id));
  const data = useSelector(getSingleAssetDataSelector(id));
  const deletingAsset = useSelector(getSingleAssetDeleteFetchingSelector(id));

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside({ ref: wrapperRef, handler: () => setVisibleFalse(EAssetsSingleMenuStatesKeys.dropdown) });

  const handleClickAccountSync = () => {
    setVisibleFalse(EAssetsSingleMenuStatesKeys.dropdown);
    dispatch(startAccountSyncRequest(id));
    dispatch(analyticEvent(EEventType.WALLETS_ACCOUNT_SYNC));
  };

  const handleClickRename = () => {
    setVisibleFalse(EAssetsSingleMenuStatesKeys.dropdown);
    setVisibleTrue(EAssetsSingleMenuStatesKeys.rename);
    dispatch(analyticEvent(EEventType.WALLETS_ACCOUNT_RENAME_START));
  };

  const handleClickConnect = () => {
    setVisibleFalse(EAssetsSingleMenuStatesKeys.dropdown);
    setVisibleTrue(EAssetsSingleMenuStatesKeys.connect);
    dispatch(analyticEvent(EEventType.WALLETS_ACCOUNT_CONFIGURE_START));
  };

  const handleClickDelete = () => {
    setVisibleFalse(EAssetsSingleMenuStatesKeys.dropdown);
    setVisibleTrue(EAssetsSingleMenuStatesKeys.delete);
    dispatch(analyticEvent(EEventType.WALLETS_ACCOUNT_DELETE_START));
  };

  return <div ref={wrapperRef}>
    <Menu className="assets-single__header_menu" >
      {isMobile && (
        <Menu.Item key="1" onClick={() => handleClickAccountSync()} disabled={loading}>
          {loading ? t('accountSync.synchronizing') : t('accountSync.synchronize')}
        </Menu.Item>
      )}
      <Menu.Item key="2" onClick={() => handleClickRename()}>
        {t('action.rename')}
      </Menu.Item>
      {data?.stock_type === EAssetsTypes.EXCHANGE && (
        <Menu.Item key="3" onClick={() => handleClickConnect()}>
          {t('accountSync.syncOptions')}
        </Menu.Item>
      )}
      <Menu.Item
        key="4"
        className="assets-single__header_menu_delete"
        onClick={() => handleClickDelete()}
        disabled={deletingAsset}
      >
        {t('accountSync.deleteAccount')}
      </Menu.Item>
    </Menu>
  </div>;
};

export default AssetsSingleMenuOverlay;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SyncIcon from "components/Icons/SyncIcon";
import SyncLoader from "components/SyncLoader";

import { startAccountSyncRequest } from "store/assets/reducers";
import { startAccountSyncLoadingSelector } from "store/assets/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";


const SyncActionIcon = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const loading = useSelector(startAccountSyncLoadingSelector(id));

  const onClickSync = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(startAccountSyncRequest(id));
    dispatch(analyticEvent(EEventType.WALLETS_ACCOUNT_SYNC));
  };

  return (
    <>
      <div className="assets-single__sub_header_sync-action_icon">
        {!loading ? (
          <a onClick={onClickSync}>
            <SyncIcon />
          </a>
        ) : (
          <SyncLoader isSpin={true} />
        )}
      </div>
      <div className="assets-single__sub_header_sync-action_text">
        {!loading ? t('accountSync.synchronize') : t('accountSync.synchronizing')}
      </div>
    </>
  );
};

export default SyncActionIcon;

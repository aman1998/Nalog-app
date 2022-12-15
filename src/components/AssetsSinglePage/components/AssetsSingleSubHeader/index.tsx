import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";
import { useParams } from "react-router-dom";

import { ESyncStatus } from "config/types";
import { maxMobileMediaWidth } from "config/constants";

import SuccessIcon from "components/Icons/SuccessIcon";
import InfoIcon from "components/Icons/InfoIcon";
import DangerIcon from "components/Icons/DangerIcon";

import {
  getSingleAssetDataSelector,
  startAccountSyncFailureSelector,
  startAccountSyncLoadingSelector,
} from "store/assets/selectors";

import AssetsSingleMenu from "../AssetsSingleMenu";
import SyncActionIcon from "../SyncActionIcon";

import { getSyncDate, getTitle } from "./utils";

const AssetsSingleSubHeader = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getSingleAssetDataSelector(id));
  const failureData = useSelector(startAccountSyncFailureSelector(id));
  const loading = useSelector(startAccountSyncLoadingSelector(id));
  const error = failureData?.config?.url?.includes(id);
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });

  const getStatus = () => {
    if (error || data?.status === ESyncStatus.error) return ESyncStatus.error;
    return data?.status ? "success" : "info";
  };

  const getSyncStatusIcon = () => {
    if (error || data?.status === ESyncStatus.error) return <DangerIcon />;
    return data?.status ? <SuccessIcon /> : <InfoIcon />;
  };

  return (
    <div className={cn("assets-single__sub_header_wrapper", getStatus())}>
      <div className="assets-single__sub_header_sync-status">
        <div className="assets-single__sub_header_sync-status_icon">{getSyncStatusIcon()}</div>
        <div className="assets-single__sub_header_sync-status_content">
          <div className="assets-single__sub_header_sync-status_title">
            {getTitle(loading, data?.status, data?.error_code)}
          </div>
          <div className="assets-single__sub_header_sync-status_date">
            {getSyncDate(loading, error, data?.status, data?.sync_max_time)}
          </div>
        </div>
      </div>
      <div className="assets-single__sub_header_sync-action">
        {isMobile ? <AssetsSingleMenu /> : <SyncActionIcon />}
      </div>
    </div>
  );
};

export default AssetsSingleSubHeader;

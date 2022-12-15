import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";

import { maxMobileMediaWidth } from "config/constants";
import { ESyncStatus } from "config/types";

import Button from "components/Buttons/Button";
import SyncIcon from "components/Icons/SyncIcon";
import PlusIcon from "components/Icons/PlusIcon";
import SyncLoader from "components/SyncLoader";

import { assetsDashboardAssetsSelector, assetsDashboardSyncAccountSelector } from "store/assets/selectors";
import {
  getAssetsDashboardAssetsRequest,
  getAssetsDashboardSyncAccountRequest,
  showModal as showModalAction
} from "store/assets/reducers";
import { setRedirectOnCreateAssets } from "store/common/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { formStatusText } from "./utils";

const DashboardYourAccounts = (): JSX.Element => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)`, });
  const { data, fetching } = useSelector(assetsDashboardAssetsSelector);
  const { failure: error, syncLoading } = useSelector(assetsDashboardSyncAccountSelector);
  const dispatch = useDispatch();
  const { statusText } = formStatusText(data, error, syncLoading, isMobile);
  const loading = fetching && !data;

  useEffect(() => {
    dispatch(getAssetsDashboardAssetsRequest({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addAccount = () => {
    dispatch(setRedirectOnCreateAssets(true));
    dispatch(showModalAction(true));
  };

  const onClickSync = () => {
    if (!data?.accounts) {
      dispatch(analyticEvent(EEventType.DASHBOARD_ACCOUNTS_ADD_FIRST));
      addAccount();
      return;
    }
    dispatch(analyticEvent(EEventType.DASHBOARD_ACCOUNTS_SYNC));
    dispatch(getAssetsDashboardSyncAccountRequest());
  };

  const onClickPlus = () => {
    dispatch(analyticEvent(EEventType.DASHBOARD_ACCOUNTS_ADD_NEW));
    addAccount();
  };

  return <div className="dashboard-your-accounts">
    <div className="dashboard-your-accounts__header">
      <div className="dashboard-your-accounts__header__title">
        {isMobile ? t("dashboardYourAccounts.titleMobile") : t("dashboardYourAccounts.title")}
        {!isMobile && !!data?.accounts && (data?.accounts > 0) && <span
          className="dashboard-your-accounts__header__plus"
          onClick={onClickPlus}
        ><PlusIcon/></span>}
        {isMobile && <span onClick={onClickSync}>
          {
            syncLoading &&  <SyncLoader isSpin={true} />
            || data?.status === null && <span onClick={onClickPlus}><PlusIcon/></span>
            || (data?.status === ESyncStatus.synchronized || data?.status === ESyncStatus.error )&&  <SyncIcon/>
          }
        </span>}
      </div>
      {isMobile && statusText && <div className="dashboard-your-accounts__header__status">
        {statusText}
      </div>}
    </div>
    <div className="dashboard-your-accounts__content">
      <div className="dashboard-your-accounts__content__col">
        {loading
          ? <Skeleton.Button active={true}  className="dashboard-your-accounts__type__loading" />
          : <div className="dashboard-your-accounts__type">
            <span className="dashboard-your-accounts__type__count">{ data?.exchanges } - </span>
            <span>{t("dashboardYourAccounts.exchange")}</span>
          </div>
        }
        {loading
          ? <Skeleton.Button active={true} className="dashboard-your-accounts__type__loading" />
          : <div className="dashboard-your-accounts__type">
            <span className="dashboard-your-accounts__type__count">{ data?.wallets } - </span>
            <span>{t("dashboardYourAccounts.wallets")}</span>
          </div>
        }
      </div>
      <div className="dashboard-your-accounts__content__col">
        {loading
          ? <Skeleton.Button active={true} className="dashboard-your-accounts__type__loading" />
          : <div className="dashboard-your-accounts__type">
            <span className="dashboard-your-accounts__type__count">{ data?.blockchains } - </span>
            <span>{t("dashboardYourAccounts.blockcheins")}</span>
          </div>
        }
        {loading
          ? <Skeleton.Button active={true} className="dashboard-your-accounts__type__loading" />
          : <div className="dashboard-your-accounts__type">
            <span className="dashboard-your-accounts__type__count">0 - </span>
            <span>NFT ({t("dashboardYourAccounts.soon")})</span>
          </div>
        }
      </div>
    </div>
    {!isMobile && <div className="dashboard-your-accounts__sync">
      <Button
        title={statusText}
        icon={
          (syncLoading && <SyncLoader isSpin={true} />)
          || ((data?.status === ESyncStatus.synchronized || data?.status === ESyncStatus.error) && <SyncIcon/>)
        }
        onClick={onClickSync}
        className={cn("dashboard-your-accounts__sync__btn", {
          error: data?.status === ESyncStatus.error && !syncLoading, synchronizing: syncLoading
        })}
        disabled={syncLoading}
      />
    </div>}
  </div>;
};

export default DashboardYourAccounts;

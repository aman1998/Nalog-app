import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import ArrowIcon from "components/Icons/ArrowIcon";

import {
  getMyAssetsSelector,
  valueByAssetsDataSelector,
  valueByAssetsFetchingSelector,
  valueByAssetsModalLoadingSelector
} from "store/assets/selectors";
import { showModal as showModalAction, valueByAssetsRequest } from "store/assets/reducers";
import { dashboardOnboardingSelector } from "store/common/selectors";
import { fakeGetValueByAssetsRequest } from "store/assets/actions";
import { setDashboardOnboardingAssetsShowAll } from "store/common/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import DashboardCard from "../DashboardCard";

import DashboardAssetsItems from "./components/DashboardAssetsItems";
import { INITIAL_MAX_COUNT } from "./constants";
import DashboardAssetsModal from "./components/DashboardAssetsModal";
import DashboardAssetsItemsSkeleton from "./components/DashboardAssetsItemsSceleton";

const DashboardAssets: FC = () => {
  const { t } = useTranslation();
  const loading = useSelector(valueByAssetsFetchingSelector);
  const modalLoading = useSelector(valueByAssetsModalLoadingSelector);
  const valueByAssets = useSelector(valueByAssetsDataSelector);
  const { data: myAssets, fetching: myAssetsLoading } = useSelector(getMyAssetsSelector);
  const { isRun, fake } = useSelector(dashboardOnboardingSelector);
  const [visible, setVisible] = useState(false); // DashboardAssetsModal state

  const showMoreAvailable = !!(valueByAssets?.count && valueByAssets?.count > INITIAL_MAX_COUNT);
  const showCap = !myAssetsLoading && !myAssets?.length;

  const dispatch = useDispatch();

  const onClickCap = () => {
    dispatch(analyticEvent(EEventType.DASHBOARD_ASSETS_ADD_ACCOUNT));
    dispatch(showModalAction(true));
    dispatch(setDashboardOnboardingAssetsShowAll());
  };

  useEffect(() => {
    if (visible) {
      dispatch(valueByAssetsRequest({ params: { max_count: valueByAssets?.count }, loadingModal: true }));
    } else {
      if (isRun && fake) {
        dispatch(fakeGetValueByAssetsRequest());
      } else {
        dispatch(valueByAssetsRequest({ params: { max_count: INITIAL_MAX_COUNT }, loadingModal: false }));
      }
    }
  }, [dispatch, visible]);

  return (
    <DashboardCard title={t('naming.yourCryptoAssets')} className="dashboard-assets">
      {
        loading && !modalLoading
          ? <DashboardAssetsItemsSkeleton/>
          : <DashboardAssetsItems/>
      }
      <button
        onClick={() => {
          dispatch(analyticEvent(EEventType.DASHBOARD_ASSETS_SHOW_ALL));
          setVisible(true);
        }}
        disabled={!showMoreAvailable || loading}
        className={cn("dashboard-assets__all-btn", { active: showMoreAvailable })}
      >
        {t('action.seeAll')}
      </button>
      {showMoreAvailable && <DashboardAssetsModal visible={visible} setVisible={setVisible}/>}
      {showCap && <div className="dashboard-assets__cap" onClick={onClickCap}>
        <div className="dashboard-assets__cap__content">
          <span className="dashboard-assets__cap__text">{t("action.addAccount")}</span><ArrowIcon/>
        </div>
      </div>}
    </DashboardCard>
  );
};


export default DashboardAssets;

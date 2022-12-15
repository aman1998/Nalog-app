import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { setDashboardDiagramSelected, valueByAccountRequest } from "store/assets/reducers";
import { DashboardDiagramKeys } from "store/assets/types";
import {
  dashboardDiagramKeyValuesSelector, valueByAccountsFetchingSelector,
  valueByAccountsInitialLoadingSelector, valueByAssetsFetchingSelector,
  valueByAssetsInitialLoadingSelector
} from "store/assets/selectors";
import { dashboardOnboardingSelector } from "store/common/selectors";
import { fakeGetValueByAccountRequest } from "store/assets/actions";

import DashboardCard from "../DashboardCard";

import DashboardDiagramSelector from "./components/DashboardDiogramSelector";
import DashboardPolarArea from "./components/DashboardPolarArea";
import { DEFAULT_MAX_COUNT } from "./constants";

const DashboardDiagram: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const accounts = useSelector(dashboardDiagramKeyValuesSelector(DashboardDiagramKeys.accounts));
  const assets = useSelector(dashboardDiagramKeyValuesSelector(DashboardDiagramKeys.assets));
  const assetsInitialLoading = useSelector(valueByAssetsInitialLoadingSelector);
  const accountsInitialLoading = useSelector(valueByAccountsInitialLoadingSelector);
  const assetsLoading = useSelector(valueByAssetsFetchingSelector);
  const accountsLoading = useSelector(valueByAccountsFetchingSelector);
  const { isRun, fake } = useSelector(dashboardOnboardingSelector);
  const showDiagram = !(assetsInitialLoading || accountsInitialLoading) && !(accountsLoading || assetsLoading);

  useEffect(() => {
    if (!showDiagram) return;

    if (!!accounts.length && !assets.length) {
      dispatch(setDashboardDiagramSelected(DashboardDiagramKeys.accounts));
    }
  }, [assets, accounts]);

  useEffect(() => {
    if (isRun && fake) {
      dispatch(fakeGetValueByAccountRequest());
    } else {
      dispatch(valueByAccountRequest({ max_count: DEFAULT_MAX_COUNT }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isRun]);

  return (
    <DashboardCard title={t('naming.assetsDistribution')} className="dashboard-diagram">
      <DashboardPolarArea showDiagram={showDiagram}/>
      <DashboardDiagramSelector />
    </DashboardCard>
  );
};

export default DashboardDiagram;

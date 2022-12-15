import { createSelector } from "@reduxjs/toolkit";

import { AxiosDataError } from "API/types";

import { TNullable } from "config/types";

import { IApplicationState } from "../rootInterface";

import {
  DashboardDiagramKeys,
  TAssetsOutputSelector,
  TSingleAssetData,
  DashboardDiagramValues,
  TAssetCurrency, TAssetsDashboardAvailableSymbolsState
} from "./types";

const selectState = (state: IApplicationState) => state.assets;

export const getAssetsFetchingSelector = createSelector(selectState, assets => assets.assetsState.fetching);
export const getAssetsDataSelector = createSelector(selectState, assets => assets.assetsState.data);

export const getAssetsDetailSelector = createSelector(selectState, assets => assets.assetsDetailState);

export const getAssetsExchangeSymbolsDataSelector = createSelector(
  selectState, assets => assets.assetsExchangeSymbol.data);
export const getAssetsExchangeSymbolsFetchingSelector = createSelector(
  selectState, assets => assets.assetsExchangeSymbol.fetching);
export const getAssetsExchangeAssetsFetchingSelector = createSelector(
  selectState, assets => assets.assetsExchangeAssets.fetching);
export const getAssetsExchangeSymbolsAssetsSelector = createSelector(
  selectState, assets => assets.assetsExchangeSymbolAssets);

export const getMyAssetsSelector = createSelector(selectState, assets => assets.myAssetsState);
export const getMyAssetsFetchingSelector = createSelector(selectState, assets => assets.myAssetsState.fetching);
export const getMyAssetsDataSelector = createSelector(selectState, assets => assets.myAssetsState.data);

export const connectAssetsFetchingSelector = createSelector(selectState, assets => assets.connectAssetsState.fetching);
export const connectAssetsDataSelector = createSelector(selectState, assets => assets.connectAssetsState.data);
export const connectAssetsFailureSelector = createSelector(selectState, assets => assets.connectAssetsState.failure);

export const showModalSelector = createSelector(selectState, assets => assets.showModal);

export const getSingleAssetFetchingSelector = (id: string | undefined): TAssetsOutputSelector<boolean | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.singleAssetState[id] && assets.singleAssetState[id].fetching : undefined
  );

export const getStartAcountSyncState = (id: string | undefined):TAssetsOutputSelector<boolean | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.startAccountSyncState[id] && assets.startAccountSyncState[id].fetching : undefined
  );

export const getSingleAssetDataSelector = (
  id: string | undefined
): TAssetsOutputSelector<TNullable<TSingleAssetData> | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.singleAssetState[id] && assets.singleAssetState[id].data : undefined
  );

export const getSingleAssetFailureSelector = (
  id: string | undefined
): TAssetsOutputSelector<TNullable<AxiosDataError> | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.singleAssetState[id] && assets.singleAssetState[id].failure : undefined
  );

export const startAccountSyncFailureSelector = (
  id: string
): TAssetsOutputSelector<TNullable<AxiosDataError> | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.startAccountSyncState[id] && assets.startAccountSyncState[id].failure : undefined
  );
export const startAccountSyncLoadingSelector = (id: string | undefined): TAssetsOutputSelector<boolean | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.startAccountSyncState[id] && assets.startAccountSyncState[id].syncLoading : undefined
  );

export const accountIdSelector = createSelector(selectState, assets => assets.accountID);

export const renameSingleAssetFetchingSelector = (id: string | undefined): TAssetsOutputSelector<boolean | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.singleAssetRenameState[id] && assets.singleAssetRenameState[id].fetching : undefined
  );

export const editConnectSingleAssetFetchingSelector = (
  id: string | undefined
): TAssetsOutputSelector<boolean | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.singleAssetConnectEditState[id] && assets.singleAssetConnectEditState[id].fetching : undefined
  );

export const editConnectSingleAssetFailureSelector = (
  id: string | undefined
): TAssetsOutputSelector<TNullable<AxiosDataError> | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.singleAssetConnectEditState[id] && assets.singleAssetConnectEditState[id].failure : undefined
  );

export const getSingleAssetDeleteFetchingSelector = (
  id: string | undefined
): TAssetsOutputSelector<boolean | undefined> =>
  createSelector(selectState, assets =>
    id ? assets.singleAssetDeleteState[id] && assets.singleAssetDeleteState[id].fetching : undefined
  );

export const valueByAssetsFetchingSelector = createSelector(selectState, assets => assets.valueByAssetsState.fetching);
export const valueByAssetsModalLoadingSelector =
  createSelector(selectState, assets => assets.valueByAssetsState.loadingModal);
export const valueByAssetsInitialLoadingSelector =
  createSelector(selectState, assets => assets.valueByAssetsState.initialLoading);
export const valueByAssetsDataSelector = createSelector(selectState, assets => assets.valueByAssetsState.data);

export const valueByAccountsFetchingSelector =
  createSelector(selectState, assets => assets.valueByAccountsState.fetching);
export const valueByAccountsInitialLoadingSelector =
  createSelector(selectState, assets => assets.valueByAccountsState.initialLoading);


export const dashboardDiagramSelectedSelector =
  createSelector(selectState, assets => assets.dashboardDiagramState.selected);
export const dashboardDiagramKeyValuesSelector = (
  name: DashboardDiagramKeys
): TAssetsOutputSelector<DashboardDiagramValues[]> =>
  createSelector(selectState, assets =>
    assets.dashboardDiagramState[name]
  );
export const dashboardDiagramSelectedValuesSelector =
  createSelector(selectState, assets =>
    assets.dashboardDiagramState[assets.dashboardDiagramState.selected]
  );

export const assetsCurrencyData = (
  name: string
):TAssetsOutputSelector<TAssetCurrency[]> => createSelector(selectState, assets =>
  assets.assetsCurrencyState[name] && assets.assetsCurrencyState[name].data?.results || []
);
export const assetsCurrencyFetching = ( name: string):TAssetsOutputSelector<boolean> =>
  createSelector(selectState, assets => assets.assetsCurrencyState[name] && assets.assetsCurrencyState[name].fetching);


export const assetsDashboardSymbolsSelector = createSelector(selectState, assets => assets.assetsDashboardSymbolState);
export const assetsDashboardAssetsSelector = createSelector(selectState, assets => assets.assetsDashboardAssetsState);
export const assetsDashboardSyncAccountSelector =
  createSelector(selectState, assets => assets.assetsDashboardSyncAccountState);
export const assetsDashboardValueHistorySelector =
  createSelector(selectState, assets => assets.assetsDashboardValueHistoryState);
export const assetsDashboardPortfolioStatsSelector =
  createSelector(selectState, assets => assets.assetsDashboardPortfolioStatsState);
export const assetsDashboardP2PStatsSelector =
  createSelector(selectState, assets => assets.assetsDashboardP2PStatsState);

export const assetsDashboardAvailableSymbolsStateSelector = (
  id: string | undefined
): TAssetsOutputSelector<TAssetsDashboardAvailableSymbolsState | undefined> =>
  createSelector(selectState, assets => id ? assets.assetsDashboardAvailableSymbolsState[id] : undefined);

export const assetsDashboardSaveSymbolsSelector =
  createSelector(selectState, assets => assets.assetsDashboardSaveSymbolsState);
import { put, takeLatest, all, call, takeEvery, select } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";
import _ from "lodash";
import { matchPath } from "react-router-dom";

import request from "API";

import { ESyncStatus } from "config/types";
import { paths } from "config/paths";

import {
  getAssetsFailure,
  getAssetsRequest,
  getAssetsSuccess,
  getMyAssetsFailure,
  getMyAssetsRequest,
  getMyAssetsSuccess,
  connectAssetsFailure,
  connectAssetsSuccess,
  connectAssetsRequest,
  showModal,
  getSingleAssetSuccess,
  getSingleAssetFailure,
  getSingleAssetRequest,
  startAccountSyncRequest,
  startAccountSyncSuccess,
  startAccountSyncFailure,
  startAccountSyncSetSyncLoading,
  getSingleAssetDeleteSuccess,
  getSingleAssetDeleteFailure,
  getSingleAssetDeleteRequest,
  renameSingleAssetRequest,
  renameSingleAssetFailure,
  renameSingleAssetSuccess,
  editConnectSingleAssetSuccess,
  editConnectSingleAssetFailure,
  editConnectSingleAssetRequest,
  getAssetsExchangeSymbolsSuccess,
  getAssetsExchangeSymbolsFailure,
  getAssetsExchangeAssetsSuccess,
  getAssetsExchangeAssetsRequest,
  getAssetsExchangeAssetsFailure,
  getAssetsExchangeSymbolsRequest,
  getAccountSyncId,
  valueByAssetsRequest,
  valueByAssetsFailure,
  valueByAssetsSuccess,
  valueByAccountSuccess,
  valueByAccountFailure,
  valueByAccountRequest,
  setDashboardDiagramState,
  setDashboardDiagramSelected,
  getAssetsCurrencyRequest,
  getAssetsCurrencySuccess,
  getAssetsCurrencyFailure,
  getAssetsDetailRequest,
  getAssetsDetailSuccess,
  getAssetsDetailFailure,
  getAssetsDashboardSymbolSuccess,
  getAssetsDashboardSymbolFailure,
  getAssetsDashboardSymbolRequest,
  getAssetsDashboardAssetsSuccess,
  getAssetsDashboardAssetsFailure,
  getAssetsDashboardAssetsRequest,
  getAssetsDashboardSyncAccountFailure,
  getAssetsDashboardSyncAccountSuccess,
  getAssetsDashboardSyncAccountRequest,
  setAccountDashboardSyncAccountSyncLoading,
  getAssetsDashboardValueHistorySuccess,
  getAssetsDashboardValueHistoryFailure,
  getAssetsDashboardValueHistoryRequest,
  getAssetsDashboardPortfolioStatsSuccess,
  getAssetsDashboardPortfolioStatsFailure,
  getAssetsDashboardPortfolioStatsRequest,
  getAssetsDashboardP2PStatsRequest,
  getAssetsDashboardP2PStatsSuccess,
  getAssetsDashboardP2PStatsFailure,
  getAssetsDashboardAvailableSymbolsRequest,
  getAssetsDashboardAvailableSymbolsSuccess,
  getAssetsDashboardAvailableSymbolsFailure,
  postAssetsDashboardSaveSymbolsRequest,
  postAssetsDashboardSaveSymbolsFailure,
  postAssetsDashboardSaveSymbolsSuccess,
} from "store/assets/reducers";
import { IApplicationState, IPayloadAction } from "store/rootInterface";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { showError, showInfo, showSuccess } from "utils/notifications";

import i18n from "../../i18n";


import { closeModalActionOnOnboardingState } from "../common/reducers";

import {
  TEditConnectSingleAssetOptions,
  TRenameSingleAssetOptions,
  TSingleAssetDeleteOptions,
  TConnectAssetPayload,
  TValueByAssetOptions,
  TValueByAccountOptions,
  TValueByAccountData,
  DashboardDiagramKeys,
  TValueByAssetData,
  DashboardDiagramValues,
  TValueByAssetElement,
  TAssetCurrencyOptions,
  TGetAssetsDetailPayload,
  TGetMyAssetsPayload,
  TAssetsDashboardAccountsData,
  EAssetsDashboardValueHistoryOptions,
  AssetsDashboardAvailableSymbolOptions, TAssetsDashboardSaveSymbolsData
} from "./types";
import {
  DEFAULT_COUNT_OF_VALUE_BY_ASSETS, DEFAULT_VALUE_BY_ASSETS,
  DIAGRAM_COLOR_REST,
  DIAGRAM_COLORS,
  fakeValueByAccountData,
  fakeValueByAssetData
} from "./constants";
import { FAKE_GET_VALUE_BY_ACCOUNT_REQUEST, FAKE_GET_VALUE_BY_ASSETS_REQUEST } from "./actions";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* getAssets() {
  try {
    const response: AxiosResponse = yield call(request.get, "/assets/accounts/types/");
    yield put(getAssetsSuccess(response.data));
  } catch (e) {
    yield put(getAssetsFailure(e));
  }
}

function* getAssetsDetail(action: IPayloadAction<TGetAssetsDetailPayload>) {
  try {
    const response: AxiosResponse = yield call(request.get, `/assets/accounts/types/${action.payload.id}/`);
    yield put(getAssetsDetailSuccess(response.data));
  } catch (e) {
    yield put(getAssetsDetailFailure(e));
  }
}

function* getMyAssets(action: IPayloadAction<TGetMyAssetsPayload>) {
  try {
    const response: AxiosResponse = yield call(request.get, "/assets/accounts/", { params: action.payload });
    yield put(getMyAssetsSuccess(response.data));
  } catch (e) {
    yield put(getMyAssetsFailure(e));
  }
}

function* getAssetsExchangeAssets() {
  try {
    const response: AxiosResponse = yield call(request.get, "/assets/transactions/exchange-assets/");
    yield put(getAssetsExchangeAssetsSuccess(response.data?.results));
  } catch (e) {
    yield put(getAssetsExchangeAssetsFailure(e));
  }
}

function* getAssetsExchangeSymbol() {
  try {
    const response: AxiosResponse = yield call(request.get, "/assets/transactions/exchange-symbols/");
    yield put(getAssetsExchangeSymbolsSuccess(response.data?.results));
    yield put(getAssetsExchangeAssetsRequest());
  } catch (e) {
    yield put(getAssetsExchangeSymbolsFailure(e));
  }
}

function* connectAssets(action: IPayloadAction<TConnectAssetPayload>) {
  const { data, code, redirectToAsset } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.post, "/assets/accounts/create/", data);
    yield put(connectAssetsSuccess(response.data));
    yield put(showModal(false));
    showSuccess(i18n.t("notification.connectAssets"));
    yield put(startAccountSyncRequest(response?.data.account_id));
    yield put(analyticEvent(`${EEventType.WALLET_NEW_ACCOUNT_STEP_2_SUCCESS}:${code}`));
    if (_.isFunction(redirectToAsset)) redirectToAsset(response?.data.account_id);
  } catch (e) {
    yield put(connectAssetsFailure(e));
    yield put(analyticEvent(`${EEventType.WALLET_NEW_ACCOUNT_STEP_2_FAIL}:${code}`));
  }
}

function* getSingleAsset(action: IPayloadAction<{ id: string, onError?: () => void }>) {
  const { id, onError } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.get, `/assets/accounts/${id}/info/`);
    yield put(getSingleAssetSuccess({ id, data: response.data }));

    const { status } = response.data;
    if (status === ESyncStatus.synchronized || status === ESyncStatus.error) {
      yield put(startAccountSyncSetSyncLoading({ id, state: false }));
    } else if (status === ESyncStatus.synchronizing) {
      yield put(startAccountSyncSetSyncLoading({ id, state: true }));
      yield delay(5000);
      yield put(getSingleAssetRequest({ id }));
    }
  } catch (e) {
    const error = e as AxiosError;
    yield put(getSingleAssetFailure({ id, error: e }));
    yield put(startAccountSyncSetSyncLoading({ id, state: false }));
    if (error?.request.status === 404) {
      if (_.isFunction(onError)) onError();
    }
  }
}

function* startAccountSync(action: IPayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(request.get, `/assets/accounts/${action.payload}/sync/`);
    yield put(startAccountSyncSetSyncLoading({ id: action.payload, state: true }));
    yield put(getAccountSyncId(action.payload));

    yield delay(5000);
    yield put(startAccountSyncSuccess({ id: action.payload, data: response.data, state: true }));
    if(window.location.pathname.includes(paths.ASSETS)) yield put(getSingleAssetRequest({ id: action.payload }));
  } catch (e) {
    yield put(startAccountSyncFailure({ id: action.payload, error: e }));
  }
}

function* deleteSingleAsset(action: IPayloadAction<TSingleAssetDeleteOptions>) {
  try {
    const response: AxiosResponse = yield call(request.delete, `/assets/accounts/${action.payload.id}/delete/`);
    yield put(getSingleAssetDeleteSuccess({ id: action.payload.id, data: response.data }));
    yield put(analyticEvent(EEventType.WALLETS_ACCOUNT_DELETE_SUCCESS));
    action.payload.callOnSuccess();
    showSuccess(i18n.t("notification.deleteSingleAsset"));
  } catch (e) {
    yield put(getSingleAssetDeleteFailure({ id: action.payload.id, error: e }));
  }
}

function* renameSingleAsset(action: IPayloadAction<TRenameSingleAssetOptions>) {
  const { id, values, callOnSuccess } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.put, `/assets/accounts/${id}/rename/`, values);
    yield put(renameSingleAssetSuccess({ id, data: response.data }));
    yield put(getMyAssetsRequest({}));
    yield put(getSingleAssetRequest({ id }));
    yield put(analyticEvent(EEventType.WALLETS_ACCOUNT_RENAME_SUCCESS));
    showSuccess(i18n.t("notification.renameSingleAsset"));
    callOnSuccess();
  } catch (e) {
    yield put(renameSingleAssetFailure({ id, error: e }));
  }
}

function* editConnectSingleAsset(action: IPayloadAction<TEditConnectSingleAssetOptions>) {
  const { id, values, callOnSuccess } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.put, `/assets/accounts/${id}/edit-api-params/`, values);
    yield put(editConnectSingleAssetSuccess({ id, data: response.data }));
    yield put(analyticEvent(EEventType.WALLETS_ACCOUNT_CONFIGURE_SUCCESS));
    showSuccess(i18n.t("notification.editConnectSingleAsset"));
    callOnSuccess();
  } catch (e) {
    yield put(editConnectSingleAssetFailure({ id, error: e }));
  }
}

function* getValueByAssets(action: IPayloadAction<TValueByAssetOptions>) {
  const { params } = action.payload;
  try {
    const response: AxiosResponse<TValueByAssetData> =
      yield call(request.get, "/assets/value-by-asset/", { params });
    yield saveValueByAssetsDataByDefaultValues(response.data);
    yield formValueByAssetsToDashboardDiagram(response.data);
  } catch (e) {
    yield put(valueByAssetsFailure(e));
  }
}

function* saveValueByAssetsDataByDefaultValues(data: TValueByAssetData) {
  if (data.count < DEFAULT_COUNT_OF_VALUE_BY_ASSETS) {
    const existsAssets = data[DashboardDiagramKeys.assets].map(asset => asset.name);
    const availableDefaultassets = DEFAULT_VALUE_BY_ASSETS
      .filter(item => !existsAssets.includes(item.name));

    data[DashboardDiagramKeys.assets] =
      [
        ...data[DashboardDiagramKeys.assets],
        ...availableDefaultassets
          .slice(0, DEFAULT_COUNT_OF_VALUE_BY_ASSETS - data[DashboardDiagramKeys.assets].length)];
  }
  yield put(valueByAssetsSuccess(data));
}

function* fakeGetValueByAssets() {
  try {
    yield put(valueByAssetsSuccess(fakeValueByAssetData));
    yield formValueByAssetsToDashboardDiagram(fakeValueByAssetData);
  } catch (e) {
    yield put(valueByAssetsFailure(e));
  }
}

function* formValueByAssetsToDashboardDiagram(data: TValueByAssetData) {
  const extraAssets = data.assets.slice(4, data.assets.length);
  const formed: TValueByAssetData = {
    ...data,
    assets: data.assets.slice(0, 4),
    others: {
      value:
        (extraAssets.reduce((acc, curr) => acc + Number(curr.value),
          Number(data.others.value))).toString()
    }
  };

  yield formatValuesToDashboardDiagram(DashboardDiagramKeys.assets, formed);
}

function* getValueByAccount(action: IPayloadAction<TValueByAccountOptions>) {
  try {
    const response: AxiosResponse<TValueByAccountData> =
      yield call(request.get, "/assets/value-by-account/", { params: action.payload });
    yield put(valueByAccountSuccess(response.data));
    yield formValueByAccountsToDashboardDiagram(response.data);
  } catch (e) {
    yield put(valueByAccountFailure(e));
  }
}

function* fakeGetValueByAccount() {
  try {
    yield put(valueByAccountSuccess(fakeValueByAccountData));
    yield formValueByAccountsToDashboardDiagram(fakeValueByAccountData);
  } catch (e) {
    yield put(valueByAccountFailure(e));
  }
}

function* formValueByAccountsToDashboardDiagram(data: TValueByAccountData) {
  const extraAccounts = data.accounts.slice(4, data.accounts.length);
  const formed: TValueByAccountData = {
    ...data,
    accounts: data.accounts.slice(0, 4),
    others: {
      value:
        (extraAccounts.reduce((acc, curr) => acc + Number(curr.value),
          Number(data.others.value))).toString()
    }
  };

  yield formatValuesToDashboardDiagram(DashboardDiagramKeys.accounts, formed);
}

function* formatValuesToDashboardDiagram(name: DashboardDiagramKeys, data: TValueByAccountData | TValueByAssetData) {
  if (data.count === 0 && name === DashboardDiagramKeys.assets) {
    yield put(setDashboardDiagramSelected(DashboardDiagramKeys.accounts));
  }

  const getRatio = (value: string) => {
    if (!total) return 0;
    return Number((Number(value)*100/total).toFixed(2));
  };

  const formedData: DashboardDiagramValues[] = [];
  const total = ((): number => {
    let _sum = 0;
    _sum += _.get(data, name, [])
      .reduce((acc: number, current: TValueByAssetElement) => acc + Number(current.value), 0);
    return _sum + Number(data.others.value);
  })();

  const valuesByName = _.get(data, name, []);
  for (let i = 0; i < valuesByName.length; i++) {
    const color =  DIAGRAM_COLORS[i];
    const item = valuesByName[i];
    formedData.push({
      ...item,
      color,
      ratio: getRatio(item.value),
      currency: data.currency
    });

  }

  if (data.count > 4) {
    formedData.push({
      id: new Date().toString(),
      name: i18n.t('naming.rest'),
      value: data.others.value,
      color: DIAGRAM_COLOR_REST,
      ratio: getRatio(data.others.value),
      currency: data.currency
    });
  }

  yield put(setDashboardDiagramState({
    name,
    data: formedData
  }));
}

function* getAssetsCurrency(action: IPayloadAction<{name: string, params?: TAssetCurrencyOptions}>) {
  const { name, params } = action.payload;
  try {
    const response: AxiosResponse<TValueByAccountData> =
      yield call(request.get, "/assets/currencies/", { params });
    yield put(getAssetsCurrencySuccess({ name, data: response.data }));
  } catch (error) {
    yield put(getAssetsCurrencyFailure({ name, error }));
  }
}

function* getAssetsDashboardSymbol() {
  try {
    const response: AxiosResponse = yield call(request.get, "/assets/dashboard/symbols/");
    yield put(getAssetsDashboardSymbolSuccess(response.data));
  } catch (e) {
    yield put(getAssetsDashboardSymbolFailure(e));
  }
}

function* getAssetsDashboardAssets(action: IPayloadAction<{showNotification?: boolean}>) {
  try {
    const response: AxiosResponse = yield call(request.get, "/assets/dashboard/accounts/");
    const { status } = response.data;
    const previousState: TAssetsDashboardAccountsData =
      yield select((state: IApplicationState) => state.assets.assetsDashboardAssetsState.data);

    if (status === ESyncStatus.synchronized && previousState?.status === ESyncStatus.synchronizing ) {
      yield put(setAccountDashboardSyncAccountSyncLoading( false ));
      if (action.payload.showNotification) yield showSuccess(i18n.t("dashboardYourAccounts.showSuccess"));
    } else if (status === ESyncStatus.error) {
      if (action.payload.showNotification) yield showError(i18n.t("dashboardYourAccounts.showError"));
      yield put(setAccountDashboardSyncAccountSyncLoading( false ));
    } else if (status === ESyncStatus.synchronizing) {
      yield put(setAccountDashboardSyncAccountSyncLoading( true ));
      yield delay(5000);
      if(matchPath(window.location.pathname, paths.HOME)?.isExact) {
        yield put(getAssetsDashboardAssetsRequest({ showNotification: true }));
      }
    }
    yield put(getAssetsDashboardAssetsSuccess(response.data));
  } catch (e) {
    yield put(getAssetsDashboardAssetsFailure(e));
  }
}

function* getAssetsDashboardSyncAccount() {
  try {
    const response: AxiosResponse = yield call(request.get, "/assets/dashboard/sync-accounts/");
    yield put(getAssetsDashboardSyncAccountSuccess(response.data));
    yield showInfo(i18n.t("dashboardYourAccounts.showInfo"));
    yield put(setAccountDashboardSyncAccountSyncLoading( true ));
    yield delay(5000);
    if(matchPath(window.location.pathname, paths.HOME)?.isExact) {
      yield put(getAssetsDashboardAssetsRequest({ showNotification: true }));
    }
  } catch (e) {
    yield put(getAssetsDashboardSyncAccountFailure(e));
  }
}


function* getAssetsDashboardValueHistory(action: IPayloadAction<EAssetsDashboardValueHistoryOptions>) {
  try {
    const response: AxiosResponse = yield call(request.get,
      "/assets/dashboard/value-history/", { params: action.payload });
    yield put(getAssetsDashboardValueHistorySuccess(response.data));
  } catch (e) {
    yield put(getAssetsDashboardValueHistoryFailure(e));
  }
}

function* getAssetsDashboardPortfolioStats(action: IPayloadAction<EAssetsDashboardValueHistoryOptions>) {
  try {
    const response: AxiosResponse = yield call(request.get,
      "/assets/dashboard/portfolio-stats/", { params: action.payload });
    yield put(getAssetsDashboardPortfolioStatsSuccess(response.data));
  } catch (e) {
    yield put(getAssetsDashboardPortfolioStatsFailure(e));
  }
}

function* getAssetsDashboardP2PStats(action: IPayloadAction<EAssetsDashboardValueHistoryOptions>) {
  try {
    const response: AxiosResponse = yield call(request.get,
      "/assets/dashboard/p2p-stats/", { params: action.payload });
    yield put(getAssetsDashboardP2PStatsSuccess(response.data));
  } catch (e) {
    yield put(getAssetsDashboardP2PStatsFailure(e));
  }
}

function* getAssetsDashboardAvailableSymbols(action: IPayloadAction<AssetsDashboardAvailableSymbolOptions>) {
  const { id, params } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.get,
      "/assets/dashboard/available-symbols/", { params });
    yield put(getAssetsDashboardAvailableSymbolsSuccess({ id, data: response.data }));
  } catch (error) {
    yield put(getAssetsDashboardAvailableSymbolsFailure({ id, error }));
  }
}

function* postAssetsDashboardSaveSymbols(action: IPayloadAction<TAssetsDashboardSaveSymbolsData>) {
  try {
    const response: AxiosResponse = yield call(request.post,
      "/assets/dashboard/save-symbol/", action.payload);
    yield put(postAssetsDashboardSaveSymbolsSuccess(response.data));
    yield put(getAssetsDashboardSymbolRequest());
  } catch (error) {
    yield put(postAssetsDashboardSaveSymbolsFailure(error));
  }
}

function* setShowModal(action: IPayloadAction<boolean>) {
  if (!action.payload) {
    yield delay(1000);
    yield put(closeModalActionOnOnboardingState());
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(getAssetsRequest.type, getAssets),
    takeLatest(getAssetsDetailRequest.type, getAssetsDetail),
    takeLatest(getMyAssetsRequest.type, getMyAssets),
    takeLatest(connectAssetsRequest.type, connectAssets),
    takeLatest(getSingleAssetRequest.type, getSingleAsset),
    takeLatest(getSingleAssetDeleteRequest.type, deleteSingleAsset),
    takeLatest(startAccountSyncRequest.type, startAccountSync),
    takeLatest(renameSingleAssetRequest.type, renameSingleAsset),
    takeLatest(editConnectSingleAssetRequest.type, editConnectSingleAsset),
    takeLatest(getAssetsExchangeSymbolsRequest.type, getAssetsExchangeSymbol),
    takeLatest(getAssetsExchangeAssetsRequest.type, getAssetsExchangeAssets),
    takeLatest(valueByAssetsRequest.type, getValueByAssets),
    takeLatest(FAKE_GET_VALUE_BY_ASSETS_REQUEST, fakeGetValueByAssets),
    takeLatest(valueByAccountRequest.type, getValueByAccount),
    takeLatest(FAKE_GET_VALUE_BY_ACCOUNT_REQUEST, fakeGetValueByAccount),
    takeEvery(getAssetsCurrencyRequest.type, getAssetsCurrency),
    takeEvery(getAssetsDashboardSymbolRequest.type, getAssetsDashboardSymbol),
    takeEvery(getAssetsDashboardAssetsRequest.type, getAssetsDashboardAssets),
    takeEvery(getAssetsDashboardSyncAccountRequest.type, getAssetsDashboardSyncAccount),
    takeEvery(getAssetsDashboardValueHistoryRequest.type, getAssetsDashboardValueHistory),
    takeEvery(getAssetsDashboardPortfolioStatsRequest.type, getAssetsDashboardPortfolioStats),
    takeEvery(getAssetsDashboardP2PStatsRequest.type, getAssetsDashboardP2PStats),
    takeEvery(getAssetsDashboardAvailableSymbolsRequest.type, getAssetsDashboardAvailableSymbols),
    takeEvery(postAssetsDashboardSaveSymbolsRequest.type, postAssetsDashboardSaveSymbols),
    takeLatest(showModal.type, setShowModal)
  ]);
}

export default Saga;

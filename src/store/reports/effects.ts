import { put, takeLatest, all, call, select } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";
import omitBy from "lodash/omitBy";
import isFunction from "lodash/isFunction";

import request from "API";

import { ESyncStatus } from "config/types";
import { paths } from "config/paths";

import { TMyAssetsData } from "store/assets/types";
import { EEventType } from "store/analytics/types";

import { convertTransactionsFilterToList, convertUrlParams, TQueryParams } from "utils/url";
import { showError, showSuccess } from "utils/notifications";

import i18n from "../../i18n";

import { IApplicationState, IPayloadAction } from "../rootInterface";
import { analyticEvent } from "../analytics/effects";

import {
  getReportsRequest,
  getReportsFailure,
  getReportsSuccess,
  createReportSuccess,
  createReportFailure,
  createReportRequest,
  deleteReportFailure,
  deleteReportRequest,
  deleteReportSuccess,
  getReportTaxAmountRequest,
  getReportTaxAmountSuccess,
  getReportTaxAmountFailure,
  getHintTextFailure,
  getHintTextSuccess,
  getHintTextRequest,
  changeHintTextStatusSuccess,
  changeHintTextStatusRequest,
  changeHintTextStatusFailure,
  getCreateDocumentAssetsListFailure,
  getCreateDocumentAssetsListRequest,
  getCreateDocumentAssetsListSuccess,
  createTaxReportingProjectFailure,
  createTaxReportingProjectData,
  createTaxReportingProjectRequest,
  getSingleTaxReportRequest,
  getSingleTaxReportFailure,
  getSingleTaxReportSuccess,
  reportTransactionsFailure,
  reportTransactionsRequest,
  reportTransactionsSuccess,
  reportTaxTransactionTypesSuccess,
  reportTaxTransactionTypesFailure,
  reportTaxTransactionTypesRequest,
  reportAgreementFailure,
  reportAgreementRequest,
  reportAgreementSuccess,
  changeReportCheckStatusRequest,
  changeReportCheckStatusFailure,
  changeReportCheckStatusSuccess,
  changeReportTransactionsItemCheckStatus,
  changeAllReportCheckStatusFailure,
  changeAllReportCheckStatusSuccess,
  changeAllReportCheckStatusRequest,
  changeAllReportTransactionsItemCheckStatus,
  getSinglePersonalDataFailure,
  getSinglePersonalDataRequest,
  getSinglePersonalDataSuccess,
  createPersonalDataRequest,
  createPersonalDataFailure,
  createPersonalDataSuccess,
  createPersonalDataCompleteFailure,
  createPersonalDataCompleteSuccess,
  createPersonalDataCompleteRequest,
  getReportFormedFailure,
  getReportFormedRequest,
  getReportFormedSuccess,
  updateTaxReportAccountsData,
  updateTaxReportAccountsFailure,
  updateTaxReportAccountsRequest,
  deleteSingleTaxReportFailure,
  deleteSingleTaxReportRequest,
  deleteSingleTaxReportSuccess,
  deleteSingleTaxReportConfirmedModal,
  reportTaxResultTransactionTypesRequest,
  reportTaxResultTransactionTypesSuccess,
  reportTaxResultTransactionTypesFailure,
  updateStateAfterDeletion,
  addTransactionToTaxReportRequest,
  addTransactionToTaxReportSuccess,
  addTransactionToTaxReportFailure,
  getCreateTransitionExportAssetsListSuccess,
  getCreateTransitionExportAssetsListFailure,
  getCreateTransitionExportAssetsListRequest,
  createTransactionExportSuccess,
  createTransactionExportFailure,
  createTransactionExportRequest,
  reportSingleRequest,
  reportSingleSuccess,
  reportSingleFailure,
  createSourcesExportRequest,
  createSourcesExportSuccess,
  createSourcesExportFailure,
} from "./reducers";
import {
  TOldReportOptions,
  TReport,
  TReportDelete,
  THintTextPayload,
  TCreateTaxReportingProjectPayload,
  TCreateTaxReportingProjectData,
  TSingleTaxReportData,
  ESingleTaxReportTransactionStatus,
  TSingleReportPayload,
  TGetReportTransactionsPayload,
  TReportTransactionsData,
  TChangeReportCheckStatusPayload,
  TAllChangeReportCheckStatusPayload,
  TNewReportOptionData,
  TCreatePersonalDataPayload,
  TUpdateTaxReportAccountsPayload,
  TAddTransactionToTaxReportOptions,
  EReportTransactionType,
  TReportTaxAmountData,
  TCreateTransactionExportOptions, EReportStatus, TCreateSourcesExportOptions
} from "./types";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* getReports() {
  try {
    const response: AxiosResponse = yield call(request.get, "/reports/");
    yield put(getReportsSuccess(response.data));
  } catch (e) {
    yield put(getReportsFailure(e));
  }
}

function* getReportFormed(action: IPayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(request.get, `/reports/tax/${action.payload}/result/`);
    yield put(getReportFormedSuccess(response.data));
  } catch (e) {
    yield put(getReportFormedFailure(e));
  }
}

function* createReport(action: IPayloadAction<TOldReportOptions>) {
  try {
    const data = omitBy(
      action.payload.data,
      // TODO: Fix any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value: any) => !value
    );
    const response: AxiosResponse<TReport> = yield call(request.post, "/reports/form-by-year/", data);

    yield put(createReportSuccess(response.data));
    action.payload.callOnSuccess();
  } catch (e) {
    yield put(createReportFailure(e));
  }
}

function* deleteReport(action: IPayloadAction<TReportDelete>) {
  try {
    const response: AxiosResponse = yield call(request.delete, `/reports/${action.payload}/`);
    yield put(deleteReportSuccess(response.data));
    const refreshData: AxiosResponse = yield call(request.get, "/reports/");

    try {
      yield put(getReportsRequest());
      yield put(getReportsSuccess(refreshData.data));
    } catch (e) {
      yield put(getReportsFailure(e));
    }
  } catch (e) {
    yield put(deleteReportFailure(e));
  }
}

function* getReportsTaxAmount() {
  try {
    const response: AxiosResponse<TReportTaxAmountData[]> = yield call(request.get, "/reports/tax-amount-by-year/");
    yield reportsTaxAmountSetState(response.data);
  } catch (e) {
    yield put(getReportTaxAmountFailure(e));
  }
}

function* reportsTaxAmountSetState(data: TReportTaxAmountData[]) {
  const taxAmountState: TReportTaxAmountData[] =
    yield select((state: IApplicationState) => state.reports.taxAmountReport.data);

  const extra = data.slice(3, data.length);
  const updated = taxAmountState.map(item => data.find(el => el.year === item.year) || item);
  yield put(getReportTaxAmountSuccess([...extra, ...updated]));

}

function* getCreateDocumentAssets(action: IPayloadAction<TQueryParams[]>) {
  try {
    const params: URLSearchParams = convertUrlParams(action.payload);
    const response: AxiosResponse<TMyAssetsData[]> = yield call(request.get, "/assets/accounts/", { params });
    yield put(getCreateDocumentAssetsListSuccess(response.data));

    const needGetAssets = response.data.some(item => item.status === ESyncStatus.synchronizing);

    if (response.data.length && needGetAssets) {
      yield delay(5000);
      yield put(getCreateDocumentAssetsListRequest(action.payload));
    }
  } catch (e) {
    yield put(getCreateDocumentAssetsListFailure(e));
  }
}

function* getCreateTransitionExportAssets(action: IPayloadAction<{ id: string, query: TQueryParams[]}>) {
  const { id, query } = action.payload;
  try {
    const params: URLSearchParams = convertUrlParams(query);
    const response: AxiosResponse<TMyAssetsData[]> = yield call(request.get, "/assets/accounts/", { params });
    yield put(getCreateTransitionExportAssetsListSuccess({ id, data: response.data }));

    const needGetAssets = response.data.some(item => item.status === ESyncStatus.synchronizing);

    if (response.data.length && needGetAssets) {
      yield delay(5000);
      yield put(getCreateTransitionExportAssetsListRequest({ id }));
    }
  } catch (error) {
    yield put(getCreateTransitionExportAssetsListFailure({ id, error }));
  }
}

function* getHintTextStatus(action: IPayloadAction<string>) {
  try {
    const params: URLSearchParams = convertUrlParams([{
      key: "hint_code",
      value: action.payload
    }]);
    const response: AxiosResponse = yield call(request.get, "/assets/hint-text/", { params });
    yield put(getHintTextSuccess(response?.data));
  } catch (e) {
    yield put(getHintTextFailure(e));
  }
}


function* changeHintTextStatus(action: IPayloadAction<THintTextPayload>) {
  try {
    const response: AxiosResponse = yield call(request.patch, "/assets/hint-text/", action.payload);
    yield put(changeHintTextStatusSuccess(response.data));
  } catch (e) {
    yield put(changeHintTextStatusFailure(e));
  }
}

function* createTaxReportProject(action: IPayloadAction<TCreateTaxReportingProjectPayload>) {
  try {
    const { redirect, ...payload } = action.payload;
    const response: AxiosResponse<TCreateTaxReportingProjectData> = yield call(request.post, "/reports/tax/", payload);
    yield put(createTaxReportingProjectData(response.data));
    redirect(response.data.report_id);
  } catch (e) {
    yield put(createTaxReportingProjectFailure(e));
  }
}

function* updateTaxReportAccounts(action: IPayloadAction<TUpdateTaxReportAccountsPayload>) {
  try {
    const { id, changeStepCallback, ...payload } = action.payload;

    const response: AxiosResponse<TCreateTaxReportingProjectData> = yield call(
      request.post, `/reports/tax/${id}/update-accounts/`, payload);
    yield put(updateTaxReportAccountsData(response.data));
    yield put(getSingleTaxReportRequest({ id }));

    yield put(analyticEvent(EEventType.TAXREPORT_STEP1_SAVED));

    changeStepCallback();
  } catch (e) {
    yield put(analyticEvent(EEventType.TAXREPORT_STEP1_TRANSACTIONS_ERROR));

    yield put(updateTaxReportAccountsFailure(e));
  }
}

function* deleteSingleTaxReport(action: IPayloadAction<TSingleReportPayload>) {
  try {
    const { id, redirect, callback } = action.payload;
    const response: AxiosResponse<TCreateTaxReportingProjectData> = yield call(request.delete, `/reports/tax/${id}/`);
    yield put(deleteSingleTaxReportSuccess(response.data));
    yield put(deleteSingleTaxReportConfirmedModal(false));
    yield put(updateStateAfterDeletion(id));
    if (!!redirect) redirect(paths.DOCUMENTS);
    if (isFunction(callback)) callback();

    showSuccess(i18n.t("notification.deleteSingleTaxReport"));
  } catch (e) {
    yield put(deleteSingleTaxReportFailure(e));
  }
}

function* getSingleTaxReport(action: IPayloadAction<TSingleReportPayload>) {
  const { id, redirect } = action.payload;
  try {
    const response: AxiosResponse<TSingleTaxReportData> = yield call(request.get, `/reports/tax/${id}/`);
    yield put(getSingleTaxReportSuccess({ id, data: response.data }));

    const { transactions_status, status } = response.data;

    if (status === EReportStatus.forming ||
      transactions_status === ESingleTaxReportTransactionStatus.forming
    ) {
      yield delay(5000);
      yield put(getSingleTaxReportRequest({ id }));
    }

    if (status === EReportStatus.error) {
      yield showError(i18n.t("errors.getSingleTaxReport1"));
      return;
    }

    if (status === EReportStatus.draft &&
      transactions_status === ESingleTaxReportTransactionStatus.error) {
      yield showError(i18n.t("errors.getSingleTaxReport2"));
      return;
    }
  } catch (e) {
    yield put(getSingleTaxReportFailure({ id: action.payload, error: e }));
    if (!!redirect) redirect(paths.REPORT_CONSTRUCTOR);
  }
}

function* getSinglePerosnalDataReport(action: IPayloadAction<string>) {
  const id = action.payload;
  try {
    const response: AxiosResponse<TNewReportOptionData> = yield call(request.get, `/reports/tax/${id}/personal-data/`);
    yield put(getSinglePersonalDataSuccess({ id, data: response.data }));
  } catch (e) {
    yield put(getSinglePersonalDataFailure({ id: action.payload, error: e }));
  }
}

function* getReportTransactions(action: IPayloadAction<TGetReportTransactionsPayload>): Generator {
  try {
    const { id, size = 25, page = 1, isResult } = action.payload;

    if (action.payload.report_type === EReportTransactionType.filter) {
      action.payload.report_type = EReportTransactionType.all;
    }

    const params: URLSearchParams = convertUrlParams(convertTransactionsFilterToList(action.payload));
    params.append('size', size.toString());

    const response = isResult
      ? yield call(request.get, `/reports/tax/${id}/result-transactions/`, { params })
      : yield call(request.get, `/reports/tax/${id}/transactions/`, { params });

    const { results, next, count } = (response as AxiosResponse<TReportTransactionsData>).data;

    yield put(reportTransactionsSuccess({ page, data: results, next, count }));
  } catch (error) {
    yield put(reportTransactionsFailure(error as AxiosError));
  }
}

function* getReportTaxTransactionTypes(action: IPayloadAction<string>) {
  try {
    const id = action.payload;

    const response: AxiosResponse = yield call(request.get, `/reports/tax/${id}/transaction-types/`);
    yield put(reportTaxTransactionTypesSuccess(response.data));
  } catch (e) {
    yield put(reportTaxTransactionTypesFailure(e));
  }
}

function* getReportTaxResultTransactionTypes(action: IPayloadAction<string>) {
  try {
    const id = action.payload;

    const response: AxiosResponse = yield call(request.get, `/reports/tax/${id}/result-transaction-types/`);
    yield put(reportTaxResultTransactionTypesSuccess(response.data));
  } catch (e) {
    yield put(reportTaxResultTransactionTypesFailure(e));
  }
}

function* reportAgreement(action: IPayloadAction<string>) {
  try {
    const id = action.payload;
    yield put(analyticEvent(EEventType.TAXREPORT_STEP2_SAVED));

    const response: AxiosResponse = yield call(request.get, `/reports/tax/${id}/confirm-transactions/`);
    yield put(reportAgreementSuccess(response.data));
    yield put(getSingleTaxReportRequest({ id }));
  } catch (e) {
    yield put(reportAgreementFailure(e));
  }
}

function* changeReportCheckStatus(action: IPayloadAction<TChangeReportCheckStatusPayload>) {
  const { id, checked } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.put, `reports/tax/${id}/check-transaction/`,
      { checked });

    yield put(changeReportCheckStatusSuccess({ id, data: response.data }));
    yield put(changeReportTransactionsItemCheckStatus(action.payload));

  } catch (error) {
    yield put(changeReportCheckStatusFailure({ id, error }));
  }
}

function* changeAllReportCheckStatus(action: IPayloadAction<TAllChangeReportCheckStatusPayload>) {
  try {
    yield put(analyticEvent(EEventType.TAXREPORT_STEP2_TRANSACTION_CHECKED_CHANGED));

    const { id, checked, type } = action.payload;

    const response: AxiosResponse = yield call(request.post, `reports/tax/${id}/check-transactions/`, {
      checked, type
    });

    yield put(changeAllReportCheckStatusSuccess(response.data));
    yield put(changeAllReportTransactionsItemCheckStatus(checked));

  } catch (e) {
    yield put(changeAllReportCheckStatusFailure(e));
  }
}

function* createPersonalData(action: IPayloadAction<TCreatePersonalDataPayload>) {
  try {
    const { id, phone, isAnonymous, birthdate, ...payload } = action.payload;

    if (isAnonymous) {
      yield put(analyticEvent(EEventType.TAXREPORT_STEP3_SAVED_AS_ANONYMOUS));
    } else {

      yield put(analyticEvent(EEventType.TAXREPORT_STEP3_SAVED_FULLY));
    }

    const params: URLSearchParams = convertUrlParams([{ key: "is_anonymous", value: String(isAnonymous) }]);
    const newBirthdate = birthdate || null; // tepmorary, need refactoring, all empty string to null

    const newPhone = phone && phone.replace(/[^0-9]/g, "");

    const newPayload: TNewReportOptionData = {
      ...payload,
      phone: newPhone,
      birthdate: newBirthdate
    };

    const response: AxiosResponse = yield call(request.post, `reports/tax/${id}/personal-data/`,
      newPayload, { params });

    yield put(analyticEvent(EEventType.TAXREPORT_STEP3_COMPLETED));

    yield put(createPersonalDataSuccess(response.data));
    yield put(createPersonalDataCompleteRequest(id));

  } catch (e) {
    yield put(analyticEvent(EEventType.TAXREPORT_STEP3_FORMING_ERROR));
    yield put(createPersonalDataFailure(e));
  }
}

function* createPersonalDataComplete(action: IPayloadAction<string>) {
  try {
    const id = action.payload;
    const response: AxiosResponse = yield call(request.post, `reports/tax/${id}/complete/`);

    yield put(createPersonalDataCompleteSuccess(response.data));
    yield put(getSingleTaxReportRequest({ id }));

  } catch (e) {
    yield put(createPersonalDataCompleteFailure(e));
  }
}

function* addTransactionToTaxReport(action: IPayloadAction<TAddTransactionToTaxReportOptions>) {
  try {
    const response: AxiosResponse =
      yield call(request.post, `reports/tax/${action.payload.report_id}/add-transaction/`, action.payload.data);
    yield put(addTransactionToTaxReportSuccess(response.data));

  } catch (e) {
    yield put(addTransactionToTaxReportFailure(e));
  }
}

function* createTransactionExport(
  action: IPayloadAction<{ data: TCreateTransactionExportOptions, callback: (v?: any) => void}>)
{
  const { data, callback } = action.payload;
  try {
    const response: AxiosResponse =
      yield call(request.post, "/reports/create-transaction-export/", data);
    yield put(createTransactionExportSuccess(response.data));
    if (isFunction(callback)) {
      callback(response.data.id);
    }
  } catch (e) {
    yield put(createTransactionExportFailure(e));
  }
}

function* createSourcesExport(
  action: IPayloadAction<{ data: TCreateSourcesExportOptions, callback: (v?: any) => void}>)
{
  const { data, callback } = action.payload;
  try {
    const response: AxiosResponse =
      yield call(request.post, "/reports/create-sources-export/", data);
    yield put(createSourcesExportSuccess(response.data));
    if (isFunction(callback)) {
      callback(response.data.id);
    }
  } catch (e) {
    yield put(createSourcesExportFailure(e));
  }
}

function* getReportSingle(
  action: IPayloadAction<{id: string, callOnError: () => void}>)
{
  const { id, callOnError } = action.payload;
  try {
    const response: AxiosResponse =
      yield call(request.get, `/reports/${id}/details/`);
    yield put(reportSingleSuccess(response.data));
    const { status } = response.data;

    if (status === EReportStatus.forming) {
      yield delay(5000);
      yield put(reportSingleRequest(action.payload));
    }
    if (status === EReportStatus.error) {
      yield showError(i18n.t("errors.getReportSingle"));
      if (isFunction(callOnError)) callOnError();
      return;
    }

  } catch (e) {
    yield put(reportSingleFailure(e));
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(getReportsRequest.type, getReports),
    takeLatest(getReportFormedRequest.type, getReportFormed),
    takeLatest(createReportRequest.type, createReport),
    takeLatest(deleteReportRequest.type, deleteReport),
    takeLatest(getReportTaxAmountRequest.type, getReportsTaxAmount),
    takeLatest(getHintTextRequest.type, getHintTextStatus),
    takeLatest(changeHintTextStatusRequest.type, changeHintTextStatus),
    takeLatest(getCreateDocumentAssetsListRequest.type, getCreateDocumentAssets),
    takeLatest(getCreateTransitionExportAssetsListRequest.type, getCreateTransitionExportAssets),
    takeLatest(createTaxReportingProjectRequest.type, createTaxReportProject),
    takeLatest(updateTaxReportAccountsRequest.type, updateTaxReportAccounts),
    takeLatest(deleteSingleTaxReportRequest.type, deleteSingleTaxReport),
    takeLatest(getSingleTaxReportRequest.type, getSingleTaxReport),
    takeLatest(reportTransactionsRequest.type, getReportTransactions),
    takeLatest(reportTaxTransactionTypesRequest.type, getReportTaxTransactionTypes),
    takeLatest(reportTaxResultTransactionTypesRequest.type, getReportTaxResultTransactionTypes),
    takeLatest(reportAgreementRequest.type, reportAgreement),
    takeLatest(changeReportCheckStatusRequest.type, changeReportCheckStatus),
    takeLatest(changeAllReportCheckStatusRequest.type, changeAllReportCheckStatus),
    takeLatest(createPersonalDataRequest.type, createPersonalData),
    takeLatest(createPersonalDataCompleteRequest.type, createPersonalDataComplete),
    takeLatest(getSinglePersonalDataRequest.type, getSinglePerosnalDataReport),
    takeLatest(addTransactionToTaxReportRequest.type, addTransactionToTaxReport),
    takeLatest(createTransactionExportRequest.type, createTransactionExport),
    takeLatest(createSourcesExportRequest.type, createSourcesExport),
    takeLatest(reportSingleRequest.type, getReportSingle),
  ]);
}

export default Saga;

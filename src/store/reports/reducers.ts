import { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { TMyAssetsData } from "store/assets/types";

import { getTransactionInfo } from "utils/transactionUtils";
import { TQueryParams } from "utils/url";

import {
  defaultCreateDocumentState,
  defaultCreateTransitionExport,
  defaultState,
  taxAmountReportDefault
} from "../constants";
import { IPayloadAction } from "../rootInterface";

import {
  EReportTransactionType,
  ESingleTaxReportTransactionStatus,
  IreportTransactionsSuccess,
  TChangeReportCheckStatusPayload, TCreateTransitionExportStepTwo,
  TReportsStoreState,
  TReportTransactionResult,
  TSingleTaxReportData,
} from "./types";

const initialState: TReportsStoreState = {
  reportsState: defaultState,
  singleTaxReport: {},
  singlePersonalData: {},
  reportsFormed: defaultState,
  createPersonalData: defaultState,
  deleteSingleTaxReport: defaultState,
  deleteSingleTaxReportConfirmedModal: false,
  createPersonalDataComplete: defaultState,
  newReportState: defaultState,
  deleteReportState: defaultState,
  taxAmountReport: taxAmountReportDefault,
  modalsState: {
    create: false,
    continueCreate: false,
    cancelCreate: false,
    success: false,
    draft: false,
    cancel: false,
    stepTwoUnconfirmedOperation: false,
  },
  hintText: { ...defaultState, visible: false },
  changeHintTextStatus: defaultState,
  createDocument: defaultCreateDocumentState,
  createTransitionExport: {},
  createTaxReportingProject: defaultState,
  updateTaxReportAccounts: defaultState,
  reportTaxTransactionTypesState: defaultState,
  reportTaxResultTransactionTypesState: defaultState,
  reportTransactions: {
    fetching: false,
    data: [],
    finish: false,
    next: null,
    count: null,
    report_type: EReportTransactionType.all,
    allCheck: false
  },
  reportAgreement: defaultState,
  changeReportCheckStatus: {},
  changeAllReportCheckStatus: defaultState,
  addTransactionToTaxReportState: defaultState,
  createTransactionExportState: defaultState,
  createSourcesExportState: defaultState,
  reportSingleState:  { ...defaultState, initialLoading: true },
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    getReportsRequest(state) {
      state.reportsState = {
        ...state.reportsState,
        fetching: true,
        failure: null,
      };
    },
    getReportsSuccess(state, action) {
      state.reportsState = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getReportsFailure(state, action) {
      state.reportsState = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },

    getSingleTaxReportRequest(state, action) {
      state.singleTaxReport = {
        ...state.singleTaxReport,
        [action.payload.id]: {
          ...state.singleTaxReport[action.payload.id],
          fetching: true,
          failure: null,
        },
      };
    },

    getSingleTaxReportSuccess(state, action: IPayloadAction<{ id: string; data: TSingleTaxReportData }>) {
      const { transactions_status } = action.payload.data;

      state.singleTaxReport = {
        ...state.singleTaxReport,
        [action.payload.id]: {
          fetching: false,
          data: action.payload.data,
          failure: null,
        },
      };
      state.createDocument.stepOne.assetsCheckList = action.payload.data.accounts;
      state.createDocument.stepOne.includeManuals = action.payload.data.include_manuals;

      if (!!transactions_status) {
        switch (transactions_status.toLowerCase()) {
        case ESingleTaxReportTransactionStatus.forming:
          break;
        case ESingleTaxReportTransactionStatus.error:
          state.createDocument.currentStep = 1;
          break;
        case ESingleTaxReportTransactionStatus.formed:
          state.createDocument.currentStep = 2;
          break;
        case ESingleTaxReportTransactionStatus.confirmed:
          state.createDocument.currentStep = 3;
          break;
        }
      }
    },

    changeSingleTaxReportCurrent(state, action: IPayloadAction<number>) {
      state.createDocument.currentStep = action.payload;
    },

    getSingleTaxReportFailure(state, action) {
      state.singleTaxReport = {
        ...state.singleTaxReport,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action.payload.error,
        },
      };
    },

    getSinglePersonalDataRequest(state, action) {
      state.singlePersonalData = {
        ...state.singlePersonalData,
        [action.payload.id]: {
          fetching: true,
          data: null,
          failure: null,
        },
      };
    },

    getSinglePersonalDataSuccess(state, action) {
      state.singlePersonalData = {
        ...state.singlePersonalData,
        [action.payload.id]: {
          fetching: false,
          data: action.payload.data,
          failure: null,
        },
      };
    },

    getSinglePersonalDataFailure(state, action) {
      state.singlePersonalData = {
        ...state.singlePersonalData,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action.payload.error,
        },
      };
    },

    // TODO: fix @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createReportRequest(state, _) {
      state.newReportState = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    createReportSuccess(state, action) {
      if (state.reportsState.data && state.reportsState.data.results) {
        const { results } = state.reportsState.data;
        results.unshift(action.payload);
      }
      state.newReportState = {
        fetching: false,
        data: null,
        failure: null,
      };
    },
    createReportFailure(state, action) {
      state.newReportState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },

    getReportTaxAmountRequest(state) {
      state.taxAmountReport = {
        ...state.taxAmountReport,
        fetching: true,
        failure: null,
      };
    },
    getReportTaxAmountSuccess(state, action) {
      state.taxAmountReport = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getReportTaxAmountFailure(state, action) {
      state.taxAmountReport = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteReportRequest(state, _) {
      state.deleteReportState = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    deleteReportSuccess(state, action) {
      state.deleteReportState = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    deleteReportFailure(state, action) {
      state.deleteReportState = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },
    setReportModals(state, action) {
      state.modalsState = {
        ...state.modalsState,
        [action.payload.key]: action.payload.value,
      };
    },
    // TODO: fix @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getHintTextRequest(state, _) {
      state.hintText = {
        ...state.hintText,
        fetching: true,
      };
    },
    getHintTextSuccess(state, action) {
      state.hintText = {
        ...state.hintText,
        fetching: false,
        data: action.payload,
        visible: action.payload?.visible,
      };
    },
    getHintTextFailure(state, action) {
      state.hintText = {
        ...state.hintText,
        fetching: false,
        failure: action.payload,
      };
    },

    showHintText(state, action) {
      state.hintText = {
        ...state.hintText,
        visible: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changeHintTextStatusRequest(state, _) {
      state.changeHintTextStatus = {
        ...state.changeHintTextStatus,
        fetching: true,
      };
    },
    changeHintTextStatusSuccess(state, action) {
      state.changeHintTextStatus = {
        ...state.changeHintTextStatus,
        fetching: false,
        data: action.payload,
      };
    },
    changeHintTextStatusFailure(state, action) {
      state.changeHintTextStatus = {
        ...state.changeHintTextStatus,
        fetching: false,
        failure: action.payload,
      };
    },

    changeAssetsCheckList(state, action) {
      state.createDocument.stepOne.assetsCheckList = action.payload;
    },

    changeIncludeManualStatus(state, action: IPayloadAction<boolean>) {
      state.createDocument.stepOne.includeManuals = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCreateDocumentAssetsListRequest(state, _) {
      state.createDocument.stepOne.assetsList = {
        ...state.createDocument.stepOne.assetsList,
        fetching: true,
      };
    },
    getCreateDocumentAssetsListSuccess(state, action: IPayloadAction<TMyAssetsData[]>) {
      const assetsList = action.payload;
      const synchronizedList = assetsList.filter(item => !!item.synchronized_at).map(item => item.id);

      if (!state.createDocument.stepOne.assetsCheckList.length) {
        state.createDocument.stepOne.assetsCheckList = synchronizedList;
      }

      state.createDocument.stepOne.assetsList = {
        fetching: false,
        data: assetsList,
        failure: null,
      };
      state.createDocument.stepOne.synchronizedList = synchronizedList;
    },
    getCreateDocumentAssetsListFailure(state, action) {
      state.createDocument.stepOne.assetsList = {
        fetching: false,
        data: [],
        failure: action?.payload,
      };
    },

    changeCreateDocumentAnonymousStatus(state, action: IPayloadAction<boolean>) {
      state.createDocument.isAnonymous = action.payload;
    },

    createTransitionExportInit(state, action: IPayloadAction<{ id: string | null }>) {
      // state.createTransitionExport = defaultCreateTransitionExport;
      if (!action.payload.id) return;

      state.createTransitionExport = {
        ...state.createTransitionExport,
        [action.payload.id]: defaultCreateTransitionExport
      };
    },
    setCreateTransitionExportClear(state) {
      state.createTransitionExport = {};

      // delete state.createTransitionExport[action.payload.id];

      // state.createTransitionExport = {
      //   ...state.createTransitionExport,
      //   [action.payload.id]: defaultCreateTransitionExport
      // };
    },
    setCreateTransitionExportCurrentStep(state, action: IPayloadAction<{ id: string|null, currentStep: number }>) {
      // state.createTransitionExport.currentStep = action.payload;
      if (!action.payload.id) return;

      state.createTransitionExport = {
        ...state.createTransitionExport,
        [action.payload.id]: {
          ...state.createTransitionExport[action.payload.id],
          currentStep: action.payload.currentStep
        }
      };
    },
    changeCreateTransitionExportAssetsCheckList(
      state, action: IPayloadAction<{ id: string|null, assetsCheckList: string[]|null|undefined }>
    ) {
      // state.createTransitionExport.stepOne.assetsCheckList = action.payload;
      if (!action.payload.id) return;

      state.createTransitionExport = {
        ...state.createTransitionExport,
        [action.payload.id]: {
          ...state.createTransitionExport[action.payload.id],
          stepOne: {
            ...state.createTransitionExport[action.payload.id].stepOne,
            assetsCheckList: action.payload.assetsCheckList || []
          }
        }
      };
    },
    changeCreateTransitionExportIncludeManualStatus(
      state, action: IPayloadAction<{ id: string|null, includeManuals: boolean }>
    ) {
      // state.createTransitionExport.stepOne.includeManuals = action.payload;

      if (!action.payload.id) return;

      state.createTransitionExport = {
        ...state.createTransitionExport,
        [action.payload.id]: {
          ...state.createTransitionExport[action.payload.id],
          stepOne: {
            ...state.createTransitionExport[action.payload.id].stepOne,
            includeManuals: action.payload.includeManuals
          }
        }
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCreateTransitionExportAssetsListRequest(
      state, action: IPayloadAction<{ id: string|null, query?: TQueryParams[] }>
    ) {
      // state.createTransitionExport.stepOne.assetsList = {
      //   ...state.createTransitionExport.stepOne.assetsList,
      //   fetching: true,
      // };
      if (!action.payload.id) return;

      state.createTransitionExport = {
        ...state.createTransitionExport,
        [action.payload.id]: {
          ...state.createTransitionExport[action.payload.id],
          stepOne: {
            ...state.createTransitionExport[action.payload.id].stepOne,
            assetsList: {
              ...state.createTransitionExport[action.payload.id].stepOne.assetsList,
              fetching: true
            }
          }
        }
      };
    },
    getCreateTransitionExportAssetsListSuccess(
      state, action: IPayloadAction<{id: string|null, data: TMyAssetsData[]}>
    ) {
      const { id, data: assetsList } = action.payload;
      if (!id) return;
      const synchronizedList = assetsList.filter(item => !!item.synchronized_at).map(item => item.id);

      // if (state.createTransitionExport.stepOne.assetsCheckList === null) {
      //   state.createTransitionExport.stepOne.assetsCheckList = synchronizedList;
      // }
      //
      // state.createTransitionExport.stepOne.assetsList = {
      //   fetching: false,
      //   data: assetsList,
      //   failure: null,
      // };
      // state.createTransitionExport.stepOne.synchronizedList = synchronizedList;

      const createTransitionExport = state.createTransitionExport[id];
      if (createTransitionExport.stepOne.assetsCheckList === null) {
        createTransitionExport.stepOne.assetsCheckList = synchronizedList;
      }

      createTransitionExport.stepOne.assetsList = {
        fetching: false,
        data: assetsList,
        failure: null,
      };
      createTransitionExport.stepOne.synchronizedList = synchronizedList;
    },
    getCreateTransitionExportAssetsListFailure(state, action: IPayloadAction<{id: string|null, error: any}>) {
      // state.createTransitionExport.stepOne.assetsList = {
      //   fetching: false,
      //   data: [],
      //   failure: action?.payload,
      // };

      if (!action.payload.id) return;
      const { id, error } = action.payload;
      state.createTransitionExport[id].stepOne.assetsList = {
        fetching: false,
        data: [],
        failure: error,
      };
    },
    setCreateTransitionExportStepTwoParams(
      state, action: IPayloadAction<{ id: string|null, stepTwo: TCreateTransitionExportStepTwo }>
    ) {
      // state.createTransitionExport.stepTwo = {
      //   ...state.createTransitionExport.stepTwo,
      //   ...action.payload
      // };

      if (!action.payload.id) return;
      const { id, stepTwo } = action.payload;
      state.createTransitionExport[id].stepTwo = {
        ...state.createTransitionExport[id].stepTwo,
        ...stepTwo
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createTaxReportingProjectRequest(state, _) {
      state.createTaxReportingProject = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    createTaxReportingProjectData(state, action) {
      state.createTaxReportingProject = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    createTaxReportingProjectFailure(state, action) {
      state.createTaxReportingProject = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateTaxReportAccountsRequest(state, _) {
      state.updateTaxReportAccounts = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    updateTaxReportAccountsData(state, action) {
      state.updateTaxReportAccounts = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    updateTaxReportAccountsFailure(state, action) {
      state.updateTaxReportAccounts = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },

    clearReportsStoreState() {
      return initialState;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reportTransactionsRequest(state: TReportsStoreState, _) {
      state.reportTransactions.fetching = true;
    },

    reportTransactionsSuccess(state: TReportsStoreState, action: IPayloadAction<IreportTransactionsSuccess>) {
      const { page = 1, data, next, count } = action.payload;
      const formedData = data.map(transaction => ({
        ...transaction,
        formedInfo: getTransactionInfo(transaction)
      }));

      state.reportTransactions.fetching = false;
      state.reportTransactions.data = page > 1 ? [...state.reportTransactions.data, ...formedData] : formedData;
      state.reportTransactions.next = next;
      state.reportTransactions.count = count;
      state.reportTransactions.finish = !next;
      state.reportTransactions.allCheck = !!data.length && !data.some(item => !item.checked);
    },

    changeReportTransactionsItemCheckStatus(
      state: TReportsStoreState,
      action: IPayloadAction<TChangeReportCheckStatusPayload>
    ) {
      const { id, checked } = action.payload;
      const { data } = state.reportTransactions;
      const newData = data.map((item: TReportTransactionResult) => {
        if (item.tax_report_transaction_id === id) return ({ ...item, checked, formedInfo: getTransactionInfo(item) });
        else return item;
      });

      state.reportTransactions.data = newData;
      state.reportTransactions.allCheck = !newData.some(item => !item.checked);
    },

    changeAllReportTransactionsItemCheckStatus(state: TReportsStoreState, action: IPayloadAction<boolean>) {
      const { data } = state.reportTransactions;
      state.reportTransactions.data = data.map((item: TReportTransactionResult) => ({
        ...item,
        checked: action.payload,
      }));
      state.reportTransactions.allCheck = action.payload;
    },

    reportTransactionsFailure(state: TReportsStoreState, action: IPayloadAction<AxiosError>) {
      state.reportTransactions.fetching = false;
      state.reportTransactions.error = action.payload;
    },

    changeReportTransactionsType(state, action) {
      state.reportTransactions.report_type = action.payload;
    },
    reportTransactionsDeleteItem(state, action) {
      state.reportTransactions.data = state.reportTransactions.data.filter(
        transaction => transaction.id !== action.payload.id
      );
    },
    reportTransactionsSetItemValues(state, action) {
      state.reportTransactions.data = state.reportTransactions.data.map(transaction => {
        if (transaction.id === action.payload.id) {
          return { ...transaction, ...action.payload.data, formedInfo: getTransactionInfo(transaction) };
        }
        return transaction;
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reportTaxTransactionTypesRequest(state, _) {
      state.reportTaxTransactionTypesState = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    reportTaxTransactionTypesSuccess(state, action) {
      state.reportTaxTransactionTypesState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    reportTaxTransactionTypesFailure(state, action) {
      state.reportTaxTransactionTypesState = {
        data: null,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reportTaxResultTransactionTypesRequest(state, _) {
      state.reportTaxResultTransactionTypesState = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    reportTaxResultTransactionTypesSuccess(state, action) {
      state.reportTaxResultTransactionTypesState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    reportTaxResultTransactionTypesFailure(state, action) {
      state.reportTaxResultTransactionTypesState = {
        data: null,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reportAgreementRequest(state, _) {
      state.reportAgreement = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    reportAgreementSuccess(state, action) {
      state.reportAgreement = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    reportAgreementFailure(state, action) {
      state.reportAgreement = {
        data: null,
        fetching: false,
        failure: action.payload,
      };
    },

    changeReportCheckStatusRequest(state, action) {
      state.changeReportCheckStatus = {
        ...state.changeReportCheckStatus,
        [action.payload.id]: {
          ...state.changeReportCheckStatus[action.payload.id],
          fetching: true,
          failure: null,
        },
      };
    },
    changeReportCheckStatusSuccess(state, action) {
      state.changeReportCheckStatus = {
        ...state.changeReportCheckStatus,
        [action.payload.id]: {
          fetching: false,
          data: action.payload.data,
          failure: null,
        },
      };
    },
    changeReportCheckStatusFailure(state, action) {
      state.changeReportCheckStatus = {
        ...state.changeReportCheckStatus,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action.payload.error,
        },
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changeAllReportCheckStatusRequest(state, _) {
      state.changeAllReportCheckStatus = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    changeAllReportCheckStatusSuccess(state, action) {
      state.changeAllReportCheckStatus = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    changeAllReportCheckStatusFailure(state, action) {
      state.changeAllReportCheckStatus = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteSingleTaxReportRequest(state, _) {
      state.deleteSingleTaxReport = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    deleteSingleTaxReportSuccess(state, action) {
      state.deleteSingleTaxReport = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    updateStateAfterDeletion(state, action) {
      state.reportsState = {
        ...state.reportsState,
        data: {
          ...state.reportsState.data,
          results: state.reportsState?.data?.results.filter(report => report.id !== action.payload) || []
        }
      };
    },
    deleteSingleTaxReportFailure(state, action) {
      state.deleteSingleTaxReport = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    deleteSingleTaxReportConfirmedModal(state, action: IPayloadAction<boolean>) {
      state.deleteSingleTaxReportConfirmedModal = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createPersonalDataRequest(state, _) {
      state.createPersonalData = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    createPersonalDataSuccess(state, action) {
      state.createPersonalDataComplete.fetching = true;
      state.createPersonalData = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    createPersonalDataFailure(state, action) {
      state.createPersonalData = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createPersonalDataCompleteRequest(state, _) {
      state.createPersonalDataComplete = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    createPersonalDataCompleteSuccess(state, action) {
      state.createPersonalDataComplete = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    createPersonalDataCompleteFailure(state, action) {
      state.createPersonalDataComplete = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getReportFormedRequest(state, _) {
      state.reportsFormed = {
        ...state.reportsFormed,
        fetching: true,
      };
    },
    getReportFormedSuccess(state, action) {
      state.reportsFormed = {
        failure: null,
        fetching: false,
        data: action.payload,
      };
    },
    getReportFormedFailure(state, action) {
      state.reportsFormed = {
        data: null,
        fetching: false,
        failure: action.payload,
      };
    },

    resetCreateDocument(state) {
      state.createDocument = defaultCreateDocumentState;
    },


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addTransactionToTaxReportRequest(state, _) {
      state.addTransactionToTaxReportState = {
        ...state.addTransactionToTaxReportState,
        fetching: true,
      };
    },
    addTransactionToTaxReportSuccess(state, action) {
      state.addTransactionToTaxReportState = {
        failure: null,
        fetching: false,
        data: action.payload,
      };
    },
    addTransactionToTaxReportFailure(state, action) {
      state.addTransactionToTaxReportState = {
        data: null,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createTransactionExportRequest(state, _) {
      state.createTransactionExportState = {
        ...state.createTransactionExportState,
        fetching: true,
      };
    },
    createTransactionExportSuccess(state, action) {
      state.createTransactionExportState = {
        failure: null,
        fetching: false,
        data: action.payload,
      };
    },
    createTransactionExportFailure(state, action) {
      state.createTransactionExportState = {
        ...state.createTransactionExportState,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createSourcesExportRequest(state, _) {
      state.createSourcesExportState = {
        ...state.createSourcesExportState,
        fetching: true,
      };
    },
    createSourcesExportSuccess(state, action) {
      state.createSourcesExportState = {
        failure: null,
        fetching: false,
        data: action.payload,
      };
    },
    createSourcesExportFailure(state, action) {
      state.createSourcesExportState = {
        ...state.createSourcesExportState,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reportSingleRequest(state, _) {
      state.reportSingleState = {
        ...state.reportSingleState,
        fetching: true,
      };
    },
    reportSingleSuccess(state, action) {
      state.reportSingleState = {
        initialLoading: false,
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    reportSingleFailure(state, action) {
      state.reportSingleState = {
        ...state.reportSingleState,
        initialLoading: false,
        fetching: false,
        failure: action.payload,
      };
    },
  },
});

export const {
  getReportsRequest,
  getReportsFailure,
  getReportsSuccess,
  createReportRequest,
  createReportSuccess,
  createReportFailure,
  deleteReportFailure,
  deleteReportRequest,
  deleteReportSuccess,
  setReportModals,
  clearReportsStoreState,
  getReportTaxAmountFailure,
  getReportTaxAmountRequest,
  getReportTaxAmountSuccess,
  getHintTextFailure,
  getHintTextRequest,
  getHintTextSuccess,

  changeHintTextStatusFailure,
  changeHintTextStatusRequest,
  changeHintTextStatusSuccess,

  showHintText,

  changeAssetsCheckList,
  changeIncludeManualStatus,
  getCreateDocumentAssetsListFailure,
  getCreateDocumentAssetsListSuccess,
  getCreateDocumentAssetsListRequest,

  createTransitionExportInit,
  setCreateTransitionExportClear,
  setCreateTransitionExportCurrentStep,
  changeCreateTransitionExportAssetsCheckList,
  changeCreateTransitionExportIncludeManualStatus,
  getCreateTransitionExportAssetsListRequest,
  getCreateTransitionExportAssetsListSuccess,
  getCreateTransitionExportAssetsListFailure,
  setCreateTransitionExportStepTwoParams,

  createTaxReportingProjectData,
  createTaxReportingProjectFailure,
  createTaxReportingProjectRequest,

  getSingleTaxReportRequest,
  getSingleTaxReportFailure,
  getSingleTaxReportSuccess,

  changeSingleTaxReportCurrent,

  getSinglePersonalDataSuccess,
  getSinglePersonalDataFailure,
  getSinglePersonalDataRequest,

  reportTransactionsFailure,
  reportTransactionsRequest,
  reportTransactionsSuccess,
  reportTransactionsDeleteItem,
  reportTransactionsSetItemValues,

  changeReportTransactionsType,
  changeCreateDocumentAnonymousStatus,

  reportTaxTransactionTypesRequest,
  reportTaxTransactionTypesSuccess,
  reportTaxTransactionTypesFailure,

  reportTaxResultTransactionTypesRequest,
  reportTaxResultTransactionTypesSuccess,
  reportTaxResultTransactionTypesFailure,

  reportAgreementFailure,
  reportAgreementSuccess,
  reportAgreementRequest,

  changeReportCheckStatusSuccess,
  changeReportCheckStatusFailure,
  changeReportCheckStatusRequest,

  changeReportTransactionsItemCheckStatus,
  changeAllReportTransactionsItemCheckStatus,

  changeAllReportCheckStatusSuccess,
  changeAllReportCheckStatusFailure,
  changeAllReportCheckStatusRequest,

  createPersonalDataRequest,
  createPersonalDataFailure,
  createPersonalDataSuccess,

  createPersonalDataCompleteSuccess,
  createPersonalDataCompleteFailure,
  createPersonalDataCompleteRequest,

  getReportFormedFailure,
  getReportFormedRequest,
  getReportFormedSuccess,

  updateTaxReportAccountsFailure,
  updateTaxReportAccountsData,
  updateTaxReportAccountsRequest,

  deleteSingleTaxReportFailure,
  deleteSingleTaxReportRequest,
  deleteSingleTaxReportSuccess,
  updateStateAfterDeletion,
  deleteSingleTaxReportConfirmedModal,

  addTransactionToTaxReportRequest,
  addTransactionToTaxReportSuccess,
  addTransactionToTaxReportFailure,

  createTransactionExportRequest,
  createTransactionExportSuccess,
  createTransactionExportFailure,

  createSourcesExportRequest,
  createSourcesExportSuccess,
  createSourcesExportFailure,

  reportSingleRequest,
  reportSingleSuccess,
  reportSingleFailure,

  resetCreateDocument,
} = reportsSlice.actions;

export default reportsSlice.reducer;

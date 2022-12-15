import { createSelector } from "@reduxjs/toolkit";
import groupBy from "lodash/groupBy";

import { EStatus, TNullable } from "config/types";

import { TCreateTransitionExport, TNewReportOptionData, TReportTransactionResult } from "store/reports/types";

import { getGroupedTransactions } from "utils/transactionUtils";

import { IApplicationState } from "../rootInterface";

import { TReportsOutputSelector, TSingleTaxReportData } from "./types";

const selectState = (state: IApplicationState) => state.reports;

// eslint-disable-next-line max-len
export const getReportsFetchingSelector = createSelector(selectState, state => state.reportsState.fetching);
export const getReportsDataSelector = createSelector(selectState, state => state.reportsState.data);
export const getThisYearFormingReport = createSelector(selectState, state => {
  const reports = state.reportsState.data?.results;
  const year = new Date().getFullYear();
  return reports?.find(
    item => new Date(item.created_at).getFullYear() === year &&
    (item.status === EStatus.draft || item.status === EStatus.error)
  );
});

export const getReportFormedFetchingSelector = createSelector(selectState, state => state.reportsFormed.fetching);
export const getReportFormedDataSelector = createSelector(selectState, state => state.reportsFormed.data);
export const getReportFormedFilesSelector = createSelector(selectState, state => {
  const files = state.reportsFormed.data?.files || [];
  return groupBy(files, item => item.tag);
});

export const newReportFetchingSelector = createSelector(selectState, state => state.newReportState?.fetching);
export const newReportFailureSelector = createSelector(selectState, state => state.newReportState?.failure);

export const createReportModalSelector = createSelector(selectState, state => state.modalsState?.create);
export const continueCreateReportModalSelector =
  createSelector(selectState, state => state.modalsState?.continueCreate);
export const cancelCreateReportModalSelector =
  createSelector(selectState, state => state.modalsState?.cancelCreate);
export const successReportModalSelector = createSelector(selectState, state => state.modalsState?.success);
export const cancelReportModalSelector = createSelector(selectState, state => state.modalsState?.cancel);
export const draftReportModalSelector = createSelector(selectState, state => state.modalsState?.draft);
export const stepTwoUnconfirmedOperationModalSelector =
  createSelector(selectState, state => state.modalsState?.stepTwoUnconfirmedOperation);

export const getReportsTaxAmountDataSelector = createSelector(selectState, state => state.taxAmountReport.data);
export const getReportsTaxAmountDataOF2021Selector = createSelector(
  selectState, state => state.taxAmountReport.data?.find(item => item.year === 2021));
export const getReportsTaxAmountFetchingSelector = createSelector(
  selectState, state => state.taxAmountReport.fetching);
export const getReportsTaxAmountFailureSelector = createSelector(selectState, state => state.taxAmountReport.failure);

export const assetsIncludesManualsSelector =
  createSelector(selectState, state => state.createDocument.stepOne.includeManuals);

export const assetsCheckListSelector =
  createSelector(selectState, state => state.createDocument.stepOne.assetsCheckList);

export const assetsSynchronizedListSelector =
  createSelector(selectState, state => state.createDocument.stepOne.synchronizedList);

export const getCreateDocumentAssetsDataSelector =
  createSelector(selectState, state => state.createDocument.stepOne.assetsList.data);

export const getCreateDocumentAssetsFetchingSelector =
  createSelector(selectState, state => state.createDocument.stepOne.assetsList.fetching);

export const createDocumentSelector =
  createSelector(selectState, state => state.createDocument);

export const createDocumentIsAnonymousSelector =
  createSelector(selectState, state => state.createDocument.isAnonymous);

export const createTaxReportingProjectFetchingSelector =
  createSelector(selectState, state => state.createTaxReportingProject.fetching);

export const createUploadOperationsSelector = 
  (id: string|null): TReportsOutputSelector<TCreateTransitionExport | null> =>
    createSelector(selectState, state => {
      if (!id) return null;
      return state.createTransitionExport[id];
    });
    

export const changeReportCheckStatusRequestSelector =
    createSelector(selectState, state => state.changeReportCheckStatus);

export const getAssetsHintTextVisibleSelector = createSelector(selectState, assets => assets.hintText.visible);
export const getAssetsHintTextSelector = createSelector(selectState, assets => assets.hintText.data?.title);
export const getAssetsHintTextDataSelector = createSelector(selectState, assets => assets.hintText.data);

export const getSingleTaxReportDataSelector =
  (id: string): TReportsOutputSelector<TNullable<TSingleTaxReportData>> =>
    createSelector(selectState, state => state.singleTaxReport[id] && state.singleTaxReport[id].data);

export const getSinglePersonalDataDataSelector =
  (id: string): TReportsOutputSelector<TNullable<TNewReportOptionData>> =>
    createSelector(selectState, state => state.singlePersonalData[id] && state.singlePersonalData[id].data);

export const reportTransactionsSelector = createSelector(
  selectState,
  state => getGroupedTransactions<TReportTransactionResult>(state.reportTransactions.data || [])
);

export const reportTransactionsDataSelector = createSelector(
  selectState,
  state => state.reportTransactions.data
);

export const getReportTransactionsElement =
  (id: TNullable<string>): TReportsOutputSelector<TNullable<TReportTransactionResult> | undefined> =>
    createSelector(selectState, state => state.reportTransactions.data.find(transaction => transaction.id === id));

export const reportTransactionsFetchingSelector = createSelector(
  selectState,
  state => state.reportTransactions.fetching || false,
);

export const reportTransactionsFinishSelector = createSelector(
  selectState,
  state => state.reportTransactions.finish || false,
);

export const reportTransactionsNextPageSelector = createSelector(
  selectState,
  state => state.reportTransactions.next || null,
);

export const reportTransactionsTypeSelector = createSelector(
  selectState,
  state => state.reportTransactions.report_type,
);

export const reportTransactionsAllCheckSelector = createSelector(
  selectState,
  state => state.reportTransactions.allCheck,
);

export const reportTransactionsCountSelector = createSelector(
  selectState,
  state => state.reportTransactions.count,
);

export const reportTaxTransactionTypesSelector = createSelector(
  selectState,
  state => state.reportTaxTransactionTypesState.data && state.reportTaxTransactionTypesState.data?.types,
);
export const detailRequiredTaxTransactionTypesSelector = createSelector(
  selectState,
  state => state.reportTaxTransactionTypesState.data
    && state.reportTaxTransactionTypesState.data?.types.find(item => item.type === 'details_required'),
);

export const reportTaxResultTransactionTypesSelector = createSelector(
  selectState,
  state =>
    state.reportTaxResultTransactionTypesState.data && state.reportTaxResultTransactionTypesState.data?.types,
);

export const reportAgreementFetchingSelector = createSelector(
  selectState,
  state => state.reportAgreement.fetching,
);

export const createPersonalFailureSelector = createSelector(
  selectState,
  state => state.createPersonalData.failure,
);

export const createPersonalFetchingSelector = createSelector(
  selectState,
  state => state.createPersonalData.fetching,
);

export const createPersonalCompleteFetchingSelector = createSelector(
  selectState,
  state => state.createPersonalDataComplete.fetching,
);

export const updateTaxReportAccountsFetchingSelector = createSelector(
  selectState,
  state => state.updateTaxReportAccounts.fetching,
);

export const deleteSingleTaxReportFetchingSelector = createSelector(
  selectState,
  state => state.deleteSingleTaxReport.fetching,
);

export const deleteSingleTaxReportConfirmedModalSelector = createSelector(
  selectState,
  state => state.deleteSingleTaxReportConfirmedModal,
);

export const getReportSingleFilesSelector = createSelector(selectState, state => {
  const files = state.reportSingleState.data?.files || [];
  return groupBy(files, item => item.tag);
});
export const getReportSingleSelector = createSelector(selectState, state => state.reportSingleState);
export const createTransactionExportSelector = createSelector(selectState,
  state => state.createTransactionExportState);
export const createSourcesExportSelector = createSelector(selectState, state => state.createSourcesExportState);
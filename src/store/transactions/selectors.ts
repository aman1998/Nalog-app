import { createSelector } from "@reduxjs/toolkit";

import { TNullable } from "config/types";

import { TEditSingleTransaction, TTransactionResult, TTransactionsOutputSelector } from "store/transactions/types";

import { getGroupedTransactions } from "utils/transactionUtils";

import { IApplicationState } from "../rootInterface";

import {
  TSingleTransactionData,
  TSingleTransactionFilesListData,
  TTransactionOutputSelector
} from "./types";

const selectState = (state: IApplicationState) => state.transactions;


export const makeSelectTransactionsList = createSelector(
  selectState,
  state => getGroupedTransactions<TTransactionResult>(state.list.data || [])
);

export const getTransactionsElement =
  (id: TNullable<string>): TTransactionsOutputSelector<TNullable<TTransactionResult> | undefined> =>
    createSelector(selectState, state => state.list.data.find(transaction => transaction.id === id));

export const transactionsListSelector = createSelector(selectState, state => state.list);

export const transactionsListDataSelector = createSelector(
  selectState,
  state => state.list.data
);

export const transactionsListLengthSelector = createSelector(
  selectState,
  state => state.list?.data.length,
);

export const transactionsCountSelector = createSelector(
  selectState,
  state => state.list?.count,
);

export const transactionsListFetchingSelector = createSelector(
  selectState,
  state => state.list.fetching || false,
);

export const transactionsListFinishSelector = createSelector(
  selectState,
  state => state.list.finish || false,
);

export const transactionsListNextPageSelector = createSelector(
  selectState,
  state => state.list.next || null,
);

export const transactionsListPageSelector = createSelector(
  selectState,
  state => state.list.next ? state.list.next  - 1 : 1,
);

export const transactionEditModalSelector = createSelector(
  selectState,
  state => state.editModal,
);

export const transactionEditConfirmStateSelector = createSelector(
  selectState,
  state => state.editConfirm.isOpen,
);

export const transactionEditConfirmIdSelector = createSelector(
  selectState,
  state => state.editConfirm.id,
);

export const transactionEditConfirmTypeSelector = createSelector(
  selectState,
  state => state.editConfirm.type,
);

export const transactionEditConfirmTitleSelector = createSelector(
  selectState,
  state => state.editConfirm.title,
);

export const transactionAddModalStateSelector = createSelector(
  selectState,
  state => state.addModal,
);

export const transactionAddModalTypeSelector = createSelector(
  selectState,
  state => state.addModalType,
);

export const createManualTransactionFetchingSelector = createSelector(
  selectState,
  state => state.createManualTransactionState.fetching
);

export const createManualTransactionDataSelector = createSelector(
  selectState,
  state => state.createManualTransactionState.data
);

export const createManualTransactionFailureSelector = createSelector(
  selectState,
  state => state.createManualTransactionState.failure
);

export const addStepSelector = createSelector(
  selectState,
  state => state.addModalStep
);

export const singleTransactionFetchingSelector =
  (id: string | undefined | null): TTransactionOutputSelector<boolean | undefined> =>
    createSelector(selectState, state =>
      id ? state.singleTransactionState[id] && state.singleTransactionState[id].fetching : undefined
    );

export const singleTransactionDataSelector = (
  id: string | undefined | null
): TTransactionOutputSelector<TNullable<TSingleTransactionData> | undefined> =>
  createSelector(selectState, state =>
    id ? state.singleTransactionState[id] && state.singleTransactionState[id].data : undefined
  );

export const singleTransactionFilesFetchingSelector =
  (id: string | undefined | null): TTransactionOutputSelector<boolean | undefined> =>
    createSelector(selectState, state =>
      id ? state.singleTransactionFilesState[id] && state.singleTransactionFilesState[id].fetching : undefined
    );

export const singleTransactionFilesDataSelector = (
  id: string | undefined | null
): TTransactionOutputSelector<TNullable<TSingleTransactionFilesListData[]> | undefined> =>
  createSelector(selectState, state =>
    id ? state.singleTransactionFilesState[id] && state.singleTransactionFilesState[id].data : undefined
  );

export const editSingleTransactionSelector =
  (id: string | undefined | null): TTransactionOutputSelector<TEditSingleTransaction|undefined> =>
    createSelector(selectState, state =>
      id ? state.editSingleTransactionState[id] && state.editSingleTransactionState[id] : undefined);

export const uploadSingleTransactionFilesLoadingSelector = createSelector(selectState, state => {
  const filesState = state.uploadSingleTransactionFilesState;
  const errorStates =
    Object.keys(filesState).map(key => filesState[key].fetching);
  return errorStates.some(v => v);
});

export const editManualTransactionFetching =
  (id: string | undefined | null): TTransactionOutputSelector<boolean | undefined> =>
    createSelector(selectState, state =>
      id ? state.editManualTransactionState[id] &&
        state.editManualTransactionState[id].fetching : undefined
    );

export const editManualTransactionData =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (id: string | undefined | null): TTransactionOutputSelector<any> => // TODO: fix any
    createSelector(selectState, state =>
      id ? state.editManualTransactionState[id] && state.editManualTransactionState[id].data : undefined
    );

export const deleteManualTransactionFetching = // TODO: fix any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (id: string | undefined | null): TTransactionOutputSelector<any> => createSelector(selectState, state =>
    id ? state.deleteManualTransactionState[id] && state.deleteManualTransactionState[id].fetching : undefined);


export const transactionSelector = createSelector(selectState, state => state.transaction);
export const editTransactionNoteSelector = createSelector(selectState, state => state.editTransactionNoteState);
export const editTransactionTagSelector = createSelector(selectState, state => state.editTransactionTagState);
export const assetsTagsSelector = createSelector(selectState, state => state.assetsTagsState);
export const deleteTransactionFilesStateSelector =
  createSelector(selectState, state => state.deleteTransactionFilesState);
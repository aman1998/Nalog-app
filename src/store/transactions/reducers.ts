import { createAction, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IPayloadAction } from "store/rootInterface";

import { getTransactionInfo } from "utils/transactionUtils";

import { defaultState, PAGINATION_PAGE_LIMIT } from "../constants";

import {
  IEditModal,
  IUploadMultipleTransactionFilesPayload,
  TEditConfirm,
  TGetTransactionsListSuccess,
  TTransactionStoreState,
} from "./types";

const initialState: TTransactionStoreState = {
  singleTransactionState: {},
  singleTransactionFilesState: {},
  deleteManualTransactionState: {},
  editSingleTransactionState: {},
  createManualTransactionState: defaultState,
  editManualTransactionState: {},
  deleteTransactionFilesState: defaultState,
  uploadSingleTransactionFilesState: {},
  transaction: defaultState,
  list: {
    fetching: false,
    infiniteScroll: true,
    data: [],
    lastElementFromPreviousPage: null,
    firstElementOfNextPage: null,
    finish: false,
    next: null,
    count: null,
  },
  addModal: false,
  addModalType: null,
  addModalStep: 1,
  editModal: {
    id: null,
    isOpen: false,
    date: null,
    title: null,
    type: null,
    formState: null,
    changeType: false
  },
  editConfirm: {
    id: null,
    title: null,
    type: null,
    isOpen: false
  },
  editTransactionNoteState: defaultState,
  editTransactionTagState: defaultState,
  assetsTagsState: defaultState,
};

export const uploadMultipleFiles = createAction<IUploadMultipleTransactionFilesPayload>(
  'transactions/uploadMultipleFiles'
);

const transactionsSlace = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // TODO: fix @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearTransactionsState() {
      return initialState;
    },

    clearTransactionList(state) {
      state.list.data = [];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTransactionsListRequest(state: TTransactionStoreState, _) {
      state.list.fetching = true;
    },
    getTransactionsListSuccess(state: TTransactionStoreState, action: IPayloadAction<TGetTransactionsListSuccess>) {
      const { results, next, count, infiniteScroll, limit, offset } = action.payload;
      let data = results;
      state.list.fetching = false;
      
      switch (limit) {
      case PAGINATION_PAGE_LIMIT+2:
        data = results.slice(1, PAGINATION_PAGE_LIMIT+1);
        state.list.lastElementFromPreviousPage = results[0];
        state.list.next = count > offset + PAGINATION_PAGE_LIMIT ? offset + PAGINATION_PAGE_LIMIT : null;

        state.list.firstElementOfNextPage = results.length === PAGINATION_PAGE_LIMIT+2
          ? results[results.length-1]
          : null;
        break;
      case PAGINATION_PAGE_LIMIT+1:
        data = results.slice(0, PAGINATION_PAGE_LIMIT);
        state.list.lastElementFromPreviousPage = null;
        state.list.next = count > offset + PAGINATION_PAGE_LIMIT ? offset + PAGINATION_PAGE_LIMIT : null;

        state.list.firstElementOfNextPage = results.length === PAGINATION_PAGE_LIMIT+1
          ? results[results.length-1]
          : null;
        break;
      default:
        state.list.lastElementFromPreviousPage = null;
        state.list.firstElementOfNextPage = null;
        state.list.next = next;
        break;
      }

      const formedData = data.map(transaction => ({
        ...transaction,
        formedInfo: getTransactionInfo(transaction)
      }));

      state.list.data = infiniteScroll
        ? [...state.list.data, ...formedData]
        : formedData;
      state.list.count = count;
      state.list.finish = !next;
      state.list.infiniteScroll = infiniteScroll;
    },

    getTransactionsListFailure(state: TTransactionStoreState, action: IPayloadAction<AxiosError>) {
      state.list.fetching = false;
      state.list.error = action.payload;
    },
    getTransactionsListSetTransaction(state: TTransactionStoreState, action) {
      const { id, data } = action.payload;

      state.list.data = state.list.data.map(transaction => {
        if (transaction.id === id) {
          const merge = { ...transaction, ...data };
          return {
            ...merge,
            formedInfo: getTransactionInfo(merge)
          };
        }
        return transaction;
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTransactionRequest(state: TTransactionStoreState, _) {
      state.transaction = {
        fetching: true,
        data: null,
        failure: null
      };
    },

    getTransactionSuccess(state: TTransactionStoreState, action) {
      const transaction = action.payload;
      const formedData = {
        ...transaction,
        formedInfo: getTransactionInfo(transaction)
      };

      state.transaction = {
        fetching: false,
        data: formedData,
        failure: null
      };

      state.list.data = state.list.data.map(item => {
        if (item.id === transaction.id) {
          return formedData;
        }
        return item;
      });
    },
    getTransactionFailure(state: TTransactionStoreState, action) {
      state.transaction = {
        fetching: false,
        data: null,
        failure: action.payload.error
      };
    },


    openEditModal(state: TTransactionStoreState, action: IPayloadAction<IEditModal>) {
      const { id, type, title, date, formState, changeType, isOpen } = action.payload;

      state.editModal = {
        id,
        title,
        date,
        type,
        isOpen: isOpen !== false,
        formState,
        changeType
      };
    },

    closeEditModal(state: TTransactionStoreState) {
      state.editModal = {
        id: null,
        title: null,
        date: null,
        isOpen: false,
        type: null,
        formState: null,
        changeType: false
      };
    },

    openAddModal(state: TTransactionStoreState) {
      state.addModal = true;
    },

    closeAddModal(state: TTransactionStoreState) {
      state.addModal = false;
    },

    addModalType(state:TTransactionStoreState, action: IPayloadAction<string> ) {
      state.addModalType = action.payload;
    },

    changeAddModalStep(state: TTransactionStoreState, action: IPayloadAction<number>) {
      state.addModalStep = action.payload;
    },

    openEditConfirm(state: TTransactionStoreState, action: IPayloadAction<TEditConfirm>) {
      const { id, title, type } = action.payload;
      state.editConfirm = {
        id,
        title,
        type,
        isOpen: true
      };
    },

    closeEditConfirm(state: TTransactionStoreState) {
      state.editConfirm = {
        id: null,
        title: null,
        type: null,
        isOpen: false
      };
    },

    getSingleTransactionRequest(state: TTransactionStoreState, action: IPayloadAction<string>) {
      state.singleTransactionState = {
        ...state.singleTransactionState,
        [action.payload]: {
          fetching: true,
          data: null,
          failure: null,
        },
      };
    },
    getSingleTransactionSuccess(state: TTransactionStoreState, action) {
      state.singleTransactionState = {
        ...state.singleTransactionState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    getSingleTransactionFailure(state: TTransactionStoreState, action) {
      state.singleTransactionState = {
        ...state.singleTransactionState,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action?.payload.error,
        },
      };
    },
    getSingleTransactionFilesRequest(state: TTransactionStoreState, action: IPayloadAction<string>) {
      state.singleTransactionFilesState = {
        ...state.singleTransactionFilesState,
        [action.payload]: {
          fetching: true,
          data: null,
          failure: null,
        },
      };
    },
    getSingleTransactionFilesSuccess(state: TTransactionStoreState, action) {
      state.singleTransactionFilesState = {
        ...state.singleTransactionFilesState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    getSingleTransactionFilesFailure(state: TTransactionStoreState, action) {
      state.singleTransactionFilesState = {
        ...state.singleTransactionFilesState,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action?.payload.error,
        },
      };
    },

    editSingleTransactionRequest(state: TTransactionStoreState, action) {
      state.editSingleTransactionState = {
        ...state.editSingleTransactionState,
        [action.payload.id]: {
          fetching: true,
          data: null,
          failure: null,
        },
      };
    },
    editSingleTransactionSuccess(state: TTransactionStoreState, action) {
      state.editSingleTransactionState = {
        ...state.editSingleTransactionState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    deleteManualTransactionRequest(state: TTransactionStoreState, action) {
      state.deleteManualTransactionState = {
        ...state.deleteManualTransactionState,
        [action.payload.id]:{
          fetching: true,
          data: null,
          failure: null
        }
      };
    },
    deleteManualTransactionSuccess(state: TTransactionStoreState, action) {
      state.list.data = state.list.data.filter(transaction => transaction.id !== action.payload.id);
    },
    deleteManualTransactionFailure(state: TTransactionStoreState, action) {
      state.deleteManualTransactionState = {
        ...state.deleteManualTransactionState,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action.payload.error
        }
      };
    },
    editSingleTransactionFailure(state: TTransactionStoreState, action) {
      state.editSingleTransactionState = {
        ...state.editSingleTransactionState,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action?.payload.error,
        },
      };
    },

    uploadSingleTransactionFileRequest(state: TTransactionStoreState, action) {
      state.uploadSingleTransactionFilesState = {
        ...state.uploadSingleTransactionFilesState,
        [action.payload.id]: {
          fetching: true,
          data: null,
          failure: null,
          progress: 0,
        },
      };
    },
    uploadSingleTransactionFileSuccess(state: TTransactionStoreState, action) {
      state.uploadSingleTransactionFilesState = {
        ...state.uploadSingleTransactionFilesState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
          progress: 100
        },
      };
    },
    uploadSingleTransactionFileFailure(state: TTransactionStoreState, action) {
      state.uploadSingleTransactionFilesState = {
        ...state.uploadSingleTransactionFilesState,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action?.payload.error,
          progress: 0,
        },
      };
    },
    uploadSingleTransactionFileProgress(state: TTransactionStoreState, action) {
      state.uploadSingleTransactionFilesState = {
        ...state.uploadSingleTransactionFilesState,
        [action.payload.id]: {
          ...state.uploadSingleTransactionFilesState,
          progress: action.payload.percent
        }
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteTransactionFilesRequest(state: TTransactionStoreState, _) {
      state.deleteTransactionFilesState = {
        fetching: true,
        data: null,
        failure: null
      };
    },
    deleteTransactionFilesSuccess(state: TTransactionStoreState, action) {
      state.deleteTransactionFilesState = {
        fetching: false,
        data: action.payload.data,
        failure: null
      };
    },
    deleteTransactionFilesFailure(state: TTransactionStoreState, action) {
      state.deleteTransactionFilesState = {
        fetching: false,
        data: null,
        failure: action.payload.error
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createManualTransactionRequest(state: TTransactionStoreState, _) {
      state.createManualTransactionState = {
        fetching: true,
        failure: null,
        data: null
      };
    },
    createManualTransactionSuccess(state: TTransactionStoreState, action) {
      state.createManualTransactionState = {
        fetching: true,
        failure: null,
        data: action.payload.data
      };
    },
    createManualTransactionFailure(state: TTransactionStoreState, action) {
      state.createManualTransactionState = {
        fetching: false,
        data: null,
        failure: action.payload
      };
    },

    editManualTransactionRequest(state: TTransactionStoreState, action) {
      state.editManualTransactionState = {
        ...state.editManualTransactionState,
        [action.payload.id]: {
          fetching: true,
          data: null,
          failure: null,
        },
      };
    },
    editManualTransactionSuccess(state: TTransactionStoreState, action) {
      state.list.data = state.list.data.map(item => {
        if (item.id === action.payload.id) {
          const transaction = { ...item, needs_details: false, src_extra_files: true };
          return { ...transaction, formedInfo: getTransactionInfo(transaction) };
        } 
        return item;
      });
      
      state.editManualTransactionState = {
        ...state.editManualTransactionState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    editManualTransactionFailure(state: TTransactionStoreState, action) {
      state.editManualTransactionState = {
        ...state.editManualTransactionState,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action?.payload.error,
        },
      };
    },


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editTransactionNoteRequest(state: TTransactionStoreState, _) {
      state.editTransactionNoteState = {
        ...state.editTransactionNoteState,
        fetching: true,
        failure: null,
      };
    },
    editTransactionNoteSuccess(state: TTransactionStoreState, action) {
      state.editTransactionNoteState = {
        fetching: false,
        failure: null,
        data: action.payload.data
      };
    },
    editTransactionNoteFailure(state: TTransactionStoreState, action) {
      state.editTransactionNoteState = {
        fetching: false,
        data: null,
        failure: action.payload
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editTransactionTagRequest(state: TTransactionStoreState, _) {
      state.editTransactionTagState = {
        ...state.editTransactionTagState,
        fetching: true,
        failure: null,
      };
    },
    editTransactionTagSuccess(state: TTransactionStoreState, action) {
      state.editTransactionTagState = {
        fetching: false,
        failure: null,
        data: action.payload.data
      };
    },
    editTransactionTagFailure(state: TTransactionStoreState, action) {
      state.editTransactionTagState = {
        fetching: false,
        data: null,
        failure: action.payload
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    assetsTagsRequest(state: TTransactionStoreState) {
      state.assetsTagsState = {
        ...state.assetsTagsState,
        fetching: true,
        failure: null,
      };
    },
    assetsTagsSuccess(state: TTransactionStoreState, action) {
      state.assetsTagsState = {
        fetching: false,
        failure: null,
        data: action.payload
      };
    },
    assetsTagsFailure(state: TTransactionStoreState, action) {
      state.assetsTagsState = {
        fetching: false,
        data: null,
        failure: action.payload
      };
    },
  },
});

export const {
  clearTransactionsState,

  clearTransactionList,
  getTransactionsListRequest,
  getTransactionsListSuccess,
  getTransactionsListFailure,
  getTransactionsListSetTransaction,

  getTransactionRequest,
  getTransactionSuccess,
  getTransactionFailure,

  getSingleTransactionFailure,
  getSingleTransactionRequest,
  getSingleTransactionSuccess,

  editSingleTransactionFailure,
  editSingleTransactionSuccess,
  editSingleTransactionRequest,

  uploadSingleTransactionFileSuccess,
  uploadSingleTransactionFileFailure,
  uploadSingleTransactionFileRequest,
  uploadSingleTransactionFileProgress,

  deleteManualTransactionRequest,
  deleteManualTransactionSuccess,
  deleteManualTransactionFailure,

  getSingleTransactionFilesFailure,
  getSingleTransactionFilesSuccess,
  getSingleTransactionFilesRequest,

  deleteTransactionFilesSuccess,
  deleteTransactionFilesFailure,
  deleteTransactionFilesRequest,

  createManualTransactionFailure,
  createManualTransactionSuccess,
  createManualTransactionRequest,

  editManualTransactionSuccess,
  editManualTransactionRequest,
  editManualTransactionFailure,

  editTransactionNoteRequest,
  editTransactionNoteSuccess,
  editTransactionNoteFailure,

  editTransactionTagRequest,
  editTransactionTagSuccess,
  editTransactionTagFailure,

  assetsTagsRequest,
  assetsTagsSuccess,
  assetsTagsFailure,

  openEditModal,
  closeEditModal,

  openEditConfirm,
  closeEditConfirm,

  openAddModal,
  closeAddModal,
  addModalType,
  changeAddModalStep,

} = transactionsSlace.actions;

export default transactionsSlace.reducer;

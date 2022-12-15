import { createSlice } from "@reduxjs/toolkit";
import { omit } from "lodash";

import { defaultState } from "../constants";

import {
  DashboardDiagramKeys,
  TAssetsStoreState,
  TExchangeSymbolsAssetsData,
  TExchangeSymbolsData
} from "./types";

const initialState: TAssetsStoreState = {
  assetsState: defaultState,
  assetsDetailState: defaultState,
  myAssetsState: defaultState,
  connectAssetsState: defaultState,
  assetsExchangeSymbol: defaultState,
  assetsExchangeAssets: defaultState,
  assetsExchangeSymbolAssets: [],
  assetsCurrencyState: {},
  singleAssetState: {},
  singleAssetDeleteState: {},
  singleAssetRenameState: {},
  singleAssetConnectEditState: {},
  startAccountSyncState: {},
  accountID: null,
  showModal: false,
  valueByAssetsState: { ...defaultState, loadingModal: false, initialLoading: true },
  valueByAccountsState: { ...defaultState, initialLoading: true },
  dashboardDiagramState: {
    accounts: [],
    assets: [],
    selected: DashboardDiagramKeys.assets,
  },
  assetsDashboardSymbolState: defaultState,
  assetsDashboardAssetsState: defaultState,
  assetsDashboardSyncAccountState: { ...defaultState, syncLoading: false },
  assetsDashboardValueHistoryState: { ...defaultState, initialLoading: true },
  assetsDashboardPortfolioStatsState: defaultState,
  assetsDashboardP2PStatsState: defaultState,
  assetsDashboardAvailableSymbolsState: {},
  assetsDashboardSaveSymbolsState: defaultState,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {

    getAssetsRequest(state) {
      state.assetsState = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getAssetsSuccess(state, action) {
      state.assetsState = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getAssetsFailure(state, action) {
      state.assetsState = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAssetsDetailRequest(state, _) {
      state.assetsDetailState = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getAssetsDetailSuccess(state, action) {
      state.assetsDetailState = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getAssetsDetailFailure(state, action) {
      state.assetsDetailState = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMyAssetsRequest(state, _) {
      state.myAssetsState = {
        ...state.myAssetsState,
        fetching: true,
        failure: null,
      };
    },
    getMyAssetsSuccess(state, action) {
      state.myAssetsState = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getMyAssetsFailure(state, action) {
      state.myAssetsState = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },
    getAssetsExchangeAssetsRequest(state) {
      state.assetsExchangeAssets = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getAssetsExchangeAssetsSuccess(state, action) {
      const newObj = action.payload?.map((item: TExchangeSymbolsAssetsData) => omit(item, 'count'));
      state.assetsExchangeAssets = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
      state.assetsExchangeSymbolAssets = [ ...newObj, ...state.assetsExchangeSymbolAssets ];
    },
    getAssetsExchangeAssetsFailure(state, action) {
      state.assetsExchangeAssets = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },
    getAssetsExchangeSymbolsRequest(state) {
      state.assetsExchangeSymbol = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getAssetsExchangeSymbolsSuccess(state, action) {
      const newObj = action.payload?.map((item: TExchangeSymbolsAssetsData) => omit(item, 'count'));
      state.assetsExchangeSymbol = {
        fetching: false,
        data: action?.payload?.map((item: TExchangeSymbolsData) => item.exchange_symbol),
        failure: null,
      };
      state.assetsExchangeSymbolAssets = [ ...state.assetsExchangeSymbolAssets, ...newObj ];
    },
    getAssetsExchangeSymbolsFailure(state, action) {
      state.assetsExchangeSymbol = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },


    // TODO: fix @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connectAssetsRequest(state, _) {
      state.connectAssetsState = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    connectAssetsSuccess(state, action) {
      state.connectAssetsState = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    connectAssetsFailure(state, action) {
      state.connectAssetsState = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },

    getSingleAssetRequest(state, action) {
      state.singleAssetState = {
        ...state.singleAssetState,
        [action.payload.id]: {
          fetching: true,
          data: state.singleAssetState[action.payload.id]?.data,
          failure: null,
        },
      };
    },
    getSingleAssetSuccess(state, action) {
      state.singleAssetState = {
        ...state.singleAssetState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    getSingleAssetFailure(state, action) {
      state.singleAssetState = {
        ...state.singleAssetState,
        [action.payload.id]: {
          fetching: false,
          data: null,
          failure: action?.payload.error,
        },
      };
    },

    getAccountSyncId(state, action) {
      state.accountID = action.payload;
    },

    startAccountSyncRequest(state, action) {
      const asset = state.startAccountSyncState[action.payload] || {};
      state.startAccountSyncState = {
        ...state.startAccountSyncState,
        [action.payload]: {
          ...asset,
          fetching: true,
          failure: null
        },
      };
    },
    startAccountSyncSuccess(state, action) {
      const asset = state.startAccountSyncState[action.payload.id] || {};
      state.startAccountSyncState = {
        ...state.startAccountSyncState,
        [action.payload.id]: {
          ...asset,
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    startAccountSyncFailure(state, action) {
      const asset = state.startAccountSyncState[action.payload.id] || {};
      state.startAccountSyncState = {
        ...state.startAccountSyncState,
        [action.payload.id]: {
          ...asset,
          fetching: false,
          data: null,
          failure: action?.payload.error,
        },
      };
    },
    startAccountSyncSetSyncLoading(state, action) {
      const asset = state.startAccountSyncState[action.payload.id] || {};
      state.startAccountSyncState = {
        ...state.startAccountSyncState,
        [action.payload.id]: {
          ...asset,
          syncLoading: action?.payload.state,
        },
      };
    },

    getSingleAssetDeleteRequest(state, action) {
      const asset = state.singleAssetDeleteState[action.payload.id] || {};
      state.singleAssetDeleteState = {
        ...state.singleAssetDeleteState,
        [action.payload.id]: {
          ...asset,
          fetching: true,
        },
      };
    },
    getSingleAssetDeleteSuccess(state, action) {
      state.singleAssetDeleteState = {
        ...state.singleAssetDeleteState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    getSingleAssetDeleteFailure(state, action) {
      const asset = state.singleAssetDeleteState[action.payload.id] || {};
      state.singleAssetDeleteState = {
        ...state.singleAssetDeleteState,
        [action.payload.id]: {
          ...asset,
          fetching: false,
          failure: action?.payload.error,
        },
      };
    },

    renameSingleAssetRequest(state, action) {
      const asset = state.singleAssetRenameState[action.payload.id] || {};
      state.singleAssetRenameState = {
        [action.payload.id]: {
          ...asset,
          fetching: true,
        },
      };
    },
    renameSingleAssetSuccess(state, action) {
      state.singleAssetRenameState = {
        ...state.singleAssetRenameState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    renameSingleAssetFailure(state, action) {
      const asset = state.singleAssetRenameState[action.payload.id] || {};
      state.singleAssetRenameState = {
        ...state.singleAssetRenameState,
        [action.payload.id]: {
          ...asset,
          fetching: false,
          failure: action?.payload.error,
        },
      };
    },

    editConnectSingleAssetRequest(state, action) {
      const asset = state.singleAssetConnectEditState[action.payload.id] || {};
      state.singleAssetConnectEditState = {
        ...state.singleAssetConnectEditState,
        [action.payload.id]: {
          ...asset,
          fetching: true,
        },
      };
    },
    editConnectSingleAssetSuccess(state, action) {
      state.singleAssetConnectEditState = {
        ...state.singleAssetConnectEditState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    editConnectSingleAssetFailure(state, action) {
      const asset = state.singleAssetConnectEditState[action.payload.id] || {};
      state.singleAssetConnectEditState = {
        ...state.singleAssetConnectEditState,
        [action.payload.id]: {
          ...asset,
          fetching: false,
          failure: action?.payload.error,
        },
      };
    },

    showModal(state, action) {
      state.showModal = action?.payload;
    },
    clearAssetsState() {
      return initialState;
    },

    valueByAssetsRequest(state, action) {
      state.valueByAssetsState = {
        ...state.valueByAssetsState,
        fetching: true,
        loadingModal: action.payload.loadingModal,
      };
    },
    valueByAssetsSuccess(state, action) {
      state.valueByAssetsState = {
        fetching: false,
        initialLoading: false,
        loadingModal: false,
        data: action?.payload,
        failure: null,
      };
    },
    valueByAssetsFailure(state, action) {
      state.valueByAssetsState = {
        fetching: false,
        initialLoading: false,
        loadingModal: false,
        data: null,
        failure: action?.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    valueByAccountRequest(state, _) {
      state.valueByAccountsState = {
        ...state.valueByAccountsState,
        fetching: true,
      };
    },
    valueByAccountSuccess(state, action) {
      state.valueByAccountsState = {
        ...state.valueByAccountsState,
        fetching: false,
        initialLoading: false,
        data: action?.payload,
        failure: null,
      };
    },
    valueByAccountFailure(state, action) {
      state.valueByAccountsState = {
        ...state.valueByAccountsState,
        fetching: false,
        initialLoading: false,
        failure: action?.payload,
      };
    },
    setDashboardDiagramState(state, action) {
      state.dashboardDiagramState = {
        ...state.dashboardDiagramState,
        [action?.payload.name]: action?.payload.data,
      };
    },
    setDashboardDiagramSelected(state, action) {
      state.dashboardDiagramState = {
        ...state.dashboardDiagramState,
        selected: action?.payload,
      };
    },
    
    getAssetsCurrencyRequest(state, action) {
      state.assetsCurrencyState = {
        ...state.assetsCurrencyState,
        [action.payload.name]: {
          fetching: true,
          data: null,
          failure: null,
        }
      };
    },

    getAssetsCurrencySuccess(state, action) {
      state.assetsCurrencyState = {
        ...state.assetsCurrencyState,
        [action.payload.name]: {
          fetching: false,
          data: action.payload.data,
          failure: null,
        }
      };
    },

    getAssetsCurrencyFailure(state, action) {
      state.assetsCurrencyState = {
        ...state.assetsCurrencyState,
        [action.payload.name]: {
          ...state.assetsCurrencyState[action.payload.name],
          fetching: false,
          data: action.payload.data,
          failure: action.payload.error,
        }
      };
    },
    setAssetsCurrencyActive(state, action) {
      state.assetsCurrencyState = {
        ...state.assetsCurrencyState,
        [action.payload.name]: {
          ...state.assetsCurrencyState[action.payload.name],
          fetching: false,
          data: {
            ...state.assetsCurrencyState[action.payload.name].data,
          },
          failure: action.payload.error,
        }
      };
    },

    getAssetsDashboardSymbolRequest(state) {
      state.assetsDashboardSymbolState = {
        ...state.assetsDashboardSymbolState,
        fetching: true,
        failure: null,
      };
    },
    getAssetsDashboardSymbolSuccess(state, action) {
      state.assetsDashboardSymbolState = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getAssetsDashboardSymbolFailure(state, action) {
      state.assetsDashboardSymbolState = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAssetsDashboardAssetsRequest(state, _) {
      state.assetsDashboardAssetsState = {
        ...state.assetsDashboardAssetsState,
        fetching: true,
        failure: null,
      };
    },
    getAssetsDashboardAssetsSuccess(state, action) {
      state.assetsDashboardAssetsState = {
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getAssetsDashboardAssetsFailure(state, action) {
      state.assetsDashboardAssetsState = {
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },

    getAssetsDashboardSyncAccountRequest(state) {
      state.assetsDashboardSyncAccountState = {
        ...state.assetsDashboardSyncAccountState,
        syncLoading: true,
        fetching: true,
        failure: null,
      };
    },
    getAssetsDashboardSyncAccountSuccess(state, action) {
      state.assetsDashboardSyncAccountState = {
        ...state.assetsDashboardSyncAccountState,
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getAssetsDashboardSyncAccountFailure(state, action) {
      state.assetsDashboardSyncAccountState = {
        ...state.assetsDashboardSyncAccountState,
        fetching: false,
        data: null,
        failure: action?.payload,
      };
    },
    setAccountDashboardSyncAccountSyncLoading(state, action) {
      state.assetsDashboardSyncAccountState = {
        ...state.assetsDashboardSyncAccountState,
        syncLoading: action?.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAssetsDashboardValueHistoryRequest(state, _) {
      state.assetsDashboardValueHistoryState = {
        ...state.assetsDashboardValueHistoryState,
        fetching: true,
      };
    },
    getAssetsDashboardValueHistorySuccess(state, action) {
      state.assetsDashboardValueHistoryState = {
        ...state.assetsDashboardValueHistoryState,
        fetching: false,
        data: action?.payload,
        initialLoading: false,
        failure: null,
      };
    },
    getAssetsDashboardValueHistoryFailure(state, action) {
      state.assetsDashboardValueHistoryState = {
        ...state.assetsDashboardValueHistoryState,
        fetching: false,
        failure: action?.payload,
        initialLoading: false,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAssetsDashboardPortfolioStatsRequest(state, _) {
      state.assetsDashboardPortfolioStatsState = {
        ...state.assetsDashboardPortfolioStatsState,
        fetching: true,
      };
    },
    getAssetsDashboardPortfolioStatsSuccess(state, action) {
      state.assetsDashboardPortfolioStatsState = {
        ...state.assetsDashboardPortfolioStatsState,
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getAssetsDashboardPortfolioStatsFailure(state, action) {
      state.assetsDashboardPortfolioStatsState = {
        ...state.assetsDashboardPortfolioStatsState,
        fetching: false,
        failure: action?.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAssetsDashboardP2PStatsRequest(state, _) {
      state.assetsDashboardP2PStatsState = {
        ...state.assetsDashboardP2PStatsState,
        fetching: true,
      };
    },
    getAssetsDashboardP2PStatsSuccess(state, action) {
      state.assetsDashboardP2PStatsState = {
        ...state.assetsDashboardP2PStatsState,
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    getAssetsDashboardP2PStatsFailure(state, action) {
      state.assetsDashboardP2PStatsState = {
        ...state.assetsDashboardP2PStatsState,
        fetching: false,
        failure: action?.payload,
      };
    },

    getAssetsDashboardAvailableSymbolsRequest(state, action) {
      state.assetsDashboardAvailableSymbolsState = {
        ...state.assetsDashboardAvailableSymbolsState,
        [action.payload.id]: {
          ...state.assetsDashboardAvailableSymbolsState[action.payload.id],
          fetching: true,
          failure: null,
        },
      };
    },
    getAssetsDashboardAvailableSymbolsSuccess(state, action) {
      state.assetsDashboardAvailableSymbolsState = {
        ...state.assetsDashboardAvailableSymbolsState,
        [action.payload.id]: {
          fetching: false,
          data: action?.payload.data,
          failure: null,
        },
      };
    },
    getAssetsDashboardAvailableSymbolsFailure(state, action) {
      state.assetsDashboardAvailableSymbolsState = {
        ...state.assetsDashboardAvailableSymbolsState,
        [action.payload.id]: {
          ...state.assetsDashboardAvailableSymbolsState[action.payload.id],
          fetching: false,
          failure: action?.payload.error,
        },
      };
    },


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postAssetsDashboardSaveSymbolsRequest(state, _) {
      state.assetsDashboardSaveSymbolsState = {
        ...state.assetsDashboardSaveSymbolsState,
        fetching: true,
      };
    },
    postAssetsDashboardSaveSymbolsSuccess(state, action) {
      state.assetsDashboardSaveSymbolsState = {
        ...state.assetsDashboardSaveSymbolsState,
        fetching: false,
        data: action?.payload,
        failure: null,
      };
    },
    postAssetsDashboardSaveSymbolsFailure(state, action) {
      state.assetsDashboardSaveSymbolsState = {
        ...state.assetsDashboardSaveSymbolsState,
        fetching: false,
        failure: action?.payload,
      };
    },
  },
});

export const {
  getAssetsRequest,
  getAssetsFailure,
  getAssetsSuccess,

  getAssetsDetailRequest,
  getAssetsDetailFailure,
  getAssetsDetailSuccess,

  getMyAssetsRequest,
  getMyAssetsSuccess,
  getMyAssetsFailure,

  connectAssetsFailure,
  connectAssetsSuccess,
  connectAssetsRequest,

  getSingleAssetRequest,
  getSingleAssetSuccess,
  getSingleAssetFailure,

  startAccountSyncRequest,
  startAccountSyncSuccess,
  startAccountSyncFailure,
  startAccountSyncSetSyncLoading,

  getSingleAssetDeleteRequest,
  getSingleAssetDeleteSuccess,
  getSingleAssetDeleteFailure,

  renameSingleAssetRequest,
  renameSingleAssetSuccess,
  renameSingleAssetFailure,

  editConnectSingleAssetRequest,
  editConnectSingleAssetSuccess,
  editConnectSingleAssetFailure,

  getAssetsExchangeAssetsFailure,
  getAssetsExchangeAssetsRequest,
  getAssetsExchangeAssetsSuccess,
  getAssetsExchangeSymbolsFailure,
  getAssetsExchangeSymbolsSuccess,
  getAssetsExchangeSymbolsRequest,

  getAssetsCurrencyRequest,
  getAssetsCurrencySuccess,
  getAssetsCurrencyFailure,

  showModal,

  clearAssetsState,

  getAccountSyncId,

  valueByAssetsRequest,
  valueByAssetsSuccess,
  valueByAssetsFailure,

  valueByAccountRequest,
  valueByAccountSuccess,
  valueByAccountFailure,
  setDashboardDiagramState,
  setDashboardDiagramSelected,

  getAssetsDashboardSymbolRequest,
  getAssetsDashboardSymbolSuccess,
  getAssetsDashboardSymbolFailure,

  getAssetsDashboardAssetsRequest,
  getAssetsDashboardAssetsSuccess,
  getAssetsDashboardAssetsFailure,

  getAssetsDashboardSyncAccountRequest,
  getAssetsDashboardSyncAccountSuccess,
  getAssetsDashboardSyncAccountFailure,
  setAccountDashboardSyncAccountSyncLoading,

  getAssetsDashboardValueHistoryRequest,
  getAssetsDashboardValueHistorySuccess,
  getAssetsDashboardValueHistoryFailure,

  getAssetsDashboardPortfolioStatsRequest,
  getAssetsDashboardPortfolioStatsSuccess,
  getAssetsDashboardPortfolioStatsFailure,

  getAssetsDashboardP2PStatsRequest,
  getAssetsDashboardP2PStatsSuccess,
  getAssetsDashboardP2PStatsFailure,

  getAssetsDashboardAvailableSymbolsRequest,
  getAssetsDashboardAvailableSymbolsSuccess,
  getAssetsDashboardAvailableSymbolsFailure,

  postAssetsDashboardSaveSymbolsRequest,
  postAssetsDashboardSaveSymbolsSuccess,
  postAssetsDashboardSaveSymbolsFailure,

} = assetsSlice.actions;
export default assetsSlice.reducer;

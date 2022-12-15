import { OutputSelector } from "reselect";

import { ESyncStatus, TNullable, EAssetsTypes, TPaginationOptions, ECurrency } from "config/types";

import { IApplicationState, IPaginationResponse, TRequestHandler } from "../rootInterface";

export type TAssetsData = {
  id: string;
  type: EAssetsTypes;
  name: string;
  code: string;
  connect_method: string;
  archived: boolean;
  soon: boolean;
  icon: string;
};

export type TAssetsDetailBlockchein = {
  id: string;
  name: string;
  icon: string;
  connect_address_name: string;
  connect_address_placeholder: string;
}

export type TAssetsDetailData = {
  id: string;
  name: string;
  type: EAssetsTypes;
  code: string;
  connect_method: string;
  archived: boolean;
  soon: boolean;
  icon: string;
  guide_label: TNullable<string>;
  guide_url: TNullable<string>;
  connect_param1_name: string;
  connect_param1_placeholder: TNullable<string>;
  connect_param2_name: string;
  connect_param2_placeholder: TNullable<string>;
  connect_param3_name: TNullable<string>;
  connect_param3_placeholder: TNullable<string>;
  connect_address_name: TNullable<string>;
  connect_address_placeholder: TNullable<string>;
  blockchains: TNullable<TAssetsDetailBlockchein[]>;
};

export type TGetAssetsDetailPayload = {
  id: string
}

export type TGetMyAssetsPayload = {
  include_subaccounts?: boolean
}

export type TConnectAssetPayload = {
  code: string,
  data: {
    stock: string,
    connect_method: string,
    api_param1?: string,
    api_param2?: string,
    api_param3?: string,
    name?: string,
    address?: string,
    blockchains?: { stock: string, address: string }[];
  },
  redirectToAsset?: (id: string) => void
}

export type TMyAssetsData = {
  id: string;
  name: string;
  parent: TNullable<string>;
  stock: string;
  icon: string;
  transaction_count: TNullable<number>;
  synchronized_at: string,
  status: string,
};

export type TAssetsState = TRequestHandler<TAssetsData[]>
export type TAssetsDetailState = TRequestHandler<TAssetsDetailData>

export type TAssetsExchangeSymbolData = string[];

export type TAssetsExchangeSymbol = TRequestHandler<TAssetsExchangeSymbolData>;

export type TAssetsExchangeAssetsData = {
  asset: string,
  count: number
};

export type TAssetsExchangeAssets = TRequestHandler<TAssetsExchangeAssetsData>

export type TMyAssetsState = TRequestHandler<TMyAssetsData[]>

export type TConnectAssetsState = TRequestHandler<Record<string, unknown>>

export enum EConnectMethods {
  API_KEY = "API_KEY",
  ADDRESS = "ADDRESS",
  MULTI_ADDRESS = "MULTI_ADDRESS",
}

export type TBalance = {
  asset: TNullable<string>;
  amount: TNullable<number>;
  transactions: TNullable<number>;
  cost: TNullable<number>;
};

export enum ESubTypes {
  main="main",
  margin="margin",
  fund="fund",
  investment="investment",
}

export type TSubaccount = {
  id: string;
  name?: TNullable<string>;
  sub_type: TNullable<ESubTypes>;
  transactions: number;
  total_cost: number;
  total_usd: number;
  balances?: TNullable<TBalance[]>;
}

export type TSingleAssetData = {
  id: string;
  stock: string;
  stock_type: EAssetsTypes;
  stock_name: string;
  stock_note: string;
  connect_method: EConnectMethods;
  created_at?: TNullable<string>;
  name?: TNullable<string>;
  status: ESyncStatus;
  error_code: TNullable<string>;
  sync_max_time?: TNullable<string>;
  address?: TNullable<string>;
  total_cost: number;
  total_usd: number;
  transactions: number;
  currency: ECurrency;
  subaccounts?: TNullable<TSubaccount[]>;
};

export type TSingleAssetState = TRequestHandler<TSingleAssetData>

export type TStartAccountSyncData = {
  detail: string;
};

export type TStartAccountSyncDataStatus = {
  status: string;
};

export type TStartAccountSyncState = TRequestHandler<TStartAccountSyncData | TStartAccountSyncDataStatus> & {
  syncLoading: boolean;
}

export type TRenameSingleAssetValues = {
  name: string;
};

export type TRenameSingleAssetOptions = {
  id: string;
  values: TRenameSingleAssetValues;
  callOnSuccess: () => void;
};

export type TRenameSingleAssetState = TRequestHandler<Record<string, unknown>>

export type TEditConnectSingleAssetData = {
  api_param1: string;
  api_param2: string;
};

export type TEditConnectSingleAssetOptions = {
  id: string;
  values: TEditConnectSingleAssetData;
  callOnSuccess: () => void;
};

export type TSingleAssetConnectEditState = TRequestHandler<Record<string, unknown>>

export type TSingleAssetDeleteOptions = {
  id: string;
  callOnSuccess: () => void;
};

export type TSingleAssetDeleteState = TRequestHandler<Record<string, unknown>>

export type TExchangeSymbolsData = {
  exchange_symbol: string;
  count: number
};

export type TExchangeSymbolsAssetsData = {
  exchange_symbol?: string;
  asset?: string;
  count: number
};

export type TValueByAssetOptions = {
  params: {
    max_count: number;
  }
  loadingModal: number;
}

export type TValueByAssetElement = {
  amount: string;
  name: string;  // Название
  value: string; // Стоимость в рублях
}

export type TValueByAssetData = {
  count: number; // Общее число активов
  currency: ECurrency;
  total_cost: string;
  [DashboardDiagramKeys.assets]: TValueByAssetElement[];
  others: {
    value: string; //  Стоимость прочих активов в рублях
  }
}
export type TValueByAssetState = TRequestHandler<TValueByAssetData> & { loadingModal: boolean, initialLoading: boolean }

export type TValueByAccountOptions = {
  max_count: number;
}

export type TValueByAccountElement = {
  id: string; // Количество
  name: string;  // Название
  value: string; // Стоимость в рублях
}

export type TValueByAccountData = {
  count: number; // Общее число аккаунтов
  currency: ECurrency;
  [DashboardDiagramKeys.accounts]: TValueByAccountElement[];
  others: {
    value: string; //  Активы остальных аккаунтов в рублях
  }
}

export type TValueByAccountsState = TRequestHandler<TValueByAccountData> & { initialLoading: boolean };

export type DashboardDiagramValues = {
  id: string;
  name: string;
  value: string;
  color: string;
  ratio: number;
  currency: ECurrency;
}

export enum DashboardDiagramKeys {
  accounts= 'accounts',
  assets= 'assets'
}

export type DashboardDiagramState = {
  [DashboardDiagramKeys.accounts]: DashboardDiagramValues[],
  [DashboardDiagramKeys.assets]: DashboardDiagramValues[],
  selected: DashboardDiagramKeys
}

export type TAssetCurrencyOptions = {
  code?: string
  fiat?: boolean
  default?: string
} & TPaginationOptions
export type TAssetCurrency = {
  id: string;
  code: string;
  fiat: boolean;
}
export type TAssetsCurrencyData = IPaginationResponse<TAssetCurrency>
export type TAssetsCurrencyState = TRequestHandler<TAssetsCurrencyData>;

export type TAssetsDashboardSymbols = {
  id: string;
  name: string;
  icon: string;
  price: TNullable<number>;
  change: TNullable<number>;
  type: string;
  source: string;
}
export type TAssetsDashboardSymbolsData = TAssetsDashboardSymbols[]
export type TAssetsDashboardSymbolsState = TRequestHandler<TAssetsDashboardSymbolsData>

export type TAssetsDashboardAccountsData = {
  accounts: number;
  last_update: TNullable<string>;
  exchanges: number;
  blockchains: number;
  wallets: number;
  status: TNullable<ESyncStatus>;
}
export type TAssetsDashboardAccountsState = TRequestHandler<TAssetsDashboardAccountsData>

export type TAssetsDashboardSyncAccountsData = {
  detail: string
}
export type TAssetsDashboardSyncAccountsState = TRequestHandler<TAssetsDashboardSyncAccountsData>
  & {syncLoading: boolean}

export type EAssetsDashboardValueHistoryOptions = {
  date_from?: string,
  date_to?: string
}

export type TAssetsDashboardValueHistoryDay = {
  date: string;
  value: number;
}
export type TAssetsDashboardValueHistoryDate = {
  currency: ECurrency;
  days: TAssetsDashboardValueHistoryDay[]|null
}
export type TAssetsDashboardValueHistoryState =
  TRequestHandler<TAssetsDashboardValueHistoryDate> & { initialLoading: boolean };

export type TAssetsDashboardPortfolioStatsData = {
  currency: ECurrency,
  transactions: number;
  gain: string;
  turnover: string;
}
export type TAssetsDashboardPortfolioStatsState = TRequestHandler<TAssetsDashboardPortfolioStatsData>


export type TAssetsDashboardP2PStatsDay = {
  date: string,
  timestamp: number,
  sent: string,
  received: string,
}
export type TAssetsDashboardP2PStatsData = {
  sent: string;
  received: string;
  profit: string;
  transactions: number;
  currency: ECurrency;
  days: TAssetsDashboardP2PStatsDay[]
}
export type TAssetsDashboardP2PStatsState = TRequestHandler<TAssetsDashboardP2PStatsData>

export type AssetsDashboardAvailableSymbolOptionsParams = {
  search?: string;
}
export type AssetsDashboardAvailableSymbolOptions = {
  id: string;
  params: AssetsDashboardAvailableSymbolOptionsParams
}
export type TAssetsDashboardAvailableSymbol = {
  id: string;
  name: string;
  icon: string;
  type: string;
  source: string;
}
export type TAssetsDashboardAvailableSymbolData = TAssetsDashboardAvailableSymbol[]
export type TAssetsDashboardAvailableSymbolsState = TRequestHandler<TAssetsDashboardAvailableSymbolData>

export type TAssetsDashboardSaveSymbolsData = {
  symbols: string[]
}
export type TAssetsDashboardSaveSymbolsState = TRequestHandler<TAssetsDashboardSaveSymbolsData>

export type TAssetsStoreState = {
  assetsState: TAssetsState;
  assetsDetailState: TAssetsDetailState;
  myAssetsState: TMyAssetsState;
  connectAssetsState: TConnectAssetsState;
  assetsExchangeSymbol: TAssetsExchangeSymbol;
  assetsExchangeAssets: TAssetsExchangeAssets;
  assetsExchangeSymbolAssets: TExchangeSymbolsAssetsData[];
  singleAssetState: Record<string, TSingleAssetState>;
  startAccountSyncState: Record<string, TStartAccountSyncState>;
  accountID: TNullable<string>;
  singleAssetConnectEditState: Record<string, TSingleAssetConnectEditState>;
  singleAssetDeleteState: Record<string, TSingleAssetDeleteState>;
  singleAssetRenameState: Record<string, TRenameSingleAssetState>;
  valueByAssetsState: TValueByAssetState;
  valueByAccountsState: TValueByAccountsState;
  dashboardDiagramState: DashboardDiagramState;
  assetsCurrencyState: Record<string, TAssetsCurrencyState>;
  assetsDashboardSymbolState: TAssetsDashboardSymbolsState;
  assetsDashboardAssetsState: TAssetsDashboardAccountsState;
  assetsDashboardSyncAccountState: TAssetsDashboardSyncAccountsState;
  assetsDashboardValueHistoryState: TAssetsDashboardValueHistoryState;
  assetsDashboardPortfolioStatsState: TAssetsDashboardPortfolioStatsState;
  assetsDashboardP2PStatsState: TAssetsDashboardP2PStatsState;
  assetsDashboardAvailableSymbolsState: Record<string, TAssetsDashboardAvailableSymbolsState>;
  assetsDashboardSaveSymbolsState: TAssetsDashboardSaveSymbolsState;
  showModal: boolean;
};

export type TAssetsOutputSelector<T> = OutputSelector<IApplicationState, T, (s: TAssetsStoreState) => T>;

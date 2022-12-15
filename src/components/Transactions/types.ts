import { TNullable } from "config/types";


export enum ETransactionChangeTypeAction {
  openModal = "openModal",
  openConfirm = "openConfirm"
}

export const OutputTitle = {
  unknown: "operations.fromUnknownPerson"
};

export enum ETransactionsIcon {
  classifyOperationIcon = "classifyOperationIcon",
  tradeIcon = "tradeIcon",
  transferIcon = "transferIcon",
  arrowUp = "arrowUp",
  arrowDown = "arrowDown",
  marginTradingOpening = "marginTradingOpening",
  marginTradingClosing = "marginTradingClosing",
}

export enum ESelectTypes {
  assets = "assets",
  assetsSymbol = 'assets-symbol'
}

export enum ETransactionOperationType {
  internal = "internal",
  external = "external"
}

export enum ETransactionsCurrency {
  ALL = "operations.allCurrencies",
  BTCUSDT = "BTCUSDT",
  BTC = "BTC",
  USDT = "USDT",
  ETH = "ETH",
  Fiat = "Fiat"
}

export enum EDateFilter {
  date_from = "date_from",
  date_to = "date_to",
}

export type TEditFormValues = {
  external_counterparty?: string;
  external_foreign: boolean;
  external_amount: number | string;
  external_asset?: string;
  new_type?: TNullable<string>;
  files: File[];
  external_source_country?: string,
  external_destination_country?: string,
}

export type TManualP2PFormValues = {
  type?: string,
  date: string,
  fio?: string,
  src_asset: string,
  src_amount: number | string,
  dst_asset: string,
  dst_amount: number | string,
  external_foreign?: boolean;
  external_source_country?: string,
  external_destination_country?: string,
  files: File[]
}

export type TransactionAddModalProps = {
  // It can get any function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  finalCall?: (value: any) => void;
  isReport?: boolean;
}

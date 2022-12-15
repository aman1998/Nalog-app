import { ETransactionsOperationsTypes, ETransactionsTypesRu } from "config/types";

export const defaultOperations = [
  ETransactionsOperationsTypes.fiatOutcome,
  ETransactionsOperationsTypes.cryptoSale,
  ETransactionsOperationsTypes.cryptoTransfer,
  ETransactionsOperationsTypes.cryptoOutcome,
  ETransactionsOperationsTypes.p2pSale,
];
export const operationTypes = [
  { value: ETransactionsOperationsTypes.fiatOutcome, label: ETransactionsTypesRu.fiatOutcome },
  { value: ETransactionsOperationsTypes.cryptoSale, label: ETransactionsTypesRu.cryptoSale },
  { value: ETransactionsOperationsTypes.cryptoTransfer, label: ETransactionsTypesRu.cryptoTransfer },
  { value: ETransactionsOperationsTypes.cryptoOutcome, label: ETransactionsTypesRu.cryptoOutcome },
  { value: ETransactionsOperationsTypes.p2pSale, label: ETransactionsTypesRu.p2pSale },
];
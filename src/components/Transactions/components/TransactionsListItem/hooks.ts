import { createContext, useContext } from "react";

import { TNullable } from "config/types";

import { TTransactionResult } from "store/transactions/types";

export type TransactionsListItemContextProps = {
  transaction: TNullable<TTransactionResult>
}
export const TransactionsListItemContext = createContext<TransactionsListItemContextProps>({ transaction: null });


export const useTransactionsListItem = (): TransactionsListItemContextProps => useContext(TransactionsListItemContext);

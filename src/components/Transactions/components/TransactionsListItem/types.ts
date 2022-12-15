import { TTransactionResult } from "store/transactions/types";

export type TransactionsListItemProps = {
  transaction: TTransactionResult;
  getCheckbox?: JSX.Element;
  isResult?: boolean;
  isContinuation?: boolean
  hasContinuation?: boolean
  hideBorder?: boolean
  isDashboard?: boolean
};

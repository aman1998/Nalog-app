import { TNullable } from "config/types";

export type TransactionOperationTypeProps = {
  symbol: TNullable<string>;
  openEditModal: () => void;
  isResult?: boolean;
  classify?: boolean;
  showBtns: boolean;
}
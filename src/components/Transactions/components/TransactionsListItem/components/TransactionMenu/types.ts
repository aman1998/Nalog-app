import { TNullable } from "config/types";

export type TransactionMenuProps = {
  transactionName: TNullable<string>;
  availableDelete?: boolean;
  edit?: boolean;
  onEdit?: () => void;
}
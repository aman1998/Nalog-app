import { TTransactionMenuList } from "store/transactions/types";

export type TTransactionListItemDropdownName = {
  transactionName: string;
  handleTransactionType: (value: TTransactionMenuList) => void;
  showBtns: boolean;
  changeTypeList: TTransactionMenuList[],
  red?: boolean;
};

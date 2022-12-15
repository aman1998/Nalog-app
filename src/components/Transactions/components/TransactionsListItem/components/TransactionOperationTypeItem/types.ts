import { TNullable } from "config/types";

import { TBtnIconColors } from "store/transactions/types";

export interface TransactionOperationTypeItemProps {
  blocksType?: string;
  btnIconColors?: TNullable<TBtnIconColors>;
  title?: TNullable<string>;
  asset?: TNullable<string>;
  symbol?: TNullable<string>;
  showBtns?: boolean,
  cost: string;
  name: string;
  isExternalType: boolean;
  editOpen: () => void;
  isLoss?: boolean;
  longName?: boolean;
  classify?: boolean;
  errorMsg?: TNullable<string>;
}
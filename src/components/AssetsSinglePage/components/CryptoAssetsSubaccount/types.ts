import { ECurrency } from "config/types";

import { TSubaccount } from "store/assets/types";

export type CryptoAssetsSubaccountProps = {
  subaccount: TSubaccount;
  currency: ECurrency;
}

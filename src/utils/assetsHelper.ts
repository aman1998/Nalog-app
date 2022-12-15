import { EAssetsTypes } from "config/types";

import i18n from "../i18n";

export const formAssetsName = (name?: string, stockType?: EAssetsTypes): string | null => {
  if (name) {
    return name;
  }

  if (stockType === EAssetsTypes.BLOCKCHAIN) {
    return i18n.t("naming.wallet");
  }

  if (stockType === EAssetsTypes.EXCHANGE) {
    return i18n.t("naming.exchange");
  }

  return null;
};

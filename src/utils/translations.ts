import { TNullable } from "config/types";

import { ESubTypes } from "store/assets/types";

import i18n from "../i18n";

export const getESubTypesTranslations = (subType: TNullable<ESubTypes>, short?: boolean): string => {
  switch (subType) {
  case ESubTypes.main:
    return !short ? i18n.t("subType.mainAccount") : i18n.t("subType.mainAccountShort");
  case ESubTypes.margin:
    return !short ? i18n.t("subType.marginAccount") : i18n.t("subType.marginAccountShort");
  case ESubTypes.fund:
    return !short ? i18n.t("subType.fundingAccount") : i18n.t("subType.fundingAccountShort");
  case ESubTypes.investment:
    return !short ? i18n.t("subType.investmentAccount") : i18n.t("subType.investmentAccountShort");
  default:
    return "";
  }
};
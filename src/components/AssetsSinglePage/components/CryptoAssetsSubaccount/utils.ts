import { TNullable } from "config/types";

import { ESubTypes } from "store/assets/types";

import { getESubTypesTranslations } from "utils/translations";

import i18n from "../../../../i18n";

export const formTitle = (subType: TNullable<ESubTypes>, name?: TNullable<string>): string => {
  const subTypeTranslation = getESubTypesTranslations(subType);
  if (subTypeTranslation) return subTypeTranslation;
  
  if (name) {
    return name;
  }
  return i18n.t('naming.cryptoAssets');
};
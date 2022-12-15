import { abbreviateNumber } from "js-abbreviation-number";

import i18n from "../i18n";
import { ELanguages } from "../i18n/constants";

export const abbreviate = (value: number): string => {
  let symbols = ["", "k", "m", "b", "t", "p", "e"];
  if (i18n.language === ELanguages.ruRU) {
    symbols = ["", " тыс", " млн", " млрд", " трл", " квадр", " квинт"];
  }
  return abbreviateNumber(value, 0, { symbols });
};

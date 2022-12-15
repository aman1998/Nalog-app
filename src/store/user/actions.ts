import { PayloadAction } from "@reduxjs/toolkit";

import { ELanguages } from "../../i18n/constants";

export const USER_UPDATE_LOCAL_SETTINGS_LANGUAGE_REQUEST = "USER_UPDATE_LOCAL_SETTINGS_LANGUAGE_REQUEST";

export const updateLocalSettingsLanguageRequest = (
  lang: ELanguages,
): PayloadAction<ELanguages> => ({
  type: USER_UPDATE_LOCAL_SETTINGS_LANGUAGE_REQUEST,
  payload: lang
});

import { createBrowserHistory } from "history";
import { TFunction } from "i18next";

import { paths } from "config/paths";
import { ELinks } from "config/types";

import i18n from "../i18n";

export const history = createBrowserHistory();

export const getPageTitle = (pathname: string): TFunction | string=> {
  switch (pathname) {
  case paths.HOME:
    return i18n.t(ELinks.HOME);
  case paths.ASSETS:
    return i18n.t(ELinks.ASSETS);
  case paths.SINGLE_ASSET:
    return i18n.t(ELinks.ASSETS);
  case paths.SETTINGS:
    return i18n.t(ELinks.SETTINGS_MAIN);
  case paths.SETTINGS_SAFETY:
    return i18n.t(ELinks.SETTINGS_SAFETY);
  case paths.SETTINGS_OTHER:
    return i18n.t(ELinks.SETTINGS_OTHER);
  case paths.SETTINGS_SERVICES:
    return i18n.t(ELinks.SETTINGS_SERVICES);
  case paths.SETTINGS_REPORTS:
    return i18n.t(ELinks.SETTINGS_REPORTS);
  case paths.SETTINGS_PLAN_AND_PAYMENTS:
    return i18n.t(ELinks.SETTINGS_PLAN_AND_PAYMENT);
  case paths.REPORTS:
    return i18n.t(ELinks.REPORTS);
  case paths.PROFILE:
    return i18n.t(ELinks.PROFILE);
  case paths.TRANSACTIONS:
    return i18n.t(ELinks.TRANSACTIONS);
  case paths.DOCUMENTS:
    return i18n.t(ELinks.DOCUMENTS);
  case paths.PRICING:
    return i18n.t(ELinks.PRICING);
  default:
    return "";
  }
};

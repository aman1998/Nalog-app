import { AxiosDataError } from "API/types";

import { ESyncStatus, TNullable } from "config/types";

import { TAssetsDashboardAccountsData } from "store/assets/types";

import { getRelativeTime } from "utils/dateHelpers";

import i18n from "../../../../i18n";

export const formStatusText = (
  data: TNullable<TAssetsDashboardAccountsData>,
  error: TNullable<AxiosDataError>,
  syncLoading: boolean,
  isMobile: boolean,
):
  {statusText: string} =>
{
  if (syncLoading) {
    return { statusText: i18n.t("accountSync.synchronizing") };
  }
  if (data?.status === ESyncStatus.error || error) {
    return { statusText: i18n.t("dashboardYourAccounts.syncError") };
  }
  if (data?.accounts === 0 && data.status === null && !isMobile) {
    return { statusText: i18n.t("action.addAccount") };
  }
  if (data?.last_update && data?.status === ESyncStatus.synchronized) {
    return { statusText:`${i18n.t("dashboardYourAccounts.synced")} ${getRelativeTime(data?.last_update)}` };
  }
  return { statusText: "" };
};

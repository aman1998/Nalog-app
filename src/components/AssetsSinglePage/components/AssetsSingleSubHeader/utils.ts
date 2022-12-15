import { ESyncErrorStatus, ESyncStatus, TNullable } from "config/types";

import { getRelativeTime } from "utils/dateHelpers";

import i18n from "../../../../i18n";

export const getSyncDate = (
  loading?: boolean,
  error?: boolean,
  status?: ESyncStatus,
  syncMaxTime?:TNullable<string>,
): string => {
  if (loading || status === ESyncStatus.synchronizing) {
    return i18n.t('accountSync.updatingBalancesAndTransactions');
  }
  if (error || status === ESyncStatus.error) {
    return i18n.t('accountSync.startSyncLater');
  }
  if (status === null) {
    return i18n.t('accountSync.accountDataNotLoadedYet');
  }

  return `${i18n.t('naming.updated')} ${getRelativeTime(syncMaxTime)}`;
};

export const checkIsSyncHaveErrorType = (errorType: string): boolean => {
  switch (errorType) {
  case ESyncErrorStatus.INVALID_API_KEY:
  case ESyncErrorStatus.INVALID_API_SECRET:
  case ESyncErrorStatus.API_LIMIT_REACHED:
  case ESyncErrorStatus.INVALID_ADDRESS: return true;
  default: return false;
  }
};

export const getTitle = (
  loading?: boolean, 
  status?: ESyncStatus,
  errorCode?:TNullable<string>
): string => {
  const syncError = status === ESyncStatus.error && !loading;

  if (loading) return i18n.t('accountSync.synchronization');
  if (status === ESyncStatus.synchronized && !loading) return i18n.t('accountSync.synchronized');
  if (status === ESyncStatus.synchronizing) return i18n.t('accountSync.synchronization');
  if (syncError && errorCode === ESyncErrorStatus.INVALID_API_KEY) return i18n.t('accountSync.invalidAPIKey');
  if (syncError && errorCode === ESyncErrorStatus.INVALID_API_SECRET) return i18n.t('accountSync.incorrectPrivateKey');
  if (syncError && errorCode === ESyncErrorStatus.API_LIMIT_REACHED) {
    return i18n.t('accountSync.lotsOfRequestsFromUsers');
  }
  if (syncError && errorCode === ESyncErrorStatus.INVALID_ADDRESS) return i18n.t('accountSync.invalidWalletAddress');
  if (syncError && !checkIsSyncHaveErrorType(errorCode as string)) return i18n.t('accountSync.synchronizationError');
  return i18n.t('accountSync.accountDataNotLoadedYet');
};
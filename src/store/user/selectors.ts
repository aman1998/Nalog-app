import { createSelector } from "@reduxjs/toolkit";

import { IApplicationState } from "../rootInterface";

const selectState = (state: IApplicationState) => state.user;

export const getUserInfoFetchingSelector = createSelector(
  selectState,
  user => user.userInfo.fetching
);
export const getUserInfoDataSelector = createSelector(
  selectState,
  user => user.userInfo.data
);
export const getUserInfoFailureSelector = createSelector(
  selectState,
  user => user.userInfo.failure
);

export const getUserInfoSettingsFetchingSelector = createSelector(
  selectState,
  user => user.userSettingsInfoState.fetching
);
export const getUserInfoSettingsDataSelector = createSelector(selectState, user => user.userSettingsInfoState.data);

export const getEmailSelector = createSelector(selectState, user => user.userSettingsInfoState.data?.email);
export const getPhoneSelector = createSelector(selectState, user => user.userSettingsInfoState.data?.phone);
export const checkEmailConfirmedSelector = createSelector(
  selectState,
  user => user.userSettingsInfoState.data?.email_confirmed
);

export const loadingUserChangePassword = createSelector(selectState, user => user.userChangePasswordState?.fetching);
export const errorsUserChangePassword = createSelector(selectState, user => user.userChangePasswordState?.failure);

export const loadingBindEmailPhoneSelector = createSelector(selectState,
  user => user.userBindEmailPhoneState?.fetching);
export const errorsBindEmailPhoneSelector = createSelector(selectState, user => user.userBindEmailPhoneState?.failure);
export const loadingBindEmailPhoneCodeSelector = createSelector(selectState,
  user => user.userBindEmailPhoneCodeState.fetching);
export const errorsBindEmailPhoneCodeSelector = createSelector(selectState,
  user => user.userBindEmailPhoneCodeState.failure);
export const dataBindEmailPhoneCodeSelector = createSelector(selectState,
  user => user.userBindEmailPhoneCodeState.data);

export const showBindCodeSelector = createSelector(selectState, user => user.showBindCodeForm);
export const showBindPopupSelector = createSelector(selectState, user => user.showBindPopup);

export const userSaveLocalSettingsSelector = createSelector(selectState, user => user.userSaveLocalSettingsState);

export const userPaymentMethodsSelector = createSelector(selectState, user => user.userPaymentMethodsState);
export const deleteUserPaymentMethodSelector = createSelector(selectState, user => user.deleteUserPaymentMethodsState);
export const setUserPaymentMethodSelector = createSelector(selectState, user => user.setUserPaymentMethodsState);
export const userPaymentHistorySelector = createSelector(selectState, user => user.userPaymentHistoryState);

export const userPlanInfoSelector = createSelector(selectState, user => user.userPlanInfoState);

import { createSelector } from "@reduxjs/toolkit";

import { IApplicationState } from "../rootInterface";

const selectState = (state: IApplicationState) => state.auth;

export const signInFetchingSelector = createSelector(selectState, auth => auth?.signInState.fetching);

export const signUpPhoneFetchingSelector = createSelector(selectState, auth => auth?.signUpPhoneState.fetching);
export const signUpPhoneFailureSelector = createSelector(selectState, auth => auth?.signUpPhoneState.failure);
export const signUpPhoneSuccessSelector = createSelector(selectState, auth => auth?.signUpPhoneState.data);

export const signUpEmailFetchingSelector = createSelector(selectState, auth => auth?.signUpEmailState.fetching);
export const signUpEmailFailureSelector = createSelector(selectState, auth => auth?.signUpEmailState.failure);

export const isAuthorizedSelector = createSelector(selectState, auth => auth?.isAuthorized);
export const isCodeOpen = createSelector(selectState, auth => auth?.isCodeOpen);
export const blockingTimeSelector = createSelector(selectState, auth => auth?.blockingTime);
export const codeTokenSelector = createSelector(selectState, auth => auth?.codeToken);

export const resetPasswordPageSelector = createSelector(selectState, auth => auth?.resetPassword);

export const resetTokenSelector = createSelector(selectState, auth => auth?.resetCodeState.data?.reset_token);

export const resetUsernameFetchingSelector = createSelector(selectState, auth => auth?.resetUsernameState.fetching);
export const resetUsernameFailureSelector = createSelector(selectState, auth => auth?.resetUsernameState.failure);

export const resetCodeFetchingSelector = createSelector(selectState, auth => auth?.resetCodeState.fetching);
export const resetCodeFailureSelector = createSelector(selectState, auth => auth?.resetCodeState.failure);

export const resetNewPasswordFetchingSelector = createSelector(
  selectState,
  auth => auth?.resetNewPasswordState.fetching
);
export const resetNewPasswordFailureSelector = createSelector(
  selectState,
  auth => auth?.resetNewPasswordState.failure
);

export const confirmEmailFetchingSelector = createSelector(selectState, auth => auth?.confirmEmailState.fetching);
export const confirmEmailFailureSelector = createSelector(selectState, auth => auth?.confirmEmailState.failure);
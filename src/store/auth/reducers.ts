import { createSlice } from "@reduxjs/toolkit";

import { defaultState } from "../constants";

import { defaultResetPasswordState, TAuthStoreState } from "./types";

const initialState: TAuthStoreState = {
  signInState: defaultState,
  signUpPhoneState: defaultState,
  signUpEmailState: defaultState,
  codeConfirmState: defaultState,
  profileInfoState: defaultState,
  resetUsernameState: defaultState,
  resetCodeState: defaultState,
  resetNewPasswordState: defaultState,
  resendCodeState: defaultState,
  confirmEmailState: defaultState,
  isAuthorized: false,
  isCodeOpen: false,
  blockingTime: null,
  codeToken: null,
  resetPassword: defaultResetPasswordState,
  signUpOAuthState: defaultState,
  signInOAuthState: defaultState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getSignInRequest(state, action) {
      state.signInState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getSignInSuccess(state, action) {
      state.signInState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
      state.isAuthorized = true;
    },
    getSignInFailure(state, action) {
      state.signInState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    getSignUpPhoneRequest(state, action) {
      state.signUpPhoneState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getSignUpPhoneSuccess(state, action) {
      state.signUpPhoneState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
      state.isCodeOpen = true;
    },
    getSignUpPhoneFailure(state, action) {
      state.signUpPhoneState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    getResetUsernameRequest(state, action) {
      state.resetUsernameState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getResetUsernameSuccess(state, action) {
      state.resetUsernameState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
      state.resetPassword = {
        showUsername: false,
        showCode: true,
        showNewPassword: false,
      };
    },
    getResetUsernameFailure(state, action) {
      state.resetUsernameState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    getResetCodeRequest(state, action) {
      state.resetCodeState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getResetCodeSuccess(state, action) {
      state.resetCodeState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
      state.resetPassword = {
        showUsername: false,
        showCode: false,
        showNewPassword: true,
      };
    },
    getResetCodeFailure(state, action) {
      state.resetCodeState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    getResetNewPasswordRequest(state, action) {
      state.resetNewPasswordState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getResetNewPasswordSuccess(state, action) {
      state.resetNewPasswordState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
      state.isAuthorized = true;
    },
    getResetNewPasswordFailure(state, action) {
      state.resetNewPasswordState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    getSignUpEmailRequest(state, action) {
      state.signUpEmailState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getSignUpEmailSuccess(state, action) {
      state.signUpEmailState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
      state.isAuthorized = true;
    },
    getSignUpEmailFailure(state, action) {
      state.signUpEmailState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    getCodeRequest(state, action) {
      state.codeConfirmState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getCodeSuccess(state, action) {
      state.codeConfirmState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
      state.isAuthorized = true;
    },
    getCodeFailure(state, action) {
      state.codeConfirmState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    getProfileInfoRequest(state, action) {
      state.profileInfoState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getProfileInfoSuccess(state, action) {
      state.profileInfoState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
      state.isAuthorized = true;
    },
    getProfileInfoFailure(state, action) {
      state.profileInfoState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    resendCodeRequest(state, action) {
      state.resendCodeState = {
        ...action.payload,
        fetching: true,
        data: null,
        failure: null,
      };
    },
    resendCodeSuccess(state, action) {
      state.resendCodeState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    resendCodeFailure(state, action) {
      state.resendCodeState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    showResetUsername(state) {
      state.resetPassword = {
        showUsername: true,
        showCode: false,
        showNewPassword: false,
      };
    },
    showResetCode(state) {
      state.resetPassword = {
        showUsername: false,
        showCode: true,
        showNewPassword: false,
      };
    },
    showNewPasswordCode(state) {
      state.resetPassword = {
        showUsername: false,
        showCode: false,
        showNewPassword: true,
      };
    },
    confirmEmailRequest(state, action) {
      state.confirmEmailState = {
        ...action.payload,
        fetching: true,
        failure: null,
      };
    },
    confirmEmailSuccess(state, action) {
      state.confirmEmailState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    confirmEmailFailure(state, action) {
      state.confirmEmailState = {
        ...action.payload,
        fetching: false,
        failure: action.payload,
      };
    },


    signUpOAuthRequest(state, action) {
      state.signUpOAuthState = {
        ...action.payload,
        fetching: true,
        failure: null,
      };
    },
    signUpOAuthSuccess(state, action) {
      state.signUpOAuthState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    signUpOAuthFailure(state, action) {
      state.signUpOAuthState = {
        ...action.payload,
        fetching: false,
        failure: action.payload,
      };
    },

    signInOAuthRequest(state, action) {
      state.signInOAuthState = {
        ...action.payload,
        fetching: true,
        failure: null,
      };
    },
    signInOAuthSuccess(state, action) {
      state.signInOAuthState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    signInOAuthFailure(state, action) {
      state.signInOAuthState = {
        ...action.payload,
        fetching: false,
        failure: action.payload,
      };
    },


    closeCode(state) {
      state.isCodeOpen = false;
    },
    openCode(state) {
      state.isCodeOpen = true;
    },
    logout(state) {
      state.isAuthorized = false;
    },
    getBlockingTime(state, action) {
      state.blockingTime = action.payload;
    },
    getCodeToken(state, action) {
      state.codeToken = action.payload;
    },
    checkIsAuth(state, action) {
      state.isAuthorized = action.payload;
    },
    clearAuthErrors(state) {
      state.signInState.failure = null;
      state.signUpPhoneState.failure = null;
      state.resetUsernameState.failure = null;
      state.resetCodeState.failure = null;
      state.resetNewPasswordState.failure = null;
      state.signUpEmailState.failure = null;
      state.codeConfirmState.failure = null;
      state.resendCodeState.failure = null;
      state.confirmEmailState.failure = null;
    },
    clearAuthState() {
      return initialState;
    }
  },
});

export const {
  getSignInRequest,
  getSignInSuccess,
  getSignInFailure,
  getSignUpPhoneFailure,
  getSignUpPhoneRequest,
  getSignUpPhoneSuccess,
  getResetNewPasswordRequest,
  getResetNewPasswordSuccess,
  getResetNewPasswordFailure,
  getResetCodeRequest,
  getResetCodeFailure,
  getResetCodeSuccess,
  getResetUsernameRequest,
  getResetUsernameSuccess,
  getResetUsernameFailure,
  getCodeFailure,
  getCodeRequest,
  getCodeSuccess,
  getSignUpEmailFailure,
  getSignUpEmailRequest,
  getSignUpEmailSuccess,
  closeCode,
  openCode,
  getProfileInfoFailure,
  getProfileInfoSuccess,
  getProfileInfoRequest,
  logout,
  resendCodeRequest,
  resendCodeFailure,
  resendCodeSuccess,
  confirmEmailRequest,
  confirmEmailSuccess,
  confirmEmailFailure,
  getBlockingTime,
  getCodeToken,
  showResetCode,
  showNewPasswordCode,
  showResetUsername,
  clearAuthState,
  checkIsAuth,
  clearAuthErrors,

  signUpOAuthRequest,
  signUpOAuthSuccess,
  signUpOAuthFailure,

  signInOAuthRequest,
  signInOAuthSuccess,
  signInOAuthFailure,
} = authSlice.actions;

export default authSlice.reducer;

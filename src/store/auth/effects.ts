import { AxiosResponse } from "axios";
import { put, takeLatest, all, call } from "redux-saga/effects";

import request from "API";

import { IPayloadAction } from "store/rootInterface";
import {
  TAuthAction,
  TAuthRequest,
  TConfirmEmailRequest,
  TResendCodeRequest,
  TTSignOAuthOptions
} from "store/auth/types";
import { getUserInfoRequest } from "store/user/reducers";
import { getHintTextRequest } from "store/reports/reducers";
import { analyticEvent } from 'store/analytics/effects';
import { EEventType } from 'store/analytics/types';

import { showSuccess } from "utils/notifications";
import { getRecaptchaToken } from "utils/recaptchaExecute";
import { setStorage, EStorageKeys } from "utils/storageHeplers";

import i18n from "../../i18n";

import {
  getSignInSuccess,
  getSignInRequest,
  getSignInFailure,
  getSignUpPhoneSuccess,
  getSignUpPhoneRequest,
  getSignUpPhoneFailure,
  getSignUpEmailFailure,
  getSignUpEmailRequest,
  getSignUpEmailSuccess,
  getCodeSuccess,
  getCodeFailure,
  getCodeRequest,
  resendCodeRequest,
  resendCodeFailure,
  resendCodeSuccess,
  getBlockingTime,
  getCodeToken,
  getResetNewPasswordFailure,
  getResetNewPasswordSuccess,
  getResetCodeFailure,
  getResetCodeRequest,
  getResetCodeSuccess,
  getResetNewPasswordRequest,
  getResetUsernameFailure,
  getResetUsernameRequest,
  getResetUsernameSuccess,
  showResetUsername,
  confirmEmailSuccess,
  confirmEmailFailure,
  confirmEmailRequest,
  signUpOAuthRequest,
  signUpOAuthSuccess,
  signUpOAuthFailure,
  signInOAuthRequest,
  signInOAuthSuccess,
  signInOAuthFailure,
} from "./reducers";

function* initRequests() {
  yield put(getUserInfoRequest());
  yield put(getHintTextRequest(process.env.REACT_APP_HINT_DOCUMENT_HELP_TEXT));
}

function* signIn(action: IPayloadAction<TAuthAction>) {
  const url = `/auth/${Object.keys(action.payload)[0]}/sign-in/`;
  try {
    yield put(analyticEvent(EEventType.LOGIN_SENT));
    const recaptcha: string = yield call(getRecaptchaToken);
    const response: AxiosResponse<TAuthRequest> = yield call(
      request.post,
      url,
      { ...action.payload, recaptcha }
    );
    yield put(getSignInSuccess(response.data));
    setStorage(EStorageKeys.TOKEN, response.data);
    showSuccess(i18n.t("notification.signIn"));
    yield call(initRequests);
    yield put(analyticEvent(EEventType.LOGIN_SUCCESS));
  } catch (e) {
    yield put(getSignInFailure(e));
  }
}

function* signUpPhone(action: IPayloadAction<TAuthAction>) {
  try {
    yield put(analyticEvent(EEventType.REGISTRATION_SENT));
    const recaptcha: string = yield call(getRecaptchaToken);
    const response: AxiosResponse = yield call(
      request.post,
      "/auth/phone/sign-up/step-1/",
      { ...action.payload, recaptcha });
    if (process.env.REACT_APP_ONBOARDING === 'true') localStorage.setItem(EStorageKeys.GREETING, 'true');
    yield put(getSignUpPhoneSuccess(response.data));
    yield put(getBlockingTime(response.data.blocking_time));
    yield put(getCodeToken(response.data.code_token));
    localStorage.setItem(EStorageKeys.TIMER, response.data.blocking_time);
  } catch (e) {
    yield put(getSignUpPhoneFailure(e));
  }
}

function* signUpEmail(action: IPayloadAction<TAuthAction>) {
  try {
    yield put(analyticEvent(EEventType.REGISTRATION_SENT));
    const recaptcha: string = yield call(getRecaptchaToken);
    const response: AxiosResponse = yield call(
      request.post,
      "/auth/email/sign-up/",
      { ...action.payload, recaptcha });
    if (process.env.REACT_APP_ONBOARDING === 'true') localStorage.setItem(EStorageKeys.GREETING, 'true');
    yield put(getSignUpEmailSuccess(response.data));
    setStorage(EStorageKeys.TOKEN, response.data);
    showSuccess(i18n.t("notification.signUpEmail"));
    yield put(analyticEvent(EEventType.REGISTRATION_SUCCESS));
    yield call(initRequests);
  } catch (e) {
    yield put(getSignUpEmailFailure(e));
  }
}

function* codeConfirm(action: IPayloadAction) {
  try {
    const response: AxiosResponse = yield call(request.post, "/auth/phone/sign-up/step-2/", action.payload);
    yield put(getCodeSuccess(response.data));
    setStorage(EStorageKeys.TOKEN, response.data);
    showSuccess(i18n.t("notification.codeConfirm"));
    yield put(analyticEvent(EEventType.REGISTRATION_SUCCESS));
    yield call(initRequests);
  } catch (e) {
    yield put(getCodeFailure(e));
    yield put(getResetCodeFailure(e));
  }
}

function* resetPasswordStep1(action: IPayloadAction<TAuthAction>) {
  try {
    const recaptcha: string = yield call(getRecaptchaToken);
    const response: AxiosResponse = yield call(
      request.post,
      "/auth/reset-password/step-1/",
      { ...action.payload, recaptcha });
    yield put(getResetUsernameSuccess(response.data));
    yield put(getBlockingTime(response.data?.blocking_time));
    yield put(getCodeToken(response.data?.code_token));
    localStorage.setItem(EStorageKeys.TIMER, response.data?.blocking_time);
  } catch (e) {
    yield put(getResetUsernameFailure(e));
  }
}

function* resetPasswordStep2(action: IPayloadAction<TAuthAction>) {
  try {
    const response: AxiosResponse = yield call(request.post, "/auth/reset-password/step-2/", action.payload);
    yield put(getResetCodeSuccess(response.data));
  } catch (e) {
    yield put(getResetCodeFailure(e));
  }
}

function* resetPasswordStep3(action: IPayloadAction<TAuthAction>) {
  try {
    const response: AxiosResponse = yield call(request.post, "/auth/reset-password/step-3/", action.payload);
    yield put(getResetNewPasswordSuccess(response.data));
    yield put(showResetUsername());
    showSuccess(i18n.t("notification.resetPasswordStep3"));
    setStorage(EStorageKeys.TOKEN, response.data);
    yield call(initRequests);
  } catch (e) {
    yield put(getResetNewPasswordFailure(e));
  }
}

function* resendCode(action: IPayloadAction<TResendCodeRequest>) {
  const { code_token, isReset } = action.payload;
  try {
    const response: AxiosResponse = yield call(
      request.post,
      `/auth/${isReset ? "reset-password" : "phone/sign-up"}/resend-code/`,
      { code_token }
    );
    yield put(resendCodeSuccess(response.data));
    yield put(getBlockingTime(response.data.blocking_time));
    yield put(getCodeToken(response.data.code_token));
    localStorage.setItem(EStorageKeys.TIMER, response.data.blocking_time);
  } catch (e) {
    yield put(resendCodeFailure(e));
  }
}

function* activateEmail(action: IPayloadAction<TConfirmEmailRequest>) {
  const { data, callback } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.post, "/auth/email/activate/", data);
    yield put(confirmEmailSuccess(response.data));
    showSuccess(response.data.detail);
  } catch (e) {
    yield put(confirmEmailFailure(e));
  }
  callback();
}

function* signUpOAuth(action: IPayloadAction<TTSignOAuthOptions>) {
  try {
    yield put(analyticEvent(EEventType.REGISTRATION_SENT));
    const response: AxiosResponse = yield call(request.post, "/auth/oauth/sign-up/", action.payload);
    yield put(signUpOAuthSuccess(response.data));
    setStorage(EStorageKeys.TOKEN, response.data);
    yield call(initRequests);
    yield put(analyticEvent(EEventType.REGISTRATION_SUCCESS));
  } catch (e) {
    yield put(signUpOAuthFailure(e));
  }
}

function* signInOAuth(action: IPayloadAction<TTSignOAuthOptions>) {
  try {
    yield put(analyticEvent(EEventType.LOGIN_SENT));
    const response: AxiosResponse = yield call(request.post, "/auth/oauth/sign-in/", action.payload);
    yield put(signInOAuthSuccess(response.data));
    setStorage(EStorageKeys.TOKEN, response.data);
    yield call(initRequests);
    yield put(analyticEvent(EEventType.LOGIN_SUCCESS));
  } catch (e) {
    yield put(signInOAuthFailure(e));
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(getSignInRequest.type, signIn),
    takeLatest(getSignUpPhoneRequest.type, signUpPhone),
    takeLatest(getSignUpEmailRequest.type, signUpEmail),
    takeLatest(getCodeRequest.type, codeConfirm),
    takeLatest(getResetUsernameRequest.type, resetPasswordStep1),
    takeLatest(getResetCodeRequest.type, resetPasswordStep2),
    takeLatest(getResetNewPasswordRequest.type, resetPasswordStep3),
    takeLatest(resendCodeRequest.type, resendCode),
    takeLatest(confirmEmailRequest.type, activateEmail),
    takeLatest(signUpOAuthRequest.type, signUpOAuth),
    takeLatest(signInOAuthRequest.type, signInOAuth),
  ]);
}

export default Saga;

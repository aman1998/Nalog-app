import { put, takeLatest, all, call, select } from "redux-saga/effects";
import { AxiosResponse, AxiosError } from "axios";

import request from "API";

import { ECurrency } from "config/types";

import {
  getUserSettingsInfoFailure,
  getUserSettingsInfoRequest,
  getUserSettingsInfoSuccess,
  userChangePasswordFailure,
  userChangePasswordRequest,
  userChangePasswordSuccess,
  userSendActivateEmailLinkFailure,
  userSendActivateEmailLinkRequest,
  userSendActivateEmailLinkSuccess,
  userBindEmailPhoneSuccess,
  userBindEmailPhoneFailure,
  userBindEmailPhoneRequest,
  userBindEmailPhoneCodeSuccess,
  userBindEmailPhoneCodeFailure,
  userBindEmailPhoneCodeRequest,
  userBindEmailPhoneResendSuccess,
  userBindEmailPhoneResendFailure,
  userBindEmailPhoneResendRequest,
  getUserInfoRequest,
  getUserInfoFailure,
  getUserInfoSuccess,
  showBindCodeForm,
  showBindPopup,
  userSaveLocalSettingsRequest,
  userSaveLocalSettingsSuccess,
  userSaveLocalSettingsFailure,
  getUserInfoSetData,
  userPaymentMethodsSuccess,
  userPaymentMethodsFailure,
  userPaymentMethodsRequest,
  setUserPaymentMethodsRequest,
  setUserPaymentMethodsSuccess,
  setUserPaymentMethodsFailure,
  deleteUserPaymentMethodsRequest,
  deleteUserPaymentMethodsSuccess,
  deleteUserPaymentMethodsFailure,
  newUserPaymentMethodsRequest,
  newUserPaymentMethodsSuccess,
  newUserPaymentMethodsFailure,
  userPaymentHistoryRequest,
  userPaymentHistorySuccess,
  userPaymentHistoryFailure,
  userPaymentHistoryLoadMore,
  userPlanInfoRequest,
  userPlanInfoSuccess,
  userPlanInfoFailure
} from "store/user/reducers";
import { getBlockingTime, getCodeToken, checkIsAuth } from "store/auth/reducers";
import {
  EDateFormat,
  ETimeFormat,
  TNewPaymentMethodsOptions,
  TUserInfo,
  TUserInfoData,
  TUserSaveLocalSettingsData
} from "store/user/types";

import { showSuccess, showError } from "utils/notifications";
import { getRecaptchaToken } from "utils/recaptchaExecute";
import { setAmplitudeUserId, setAmplitudeUserProperties } from "utils/amplitudeAnalytic";
import { errorTextHandler } from "utils/errorApiHandler";
import { EStorageKeys } from "utils/storageHeplers";

import i18n from "../../i18n";
import { ELanguages } from "../../i18n/constants";

import { IApplicationState, IPayloadAction } from "../rootInterface";

import {
  TUserChangePasswordOptions,
  TUserBindEmailPhone,
  TUserBindEmailPhoneCode
} from "./types";
import { USER_UPDATE_LOCAL_SETTINGS_LANGUAGE_REQUEST } from "./actions";

function* getUserInfo() {
  try {
    const response: AxiosResponse = yield call(request.get, "/user/me/");
    yield setAmplitudeUserId(response.data.id);
    yield setAmplitudeUserProperties<TUserInfoData>(response.data);
    yield put(checkIsAuth(true));
    yield put(getUserInfoSuccess(response.data));
  } catch (e) {
    yield put(getUserInfoFailure(e));
  }
}


function* getUserSettings() {
  try {
    const response: AxiosResponse = yield call(request.get, "/user/security-settings/");
    yield put(getUserSettingsInfoSuccess(response.data));
  } catch (e) {
    yield put(getUserSettingsInfoFailure(e));
  }
}

function* putUserChangePassword(action: IPayloadAction<TUserChangePasswordOptions>) {
  try {
    const response: AxiosResponse = yield call(request.put, "/user/change-password/", action.payload.data);
    action.payload.callOnSuccess();
    yield put(userChangePasswordSuccess(response.data));
  } catch (e) {
    yield put(userChangePasswordFailure(e));
  }
}

function* getUserSendActivateEmailLink() {
  try {
    const response: AxiosResponse = yield call(request.get, "/user/email/send/activate-link/");
    yield put(userSendActivateEmailLinkSuccess(response.data));
    showSuccess(i18n.t("getUserSendActivateEmailLink.getUserSendActivateEmailLink"));
  } catch (e) {
    yield put(userSendActivateEmailLinkFailure(e));
  }
}

function* postBindEmailPhoneRequest(action: IPayloadAction<TUserBindEmailPhone>) {
  try {
    const recaptcha: string = yield call(getRecaptchaToken);
    const response: AxiosResponse = yield call(
      request.post,
      "/user/bind-phone-or-email/step-1/",
      { ...action.payload, recaptcha }
    );
    yield put(userBindEmailPhoneSuccess(response.data));
    yield put(showBindCodeForm(true));
    yield put(getBlockingTime(response.data.blocking_time));
    yield put(getCodeToken(response.data.code_token));
    localStorage.setItem(EStorageKeys.TIMER, response.data.blocking_time);
    showSuccess(i18n.t("notification.postBindEmailPhoneRequest"));
  } catch (e) {
    yield put(userBindEmailPhoneFailure(e));
  }
}

function* postBindEmailPhoneCodeRequest(action: IPayloadAction<TUserBindEmailPhoneCode>) {
  try {
    const response: AxiosResponse = yield call(
      request.post,
      "/user/bind-phone-or-email/step-2/",
      action.payload
    );
    yield put(userBindEmailPhoneCodeSuccess(response.data));
    yield put(showBindPopup(false));
    // setStorage(EStorageKeys.TOKEN, response.data);;
    showSuccess(i18n.t("notification.postBindEmailPhoneCodeRequest"));
  } catch (e) {
    yield put(userBindEmailPhoneCodeFailure(e));
  }
}

function* postBindEmailPhoneResendRequest(action: IPayloadAction<TUserBindEmailPhoneCode>) {
  try {
    const response: AxiosResponse = yield call(
      request.post,
      "/user/bind-phone-or-email/resend-code/",
      action.payload
    );
    yield put(userBindEmailPhoneResendSuccess(response.data));
    yield put(getBlockingTime(response.data.blocking_time));
    yield put(getCodeToken(response.data.code_token));
    localStorage.setItem(EStorageKeys.TIMER, response.data.blocking_time);
    showSuccess(i18n.t("notification.postBindEmailPhoneResendRequest"));
  } catch (e) {
    yield put(userBindEmailPhoneResendFailure(e));
    showError(errorTextHandler(e as AxiosError));
  }
}


function* userSaveLocalSettings(action: IPayloadAction<TUserSaveLocalSettingsData>) {
  try {
    const response: AxiosResponse = yield call(
      request.post,
      "/user/save-locale-settings/",
      action.payload
    );
    yield put(userSaveLocalSettingsSuccess(response.data));
    yield put(getUserInfoSetData(response.data));
  } catch (e) {
    yield put(userSaveLocalSettingsFailure(e));
  }
}

function* userUpdateLocalSettingsLanguage(action: IPayloadAction<ELanguages>) {
  const { data }: TUserInfo = yield select((state: IApplicationState) => state.user.userInfo);
  const values = {
    language: action.payload,
    time_zone: data?.time_zone || "auto",
    time_format: data?.time_format || ETimeFormat.h24,
    date_format: data?.date_format || EDateFormat.dateFormat1,
    currency: data?.currency || ECurrency.usd
  };
  yield put(userSaveLocalSettingsRequest(values));
}

function* userPaymentMethods() {
  try {
    const response: AxiosResponse = yield call(
      request.get,
      "/user/payment/methods/",
    );
    yield put(userPaymentMethodsSuccess(response.data));
  } catch (e) {
    yield put(userPaymentMethodsFailure(e));
  }
}

function* setUserPaymentMethods(action: IPayloadAction<{ id: string }>) {
  try {
    const response: AxiosResponse = yield call(
      request.put,
      `/user/payment/methods/${action.payload.id}/default/`,
    );
    yield put(setUserPaymentMethodsSuccess(response.data));
    yield put(userPaymentMethodsRequest());
  } catch (e) {
    yield put(setUserPaymentMethodsFailure(e));
  }
}


function* newUserPaymentMethods(action: IPayloadAction<TNewPaymentMethodsOptions>) {
  try {
    const response: AxiosResponse = yield call(
      request.post,
      "/user/payment/methods/new/",
      action.payload
    );
    window.location.href = response.data.payment_url;
    yield put(newUserPaymentMethodsSuccess(response.data));
  } catch (e) {
    yield put(newUserPaymentMethodsFailure(e));
  }
}


function* deleteUserPaymentMethods(action: IPayloadAction<{id: string}>) {
  try {
    const response: AxiosResponse = yield call(
      request.delete,
      `/user/payment/methods/${action.payload.id}/delete/`,
    );
    yield put(deleteUserPaymentMethodsSuccess(response.data));
    yield put(userPaymentMethodsRequest());
  } catch (e) {
    yield put(deleteUserPaymentMethodsFailure(e));
  }
}

function* userPaymentHistory(action: IPayloadAction<{offset?: number, loadMore?: boolean, limit?: number}>) {
  const { loadMore, offset, limit } = action.payload;

  try {
    const response: AxiosResponse = yield call(
      request.get,
      "/user/payment/history/",
      { params:  { offset, limit } }
    );
    if (loadMore) {
      yield put(userPaymentHistoryLoadMore(response.data));
    } else {
      yield put(userPaymentHistorySuccess(response.data));
    }
  } catch (e) {
    yield put(userPaymentHistoryFailure(e));
  }
}


function* getUserPlanInfo() {
  try {
    const response: AxiosResponse = yield call(
      request.get,
      "/user/plan/info/",
    );
    yield put(userPlanInfoSuccess(response.data));
  } catch (e) {
    yield put(userPlanInfoFailure(e));
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(getUserSettingsInfoRequest.type, getUserSettings),
    takeLatest(userChangePasswordRequest.type, putUserChangePassword),
    takeLatest(userSendActivateEmailLinkRequest.type, getUserSendActivateEmailLink),
    takeLatest(userBindEmailPhoneRequest.type, postBindEmailPhoneRequest),
    takeLatest(userBindEmailPhoneCodeRequest.type, postBindEmailPhoneCodeRequest),
    takeLatest(userBindEmailPhoneResendRequest.type, postBindEmailPhoneResendRequest),
    takeLatest(userSaveLocalSettingsRequest.type, userSaveLocalSettings),
    takeLatest(USER_UPDATE_LOCAL_SETTINGS_LANGUAGE_REQUEST, userUpdateLocalSettingsLanguage),
    takeLatest(getUserInfoRequest.type, getUserInfo),
    takeLatest(userPaymentMethodsRequest.type, userPaymentMethods),
    takeLatest(setUserPaymentMethodsRequest.type, setUserPaymentMethods),
    takeLatest(newUserPaymentMethodsRequest.type, newUserPaymentMethods),
    takeLatest(deleteUserPaymentMethodsRequest.type, deleteUserPaymentMethods),
    takeLatest(userPaymentHistoryRequest.type, userPaymentHistory),
    takeLatest(userPlanInfoRequest.type, getUserPlanInfo),
  ]);
}

export default Saga;

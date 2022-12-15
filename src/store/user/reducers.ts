import { createSlice } from "@reduxjs/toolkit";

import { defaultState } from "../constants";

import { TUserStoreState } from "./types";

const initialState: TUserStoreState = {
  userInfo: defaultState,
  userSettingsInfoState: defaultState,
  userChangePasswordState: defaultState,
  userSendActivateEmailLinkState: defaultState,
  userBindEmailPhoneState: defaultState,
  userBindEmailPhoneCodeState: defaultState,
  userBindEmailPhoneResendState: defaultState,
  userSaveLocalSettingsState: defaultState,
  userPaymentMethodsState: defaultState,
  setUserPaymentMethodsState: defaultState,
  newUserPaymentMethodsState: defaultState,
  deleteUserPaymentMethodsState: defaultState,
  userPaymentHistoryState: defaultState,
  userPlanInfoState: defaultState,
  showBindCodeForm: false,
  showBindPopup: false,
};

const userSlace = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfoRequest(state) {
      state.userInfo = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getUserInfoSuccess(state, action) {
      state.userInfo = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    getUserInfoSetData(state, action) {
      state.userInfo = {
        ...state.userInfo,
        data: {  ...state.userInfo.data, ...action.payload },
      };
    },
    getUserInfoFailure(state, action) {
      state.userInfo = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    getUserSettingsInfoRequest(state) {
      state.userSettingsInfoState = {
        fetching: true,
        data: null,
        failure: null,
      };
    },
    getUserSettingsInfoSuccess(state, action) {
      state.userSettingsInfoState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    getUserSettingsInfoFailure(state, action) {
      state.userSettingsInfoState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    // TODO: fix @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userChangePasswordRequest(state, _) {
      state.userChangePasswordState = {
        ...state.userChangePasswordState,
        fetching: true,
        failure: null,
      };
    },
    userChangePasswordSuccess(state, action) {
      state.userChangePasswordState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userChangePasswordFailure(state, action) {
      state.userChangePasswordState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    userSendActivateEmailLinkRequest(state) {
      state.userSendActivateEmailLinkState = {
        ...state.userSendActivateEmailLinkState,
        fetching: true,
        failure: null,
      };
    },
    userSendActivateEmailLinkSuccess(state, action) {
      state.userSendActivateEmailLinkState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userSendActivateEmailLinkFailure(state, action) {
      state.userSendActivateEmailLinkState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userBindEmailPhoneRequest(state, _) {
      state.userBindEmailPhoneState = {
        ...state.userBindEmailPhoneState,
        fetching: true,
        failure: null,
      };
    },
    userBindEmailPhoneSuccess(state, action) {
      state.userBindEmailPhoneState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userBindEmailPhoneFailure(state, action) {
      state.userBindEmailPhoneState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userBindEmailPhoneCodeRequest(state, _) {
      state.userBindEmailPhoneCodeState = {
        ...state.userBindEmailPhoneCodeState,
        fetching: true,
        failure: null,
      };
    },
    userBindEmailPhoneCodeSuccess(state, action) {
      state.userBindEmailPhoneCodeState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userBindEmailPhoneCodeFailure(state, action) {
      state.userBindEmailPhoneCodeState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userBindEmailPhoneResendRequest(state, _) {
      state.userBindEmailPhoneResendState = {
        ...state.userBindEmailPhoneResendState,
        fetching: true,
        failure: null,
      };
    },
    userBindEmailPhoneResendSuccess(state, action) {
      state.userBindEmailPhoneResendState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userBindEmailPhoneResendFailure(state, action) {
      state.userBindEmailPhoneResendState = {
        fetching: false,
        data: null,
        failure: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userSaveLocalSettingsRequest(state, _) {
      state.userSaveLocalSettingsState = {
        ...state.userSaveLocalSettingsState,
        fetching: true,
        failure: null,
      };
    },
    userSaveLocalSettingsSuccess(state, action) {
      state.userSaveLocalSettingsState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userSaveLocalSettingsFailure(state, action) {
      state.userSaveLocalSettingsState = {
        ...state.userSaveLocalSettingsState,
        fetching: false,
        failure: action.payload,
      };
    },

    userPaymentMethodsRequest(state) {
      state.userPaymentMethodsState = {
        ...state.userPaymentMethodsState,
        fetching: true,
        failure: null,
      };
    },
    userPaymentMethodsSuccess(state, action) {
      state.userPaymentMethodsState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userPaymentMethodsFailure(state, action) {
      state.userPaymentMethodsState = {
        ...state.userPaymentMethodsState,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUserPaymentMethodsRequest(state, _) {
      state.setUserPaymentMethodsState = {
        ...state.setUserPaymentMethodsState,
        fetching: true,
        failure: null,
      };
    },
    setUserPaymentMethodsSuccess(state, action) {
      state.setUserPaymentMethodsState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    setUserPaymentMethodsFailure(state, action) {
      state.setUserPaymentMethodsState = {
        ...state.setUserPaymentMethodsState,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteUserPaymentMethodsRequest(state, _) {
      state.deleteUserPaymentMethodsState = {
        ...state.deleteUserPaymentMethodsState,
        fetching: true,
        failure: null,
      };
    },
    deleteUserPaymentMethodsSuccess(state, action) {
      state.deleteUserPaymentMethodsState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    deleteUserPaymentMethodsFailure(state, action) {
      state.deleteUserPaymentMethodsState = {
        ...state.deleteUserPaymentMethodsState,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    newUserPaymentMethodsRequest(state, _) {
      state.newUserPaymentMethodsState = {
        ...state.newUserPaymentMethodsState,
        fetching: true,
        failure: null,
      };
    },
    newUserPaymentMethodsSuccess(state, action) {
      state.newUserPaymentMethodsState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    newUserPaymentMethodsFailure(state, action) {
      state.newUserPaymentMethodsState = {
        ...state.newUserPaymentMethodsState,
        fetching: false,
        failure: action.payload,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userPaymentHistoryRequest(state, _) {
      state.userPaymentHistoryState = {
        ...state.userPaymentHistoryState,
        fetching: true,
        failure: null,
      };
    },
    userPaymentHistorySuccess(state, action) {
      state.userPaymentHistoryState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userPaymentHistoryLoadMore(state, action) {
      const list = state.userPaymentHistoryState?.data?.results || [];

      state.userPaymentHistoryState = {
        ...state.userPaymentHistoryState,
        data: {
          ...action.payload,
          results: [
            ...list,
            ...action.payload.results
          ]
        },
      };
    },
    userPaymentHistoryFailure(state, action) {
      state.userPaymentHistoryState = {
        ...state.userPaymentHistoryState,
        fetching: false,
        failure: action.payload,
      };
    },


    userPlanInfoRequest(state) {
      state.userPlanInfoState = {
        ...state.userPlanInfoState,
        fetching: true,
        failure: null,
      };
    },
    userPlanInfoSuccess(state, action) {
      state.userPlanInfoState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    userPlanInfoFailure(state, action) {
      state.userPlanInfoState = {
        ...state.userPlanInfoState,
        fetching: false,
        failure: action.payload,
      };
    },


    showBindCodeForm(state, action) {
      state.showBindCodeForm = action.payload;
    },
    showBindPopup(state, action) {
      state.showBindPopup = action.payload;
    },
    clearCodeState(state) {
      state.userBindEmailPhoneCodeState = defaultState;
    },
    clearUserState() {
      return initialState;
    }
  },
});

export const {
  getUserInfoFailure,
  getUserInfoSuccess,
  getUserInfoSetData,
  getUserInfoRequest,
  getUserSettingsInfoFailure,
  getUserSettingsInfoRequest,
  getUserSettingsInfoSuccess,
  userChangePasswordRequest,
  userChangePasswordSuccess,
  userChangePasswordFailure,
  userSendActivateEmailLinkRequest,
  userSendActivateEmailLinkSuccess,
  userSendActivateEmailLinkFailure,
  userBindEmailPhoneFailure,
  userBindEmailPhoneSuccess,
  userBindEmailPhoneRequest,
  userBindEmailPhoneCodeFailure,
  userBindEmailPhoneCodeSuccess,
  userBindEmailPhoneCodeRequest,
  showBindCodeForm,
  clearUserState,
  userBindEmailPhoneResendFailure,
  userBindEmailPhoneResendSuccess,
  userBindEmailPhoneResendRequest,

  userSaveLocalSettingsRequest,
  userSaveLocalSettingsSuccess,
  userSaveLocalSettingsFailure,

  userPaymentMethodsRequest,
  userPaymentMethodsSuccess,
  userPaymentMethodsFailure,

  setUserPaymentMethodsRequest,
  setUserPaymentMethodsSuccess,
  setUserPaymentMethodsFailure,

  newUserPaymentMethodsRequest,
  newUserPaymentMethodsSuccess,
  newUserPaymentMethodsFailure,

  deleteUserPaymentMethodsRequest,
  deleteUserPaymentMethodsSuccess,
  deleteUserPaymentMethodsFailure,

  userPaymentHistoryRequest,
  userPaymentHistorySuccess,
  userPaymentHistoryLoadMore,
  userPaymentHistoryFailure,

  userPlanInfoRequest,
  userPlanInfoSuccess,
  userPlanInfoFailure,

  showBindPopup,
  clearCodeState
} = userSlace.actions;
export default userSlace.reducer;

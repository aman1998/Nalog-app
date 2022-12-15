import { PayloadAction } from "@reduxjs/toolkit";


export const FAKE_GET_VALUE_BY_ACCOUNT_REQUEST = "FAKE_GET_VALUE_BY_ACCOUNT_REQUEST";

export const fakeGetValueByAccountRequest = (): PayloadAction<any> => ({
  type: FAKE_GET_VALUE_BY_ACCOUNT_REQUEST,
  payload: {}
});

export const FAKE_GET_VALUE_BY_ASSETS_REQUEST = "FAKE_GET_VALUE_BY_ASSETS_REQUEST";

export const fakeGetValueByAssetsRequest = (): PayloadAction<any> => ({
  type: FAKE_GET_VALUE_BY_ASSETS_REQUEST,
  payload: {}
});
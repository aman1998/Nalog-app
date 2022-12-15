import { createSlice } from "@reduxjs/toolkit";

import { defaultState } from "../constants";

import { TServicesStoreState } from "./types";

const initialState: TServicesStoreState = {
  servicesState: defaultState,
  servicesAllState: defaultState,
  paymentState: defaultState,
  paymentCalculateState: defaultState,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    servicesRequest(state) {
      state.servicesState = {
        ...state.servicesState,
        fetching: true,
        failure: null,
      };
    },
    servicesSuccess(state, action) {
      state.servicesState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    servicesFailure(state, action) {
      state.servicesState = {
        ...state.servicesState,
        fetching: false,
        failure: action?.payload,
      };
    },

    servicesAllRequest(state) {
      state.servicesAllState = {
        ...state.servicesAllState,
        fetching: true,
        failure: null,
      };
    },
    servicesAllSuccess(state, action) {
      state.servicesAllState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    servicesAllFailure(state, action) {
      state.servicesAllState = {
        ...state.servicesAllState,
        fetching: false,
        failure: action?.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    paymentRequest(state, _) {
      state.paymentState = {
        ...state.paymentState,
        fetching: true,
        failure: null,
      };
    },
    paymentSuccess(state, action) {
      state.paymentState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    paymentFailure(state, action) {
      state.paymentState = {
        ...state.paymentState,
        fetching: false,
        failure: action?.payload,
      };
    },
    calculatePaymentRequest(state, action) {
      state.paymentCalculateState = {
        ...state.paymentCalculateState,
        options: action.payload,
        fetching: true,
        failure: null,
      };
    },
    calculatePaymentSuccess(state, action) {
      state.paymentCalculateState = {
        ...state.paymentCalculateState,
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    calculatePaymentFailure(state, action) {
      state.paymentCalculateState = {
        ...state.paymentCalculateState,
        fetching: false,
        failure: action?.payload,
      };
    },
  },
});

export const {
  servicesRequest,
  servicesSuccess,
  servicesFailure,

  servicesAllRequest,
  servicesAllSuccess,
  servicesAllFailure,

  paymentRequest,
  paymentSuccess,
  paymentFailure,
  calculatePaymentRequest,
  calculatePaymentSuccess,
  calculatePaymentFailure,
} = modalsSlice.actions;

export default modalsSlice.reducer;

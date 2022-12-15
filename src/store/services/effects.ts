import { all, call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import request from "API";

import {
  calculatePaymentFailure,
  calculatePaymentRequest,
  calculatePaymentSuccess,
  paymentFailure,
  paymentRequest,
  paymentSuccess,
  servicesAllFailure,
  servicesAllRequest,
  servicesAllSuccess,
  servicesFailure,
  servicesRequest,
  servicesSuccess,
} from "store/services/reducers";

import { IPayloadAction } from "../rootInterface";

import { TPaymentCalculateOptions, TPaymentData, TPaymentOptions } from "./types";

function* getServices() {
  try {
    const response: AxiosResponse<TPaymentData> = yield call(request.get, "/services/");
    yield put(servicesSuccess(response.data));
  } catch (e) {
    yield put(servicesFailure(e));
  }
}

function* getAllServices() {
  try {
    const response: AxiosResponse<TPaymentData> = yield call(request.get, "/services/all/");
    yield put(servicesAllSuccess(response.data));
  } catch (e) {
    yield put(servicesAllFailure(e));
  }
}

function* payment(action: IPayloadAction<TPaymentOptions>) {
  try {
    const response: AxiosResponse<TPaymentData> = yield call(request.post, "/user/payment/", action.payload);
    yield put(paymentSuccess(response.data));
    window.location.replace(response.data.payment_url);
  } catch (e) {
    yield put(paymentFailure(e));
  }
}

function* calculatePayment(action: IPayloadAction<TPaymentCalculateOptions>) {
  try {
    const response: AxiosResponse = yield call(request.post, "/user/payment/calculate/", action.payload);
    yield put(calculatePaymentSuccess(response.data));
  } catch (e) {
    yield put(calculatePaymentFailure(e));
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(servicesRequest.type, getServices),
    takeLatest(servicesAllRequest.type, getAllServices),
    takeLatest(calculatePaymentRequest.type, calculatePayment),
    takeLatest(paymentRequest.type, payment)
  ]);
}

export default Saga;

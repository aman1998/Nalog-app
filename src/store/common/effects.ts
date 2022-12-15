import axios, { AxiosResponse } from "axios";
import { put, takeLatest, all, call } from "redux-saga/effects";

import {
  getCountriesFailure,
  getCountriesRequest,
  getCountriesSuccess,
  getTimezonesFailure,
  getTimezonesRequest,
  getTimezonesSuccess,
} from "./reducers";

function* getCountries() {
  // eslint-disable-next-line max-len
  // load countries from "https://data.gov.ru/sites/default/files/opendata/7710168515-ObscherossiyskiyklassifikatorstranmiraOXM/data-2016-09-21T00-00-00-structure-2016-09-21T00-00-00.json";

  try {
    const response: AxiosResponse = yield call(axios.get, '/countries.json');

    yield put(getCountriesSuccess(response.data));
  } catch (e) {
    yield put(getCountriesFailure(e));
  }
}

function* getTimezones() {
  try {
    const response: AxiosResponse = yield call(axios.get, '/timezones.json');
    yield put(getTimezonesSuccess(response.data));
  } catch (e) {
    yield put(getTimezonesFailure(e));
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(getCountriesRequest.type, getCountries),
    takeLatest(getTimezonesRequest.type, getTimezones),
  ]);
}

export default Saga;

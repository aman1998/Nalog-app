import { createSelector } from "@reduxjs/toolkit";

import { IApplicationState } from "../rootInterface";

import { EServiceCode, TServiceData, TServicesOutputSelector } from "./types";

const selectState = (state: IApplicationState) => state.services;

export const servicesDataSelector = createSelector(selectState, state => state.servicesState.data);
export const servicesFetchingSelector = createSelector(selectState, state => state.servicesState.fetching);

export const servicesAllSelector = createSelector(selectState, state => state.servicesAllState);
export const servicesAllSelectByCodeSelector =
  (code: EServiceCode): TServicesOutputSelector<TServiceData|null|undefined> =>
    createSelector(selectState, state => state.servicesAllState?.data
      ? state.servicesAllState?.data.find(item => item.code === code)
      : null);

export const paymentCalculateDataSelector = createSelector(selectState, state => state.paymentCalculateState.data);
export const paymentCalculateFailureSelector = createSelector(
  selectState,
  state => state.paymentCalculateState.failure
);
export const paymentCalculateFetchingSelector = createSelector(
  selectState,
  state => state.paymentCalculateState.fetching
);
export const paymentCalculateOptionsSelector = createSelector(
  selectState,
  state => state.paymentCalculateState.options
);

export const paymentFetchingSelector = createSelector(
  selectState,
  state => state.paymentState.fetching
);
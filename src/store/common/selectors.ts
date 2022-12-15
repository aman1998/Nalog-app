import { createSelector } from "@reduxjs/toolkit";

import { IApplicationState } from "../rootInterface";

const selectState = (state: IApplicationState) => state.common;

export const countriesSelector = createSelector(selectState, common => common?.countriesState);
export const dashboardOnboardingSelector = createSelector(selectState, common => common?.dashboardOnboardingState);
export const timezonesSelector = createSelector(selectState, common => common?.timezonesState);
export const authCarouseSelector = createSelector(selectState, common => common?.authCarouseState);

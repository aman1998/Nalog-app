import { createSlice } from "@reduxjs/toolkit";

import { defaultState } from "../constants";

import { TCommonStoreState } from "./types";

const initialState: TCommonStoreState = {
  countriesState: defaultState,
  dashboardOnboardingState: {
    isRun: false,
    fake: false,
    howToUse: false,
    assetsShowTooltip: false,
    redirectOnCreateAssets: false
  },
  timezonesState: defaultState,
  authCarouseState: {
    selected: 0
  }
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    getCountriesRequest(state) {
      state.countriesState = {
        ...state.countriesState,
        fetching: true,
      };
    },
    getCountriesSuccess(state, action) {
      state.countriesState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    getCountriesFailure(state, action) {
      state.countriesState = {
        ...state.countriesState,
        fetching: false,
        failure: action.payload,
      };
    },

    startDashboardOnboarding(state) {
      state.dashboardOnboardingState = {
        ...state.dashboardOnboardingState,
        isRun: true,
      };
    },
    startDashboardOnboardingHowToUse(state) {
      state.dashboardOnboardingState = {
        ...state.dashboardOnboardingState,
        isRun: true,
        howToUse: true
      };
    },
    setDashboardOnboardingRun(state, action) {
      state.dashboardOnboardingState = {
        ...state.dashboardOnboardingState,
        isRun: action.payload,
      };
    },
    setDashboardOnboardingAssetsShowAll(state) {
      state.dashboardOnboardingState = {
        ...state.dashboardOnboardingState,
        assetsShowTooltip: true,
        redirectOnCreateAssets: true,
      };
    },
    setRedirectOnCreateAssets(state, action) {
      state.dashboardOnboardingState = {
        ...state.dashboardOnboardingState,
        redirectOnCreateAssets: action.payload,
      };
    },
    closeModalActionOnOnboardingState(state) {
      state.dashboardOnboardingState = {
        ...state.dashboardOnboardingState,
        assetsShowTooltip: false,
        redirectOnCreateAssets: false,
      };
    },
    dashboardOnboardingFinish(state) {
      state.dashboardOnboardingState = {
        ...state.dashboardOnboardingState,
        isRun: false,
        fake: false,
        howToUse: false
      };
    },

    getTimezonesRequest(state) {
      state.timezonesState = {
        ...state.timezonesState,
        fetching: true,
      };
    },
    getTimezonesSuccess(state, action) {
      state.timezonesState = {
        fetching: false,
        data: action.payload,
        failure: null,
      };
    },
    getTimezonesFailure(state, action) {
      state.timezonesState = {
        ...state.timezonesState,
        fetching: false,
        failure: action.payload,
      };
    },

    setAuthCarousel(state, action) {
      state.authCarouseState = {
        selected: action.payload
      };
    }
  },
});

export const {
  getCountriesRequest,
  getCountriesSuccess,
  getCountriesFailure,

  startDashboardOnboarding,
  startDashboardOnboardingHowToUse,
  setDashboardOnboardingAssetsShowAll,
  setDashboardOnboardingRun,
  dashboardOnboardingFinish,
  setRedirectOnCreateAssets,
  closeModalActionOnOnboardingState,

  getTimezonesRequest,
  getTimezonesSuccess,
  getTimezonesFailure,

  setAuthCarousel,
} = commonSlice.actions;

export default commonSlice.reducer;

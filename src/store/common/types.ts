import { TRequestHandler } from "../rootInterface";

export type TCountiesData = {
  global_id: number;
  signature_date: string;
  system_object_id: number;
  ALFA3: string;
  SHORTNAME: string;
  FULLNAME: string;
  ALFA2: string;
  CODE: string;
}

export type TCountiesState = TRequestHandler<TCountiesData[]>

export type TDashboardOnboardingState = {
  isRun: boolean; // run onboarding
  fake: boolean; // use fake data
  howToUse: boolean; // clicked 'How To Use' btn
  assetsShowTooltip: boolean; // clicked show all assets
  redirectOnCreateAssets: boolean; // redirect on create assets
}

export type TTimezone = {
  ru: string;
  en: string;
}
export type TTimezonesState = TRequestHandler<TTimezone[]>

export type TAuthCarouselState = {
  selected: number
}


export type TCommonStoreState = {
  countriesState: TCountiesState;
  dashboardOnboardingState: TDashboardOnboardingState
  timezonesState: TTimezonesState;
  authCarouseState: TAuthCarouselState
};

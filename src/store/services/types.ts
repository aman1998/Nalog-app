import { OutputSelector } from "reselect";

import { ECurrency } from "config/types";

import { IApplicationState, TRequestHandler } from "../rootInterface";

export enum ESettingsServicesStatus {
  available = 'available',
  soon = 'soon',
  archived = 'archived',
}

export enum EServiceType {
  feature= "feature",
  tariffPlan= "tariff_plan",
}

export enum ETariffPlan {
  free = "free",
  smart = "smart",
  pro = "pro",
}

export enum EServiceCode {
  taxReport2021 = "tax_report_2021",
  taxReport2022 = "tax_report_2022",
  taxReport2023 = "tax_report_2023",
  PlansFree = "plans:free",
  plansSmartMonth = "plans:smart:month",
  plansSmartYear = "plans:smart:year",
  plansProMonth = "plans:pro:month",
  plansProYear = "plans:pro:year",
}

export type TServiceData = {
  id: string;
  name: string;
  state: ESettingsServicesStatus;
  type: EServiceType;
  price: number;
  currency: ECurrency;
  connected: boolean;
  code: EServiceCode;
};

export type TServicesState = TRequestHandler<TServiceData[]>;

export type TPaymentCalculateOptions = {
  method: string;
  service_code: string;
  promo_code?: string;
};

export type TPaymentOptions = { amount: string } & TPaymentCalculateOptions;

export type TPaymentCalculateData = {
  price: number;
  original_price: number;
  promo_code_applied: boolean;
};

export type TPaymentData = {
  payment_url: string;
};

export type TPaymentState = TRequestHandler<TPaymentData>;

export type TPaymentCalculateState = { options?: TPaymentCalculateOptions } & TRequestHandler<TPaymentCalculateData>;

export type TServicesAllData = TServiceData[]
export type TServicesAllState = TRequestHandler<TServicesAllData>

export type TServicesStoreState = {
  servicesState: TServicesState;
  paymentState: TPaymentState;
  paymentCalculateState: TPaymentCalculateState;
  servicesAllState: TServicesAllState;
};

export type TServicesOutputSelector<T> = OutputSelector<IApplicationState, T, (s: TServicesStoreState) => T>;
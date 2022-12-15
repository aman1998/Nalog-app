import { ECurrency, TNullable } from "config/types";

import { ELanguages } from "../../i18n/constants";

import { IPaginationResponse, TRequestHandler } from "../rootInterface";

export enum ETimeFormat {
  h12 = "12H",
  h24 = "24H",
}

export enum EDateFormat {
  dateFormat1 = 'DD.MM.YYYY',
  dateFormat2 = 'DD/MM/YYYY',
  dateFormat3 = 'YYYY-MM-DD',
  dateFormat4 = 'YYYY.MM.DD',
  dateFormat5 = 'MM/DD/YYYY',
}

export type TUserInfoData = {
  id: TNullable<string>;
  first_name: TNullable<string>;
  last_name: TNullable<string>;
  username: string;
  email: string;
  phone: string;
  date_joined: string;
  services: [string];
  language: TNullable<ELanguages|"auto">;
  time_zone: TNullable<string|"auto">;
  time_format: TNullable<ETimeFormat>;
  date_format: TNullable<EDateFormat>;
  currency: TNullable<ECurrency>;
};

export type TUserInfo = TRequestHandler<TUserInfoData>

export type TUserSettingsInfoData = {
  email: TNullable<string>;
  phone: TNullable<string>;
  email_confirmed: boolean;
};

export type TUserSettingsInfoState = TRequestHandler<TUserSettingsInfoData>

export type TUserChangePasswordOptions = {
  data: { old_password: string; new_password: string };
  callOnSuccess: () => void;
};

export type TUserChangePasswordData = {
  detail: string;
};

export type TUserChangePasswordState = TRequestHandler<TUserChangePasswordData>

export type TUserSendActivateEmailLinkData = {
  code_token: string;
  blocking_time: string;
};

export type TUserSendActivateEmailCodeData = {
  refresh_token: string;
  access_token: string;
};

export type TUserSendActivateEmailLinkState = TRequestHandler<TUserSendActivateEmailLinkData>

export type TUserBindEmailPhone = TRequestHandler<TUserSendActivateEmailLinkData>

export type TUserBindEmailPhoneCode = TRequestHandler<TUserSendActivateEmailCodeData>

export type TUserSaveLocalSettingsData = {
  language: ELanguages|"auto";
  time_zone: string|"auto";
  time_format: ETimeFormat;
  date_format: EDateFormat;
  currency: ECurrency;
}
export type TUserSaveLocalSettingsState = TRequestHandler<TUserSaveLocalSettingsData>

export type TUserPaymentMethodsData = {
  id: string;
  type: string;
  name: string;
  is_default: boolean;
}
export type TUserPaymentMethodsState = TRequestHandler<TUserPaymentMethodsData[]>

export type TSetUserPaymentMethodsState = TRequestHandler<Record<any, any>>

export type TNewPaymentMethodsOptions = {
  url_completed?:string
  url_canceled?:string
  url_pending?:string
}
export type TNewPaymentMethodsData = {
  payment_url: string
}
export type TNewPaymentMethodsState = TRequestHandler<TNewPaymentMethodsData>

export type TDeleteUserPaymentMethodsState = TRequestHandler<Record<any, any>>

export enum EUserPaymentHistoryStatus {
  pending="pending",
  canceled="canceled",
  completed="completed",
}
export type TUserPaymentHistory = {
  id: string;
  status: EUserPaymentHistoryStatus;
  currency: TNullable<string>;
  amount: string;
  description: string;
  created_at: TNullable<string>;
}
export type TUserPaymentHistoryState = TRequestHandler<IPaginationResponse<TUserPaymentHistory>>

export enum EUserPlanCodes {
  plansFree = "plans:free",
  plansSmartMonth = "plans:smart:month",
  plansSmartYear = "plans:smart:year",
  plansProMonth = "plans:pro:month",
  plansProYear = "plans:pro:year"
}

export type TUserPlanInfoData = {
  current_plan: { // - код тарифного плана. Возможные значения: free, smart, pro.
    id: TNullable<string>;
    next_payment_date: TNullable<string>;
    paid_to: TNullable<string>;
    payment_failed: TNullable<string>;
    started_at: TNullable<string>;
    tariff_plan: TNullable<string>;
  };
  next_plan: TNullable<string> // - следующий план, который будет активирован после текущего.
  notes: { // - данные о лимитах для "Заметок и тегов".
    max: number; // - максимальное число доступных заметок.
    used: number; // - использованное число заметок.
  }
  file_storage: {  // - данные о лимитах для "Файлового хранилища".
    max: number; // - максимально доступный объем для "Файлового хранилища".
    used: number; // - использованный объем в "Файловом хранилище".
  }
  plans_to_upgrade: EUserPlanCodes[]; //  - тарифные планы (коды услуг), доступные для апгрейда.
  plans_to_renew: EUserPlanCodes[]; // - тарифные планы (коды услуг), доступные для ближайшего продления.
  plans_to_prepaid: EUserPlanCodes[]; // - тарифные планы (коды услуг), доступные для предварительной оплаты.
  plans_to_change: EUserPlanCodes[]; // - тарифные планы (коды услуг), доступные для замены (с фризом текущего плана).
}
export type TUserPlanInfoState = TRequestHandler<TUserPlanInfoData>

export type TUserStoreState = {
  userInfo: TUserInfo;
  userSettingsInfoState: TUserSettingsInfoState;
  userChangePasswordState: TUserChangePasswordState;
  userSendActivateEmailLinkState: TUserSendActivateEmailLinkState;
  userBindEmailPhoneState: TUserBindEmailPhone,
  userBindEmailPhoneCodeState: TUserBindEmailPhoneCode,
  userBindEmailPhoneResendState: TUserBindEmailPhone,
  userSaveLocalSettingsState: TUserSaveLocalSettingsState,
  userPaymentMethodsState: TUserPaymentMethodsState,
  setUserPaymentMethodsState: TSetUserPaymentMethodsState,
  newUserPaymentMethodsState: TNewPaymentMethodsState,
  deleteUserPaymentMethodsState: TDeleteUserPaymentMethodsState,
  userPaymentHistoryState: TUserPaymentHistoryState,
  userPlanInfoState: TUserPlanInfoState,
  showBindCodeForm: boolean,
  showBindPopup: boolean
};

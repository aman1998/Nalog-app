// import { toPairs } from "lodash";
import { AxiosError } from "axios";

import i18n from "../i18n";

import { clearNotification } from "./notifications";

type TKey = string|number;
type TProp = Record<TKey, string | string[] | Record<TKey, string | string[]> | [Record<TKey, string | string[]>]>
// type TError = Record<string, string|[Record<TKey, string | string[]>]>
//
// const isObject = (value: unknown) => typeof value === 'object' &&
//   !Array.isArray(value) &&
//   value !== null;

export const getDataErrors = (
  obj: TProp
): any => 
  // let errors: TError = {};
  // for (const [key, value] of toPairs(obj)) {
  //   if (typeof value === "object" && !Array.isArray(value)) {
  //     errors = { ...errors, ...getDataErrors(value) };
  //   }
  //
  //   if (Array.isArray(value)) {
  //     errors[key] = value?.join(" ");
  //   }
  //
  //   if (typeof value === "string") {
  //     errors[key] = value;
  //   }
  //
  //   if (isObject(value)) {
  //     errors[key] = value;
  //   }
  // }
  obj
;

export const errorTextHandler = (e: AxiosError): string => {
  clearNotification();
  if (e.response) {
    const key = Object.keys(e.response.data)[0];
    if (Array.isArray(e.response.data[key])) return e.response.data[key][0];
    else return e.response.data[key];
  } else return i18n.t("errors.errorTextHandler");
};


export enum EApiError {
  DETAIL_ERROR = "detail",
}

export const detailError = (e: AxiosError): string =>
  e.response && e.response.data[EApiError.DETAIL_ERROR];

interface IResponseHandleError {
  detail?: string;
  parsedErrors?: Record<string, string>;
}

export const handleError = (e: AxiosError): IResponseHandleError => {
  let detail;
  let parsedErrors;
  if ((e?.response?.status === 400 || e?.response?.status === 401 || e?.response?.status === 403)
    && e?.response?.data) {
    detail = detailError(e);
    parsedErrors = getDataErrors(e?.response?.data);
  }
  return { parsedErrors, detail };
};

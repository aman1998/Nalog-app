import axios from "axios";

import { setStorage, getStorageData, EStorageKeys } from "utils/storageHeplers";
import { handleError } from "utils/errorApiHandler";
import { showError } from "utils/notifications";
import { checkIsAuthPaths } from "utils/paths";

import i18n from "../i18n";
import { ELanguages } from "../i18n/constants";

export type TToken = {
  access_token: string;
  refresh_token: string;
};

const baseURL = process.env.REACT_APP_MAIN_API;

const instance = axios.create({
  withCredentials: true,
  baseURL,
});

const formAcceptLanguage = (lng:string | null) => {
  lng = lng || localStorage.getItem(EStorageKeys.I18NEXT_LNG);

  switch (lng) {
  case "ru":
    return ELanguages.ruRU;
  case "en":
    return ELanguages.enUS;
  default:
    return lng || navigator.language;
  }
};

instance.interceptors.request.use(
  config => {
    const token = getStorageData(EStorageKeys.TOKEN) as TToken;

    if (token && token?.access_token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }

    config.headers["Accept-Language"] = formAcceptLanguage(i18n.language);
    return config;
  },
  error =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    const token = getStorageData(EStorageKeys.TOKEN) as TToken;

    // response interceptor to refresh token on receiving token expired
    if (token?.refresh_token && error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      return axios
        .post(`${baseURL}/auth/update-token/`, {
          refresh: token.refresh_token,
        })
        .then(res => {
          if (res.status === 200) {
            setStorage(EStorageKeys.TOKEN, {
              ...res.data,
              refresh_token: token.refresh_token,
            });
            return axios(originalRequest);
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            return (window.location.href = "/login");
          }
        });
    }

    if (!token?.refresh_token && error?.response?.status === 401 && !originalRequest?._retry) {
      localStorage.clear();
      if (!checkIsAuthPaths()) return (window.location.href = "/login");
    }

    if (error?.response?.status === 404 || error?.response?.status === 500) {
      showError(i18n.t("errors.somethingWentWrong"));
    } else if (typeof error.response === 'undefined') {
      showError(i18n.t("errors.networkError"));
    }

    const { parsedErrors, detail } = handleError(error);

    if (detail) showError(detail);
    return Promise.reject({
      ...error,
      parsedErrors,
    });
  }
);

export default instance;

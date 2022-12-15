import round from "lodash/round";

import { ECurrency } from "config/types";

import { ELanguages } from "../i18n/constants";

import { abbreviate } from "./abbreviate";

/**
 * currencyFormat(12345678.9, 2, 3, '.', ',');  // "12.345.678,90"
 * currencyFormat(123456.789, 4, 4, ' ', ':');  // "12 3456:7890"
 * currencyFormat(12345678.9, 0, 3, '-');       // "12-345-679"
 *
 * @param {integer} value: value
 * @param {integer|undefined} [n=2] n: length of decimal
 * @param {integer|undefined} [x=3] x: length of whole part
 * @param {string|undefined} [s=" "] s: sections delimiter
 * @param {string|undefined} [c=","] c: decimal delimiter
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const currencyFormat = (value: number|null|undefined, n=2, x=3, s = " ", c = ",") => {
  if (value === null || value === undefined) return "???";
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
  // tslint:disable-next-line:no-bitwise
  const num = value.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

export const getMaxNumberOfSignificantDigits = (value: number) : number => {
  const rounded = round(value, 3);
  return rounded >= 1000 ? Math.ceil(rounded).toString().length : 4;
};

export const abbreviateFormatAssetAmount = (value: number | null | undefined, asset: string | null): string => {
  if (value === null || value === undefined) return formatAssetAmount(value, asset);
  if (value < 10000) {
    return formatAssetAmount(value, asset);
  }
  return abbreviate(value) + " " + asset;
};

export const abbreviateFormatAmount = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return  "???";
  if (value < 10000) {
    return formatAmount(value);
  }
  return abbreviate(value);
};

export const formatAssetAmount = (value: number | null | undefined, asset: string | null) : string => {
  if (value === null || value === undefined) return  "??? " + asset;
  return formatAmount(value) + " " + asset;
};

export const formatAmount = (value: number) : string => Number(value).toLocaleString(ELanguages.ruRU, {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: getMaxNumberOfSignificantDigits(value)
});

export const formatRubs = (value: number | null | undefined) : string => {
  if (value === null || value === undefined) return "??? ₽";
  if (value === 0) return  "0 ₽";
  return Number(value).toLocaleString(ELanguages.ruRU, {
    style: 'currency',
    currency: 'RUB',
    minimumSignificantDigits: 2,
    maximumSignificantDigits: getMaxNumberOfSignificantDigits(value)
  });
};


export const formatDollars = (value: number | null | undefined) : string => {
  if (value === null || value === undefined) return "$ ???";
  return "$ " + Number(value).toLocaleString(ELanguages.ruRU, {
    minimumSignificantDigits: 2,
    maximumSignificantDigits: getMaxNumberOfSignificantDigits(value)
  });
};

export const formatWithCurrencies = (value: number | null | undefined, currency: ECurrency): string => {
  if (currency === ECurrency.usd) {
    return formatDollars(value);
  }
  return formatRubs(value);
};

export const withCurrency = (value: string, currency: ECurrency): string => {
  if (currency === ECurrency.usd) {
    return `$ ${value}`;
  }
  return `${value} ₽`;
};

export const abbreviateCurrency = (currency: ECurrency, value: number | null | undefined, ): string => {
  if (value === null || value === undefined) return withCurrency("???", currency);
  if (value < 10000) {
    return withCurrency(currencyFormat(value, 0), currency);
  }
  return withCurrency(abbreviate(value), currency);
};


export const formatExchangeRate = (value: number | null | undefined) : string => {
  if (value === null || value === undefined) return "???";
  return Number(value).toLocaleString(ELanguages.ruRU, {
    minimumSignificantDigits: 4,
    maximumSignificantDigits: getMaxNumberOfSignificantDigits(value)
  });
};

export const formPrice = (value: number, currency?: ECurrency): string => {
  if (currency === ECurrency.rub) {
    return abbreviate(value) + ' ₽';
  }
  return '$ ' + abbreviate(value);
};
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

import { TNullable } from "config/types";

export enum ACTIONS {
  SET_DATE_RANGE= 'set-date-range',
  SET_FIXED_DATE= 'set-fixed-date',
}

export enum EFilterTubs {
  sevenDays= '7',
  thirtyDays= '30',
  twoZeroTwentyTwo='2022',
  twoZeroTwentyOne='2021'
}

export type TAction = { type: ACTIONS.SET_DATE_RANGE, payload: RangeValue<Moment> }
  | { type: ACTIONS.SET_FIXED_DATE, payload: EFilterTubs }

export type TLocalState = {
  dateRange: RangeValue<Moment>,
  fixedDate: TNullable<EFilterTubs>;
}
import {
  DatePickerProps as $DatePickerProps,
  MonthPickerProps as $MonthPickerProps,
  RangePickerProps as $RangePickerProps,
  WeekPickerProps as $WeekPickerProps,
} from "antd/lib/date-picker";

import { IFieldWrapperProps } from "components/FieldWrapper/types";

export type DatePickerProps = $DatePickerProps & IFieldWrapperProps & { keepOffset?: boolean };

export type WeekPickerProps = IFieldWrapperProps & $WeekPickerProps;
export type RangePickerProps = IFieldWrapperProps & $RangePickerProps;
export type MonthPickerProps = IFieldWrapperProps & $MonthPickerProps & { keepOffset?: boolean };

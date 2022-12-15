import { DatePicker } from "antd";
import { FieldProps, Field } from "formik";
import moment from "moment";
import { FC } from "react";
import isFunction from "lodash/isFunction";
import cn from "classnames";
import "moment/locale/ru";
import localeRu from "antd/es/date-picker/locale/ru_RU";
import localeEn from "antd/es/date-picker/locale/en_US";

import FieldWrapper from "components/FieldWrapper";

import i18n from "../../i18n";
import { ELanguages } from "../../i18n/constants";

import { DatePickerProps, MonthPickerProps, RangePickerProps, WeekPickerProps } from "./types";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export const BNDatePicker: FC<DatePickerProps> = ({
  name,
  onChange,
  tooltip,
  error,
  label,
  keepOffset,
  className,
  wrapperClass,
  showErrorText = true,
  ...rest
}) => (
  <Field name={name}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched }, meta }: FieldProps) => (
      <FieldWrapper
        name={name}
        label={label}
        tooltip={tooltip}
        error={error}
        meta={meta}
        wrapperClass={cn("dn-date-picker__wrapper", wrapperClass)}
        showErrorText={showErrorText}
      >
        <DatePicker
          locale={i18n.language === ELanguages.enUS ? localeEn : localeRu}
          format={"DD.MM.YYYY"}
          className={cn("dn-date-picker", className, { "error-input": (!!meta.error && meta.touched) || error })}
          value={value ? moment(value) : undefined}
          onChange={(date, dateString) => {
            setFieldValue(name, date ? date.toISOString(keepOffset) : null);
            setFieldTouched(name, true, false);
            if (isFunction(onChange)) onChange(date, dateString);
          }}
          {...rest}
        />
      </FieldWrapper>
    )}
  </Field>
);

export default BNDatePicker;

export const BNMonthPicker: FC<MonthPickerProps> = ({
  name,
  tooltip,
  error,
  label,
  onChange,
  keepOffset,
  wrapperClass,
  ...rest
}) => (
  <Field name={name}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched }, meta }: FieldProps) => (
      <FieldWrapper
        name={name}
        label={label}
        tooltip={tooltip}
        error={error}
        meta={meta}
        wrapperClass={wrapperClass}
      >
        <MonthPicker
          locale={i18n.language === ELanguages.enUS ? localeEn : localeRu}
          value={value ? moment(value) : undefined}
          onChange={(date, dateString) => {
            setFieldValue(name, date ? date.toISOString(keepOffset) : null);
            setFieldTouched(name, true, false);
            if (isFunction(onChange)) onChange(date, dateString);
          }}
          {...rest}
        />
      </FieldWrapper>
    )}
  </Field>
);

export const BNRangePicker: FC<RangePickerProps> = ({
  name,
  tooltip,
  error,
  label,
  onChange,
  wrapperClass,
  ...rest
}) => (
  <Field name={name}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched }, meta }: FieldProps) => (
      <FieldWrapper
        name={name}
        label={label}
        tooltip={tooltip}
        error={error}
        meta={meta}
        wrapperClass={wrapperClass}
      >
        <RangePicker
          locale={i18n.language === ELanguages.enUS ? localeEn : localeRu}
          name={name}
          value={value}
          onChange={(dates, dateStrings) => {
            setFieldValue(name, dates);
            setFieldTouched(name, true, false);
            if (isFunction(onChange)) onChange(dates, dateStrings);
          }}
          {...rest}
        />
      </FieldWrapper>
    )}
  </Field>
);

export const BNWeekPicker: FC<WeekPickerProps> = ({
  name,
  tooltip,
  error,
  label,
  onChange,
  wrapperClass,
  ...rest
}) => (
  <Field name={name}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched }, meta }: FieldProps) => (
      <FieldWrapper
        name={name}
        label={label}
        tooltip={tooltip}
        error={error}
        meta={meta}
        wrapperClass={wrapperClass}
      >
        <WeekPicker
          locale={i18n.language === ELanguages.enUS ? localeEn : localeRu}
          name={name}
          value={value}
          onChange={(date, dateString) => {
            setFieldValue(name, date);
            setFieldTouched(name, true, false);
            if (isFunction(onChange)) onChange(date, dateString);
          }}
          {...rest}
        />
      </FieldWrapper>
    )}
  </Field>
);

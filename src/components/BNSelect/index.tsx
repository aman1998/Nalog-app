import { FC } from "react";
import { Field, FieldProps } from "formik";
import isFunction from "lodash/isFunction";
import cn from "classnames";

import FieldWrapper from "components/FieldWrapper";
import Select from "components/Select";

import { IBNSelect } from "./types";

const BNSelect: FC<IBNSelect> = ({
  name,
  label,
  tooltip,
  wrapperClass,
  error,
  info,
  onChange,
  onBlur,
  showErrorText = true,
  className,
  ...rest
}) => (
  <Field name={name}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched }, meta }: FieldProps) => (
      <FieldWrapper
        name={name}
        label={label}
        tooltip={tooltip}
        error={error}
        showErrorText={showErrorText}
        wrapperClass={wrapperClass}
        info={info}
        meta={meta}
      >
        <Select
          {...rest}
          className={cn("bn-select", className)}
          value={value}
          onChange={(val, option) => {
            setFieldValue(name, val);
            if (isFunction(onChange)) onChange(val, option);
          }}
          onBlur={val => {
            setFieldTouched(name);
            if (isFunction(onBlur)) onBlur(val);
          }}
        />
      </FieldWrapper>
    )}
  </Field>
);
export default BNSelect;

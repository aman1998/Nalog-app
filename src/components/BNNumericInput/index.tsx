import { FieldProps, Field } from "formik";
import { ChangeEvent, FC } from "react";
import isFunction from "lodash/isFunction";
import cn from "classnames";

import FieldWrapper from "components/FieldWrapper";
import Input from "components/Inputs/Input";

import { IBNNumericInput } from "./types";

const BNNumericInput: FC<IBNNumericInput> = ({
  name,
  label,
  tooltip,
  error,
  wrapperClass,
  onChange: $onChange,
  onBlur: $onBlur,
  widthComma= false,
  showErrorText = true,
  className,
  analyticOnError,
  ...rest
}) => {
  const getValue = (value: string, e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let reg = /^-?\d*(\.\d*)?$/;

    if(widthComma) {
      reg = /^-?\d*(\,\d*)?$/;
    }

    if (reg.test(val) || val === "" || val === "-") {
      e.target.value = val;
      return e;
    }
    e.target.value = value;
    return e;
  };

  return (
    <Field name={name}>
      {({ field: { value, onChange, onBlur }, meta }: FieldProps) => (
        <FieldWrapper
          name={name}
          label={label}
          tooltip={tooltip}
          error={error}
          meta={meta}
          showErrorText={showErrorText}
          wrapperClass={wrapperClass}
          analyticOnError={analyticOnError}
        >
          <Input
            type="text"
            name={name}
            value={value}
            error={error}
            className={cn("default-input", className, { "error-input": !!meta.error && meta.touched })}
            onChange={event => {
              onChange(getValue(value, event));
              if (isFunction($onChange)) $onChange(event);
            }}
            onBlur={event => {
              onBlur(event);
              if (isFunction($onBlur)) $onBlur(event);
            }}
            {...rest}
          />
        </FieldWrapper>
      )}
    </Field>
  );
};

export default BNNumericInput;

import { FieldProps, Field } from "formik";
import isFunction from "lodash/isFunction";
import { FC } from "react";

import Input from "components/Inputs/Input";
import FieldWrapper from "components/FieldWrapper";

import { IBNInput } from "./types";

const BNInput: FC<IBNInput> = ({
  name,
  tooltip,
  error,
  label,
  wrapperClass,
  showErrorText = true,
  onChange: $onChange,
  onBlur: $onBlur,
  ...rest
}) => (
  <Field name={name}>
    {({ field: { value, onChange, onBlur }, meta }: FieldProps) => (
      <FieldWrapper
        name={name}
        label={label}
        tooltip={tooltip}
        error={error}
        showErrorText={showErrorText}
        meta={meta}
        wrapperClass={wrapperClass}
      >
        <Input
          name={name}
          value={value}
          error={error}
          meta={meta}
          onChange={event => {
            onChange(event);
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

export default BNInput;

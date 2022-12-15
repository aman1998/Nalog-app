import { FC } from "react";
import { CheckboxProps as $CheckboxProps, Checkbox as $Checkbox } from "antd";
import { Field, FieldProps } from "formik";
import isFunction from "lodash/isFunction";

import { FormikFieldProps } from "config/types";

export type CheckboxProps = FormikFieldProps & $CheckboxProps

export const BNCheckbox:FC<CheckboxProps> = ({
  name,
  validate,
  fast,
  onChange,
  ...restProps
}) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <$Checkbox
        name={name}
        checked={value}
        onChange={event => {
          setFieldValue(name, event.target.checked);
          setFieldTouched(name, true, false);
          if (isFunction(onChange)) onChange(event);
        }}
        {...restProps}
      />
    )}
  </Field>
);


export default BNCheckbox;
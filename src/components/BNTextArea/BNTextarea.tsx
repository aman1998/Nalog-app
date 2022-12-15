import { Input } from "antd";
import { FC } from "react";
import { Field, FieldProps } from "formik";
import isFunction from "lodash/isFunction";

import FieldWrapper from "components/FieldWrapper";

import { BNTextAreaProps } from "./types";

const { TextArea } = Input;


const BNTextArea: FC<BNTextAreaProps> = ({
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
        <TextArea
          name={name}
          value={value}
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

export default BNTextArea;
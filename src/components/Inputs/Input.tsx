import { Input as AntdInput } from "antd";
import { FC } from "react";
import cn from "classnames";

import PasswordShow from "components/Icons/PasswordShowIcon";
import PasswordHidden from "components/Icons/PasswordHiddenIcon";
import MaskedInput from "components/MaskedInput";

import { IInputProps } from "./types";

const Input: FC<IInputProps> = ({
  className,
  type = "text",
  mask,
  meta,
  value,
  error,
  ...rest
}) => {
  const errorCheck = (meta && !!meta.error && meta?.touched) || !!error;

  if (type === "password") {
    return (
      <AntdInput.Password
        value={value}
        type={type}
        className={cn('default-input', className,  { "error-input": errorCheck })}
        iconRender={visible => (
          <div className="input-password_icon">{visible ? <PasswordShow /> : <PasswordHidden />}</div>
        )}
        role="presentation"
        {...rest}
      />
    );
  }

  if (!!mask) {
    return (
      <MaskedInput
        mask={mask}
        value={value}
        type={type}
        className={cn("default-input", className, { "error-input": errorCheck })}
        {...rest}
      />
    );
  }

  return (
    <AntdInput
      value={value}
      type={type}
      className={cn("default-input", className, { "error-input": errorCheck })}
      role="presentation"
      {...rest}
    />
  );
};


export default Input;

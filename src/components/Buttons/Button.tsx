import cn from "classnames";
import { Button as AntButton } from "antd";
import { FC } from "react";

import { IButton } from "./types";

const Button: FC<IButton> = ({
  type="primary",
  title,
  onClick,
  loading,
  disabled,
  className,
  htmlType,
  transparent,
  lettuce,
  pink,
  icon,
  ...rest
}) => (
  <AntButton
    type={type}
    htmlType={htmlType}
    className={cn("default-btn", className, {
      transparent,
      widthIconButton: !!icon,
      lettuce,
      pink,
    })}
    onClick={onClick}
    disabled={disabled}
    loading={loading}
    {...rest}
  >
    {icon && icon}
    {title}
  </AntButton>
);

export default Button;

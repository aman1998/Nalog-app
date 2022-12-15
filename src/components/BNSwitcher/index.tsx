import { FC } from "react";
import { Switch } from "antd";
import cn from "classnames";

import { BNSwitcherProps } from "./types";

const BNSwitcher: FC<BNSwitcherProps> = ({ className, label, ...props }) => (
  <div className={cn("bn-switch", className)}>
    {label && <span className="bn-switch__label" >{label}</span>}
    <Switch
      { ...props }
    />
  </div>
);

export default BNSwitcher;

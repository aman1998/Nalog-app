import React from "react";
import { Radio as AntRadio } from "antd";
import cn from "classnames";

import { RadioComponentProps } from "./types";

const Radio: React.FC<RadioComponentProps> = ({
  options,
  optionType,
  className,
  ...rest
}) => {
  const optionItems =
    optionType === "button"
      ? options?.map(item => (
        <AntRadio.Button key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </AntRadio.Button>
      ))
      : options?.map(item => (
        <AntRadio key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </AntRadio>
      ));

  return <AntRadio.Group
    {...rest}
    defaultValue={options[0].value}
    className={cn("radio", className)}
  >
    {optionItems}
  </AntRadio.Group>;
};

export default Radio;

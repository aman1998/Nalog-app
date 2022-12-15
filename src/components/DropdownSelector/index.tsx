import { FC, useMemo } from 'react';
import { Dropdown, Menu } from "antd";
import cn from "classnames";
import isFunction from "lodash/isFunction";

import ArrowIcon from "../Icons/ArrowIcon";

export type DropdownSelectOption = {
  label: string;
  value: string|null|number;
  icon?:  () => JSX.Element
}


export type DropdownSelectorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  options: DropdownSelectOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any) => void;
  disabled?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

const DropdownSelector: FC<DropdownSelectorProps> = ({
  value,
  options,
  onSelect,
  disabled,
  className,
  overlayClassName,
  contentClassName
}) => {
  const selected = options.find(option => option.value === value);
  const handleOnClick = ($value: any) => {
    if (isFunction(onSelect)) onSelect($value);
  };

  const menu = useMemo(() => (
    <Menu>
      {options.map(option => (
        <Menu.Item
          key={option.value}
          onClick={() => handleOnClick(option.value)}
          className={cn({ "selected": option.value === value })}
        >
          {option.label}
        </Menu.Item>
      ))}
    </Menu>
  ), [value, options, onSelect]);

  return (
    <div className={cn("dropdown-selector", className, { disabled })}>
      <Dropdown
        disabled={disabled}
        overlay={menu}
        trigger={["click"]}
        placement="bottomLeft"
        className={cn("dropdown-selector__content", contentClassName, { disabled })}
        overlayClassName={cn("dropdown-selector__dropdown", overlayClassName)}
      >
        <div>
          {selected?.icon && <span className="dropdown-selector__icon"><selected.icon/></span>}
          {selected?.label} <ArrowIcon className="arrow"/>
        </div>
      </Dropdown>
    </div>
  );
};

export default DropdownSelector;
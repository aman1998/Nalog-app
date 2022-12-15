import { Select as AntdSelect } from "antd";
import cn from "classnames";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ISelectProps } from "./types";

const Select: FC<ISelectProps> = ({ options, className, value, ...rest }) => {
  const { t } = useTranslation();
  const { Option } = AntdSelect;

  return (
    <AntdSelect {...rest} value={value || undefined} className={cn("select", className)}>
      {options.map(item => (
        <Option key={item.value} value={item.value}>
          {t((item.label) as string) || t("naming.exchange")}
        </Option>
      ))}
    </AntdSelect>
  );
};

export default Select;

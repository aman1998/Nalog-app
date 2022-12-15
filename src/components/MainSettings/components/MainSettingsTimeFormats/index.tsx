import { FC } from 'react';
import { useTranslation } from "react-i18next";
import { OptionData } from "rc-select/es/interface";
import cn from "classnames";

import BNSelect from "components/BNSelect";

import { EDateFormat, ETimeFormat } from "store/user/types";

export type MainSettingsTimeFormatsProps = {
  className?: string;
}

const MainSettingsTimeFormats: FC<MainSettingsTimeFormatsProps> = ({ className }) => {
  const { t } = useTranslation();
  const timeFormatOptions: OptionData[] = [
    {
      label: "24h",
      value: ETimeFormat.h24,
    },
    {
      label: "12h",
      value: ETimeFormat.h12,
    }
  ];
  const dateFormatOptions: OptionData[] = [
    {
      label: EDateFormat.dateFormat1,
      value: EDateFormat.dateFormat1,
    },
    {
      label: EDateFormat.dateFormat2,
      value: EDateFormat.dateFormat2,
    },
    {
      label: EDateFormat.dateFormat3,
      value: EDateFormat.dateFormat3,
    },
    {
      label: EDateFormat.dateFormat4,
      value: EDateFormat.dateFormat4,
    },
    {
      label: EDateFormat.dateFormat5,
      value: EDateFormat.dateFormat5,
    },
  ];

  return (
    <div className={cn("settings-main__time-formats", className)}>
      <BNSelect
        wrapperClass="settings-main__time-formats__select"
        name="time_format"
        label={t("mainSettings.timeFormat")}
        options={timeFormatOptions}
      />
      <BNSelect
        wrapperClass="settings-main__time-formats__select"
        name="date_format"
        label={t("mainSettings.dateFormat")}
        options={dateFormatOptions}
      />
    </div>
  );
};

export default MainSettingsTimeFormats;
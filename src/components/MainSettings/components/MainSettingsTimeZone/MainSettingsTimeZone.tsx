import { FC, useEffect, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import { OptionData } from "rc-select/es/interface";
import cn from "classnames";
import { useField } from "formik";
import { Select } from "antd";
import timezone from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";

import BNSelect from 'components/BNSelect';
import BNSwitcher from "components/BNSwitcher";
import FieldWrapper from "components/FieldWrapper";

import { timezonesSelector } from "store/common/selectors";
import { getTimezonesRequest } from "store/common/reducers";

import { ELanguages } from "../../../../i18n/constants";

import MainSettingsTimer from '../MainSettingsTimer';

export type MainSettingsTimeZoneProps = {
  className?: string
}

const MainSettingsTimeZone: FC<MainSettingsTimeZoneProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [, meta, helpers] = useField("time_zone");
  const { setValue } = helpers;
  const { value } = meta;
  const disabled = value === "auto";
  const defaultTimezone = timezone.tz.guess();

  const handleClickSwitch = ($value: boolean) => {
    if ($value) setValue("auto");
    else setValue(defaultTimezone);
  };

  const { data: timezones } = useSelector(timezonesSelector);

  const options: OptionData[] = useMemo(() => timezones ? timezones.map(tz => {
    if (i18n.language === ELanguages.enUS) {
      return {
        label: tz.en,
        value: tz.en,
      };
    }
    return {
      label: tz.ru,
      value: tz.en,
    };
  }) : [], [i18n.language, timezones]);

  useEffect(() => {
    dispatch(getTimezonesRequest());
  }, []);


  return <>
    <BNSwitcher
      label={t("mainSettings.automatically")}
      defaultChecked={value === "auto"}
      className="settings__item__row"
      onClick={handleClickSwitch}
    />
    <div className={cn("settings-main__time-zone", className)}>
      { !disabled 
        ? (
          <BNSelect
            disabled={disabled}
            defaultValue={defaultTimezone}
            value={!disabled ? value : defaultTimezone }
            wrapperClass="settings-main__time-zone__selector"
            name="time_zone"
            label={t("mainSettings.timeZone")}
            options={options}
            showSearch={true}
            filterOption={(input, option) => (
              option!.children.toUpperCase() as unknown as string).includes(input.toUpperCase()
            )}
          />)
        : (
          <FieldWrapper
            label={t("mainSettings.timeZone")}
            name="time_zone"
            wrapperClass="settings-main__time-zone__selector"
          >
            <Select
              disabled={true}
              value={!disabled ? value : defaultTimezone }
              options={options}
              className="bn-select select"
            />
          </FieldWrapper>
        )
      }
      
      <div className="settings-main__time-zone__current-time">
        <span className="settings-main__time-zone__current-time__text">{t("mainSettings.currentTime")}: </span>
        <span className="settings-main__time-zone__current-time__timer">
          <MainSettingsTimer timeZone={value !== "auto" ? value : defaultTimezone }/>
        </span>
      </div>
    </div></>;

};

export default MainSettingsTimeZone;
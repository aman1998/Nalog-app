import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useField } from "formik";

import { LANGUAGE_OPTIONS } from "config/constants";

import BNSwitcher from "components/BNSwitcher";
import DropdownSelector from "components/DropdownSelector";

import { ELanguages } from "../../../../i18n/constants";
import { onChangeLanguageHandler } from "../../../../i18n/utils";

const MainSettingsLanguageContent: FC = () => {
  const { t, i18n } = useTranslation();
  const [, meta, helpers] = useField("language");
  const { setValue } = helpers;
  const { value } = meta;

  const options = Object.keys(LANGUAGE_OPTIONS).map(lng => ({
    label: LANGUAGE_OPTIONS[lng as ELanguages].nativeName,
    value: lng,
    icon: LANGUAGE_OPTIONS[lng as ELanguages].icon,
  }));

  const handleClickSwitch = ($value: boolean) => {
    if ($value) setValue("auto");
    else setValue(i18n.language);
  };

  const handleOnSelectLanguage = ($value: ELanguages) => {
    setValue($value);
    onChangeLanguageHandler($value);
  };

  return <div className="settings__item__content">
    <BNSwitcher
      label={t("mainSettings.automatically")}
      defaultChecked={value === "auto"}
      onClick={handleClickSwitch}
      className="settings__item__row"
    />
    <DropdownSelector
      options={options}
      disabled={value === "auto"}
      value={value !== "auto" ? value : i18n.language}
      onSelect={handleOnSelectLanguage}
      className="settings__item__row settings-main__select-language"
    />
  </div>;
};

export default MainSettingsLanguageContent;
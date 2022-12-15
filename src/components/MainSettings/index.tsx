import { Form, Formik } from "formik";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { ECurrency, ELinks, TNullable } from "config/types";

import FormObserver from "components/FormObserver";

import { EDateFormat, ETimeFormat, TUserInfoData } from "store/user/types";

import { ELanguages } from "../../i18n/constants";
import { userSaveLocalSettingsRequest } from "../../store/user/reducers";

import MainSettingsCurrency from "./components/MainSettingsCurrency";
import MainSettingsLanguageContent from "./components/MainSettingsLanguageContent";
import MainSettingsTimeContent from "./components/MainSettingsTimeContent";

export type MainSettingsValues = {
  language: TNullable<ELanguages|"auto">;
  time_zone: TNullable<string|"auto">;
  time_format: TNullable<ETimeFormat>;
  date_format: TNullable<EDateFormat>;
  currency: TNullable<ECurrency>;
}

export type MainSettingsProps = {
  data: TUserInfoData
}

const MainSettings: FC<MainSettingsProps> = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const initialValues: MainSettingsValues = {
    language: data.language || "auto",
    time_zone: data.time_zone || "auto",
    time_format: data.time_format || ETimeFormat.h24,
    date_format: data.date_format || EDateFormat.dateFormat1,
    currency: data.currency || ECurrency.usd
  };

  const onSubmit = (values: MainSettingsValues) => {
    dispatch(userSaveLocalSettingsRequest(values));
  };

  const saveOnChangeFormValue = (values: MainSettingsValues) => {
    onSubmit(values);
  };

  return (
    <Formik<MainSettingsValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {
        () => (
          <Form className="settings-main">
            <FormObserver onChangeValues={saveOnChangeFormValue}/>
            <h2 className="settings_title">{t(ELinks.SETTINGS_MAIN)}</h2>
            <div className="settings__item language-item">
              <h3 className="item-title">{t("mainSettings.language")}</h3>
              <MainSettingsLanguageContent/>
            </div>
            <div className="settings__item">
              <h3 className="item-title">{t("mainSettings.time")}</h3>
              <MainSettingsTimeContent/>
            </div>
            <div className="settings__item">
              <h3 className="item-title">{t("mainSettings.currency")}</h3>
              <MainSettingsCurrency/>
            </div>
          </Form>
        )
      }
    </Formik>
  );
};

export default MainSettings;
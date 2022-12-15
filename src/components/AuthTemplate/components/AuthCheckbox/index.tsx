import { FC } from "react";
import cn from "classnames";
import { Checkbox as AntdCheckbox } from "antd";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";

import { AuthCheckboxProps } from "./types";

const AuthCheckbox: FC<AuthCheckboxProps> = ({ isSignIn, onChange, checkValidation }) => {
  const { t } = useTranslation();
  if (isSignIn) {
    return  (
      <div className="sign-form_forgot-remember">
        <AntdCheckbox className="sign-form_checkbox">{t("auth.remember")}</AntdCheckbox>
        <NavLink to={paths.FORGOT} className="text" exact={true}>
          {t("auth.forgotPassword")}
        </NavLink>
      </div>
    );
  }
  
  return (
    <>
      <AntdCheckbox
        onChange={onChange}
        name="acceptTerms"
        className={cn("sign-form_checkbox", {
          checkboxError: checkValidation,
        })}
      >
        {t("auth.acceptTerms")}{" "}
        <a href="https://static.bitnalog.ru/docs/user-agreement.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="checkbox-link">
          {t('auth.userAgreement')}
        </a>
        {` ${t("naming.and")} `}
        <a href="https://static.bitnalog.ru/docs/privacy-policy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="checkbox-link">
          {t("auth.privacyPolicy")}
        </a>
      </AntdCheckbox>
    </>
  );
};

export default AuthCheckbox;

import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";

import { analyticEvent } from 'store/analytics/effects';
import { EEventType } from 'store/analytics/types';

import { TIsSignIn } from "../../types";

import AuthFooterLanguage from "./components/AuthFooterLanguage";

const AuthFooter: React.FC<TIsSignIn> = ({ isSignIn }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="sign-footer">
      <div>
        <span className="sign-footer_text">{isSignIn ? t("auth.dontHaveAccount") : t("auth.haveAccount")}</span>
        <NavLink
          to={isSignIn ? paths.SIGN_UP : paths.SIGN_IN} exact={true}
          className="sign-footer_link"
          onClick={() => {
            dispatch(analyticEvent(EEventType.LOGIN_FORM_REG_LINK));
          }}
        >
          {isSignIn ? t("auth.registration") : t("auth.signIn")}
        </NavLink>
      </div>
      {!process.env.REACT_APP_LANGUAGE && <AuthFooterLanguage/>}
    </div>
  );
};

export default AuthFooter;

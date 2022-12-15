import React from "react";
import { useTranslation } from "react-i18next";

import { TIsSignIn } from "../../types";

import AuthTelegram from "../AuthTelegram";
import AuthFacebook from "../AuthFacebook";
import AuthGoogle from "../AuthGoogle";

const AuthHeader: React.FC<TIsSignIn> = ({ isSignIn }) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="sign-title">{!isSignIn ? t("auth.registration") : t("auth.logIn")}</h3>
      <div className="sign-icons">
        <AuthTelegram isSignIn={isSignIn}/>
        <AuthGoogle isSignIn={isSignIn}/>
        <AuthFacebook isSignIn={isSignIn}/>
      </div>
      <div className="sign-or">
        <div className="sign-or_line" />
        <div className="sign-or_text">{t("naming.or")}</div>
        <div className="sign-or_line" />
      </div>
    </>
  );
};

export default AuthHeader;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import MediaQuery from "react-responsive";

import { paths } from "config/paths";

import ArrowIcon from "components/Icons/ArrowIcon";
import AuthCheckForm from "components/AuthTemplate/components/AuthCheckForm";

import { resetPasswordPageSelector, isAuthorizedSelector } from "store/auth/selectors";
import { getUserInfoFetchingSelector } from "store/user/selectors";
import { showResetUsername } from "store/auth/reducers";

import { moreMdMedia } from "../../config/constants";

import AuthCarousel from "../AuthTemplate/components/AuthCarousel";

import ForgotLogin from "./components/AuthForgotLogin";
import NewPassword from "./components/NewPassword";


const ForgotForm = (): JSX.Element => {
  const { t } = useTranslation();
  const [login, setLogin] = useState("");
  const [type, setType] = useState("");

  const resetPasswordPage = useSelector(resetPasswordPageSelector);
  const isAuthorized = useSelector(isAuthorizedSelector);
  const loading = useSelector(getUserInfoFetchingSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  const goBack = () => {
    if (resetPasswordPage?.showUsername) history.push(paths.SIGN_IN);
    else dispatch(showResetUsername());
  };

  useEffect(() => {
    if (isAuthorized) {
      history.push(paths.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const getContent = () => {
    switch (true) {
    case resetPasswordPage?.showUsername:
      return <ForgotLogin setLogin={setLogin} setType={setType} />;

    case resetPasswordPage?.showCode:
      return <AuthCheckForm username={login} type={type} isResetForm={true} />;

    case resetPasswordPage?.showNewPassword:
      return <NewPassword />;
    default:
      return <></>;
    }
  };

  if(loading) return <div />;

  return (
    <div
      className={cn("sign-wrapper forgot-sign_wrapper", {
        _isPasswordSign: resetPasswordPage?.showNewPassword,
        _isLoginSign: resetPasswordPage?.showUsername,
        _isCodeSign: resetPasswordPage?.showCode,
      })}
    >
      <section className="sign">
        <MediaQuery minWidth={moreMdMedia}>
          <AuthCarousel/>
        </MediaQuery>
        <div className="sign-form_extra_wrapper">
          <div className="sign-form_wrapper">
            <div className="sign-forgot">
              <h1 className="sign-forgot_title">
                {resetPasswordPage?.showNewPassword ? t('auth.newPassword') : t('auth.passwordReset')}
              </h1>
              <div className="sign-forgot_icon" onClick={goBack}>
                <ArrowIcon />
              </div>
              {getContent()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotForm;

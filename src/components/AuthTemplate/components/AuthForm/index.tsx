import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { EValidateNames } from "config/types";

import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";

import {
  getSignInRequest,
  getSignUpEmailFailure,
  getSignUpEmailRequest,
  getSignUpPhoneFailure,
  getSignUpPhoneRequest,
  clearAuthErrors,
} from "store/auth/reducers";
import {
  signInFetchingSelector,
  signUpEmailFetchingSelector,
  signUpPhoneFetchingSelector,
  signUpPhoneFailureSelector,
  signUpEmailFailureSelector,
} from "store/auth/selectors";
import { EEventType } from "store/analytics/types";

import { handleValidate, formPhoneToSubmit } from "utils/validatePhoneMail";
import { sendAmplitudeEvent } from "utils/amplitudeAnalytic";


import AuthValidateText from "../AuthValidateText";
import AuthCheckbox from "../AuthCheckbox";

import { AuthFormValues, IAuthForm } from "./types";
import { SignInShema, SignSchema } from "./validation";

const AuthForm: FC<IAuthForm> = ({ isSignIn = true, setUsername }) => {
  const { t } = useTranslation();
  const [check, setCheck] = useState<boolean>(false);
  const [checkValidation, setCheckValidation] = useState<boolean>(false);
  const signInFetching = useSelector(signInFetchingSelector);
  const signUpEmailFetching = useSelector(signUpEmailFetchingSelector);
  const signUpPhoneFetching = useSelector(signUpPhoneFetchingSelector);
  const signUpPhoneErrors = useSelector(signUpPhoneFailureSelector)?.parsedErrors;
  const signUpEmailErrors = useSelector(signUpEmailFailureSelector)?.parsedErrors;
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const btnLoading = signUpPhoneFetching || signInFetching || signUpEmailFetching;

  const handleCheckbox = () => {
    setCheck(!check);
    setCheckValidation(false);
  };

  const onSubmit = (values: AuthFormValues) => {
    if (!isSignIn && !check) {
      setCheckValidation(true);
      return;
    }

    sendAmplitudeEvent(EEventType.SIGN_IN_CLICKED);

    const payloadEmail = {
      email: values.username,
      password: values.password,
    };

    const payloadPhone = {
      phone: formPhoneToSubmit(values.username),
      password: values.password,
    };

    setUsername(values.username);
    const isEmailPhone = handleValidate(values.username);

    if (isSignIn) {
      if (isEmailPhone === EValidateNames.phone) {
        dispatch(getSignInRequest(payloadPhone));
      }
      if (isEmailPhone === EValidateNames.email) {
        dispatch(getSignInRequest(payloadEmail));
      }
    }

    if (check && !isSignIn) {
      if (isEmailPhone === EValidateNames.phone) {
        dispatch(getSignUpPhoneRequest(payloadPhone));
      }
      if (isEmailPhone === EValidateNames.email) {
        dispatch(getSignUpEmailRequest(payloadEmail));
      }
    }
  };

  const onFocus = () => {
    dispatch(getSignUpPhoneFailure(null));
    dispatch(getSignUpEmailFailure(null));
  };

  useEffect(() => {
    dispatch(clearAuthErrors());
  }, [dispatch]);

  return (
    <Formik<AuthFormValues>
      initialValues={initialValues}
      validationSchema={isSignIn ? SignInShema : SignSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty }) => (
        <div className={cn("sign-form-wrapper")}>
          <Form className={cn("sign-form")} autoComplete={!isSignIn ? "off" : "on"}>
            <BNInput
              className="sign-form_input"
              type="text"
              name="username"
              label={t("naming.phoneNumberOrEmail")}
              error={signUpPhoneErrors?.phone || signUpEmailErrors?.email}
              onFocus={onFocus}
            />
            <BNInput
              className="sign-form_input"
              type="password"
              name="password"
              label={t('auth.password')}
              error={signUpPhoneErrors?.password || signUpEmailErrors?.password}
              autoComplete={!isSignIn ? "new-password" : undefined}
              onFocus={onFocus}
            />
            {!isSignIn && <AuthValidateText />}
            <AuthCheckbox
              checkValidation={checkValidation} isSignIn={isSignIn} onChange={handleCheckbox} name="checkbox" />
            <Button
              title={!isSignIn ? t("auth.registration") : t("auth.signIn")}
              htmlType="submit"
              className="sign-form_btn"
              loading={btnLoading}
              disabled={!(isValid && dirty)}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AuthForm;

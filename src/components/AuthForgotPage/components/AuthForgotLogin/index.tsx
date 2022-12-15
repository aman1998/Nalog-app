import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { FC } from "react";
import { FormikHelpers } from "formik/dist/types";
import { useTranslation } from "react-i18next";

import { EValidateNames } from "config/types";

import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";

import { getResetUsernameFailure, getResetUsernameRequest } from "store/auth/reducers";
import { resetUsernameFailureSelector, resetUsernameFetchingSelector } from "store/auth/selectors";

import { handleValidate } from "utils/validatePhoneMail";

import { SignName } from "./validation";
import { AuthForgotLoginProps, TForgotLoginFormValues } from "./types";

const AuthForgotLogin: FC<AuthForgotLoginProps> = ({ setLogin, setType }) => {
  const { t } = useTranslation();
  const parsedErrors = useSelector(resetUsernameFailureSelector)?.parsedErrors;
  const loading = useSelector(resetUsernameFetchingSelector);

  const dispatch = useDispatch();

  const initialValues: TForgotLoginFormValues = {
    username: "",
  };

  const onSubmit = ({ username }: TForgotLoginFormValues, { resetForm }: FormikHelpers<TForgotLoginFormValues>) => {
    setLogin(username);
    if (handleValidate(username) === EValidateNames.phone) {
      dispatch(getResetUsernameRequest({ phone: username }));
      setType(EValidateNames.phone);
    } else {
      dispatch(getResetUsernameRequest({ email: username }));
      setType(EValidateNames.email);
    }
    resetForm();
  };

  return (
    <Formik<TForgotLoginFormValues> initialValues={initialValues} validationSchema={SignName} onSubmit={onSubmit}>
      {({ isValid, dirty }) => (
        <Form className="sign-forgot_reset">
          <div>
            <BNInput
              name="username"
              type="text"
              className="sign-form_input"
              label={t("naming.phoneNumberOrEmail")}
              error={parsedErrors?.email || parsedErrors?.phone}
              onFocus={() => dispatch(getResetUsernameFailure(null))}
            />
          </div>
          <Button
            loading={loading}
            className="sign-form_btn"
            title={t('naming.further')}
            htmlType="submit"
            disabled={!(isValid && dirty)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AuthForgotLogin;

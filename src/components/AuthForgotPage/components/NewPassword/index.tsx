import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";
import AuthValidateText from "components/AuthTemplate/components/AuthValidateText";

import { getResetNewPasswordFailure, getResetNewPasswordRequest } from "store/auth/reducers";
import {
  resetTokenSelector,
  resetNewPasswordFetchingSelector,
  resetNewPasswordFailureSelector,
} from "store/auth/selectors";

import { NewPasswordShema } from "./validation";

const NewPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const resetToken = useSelector(resetTokenSelector);
  const loading = useSelector(resetNewPasswordFetchingSelector);
  const parsedErrors = useSelector(resetNewPasswordFailureSelector)?.parsedErrors;
  const dispatch = useDispatch();

  const initialValues = {
    password: "",
    passwordConfirm: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewPasswordShema}
      onSubmit={({ password }) => {
        dispatch(
          getResetNewPasswordRequest({
            new_password: password,
            reset_token: resetToken,
          })
        );
      }}
    >
      {() => (
        <Form className="sign-forgot_reset">
          <BNInput
            name="password"
            type="password"
            className="sign-form_input"
            label={t('auth.newPassword')}
            error={parsedErrors?.password}
            onFocus={() => dispatch(getResetNewPasswordFailure(null))}
          />
          <AuthValidateText />
          <BNInput
            name="passwordConfirm"
            type="password"
            className="sign-form_input"
            label={t('auth.repeatNewPassword')}
            onFocus={() => dispatch(getResetNewPasswordFailure(null))}
          />
          <Button loading={loading} className="sign-form_btn" title={t('naming.ready')} htmlType="submit" />
        </Form>
      )}
    </Formik>
  );
};

export default NewPassword;

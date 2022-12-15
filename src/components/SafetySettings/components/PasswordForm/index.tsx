import { Formik, Form } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";

import {
  userChangePasswordFailure,
  userChangePasswordRequest,
} from "store/user/reducers";
import {
  errorsUserChangePassword,
  loadingUserChangePassword,
} from "store/user/selectors";

import { ResetPasswordShema } from "./validation";
import { IPasswordFormValues } from "./types";

const PasswordForm = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(loadingUserChangePassword);
  const parsedErrors = useSelector(errorsUserChangePassword)?.parsedErrors;

  const initialValues: IPasswordFormValues = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };

  const onSubmit = (
    values: IPasswordFormValues,
    { resetForm }: FormikHelpers<IPasswordFormValues>
  ) => {
    dispatch(
      userChangePasswordRequest({
        data: {
          old_password: values.oldPassword,
          new_password: values.newPassword,
        },
        callOnSuccess: resetForm,
      })
    );
  };

  return (
    <Formik<IPasswordFormValues>
      initialValues={initialValues}
      validationSchema={ResetPasswordShema}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="password-item_form">
          <div className="password-item_old">
            <BNInput
              name="oldPassword"
              type="password"
              className="password-item_input"
              label={t('auth.oldPassword')}
              error={parsedErrors?.old_password}
              onFocus={() => dispatch(userChangePasswordFailure(null))}
            />
          </div>
          <div className="password-item_new">
            <div>
              <BNInput
                name="newPassword"
                type="password"
                className="password-item_input"
                label={t('auth.newPassword')}
                error={parsedErrors?.new_password}
                onFocus={() => dispatch(userChangePasswordFailure(null))}
              />
            </div>
            <div className="password-item_new--repeat">
              <BNInput
                name="newPasswordConfirm"
                type="password"
                className="password-item_input"
                label={t('auth.repeatNewPassword')}
              />
            </div>
          </div>
          <Button
            title={t('action.change')}
            className="password-item_btn"
            htmlType="submit"
            loading={loading}
            disabled={!(isValid && dirty)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default PasswordForm;

import { FC, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, FormikProps } from "formik";
import { omit } from "lodash";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { EValidateNames } from "config/types";

import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";
import ConfirmCode from "components/ConfirmCode";

import {
  checkEmailConfirmedSelector,
  getEmailSelector,
  getPhoneSelector,
  errorsBindEmailPhoneSelector,
  loadingBindEmailPhoneSelector,
  showBindCodeSelector,
  showBindPopupSelector
} from "store/user/selectors";
import {
  userBindEmailPhoneRequest,
  userBindEmailPhoneFailure
} from "store/user/reducers";

import {
  BindEmailValidate,
  BindPhoneValidate,
  BindOnlyEmailValidate,
  BindOnlyPhoneValidate
} from "./validation";
import { SafetyBindSettingsModalFormProps } from "./types";

const SafetyBindSettingsModalForm: FC<SafetyBindSettingsModalFormProps> = ({ isModalName }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');

  const phone = useSelector(getPhoneSelector);
  const email = useSelector(getEmailSelector);
  const emailConfirmed = useSelector(checkEmailConfirmedSelector);
  const parsedErrors = useSelector(errorsBindEmailPhoneSelector)?.parsedErrors;
  const showBindCode = useSelector(showBindCodeSelector);
  const showBindPopup = useSelector(showBindPopupSelector) as boolean;
  const loading = useSelector(loadingBindEmailPhoneSelector);

  const dispatch = useDispatch();

  const formikRef = useRef<FormikProps<any>>(null);

  const labelValue = isModalName === EValidateNames.phone ? t("naming.phone") : t("naming.email");
  const showPasswordValues = !email && !phone && !emailConfirmed;

  const getSchema = () => {
    if(showPasswordValues && isModalName === EValidateNames.phone) return BindPhoneValidate;
    if(!showPasswordValues && isModalName === EValidateNames.phone) return BindOnlyPhoneValidate;
    if(showPasswordValues && isModalName === EValidateNames.email) return BindEmailValidate;
    if(!showPasswordValues && isModalName === EValidateNames.email) return BindOnlyEmailValidate;
  };

  const initialValues = {
    [isModalName]: '',
    password: "",
    passwordConfirm: ""
  };

  useEffect(() => {
    if (!showBindPopup) {
      formikRef.current?.resetForm();
    }
  }, [showBindPopup]);

  return (
    <>
      {!showBindCode ? (
        <Formik
          initialValues={initialValues}
          validationSchema={getSchema()}
          innerRef={formikRef}
          onSubmit={values => {
            setUsername(values[isModalName]);
            const payload = omit(values, 'passwordConfirm', isModalName === EValidateNames.phone ?
              EValidateNames.email : EValidateNames.phone, !showPasswordValues ? 'password' : '');
            dispatch(userBindEmailPhoneRequest(payload));
          }}
        >
          {() => (
            <Form className={cn("bind-modal_content")}>
              <div className="bind-modal_content-input-wrapper">
                <BNInput
                  className="bind-modal_content-input"
                  type="text"
                  name={isModalName}
                  label={labelValue}
                  error={parsedErrors?.hasOwnProperty(isModalName) ? parsedErrors[isModalName] : undefined}
                  onFocus={() => dispatch(userBindEmailPhoneFailure(null))}
                />
                {
                  showPasswordValues &&
                  <>
                    <BNInput
                      name="password"
                      type="password"
                      className="bind-modal_content-input"
                      label={t('auth.enterPassword')}
                      error={parsedErrors?.password}
                      onFocus={() => dispatch(userBindEmailPhoneFailure(null))}
                    />
                    <BNInput
                      name="passwordConfirm"
                      type="password"
                      className="bind-modal_content-input"
                      label={t('auth.repeatNewPassword')}
                    />
                  </>
                }
              </div>
              <Button
                loading={loading}
                title={t('naming.further')}
                htmlType="submit"
                className="bind-modal_content-btn"
              />
            </Form>
          )}
        </Formik>
      ) : (
        <div className="bind-modal_content">
          <ConfirmCode username={username} />
        </div>
      )}
    </>
  );
};

export default SafetyBindSettingsModalForm;

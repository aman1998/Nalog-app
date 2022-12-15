import * as Yup from "yup";

import { validationText, passwordValidationField, requiredStringField } from "utils/validationRules";

import i18n from "../../../../i18n";

export const ResetPasswordShema = Yup.object().shape({
  oldPassword: requiredStringField,
  newPassword: passwordValidationField,
  newPasswordConfirm: Yup.string()
    .trim()
    .required(validationText.requiredText)
    .oneOf([Yup.ref("newPassword"), null], i18n.t('validation.passwordsMustMatch')),
});

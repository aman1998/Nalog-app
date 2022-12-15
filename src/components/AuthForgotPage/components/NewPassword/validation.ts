import * as Yup from "yup";

import { validationText, passwordValidationField } from "utils/validationRules";

import i18n from "../../../../i18n";

export const NewPasswordShema = Yup.object().shape({
  password: passwordValidationField,
  passwordConfirm: Yup.string()
    .required(validationText.requiredText)
    .oneOf([Yup.ref("password"), null], i18n.t('validation.passwordsMustMatch')),
});

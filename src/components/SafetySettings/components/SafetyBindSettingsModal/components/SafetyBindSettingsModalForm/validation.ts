import * as Yup from "yup";

import {
  emailValidationField,
  passwordValidationField,
  passwordValidationFieldConfirm, phoneValidationFieldRequired
} from "utils/validationRules";

export const BindEmailValidate = Yup.object().shape({
  email: emailValidationField,
  password: passwordValidationField,
  passwordConfirm: passwordValidationFieldConfirm
});

export const BindOnlyPhoneValidate = Yup.object().shape({
  phone: phoneValidationFieldRequired
});

export const BindPhoneValidate = Yup.object().shape({
  phone: phoneValidationFieldRequired,
  password: passwordValidationField,
  passwordConfirm: passwordValidationFieldConfirm
});

export const BindOnlyEmailValidate = Yup.object().shape({
  email: emailValidationField
});

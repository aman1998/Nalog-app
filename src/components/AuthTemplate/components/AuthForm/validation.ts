import * as Yup from "yup";

import { loginValidationField, passwordValidationField, requiredStringField } from "utils/validationRules";

export const SignSchema = Yup.object().shape({
  username: loginValidationField,
  password: passwordValidationField,
});

export const SignInShema = Yup.object().shape({
  username: loginValidationField,
  password: requiredStringField,
});

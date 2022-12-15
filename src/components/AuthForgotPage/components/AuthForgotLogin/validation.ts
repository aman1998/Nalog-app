import * as Yup from "yup";

import { loginValidationField } from "utils/validationRules";

export const SignName = Yup.object().shape({
  username: loginValidationField,
});

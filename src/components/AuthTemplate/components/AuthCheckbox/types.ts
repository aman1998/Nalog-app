
import { CheckboxProps } from "antd";

import { TIsSignIn } from "../../types";

export type AuthCheckboxProps = {
  checkValidation: boolean;
} & CheckboxProps & TIsSignIn;
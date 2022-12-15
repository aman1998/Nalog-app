import * as Yup from "yup";

import { requiredStringField } from "utils/validationRules";

export const EditConnectAssetSingleSchema = Yup.object().shape({
  api_param1: requiredStringField,
  api_param2: requiredStringField,
});

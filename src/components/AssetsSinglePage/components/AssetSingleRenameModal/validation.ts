import * as Yup from "yup";

import { requiredStringField } from "utils/validationRules";

export const RenameAssetSingleSchema = Yup.object().shape({
  name: requiredStringField,
});


import * as Yup from "yup";

import { requiredStringField } from "utils/validationRules";

export const ActivateServicePromoCodeSchema = Yup.object().shape({
  promo_code: requiredStringField,
});

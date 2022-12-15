import * as Yup from "yup";

import { booleanField, requiredStringField, stringField } from "utils/validationRules";

export const editTransactionSingleSchema = Yup.object().shape({
  external_amount: requiredStringField.nullable(),
  external_foreign: booleanField,
  external_source_country: stringField.when("external_foreign", {
    is: true,
    then: requiredStringField
  }),
  external_destination_country: stringField.when("external_foreign", {
    is: true,
    then: requiredStringField
  }),
});
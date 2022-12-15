import * as Yup from "yup";

import { booleanField, requiredStringField, stringField } from "utils/validationRules";


export const addTransactionSingleSchema = Yup.object().shape({
  date: requiredStringField.nullable(),
  src_asset: requiredStringField,
  src_amount: requiredStringField,
  dst_asset: requiredStringField,
  dst_amount: requiredStringField,
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

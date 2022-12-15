import * as Yup from "yup";
import { mixed, ObjectSchema } from "yup/lib";
import { Assign, ObjectShape } from "yup/lib/object";
import StringSchema, { RequiredStringSchema } from "yup/lib/string";
import { MixedSchema } from "yup/lib/mixed";

import { ETransactionsOperationsTypes } from "config/types";

import { ETransactionsFilePurpose } from "store/transactions/types";

import { requiredStringField, stringField } from "utils/validationRules";
import { showError } from "utils/notifications";

import i18n from "../../../../../../i18n";


type TEditIncomeTransactionSchemaShape = {
  [key in ETransactionsFilePurpose]?: MixedSchema;
} & {
  new_type: RequiredStringSchema<string | undefined, Record<string, any>>;
  external_amount: StringSchema<string | undefined | null, Record<string, any>>;
}

type TEditIncomeTransactionSchema = ObjectSchema<Assign<
  ObjectShape, TEditIncomeTransactionSchemaShape>>

export const getEditIncomeTransactionSchema = (): TEditIncomeTransactionSchema => {
  const shape: TEditIncomeTransactionSchemaShape  = {
    new_type: requiredStringField,
    external_amount: stringField.nullable().when("new_type", {
      is: ETransactionsOperationsTypes.cryptoIncomePurchase || ETransactionsOperationsTypes.p2pPurchase,
      then: requiredStringField
    }),
  };
  Object.values(ETransactionsFilePurpose).map(purpose => {
    shape[purpose] = mixed()
      .nullable()
      .test("fileSize", "The file is too large", checkIfFilesAreTooBig);
  });
  return Yup.object().shape(shape);
};

export function checkIfFilesAreTooBig(file?: File): boolean {
  const maxSizeMb = 2;
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > maxSizeMb) {
      valid = false;
      showError(i18n.t("errors.fileMaxSizeMB", { number: maxSizeMb }));
    }
  }
  return valid;
}

import * as Yup from "yup";

import { stringField } from "utils/validationRules";

export const TransactionEditNoteSchema = Yup.object().shape({
  note: stringField,
});
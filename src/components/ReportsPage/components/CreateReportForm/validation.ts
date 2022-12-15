import * as Yup from "yup";

import {
  dateFieldRequired,
  requiredNumberField,
  requiredStringField,
  stringField
} from "utils/validationRules";

import i18n from "../../../../i18n";

export const CreateReportSchema = Yup.object().shape({
  year: requiredNumberField,
  tax_authority: requiredStringField.min(4, i18n.t('validation.requiredNumber', { count: 4 })),
  oktmo_code: requiredStringField.min(8, i18n.t('validation.requiredNumber', { count: 8 })),
  inn: requiredStringField.min(12, i18n.t('validation.requiredNumber', { count: 12 })),
  first_name: requiredStringField,
  last_name: requiredStringField,
  patronymic_name: stringField,
  phone: requiredStringField,
  birth_date: dateFieldRequired,
  birth_place: requiredStringField,
  passport_series: requiredStringField.min(4, i18n.t('validation.requiredNumber', { count: 4 })),
  passport_number: requiredStringField.min(6, i18n.t('validation.requiredNumber', { count: 6 })),
  passport_issued_by: requiredStringField,
  passport_date_issued: dateFieldRequired,
});
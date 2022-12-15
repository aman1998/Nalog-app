import * as Yup from "yup";

import {
  dateField,
  dateFieldRequired, phoneValidationField,
  phoneValidationFieldRequired,
  requiredStringField,
  stringField
} from "utils/validationRules";

import i18n from "../../../../../../i18n";

export const CreateNewReportSchema = Yup.object().shape({
  ifns: requiredStringField.min(4, i18n.t('validation.requiredNumber', { count: 4 })),
  oktmo: requiredStringField.min(8, i18n.t('validation.requiredNumber', { count: 8 })),
  inn: requiredStringField.min(12, i18n.t('validation.requiredNumber', { count: 12 })),
  first_name: requiredStringField,
  last_name: requiredStringField,
  middle_name: stringField,
  phone: phoneValidationFieldRequired,
  birthdate: dateFieldRequired,
  passport_series: requiredStringField.min(4, i18n.t('validation.requiredNumber', { count: 4 })),
  passport_number: requiredStringField.min(6, i18n.t('validation.requiredNumber', { count: 6 })),
});

export const CreateAnonymousNewReportSchema = Yup.object().shape({
  ifns: stringField.min(4, i18n.t('validation.requiredNumber', { count: 4 })),
  oktmo: stringField.min(8, i18n.t('validation.requiredNumber', { count: 8 })),
  inn: stringField.min(12, i18n.t('validation.requiredNumber', { count: 12 })),
  first_name: stringField,
  last_name: stringField,
  middle_name: stringField,
  phone: phoneValidationField,
  birthdate: dateField,
  passport_series: stringField.min(4, i18n.t('validation.requiredNumber', { count: 4 })),
  passport_number: stringField.min(6, i18n.t('validation.requiredNumber', { count: 6 })),
});

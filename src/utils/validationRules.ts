import * as Yup from "yup";

import { emailRegex, isValidEmail, normalizeValue, phoneRegex } from "utils/validatePhoneMail";

import i18n from "../i18n";

export const validationText = {
  requiredText: i18n.t('validation.requiredText')
};

const getMatch = (value: string) => (isValidEmail(value) ? emailRegex : phoneRegex);

const getText = (value: string) => {
  const textWithoutSpace = normalizeValue(value);
  const stringRegex = new RegExp(/[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ|a-zA-Z]/gi);
  const isEmail = stringRegex.test(textWithoutSpace);

  if (isEmail) {
    return i18n.t('validation.invalidEmail');
  } else return i18n.t('validation.invalidPhone');
};

export const stringField = Yup.string();
export const numberField = Yup.number();
export const booleanField = Yup.boolean();

function parseDateString(_value: Date, _originalValue: Date | string) {
  if (_originalValue instanceof Date) {
    return new Date();
  }
  const result = _originalValue.toString().split(".");
  const tempVar = result[0];

  result[0] = result[1];
  result[1] = tempVar;

  return new Date(result.join("/"));
}

export const dateField = Yup.date()
  .transform(parseDateString)
  .max( new Date(), i18n.t('validation.maxDate'))
  .typeError(i18n.t('validation.invalidDate'));

export const dateFieldRequired = dateField.required(validationText.requiredText);

const handleLoginLength = (e: string) => {
  const valueStr = /[\D]+/g;
  return !(!!e && !isValidEmail(e) && e.trim().replace(valueStr, "").toString().length > 11);
};

export const emailValidationField = stringField
  .required(validationText.requiredText)
  .matches(emailRegex, () => i18n.t('validation.invalidEmail'));

export const passwordValidationField = Yup.lazy(value =>
  stringField
    .required(validationText.requiredText)
    .trim(i18n.t('validation.passwordSpace'))
    .min(8, i18n.t('validation.minSymbols', { number: 8 }))
    .max(50, i18n.t('validation.passwordTooLong'))
    .matches(/^(?=.*\d)/, i18n.t('validation.minNumber', { number: 1 }))
    .matches(/^(?=.*[a-zA-Z])/, i18n.t('validation.atLeastLatinLetter', { number: 1 }))
    .test("trim", i18n.t('validation.passwordSpace'), () => value === normalizeValue(value))
);

export const passwordValidationFieldConfirm = stringField
  .trim()
  .required(validationText.requiredText)
  .oneOf([Yup.ref("password"), null], () => i18n.t('validation.passwordsMustMatch'));

export const requiredStringField = stringField.required(validationText.requiredText);
export const requiredNumberField = numberField.required(validationText.requiredText);

export const loginValidationField = Yup.lazy(value =>
  stringField
    .required(validationText.requiredText)
    .matches(getMatch(value), getText(value))
    .trim()
    .test("len", i18n.t('validation.invalidPhone'), e => handleLoginLength(e as string))
);


export const phoneValidationField = Yup.lazy(() =>
  stringField
    .matches(phoneRegex, i18n.t('validation.invalidPhone'))
    .trim()
);

export const phoneValidationFieldRequired = Yup.lazy(() =>
  stringField
    .required(validationText.requiredText)
    .matches(phoneRegex, i18n.t('validation.invalidPhone'))
    .trim()
    .test("len", i18n.t('validation.invalidPhone'), e => handleLoginLength(e as string))
);

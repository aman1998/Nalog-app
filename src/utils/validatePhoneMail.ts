import { EValidateNames } from "config/types";

// +79242701544
// +7 924 270 15 44
// +7 9242701544
// 89242701544
// 8 924 270 15 44
// 8 (922) 270 15 44
// 8 924 270 1444
// 8 924 2701544
// +7-924-270-15-44
// 8-924-270-15-44
export const phoneRegex =
  /\+?[78](\s*?|\-*?)\(?[9][\d]{2,9}\)?(\s*?|\-*?)[\d]{3,7}(\s*?|\-*?)[\d]{2,4}(\s*?|\-*?)[\d]{2,4}$/;
export const emailRegex =
  // eslint-disable-next-line max-len
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

export const handleValidate = (value: string): boolean | EValidateNames => {
  const textWithoutSpace = (value || " ").replace(/\s/gi, "");
  if (emailRegex.test(textWithoutSpace)) return EValidateNames.email;
  if (phoneRegex.test(textWithoutSpace)) return EValidateNames.phone;
  return false;
};

export const normalizeValue = (value?: string): string => {
  if (!value) return "";
  const r = /[\s]/gi;
  return value.trim().replace(r, "");
};

export const formPhoneToSubmit = (str: string): string => {
  const res = str.replace(/[\D]+/g, "");

  if (res.charAt(0) === '8') {
    return res.replace('8', '7');
  }
  return res;
};

export const isValidEmail = (value: string): boolean => emailRegex.test(normalizeValue(value));
export const isValidPhone = (value: string): boolean => phoneRegex.test(normalizeValue(value));

import { FieldMetaProps } from "formik/dist/types";

import { TChildren } from "config/types";

export interface IFieldWrapperProps<V = ((string | number | readonly string[]) & string) | undefined> {
  name: string;
  label?: string;
  tooltip?: string;
  info?: string;
  showErrorText?: boolean,
  error?: string;
  meta?: FieldMetaProps<V>;
  wrapperClass?: string;
  widthComma?: boolean;
  analyticOnError?: () => void;
}

export interface IFieldWrapper extends IFieldWrapperProps {
  children: TChildren;
}

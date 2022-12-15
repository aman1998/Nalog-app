import { TextAreaProps } from "antd/lib/input";
import { FieldMetaProps } from "formik/dist/types";

import { IFieldWrapperProps } from "../FieldWrapper/types";

export type TTextAreaProps<V = ((string | number | readonly string[]) & string) | undefined> =
  & TextAreaProps  & {
  meta?: FieldMetaProps<V>;
  mask?: string;
  error?: string | undefined
}

export type BNTextAreaProps = TTextAreaProps & Omit<IFieldWrapperProps, 'name'> & {
  name: string
}
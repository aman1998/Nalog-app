import { InputProps } from "antd/lib/input";
import { FieldMetaProps } from "formik/dist/types";

export interface IInputProps<V = ((string | number | readonly string[]) & string) | undefined>
  extends InputProps {
  meta?: FieldMetaProps<V>;
  mask?: string;
  error?: string | undefined
}

export interface ISearchInputProps {
  setSearch: (e: string) => void;
  className?: string;
  inline?: boolean;
}

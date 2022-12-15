import { InputProps } from "antd";

export type PaginationInputProps = Omit<InputProps, "onChange"|"value"> & {
  value: number|null;
  setValue: (v: number) => void;
  onChange: (v: number) => void;
  lastPage: number;
}

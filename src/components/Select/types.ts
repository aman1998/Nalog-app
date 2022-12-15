import { SelectProps } from "antd/lib/select";
import { OptionData } from "rc-select/lib/interface";

export interface ISelectProps<T = string | number> extends SelectProps<T> {
  options: OptionData[];
}

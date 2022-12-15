import { OptionData } from "rc-select/lib/interface";
import { RadioGroupProps } from "antd/lib/radio/interface";

import { TRefInput } from "config/types";

interface SamplePropsOne {
  options: OptionData[];
}

export type RadioComponentProps = SamplePropsOne & RadioGroupProps & TRefInput;

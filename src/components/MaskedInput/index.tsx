import isFunction from "lodash/isFunction";
import { FC, FocusEvent } from "react";
import AntdMaskedInput from "antd-mask-input";

import { IMaskedInput } from "./types";

const MaskedInput: FC<IMaskedInput> = ({
  value,
  onFocus,
  ...rest
}) => {
  const onFocusHandle = (e: FocusEvent<HTMLInputElement>) => {
    if (isFunction(onFocus)) {
      onFocus(e);
    }

    const index = e.target.value.indexOf('_');
    e.target.setSelectionRange(index, index+1);
  };

  return <AntdMaskedInput
    value={value as ((string | number | readonly string[]) & string) | undefined}
    onFocus={e => onFocusHandle(e)}
    {...rest}
  />;

};

export default MaskedInput;

import { ChangeEvent, FC, KeyboardEvent } from 'react';
import isFunction from "lodash/isFunction";

import Input from "../../../Inputs/Input";

import { PaginationInputProps } from "./types";

const PaginationInput: FC<PaginationInputProps> = ({ onChange, lastPage, value, setValue, ...rest }) => {

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (isFunction(onChange) && value) {
        const page = value - 1;

        if (page > lastPage) {
          onChange(lastPage-1);
          return;
        }
        onChange(page);
      }
    }
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const reg = /^-?\d*(\.\d*)?$/;

    if (reg.test(val) || val === "" || val === "-") {
      setValue(Number(val));
    }
    setValue(Number(val));
  };

  return <Input
    {...rest}
    type="text"
    value={value||""}
    onChange={onChangeHandle}
    onKeyDown={handleKeyDown}
  />;
};

export default PaginationInput;
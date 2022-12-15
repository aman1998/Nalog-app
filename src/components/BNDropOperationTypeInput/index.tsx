import { FC, useEffect } from 'react';
import { useField } from "formik";

import DropOperationTypeInput from 'components/DropOperationTypeInput';

import { DropOperationTypeInputProps } from "../DropOperationTypeInput/types";

export type BNDropSingleFileInputProps = {
  name: string;
  onRemoveFile: (value: any) => void;
  onFileAdd: (value: any) => void;
} & Omit<DropOperationTypeInputProps, "onRemoveFile"|"onFileAdd"|"value">

const BNDropOperationTypeInput: FC<BNDropSingleFileInputProps> = ({
  name, description, docType, onFileAdd, onRemoveFile, disabled
}) => {
  const [,meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value, error } = meta;

  useEffect(() => {
    if (error) {
      setValue(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <DropOperationTypeInput
      value={value}
      setValue={setValue}
      onRemoveFile={onRemoveFile}
      onFileAdd={onFileAdd}
      docType={docType}
      description={description}
      disabled={disabled}
    />
  );
};

export default BNDropOperationTypeInput;
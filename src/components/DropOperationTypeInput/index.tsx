import { ChangeEvent, FC, useRef } from 'react';
import { useTranslation } from "react-i18next";
import cn from "classnames";
import debounce from "lodash/debounce";
import isFunction from 'lodash/isFunction';

import UploadIcon from "components/Icons/UploadIcon";
import PaperIcon from "components/Icons/PaperIcon";
import CloseIcon from "components/Icons/CloseIcon";
import Button from "components/Buttons/Button";

import { onClickDownloadFile } from "utils/saveFiles";

import { DropOperationTypeInputProps } from "./types";


const DropOperationTypeInput: FC<DropOperationTypeInputProps> = ({
  setValue, value, docType, description, onFileAdd, onRemoveFile, disabled
}) => {
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onDragEnter = () => {
    if(wrapperRef.current) {
      wrapperRef.current.classList.add('dragover');
    }
  };

  const onDragLeave = () => {
    if(wrapperRef.current) {
      wrapperRef.current.classList.remove('dragover');
    }
  };

  const onDrop = () => {
    if(wrapperRef.current) {
      wrapperRef.current.classList.remove('dragover');
    }
  };

  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      if (isFunction(setValue)) setValue(e.target.files[0]);
      if (isFunction(onFileAdd)) onFileAdd(e.target.files[0]);
    }
  };

  const getFileName = () => {
    const fileExtension = value.name.split('.').pop();
    const fileName = value.name.replace(fileExtension + "$", "");

    if (fileName.length > 9) return fileName.slice(0,9) + "..." + fileExtension;

    return value.name;
  };

  const onRemove = () => {
    if (isFunction(onRemoveFile)) onRemoveFile(value);
    if (isFunction(setValue)) setValue(null);
  };

  return (
    <div
      className={cn("bn-drop-operation-type-input__wrapper", { "file-exists": value, disabled })}
      ref={wrapperRef}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="bn-drop-operation-type-input__content">
        {docType && <div className="bn-drop-operation-type-input__type">{docType}</div>}
        {description && <div className="bn-drop-operation-type-input__description">{description}</div>}
      </div>
      {
        !value
          ? (
            <Button
              icon={<UploadIcon />}
              title={t("action.upload")}
              className="bn-drop-operation-type-input__upload"
              lettuce={true}
              disabled={disabled}
            />)
          : (<div className="bn-drop-operation-type-input__preview">
            <div className="bn-drop-operation-type-input__preview__info" onClick={
              debounce((e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                if (!(value instanceof File)) {
                  onClickDownloadFile(value.file);
                }
              }, 500)}>
              <a><PaperIcon /></a>
              <p>{(getFileName())}</p>
            </div>
            <span className="bn-drop-operation-type-input__preview__del" onClick={onRemove}>
              <CloseIcon />
            </span>
          </div>)
      }
      <input
        type="file"
        onChange={onFileDrop}
        value=""
        accept="application/pdf,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*"
        disabled={disabled}
      />
    </div>
  ); 
};

export default DropOperationTypeInput;
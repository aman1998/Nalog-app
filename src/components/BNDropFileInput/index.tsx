import { ChangeEvent, useRef, useState, FC, Fragment } from 'react';
import { useField } from 'formik';
import MediaQuery from "react-responsive";
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth, minTableMediaWidth } from "config/constants";

import PaperIcon from "components/Icons/PaperIcon";
import DownloadIcon from "components/Icons/DownloadIcon";
import CloseIcon from "components/Icons/CloseIcon";

import { onClickDownloadFile } from "utils/saveFiles";

import { TFilesProps } from "./types";

const DropFileInput: FC<TFilesProps> = ({ name, files, removeFiles }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, helpers] = useField(name);
  const { setValue } = helpers;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);

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
      const updatedList = [...fileList, ...Array.from(e.target.files)];
      setFileList(updatedList);
      setValue(updatedList);
    }
  };

  const fileRemove = (file: File) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    setValue(updatedList);
  };

  return (
    <Fragment>
      <MediaQuery minWidth={minTableMediaWidth}>
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <p className="drop-file-input__text">
            {t("dropdownInput.dragDropInstruction")}
          </p>
          <div className="drop-file-input__file-text-wrapper">
            <PaperIcon />
            <p className="drop-file-input__file-text">{t("dropdownInput.selectFile")}</p>
          </div>
          <input
            type="file"
            value=""
            onChange={onFileDrop}
            accept="application/pdf,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*"
            multiple={true}
          />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={maxMobileMediaWidth}>
        <div className="drop-file-input-mobile">
          <p className="drop-file-input-mobile__text">{t("dropdownInput.dragDropInstructionMobile")}</p>
          <div className="drop-file-input-mobile__input-wrapper">
            <div className="drop-file-input-mobile__file-text-wrapper">
              <PaperIcon />
              <p className="drop-file-input-mobile__file-text">{t("dropdownInput.selectFile")}</p>
            </div>
            <input
              type="file"
              value=""
              onChange={onFileDrop}
              accept="application/pdf,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpeg"
              multiple={true}
            />
          </div>
        </div>
      </MediaQuery>
      {
        fileList.length > 0 || files.length > 0 ? (
          <div className="drop-file-preview">
            {
              fileList.map((item, index) => (
                <div key={index} className="drop-file-preview__item">
                  <div className="drop-file-preview__item-info">
                    <p>{item.name}</p>
                  </div>
                  <span className="drop-file-preview__item-del" onClick={() => fileRemove(item)}>
                    <CloseIcon />
                  </span>
                </div>
              ))
            }
            {
              files.map((item, index) => (
                <div key={index} className="drop-file-preview__item">
                  <div className="drop-file-preview__item-info">
                    <p>{item.name}</p>
                    <a onClick={debounce(() => {
                      onClickDownloadFile(item.file);
                    }, 500)}>
                      <DownloadIcon />
                    </a>
                  </div>
                  <span className="drop-file-preview__item-del" onClick={() => removeFiles(item)}>
                    <CloseIcon />
                  </span>
                </div>
              ))
            }
          </div>
        ) : null
      }
    </Fragment>
  );
};

export default DropFileInput;

import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import BNDropFileInput from "components/BNDropFileInput";

import { singleTransactionFilesDataSelector } from "store/transactions/selectors";
import { TSingleTransactionFilesListData } from "store/transactions/types";
import { getSingleTransactionFilesSuccess } from "store/transactions/reducers";

import { TTransactionModalFileContentProps } from "./types";

const TransactionModalFileContent: FC<TTransactionModalFileContentProps> = (
  { id, setDeleteFiles, files }) => {
  const { t } = useTranslation();
  const listFiles = useSelector(singleTransactionFilesDataSelector(id));

  const dispatch = useDispatch();

  const removeFiles = (value: TSingleTransactionFilesListData) => {
    if(listFiles && listFiles.length) {
      const updatedList = [...listFiles];
      updatedList.splice(listFiles.indexOf(value), 1);

      if(!!setDeleteFiles) {
        setDeleteFiles((prev: string[]) => [...prev, value.id]);
      }

      dispatch(getSingleTransactionFilesSuccess({ id, data: updatedList }));
    }
  };

  return (
    <div className="transaction-edit__form-drop-wrapper">
      <p className="transaction-edit__form-drop-text">{t("operations.attachSupportingDocument")}</p>
      <BNDropFileInput
        name="files"
        files={listFiles?.length ? listFiles : []}
        removeFiles={removeFiles}
      />
      {
        (files.length + (listFiles?.length || 0)) > 3 &&
        <p className="transaction-edit__file-validate">
          {t("operations.uploadNoMoreThan3Files")}
        </p>
      }
      {
        files.some(item => item.name.trim().length > 100) &&
        <p className="transaction-edit__file-validate">
          {t("operations.fileName100Characters")}
        </p>
      }
    </div>
  );
};

export default TransactionModalFileContent;

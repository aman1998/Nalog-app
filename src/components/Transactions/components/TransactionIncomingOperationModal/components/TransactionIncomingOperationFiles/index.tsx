import { FC, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { ETransactionsOperationsTypes, TNullable } from "config/types";

import BNDropOperationTypeInput from 'components/BNDropOperationTypeInput';
import AssetNoteIcon from "components/Icons/AssetNoteIcon";
import BNTooltip from "components/BNTooltip";
import DropOperationTypeInput from 'components/DropOperationTypeInput';

import { getSingleTransactionFilesSuccess } from "store/transactions/reducers";
import { singleTransactionFilesDataSelector } from "store/transactions/selectors";
import { ETransactionsFilePurpose, TSingleTransactionFilesListData } from "store/transactions/types";

import { fileNameSettings } from '../../constants';

export type TransactionIncomingOperationFilesProps = {
  type: TNullable<ETransactionsOperationsTypes>;
  files: File[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  showUnknownField?: boolean
  disabled?: boolean
  fileNames?: string[]|undefined
  id?: string;
  setDeleteFiles?: (prev: (prev: string[]) => string[]) => void,
}

const TransactionIncomingOperationFiles: FC<TransactionIncomingOperationFilesProps> = ({
  id, type,  files, disabled, showUnknownField, fileNames, setDeleteFiles, setFieldValue
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listFiles = useSelector(singleTransactionFilesDataSelector(id));

  const onRemoveFile = (value: unknown) => {
    const $value = value as TSingleTransactionFilesListData;
    if(listFiles && listFiles.length && $value.id) {
      const updatedList = [...listFiles];
      updatedList.splice(listFiles.indexOf($value), 1);

      if(!!setDeleteFiles && $value.id) {
        setDeleteFiles((prev: string[]) => [...prev, $value.id]);
      }

      dispatch(getSingleTransactionFilesSuccess({ id, data: updatedList }));
    } else {
      const file = value as File;
      setFieldValue('files', [...files.filter(f => f.lastModified !== file.lastModified)]);
    }
  };

  const onFileAdd = (value: TSingleTransactionFilesListData) => {
    setFieldValue('files', [...files, value]);
  };
  
  const additionalFiles = () => {
    if (type === ETransactionsOperationsTypes.p2pPurchase) {
      return listFiles?.slice(1).filter(file => !file.purpose);
    }
    return listFiles?.filter(file => !file.purpose || !fileNames?.includes(file.purpose));
  };

  useEffect(() => {
    setFieldValue('files', listFiles || []);
    Object.values(ETransactionsFilePurpose)?.forEach(purpose => {
      if (type === ETransactionsOperationsTypes.p2pPurchase) {
        const findFile = listFiles ? listFiles[0] : null;
        setFieldValue(purpose, findFile);
      } else {
        const findFile = listFiles?.find(f => f.purpose === purpose);
        setFieldValue(purpose, findFile);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<div className="transaction-edit__form-files">
    <p className="transaction-edit__form-drop-text">{t("operations.attachSupportingDocument")} 
      <BNTooltip title={t("transactionIncomingOperationForm.operationFilesTooltip")}>
        <span className="field-wrapper-info">
          <AssetNoteIcon />
        </span>
      </BNTooltip>
    </p>
    {fileNames && fileNames?.map(fileName => (
      <BNDropOperationTypeInput
        key={fileName}
        disabled={disabled}
        docType={t(fileNameSettings[fileName].title)}
        description={t(fileNameSettings[fileName].description)}
        name={fileName}
        onRemoveFile={onRemoveFile}
        onFileAdd={onFileAdd}
      />))
    }
    { additionalFiles() && additionalFiles()?.map(file => (
      <DropOperationTypeInput
        key={file.id}
        disabled={true}
        docType={t("transactionFileNameSettings.additionallyTitle")}
        description={t("transactionFileNameSettings.additionallyDescription")}
        onRemoveFile={onRemoveFile}
        onFileAdd={onFileAdd}
        value={file}
      />))
    }
    {(showUnknownField && (isEmpty(fileNames) && isEmpty(additionalFiles()))) && (
      <BNDropOperationTypeInput
        name={"cryptoIncomeUnknown"}
        disabled={true}
        docType={t("transactionFileNameSettings.cryptoIncomeUnknownTitle")}
        description={t("transactionFileNameSettings.cryptoIncomeUnknownDescription")}
        onRemoveFile={onRemoveFile}
        onFileAdd={onFileAdd}
      />
    )}
  </div>);
};

export default TransactionIncomingOperationFiles;
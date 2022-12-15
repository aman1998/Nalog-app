import { FC, Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import omit from "lodash/omit";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";

import { TSingleTransactionFilesListData } from "store/transactions/types";
import {
  editManualTransactionFetching, singleTransactionDataSelector, singleTransactionFetchingSelector,
  singleTransactionFilesDataSelector,
  singleTransactionFilesFetchingSelector,
  transactionEditModalSelector
} from "store/transactions/selectors";
import {
  editManualTransactionRequest,
  getSingleTransactionFilesRequest,
  getSingleTransactionRequest
} from "store/transactions/reducers";

import { replaceDotToComma, replaceCommaToDot } from "utils/text";
import { handleFileValidate } from "utils/transactionUtils";

import { addTransactionSingleSchema } from "../../../../validation";
import { TManualP2PFormValues } from "../../../../types";

import TransactionsEditModalSkeleton from "../TransactionsEditModalSkeleton";

import TransactionModalManualP2PFormContent from "./../../../TransactionModalManualP2PFormContent";
import TransactionModalFileContent from "./../../../TransactionModalFileContent";

const TransactionEditModalManualP2PForm: FC = () => {
  const { t } = useTranslation();
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);
  const [oldApiFiles, setOldApiFiles] = useState<TSingleTransactionFilesListData[]>([]);

  const { id, formState, changeType } = useSelector(transactionEditModalSelector);
  const loading = useSelector(editManualTransactionFetching(id));
  const listFiles = useSelector(singleTransactionFilesDataSelector(id));
  const loadingFiles = useSelector(singleTransactionFilesFetchingSelector(id));
  const loadingModal = useSelector(singleTransactionFetchingSelector(id));
  const singleTransactionData = useSelector(singleTransactionDataSelector(id));
  const dispatch = useDispatch();

  const inititalValues: TManualP2PFormValues = {
    date: !!formState?.date ? formState.date : "",
    fio: !!formState?.fio ? formState.fio : "",
    src_asset: !!formState?.srcAsset ? formState.srcAsset : "",
    src_amount: !!formState?.srcAmount ? replaceDotToComma(formState.srcAmount) : "BTC",
    dst_asset: !!formState?.dstAsset ? formState.dstAsset : "",
    dst_amount: !!formState?.dstAmount ? replaceDotToComma(formState.dstAmount) : "RUB",
    external_foreign: singleTransactionData?.external_foreign || false,
    external_source_country: singleTransactionData?.external_source_country || "",
    external_destination_country: singleTransactionData?.external_destination_country || "",
    files: []
  };

  useEffect(() => {
    if (id) dispatch(getSingleTransactionFilesRequest(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listFiles && listFiles.length) setOldApiFiles(listFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFiles]);

  const onSubmit = (values: TManualP2PFormValues) => {
    if (!id) return;
    const files = values.files.map(file => ({ src: file, name: file.name, }));

    let payload = omit(values, 'files');
    if (!values.fio) payload = omit(values, 'fio');

    payload.src_amount = replaceCommaToDot(payload.src_amount);
    payload.dst_amount = replaceCommaToDot(payload.dst_amount);

    dispatch(editManualTransactionRequest({ id, values: payload, files, deleteFiles }));
  };

  const equalIsArrays = () => oldApiFiles.toString() === listFiles?.toString(); // need up and move to utils

  useEffect(() => {
    if (id && !changeType) {
      dispatch(getSingleTransactionRequest(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Fragment>
      {
        loadingModal ?
          <TransactionsEditModalSkeleton/> :
          <Formik<TManualP2PFormValues>
            initialValues={inititalValues}
            validationSchema={addTransactionSingleSchema}
            onSubmit={onSubmit}
          >
            {
              ({ isValid, dirty, values }) => (
                <Form className="transaction-manualP2P__form">
                  <TransactionModalManualP2PFormContent/>
                  <TransactionModalFileContent id={id || ""} files={values.files} setDeleteFiles={setDeleteFiles}/>
                  <Button
                    className="transaction-manualP2P__form-btn"
                    title={t("naming.save")}
                    disabled={
                      handleFileValidate(values.files, listFiles)
                    || loading
                    || loadingFiles
                    || (!(isValid && dirty) && equalIsArrays())
                    }
                    loading={!!loading || loadingFiles}
                    htmlType="submit"
                  />
                </Form>
              )
            }
          </Formik>}
    </Fragment>
  );
};

export default TransactionEditModalManualP2PForm;

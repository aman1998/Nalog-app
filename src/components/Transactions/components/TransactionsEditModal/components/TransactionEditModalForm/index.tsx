import { FC, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, FormikProps } from "formik";
import omit from "lodash/omit";
import { useTranslation } from "react-i18next";

import { ECurrency, ETransactionsOperationsTypes } from "config/types";

import BNNumericInput from "components/BNNumericInput";
import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";
import TransactionModalFileContent from "components/Transactions/components/TransactionModalFileContent";

import {
  singleTransactionFilesDataSelector,
  editSingleTransactionSelector,
  singleTransactionDataSelector,
  singleTransactionFetchingSelector,
  singleTransactionFilesFetchingSelector,
  transactionEditModalSelector, getTransactionsElement
} from "store/transactions/selectors";
import {
  getSingleTransactionRequest,
  getSingleTransactionFilesRequest,
  editSingleTransactionRequest,
} from "store/transactions/reducers";
import { TSingleTransactionFilesListData } from "store/transactions/types";
import { getReportTransactionsElement } from "store/reports/selectors";

import { replaceCommaToDot, replaceDotToComma } from "utils/text";
import { handleFileValidate } from "utils/transactionUtils";

import { TEditFormValues } from "../../../../types";

import TransactionItemCurrencyDropdown from "../../../TransactionItemCurrencyDropdown";

import TransactionsEditModalSkeleton from "../TransactionsEditModalSkeleton";

import { editTransactionSingleSchema } from "./validation";
import TransactionEditModalFormSold from "./components/TransactionEditModalFormSold";
import TransactionEditModalFormCountrySource from "./components/TransactionEditModalFormCountrySource";

const TransactionEditModalForm: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);
  const [oldApiFiles, setOldApiFiles] = useState<TSingleTransactionFilesListData[]>([]);

  const formikRef = useRef<FormikProps<TEditFormValues>>(null);

  const { id, formState, type, changeType } = useSelector(transactionEditModalSelector);
  const data = useSelector(singleTransactionDataSelector(id));
  const { fetching: loading, failure } = useSelector(editSingleTransactionSelector(id)) || {};
  const parsedError = failure?.parsedErrors;

  const loadingFiles = useSelector(singleTransactionFilesFetchingSelector(id));
  const loadingModal = useSelector(singleTransactionFetchingSelector(id));
  const listFiles = useSelector(singleTransactionFilesDataSelector(id));
  const reportTransactionElement = useSelector(getReportTransactionsElement(id));
  const transactionElement = useSelector(getTransactionsElement(id));
  const transaction = reportTransactionElement || transactionElement;
  const showFioField =
    type === ETransactionsOperationsTypes.p2pSale
    || type === ETransactionsOperationsTypes.cryptoOutcomeSale;
  const isP2pSale = type === ETransactionsOperationsTypes.p2pSale;
  const isFiat = [
    ETransactionsOperationsTypes.cryptoOutcomeSale,
    ETransactionsOperationsTypes.p2pPurchase,
    ETransactionsOperationsTypes.p2pSale,
    ETransactionsOperationsTypes.cryptoIncome,
    ETransactionsOperationsTypes.cryptoOutcome,
    ETransactionsOperationsTypes.cryptoSale,
    ETransactionsOperationsTypes.cryptoPurchase,
  ].includes(type as ETransactionsOperationsTypes);

  const relatedAsset = isFiat ? ECurrency.rub : "USDT";
  const externalAsset = (data?.external_asset || data?.original_ext_asset)
    ? (data?.external_asset || data?.original_ext_asset)
    : relatedAsset;

  const initialValues: TEditFormValues = {
    external_counterparty: data?.external_counterparty ? data.external_counterparty : "",
    external_amount: data?.external_amount ? replaceDotToComma(data.external_amount) :
      formState?.external_amount ? replaceDotToComma(formState.external_amount) : "",
    external_asset: externalAsset,
    new_type: !!changeType ? type : null,
    files: [],
    external_foreign: data?.external_foreign || false,
    external_source_country: data?.external_source_country || "",
    external_destination_country: data?.external_destination_country || "",
  };

  const onSubmit = (values: TEditFormValues) => {
    if(!id) return;
    const files = values.files.map(file => ({ src: file, name: file.name, }));
    const payload = omit(values, 'files');

    payload.external_amount = replaceCommaToDot(payload.external_amount);

    dispatch(editSingleTransactionRequest({ id, values: payload, files, deleteFiles }));
  };

  const equalIsArrays = () => oldApiFiles.toString() === listFiles?.toString(); // need up and move to utils

  const showPreviousSum = (amount: string|number): number|boolean|undefined => {
    const numAmount =  replaceCommaToDot(amount);
    return data?.original_ext_amount && data.original_ext_amount !== numAmount &&
      (type === ETransactionsOperationsTypes.p2pSale || type === ETransactionsOperationsTypes.p2pPurchase);};

  useEffect(() => {
    if(listFiles && listFiles.length) setOldApiFiles(listFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFiles]);

  useEffect(() => {
    if (id && !changeType) {
      dispatch(getSingleTransactionRequest(id));
      dispatch(getSingleTransactionFilesRequest(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="transaction-edit">
      {
        loadingModal ?
          <TransactionsEditModalSkeleton/> :
          <Formik<TEditFormValues>
            enableReinitialize={true}
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={editTransactionSingleSchema}
            onSubmit={onSubmit}
          >
            {
              ({ isValid, dirty, values, setFieldValue }) => (
                <Form className="transaction-edit__form">
                  {transaction && <TransactionEditModalFormSold transaction={transaction} />}
                  {showFioField &&
                    <div className="transaction-edit__form-fio-wrapper">
                      <div className="transaction-edit__form-text-wrapper">
                        <p className="transaction-edit__form-text">
                          {isP2pSale
                            ? t("naming.fullName")
                            : t("transactionEditModalForm.sourceOfIncome")
                          }
                        </p>
                      </div>
                      <BNInput
                        placeholder={
                          isP2pSale
                            ? undefined
                            : t("transactionEditModalForm.externalCounterparty")
                        }
                        name="external_counterparty"
                        className="transaction-edit__form-fio"
                        error={parsedError?.external_counterparty}
                      />
                    </div>
                  }
                  {(showFioField)
                    && <TransactionEditModalFormCountrySource/>}
                  <div className="transaction-edit__form-text-wrapper">
                    <p className="transaction-edit__form-text">
                      {t("transactionEditModalForm.enterExactReceivedAmount")}
                    </p>
                  </div>
                  <div className="transaction-edit__form-sum-wrapper">
                    <div className="transaction-edit__form-sum-input">
                      <BNNumericInput
                        name="external_amount"
                        className="transaction-edit__form-sum"
                        widthComma={true}
                      />
                      <TransactionItemCurrencyDropdown
                        defaultValue={values.external_asset}
                        name="external_asset"
                        fiat={isFiat}
                      />
                    </div>
                    {showPreviousSum(values.external_amount) && <p className="transaction-edit__form-sum-previous">
                      {t("naming.was")}: <span
                        className="transaction-edit__form-sum-previous-amount"
                        onClick={() => setFieldValue('external_amount', data?.original_ext_amount)}>
                        {data?.original_ext_amount}
                      </span>
                    </p>}
                  </div>
                  <TransactionModalFileContent
                    id={id || ""}
                    files={values.files}
                    setDeleteFiles={setDeleteFiles}
                  />
                  <Button
                    htmlType="submit"
                    title={!!changeType ? t("transactionEditModalForm.changeOperationType") : t("naming.save")}
                    className="transaction-edit__form-btn"
                    loading={loading}
                    disabled={
                      handleFileValidate(values.files, listFiles)
                      && equalIsArrays()
                      || loading
                      || (!(isValid && dirty)
                      )
                    }
                  />
                </Form>
              )
            }
          </Formik>
      }
    </div>
  );
};

export default TransactionEditModalForm;

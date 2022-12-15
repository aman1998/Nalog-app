import { FC, useEffect, useMemo, useState } from 'react';
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { OptionData } from "rc-select/es/interface";
import { useDispatch, useSelector } from "react-redux";

import { ECurrency, ETransactionsOperationsTypes, ETransactionsTypesRu, TNullable } from "config/types";

import BNSelect from 'components/BNSelect';
import BNNumericInput from "components/BNNumericInput";
import Button from "components/Buttons/Button";

import {
  ETransactionsFilePurpose,
  ITransactionFilePayload, TEditModalFormState,
  TSingleTransactionFilesListData
} from "store/transactions/types";
import {
  deleteTransactionFilesStateSelector,
  editSingleTransactionSelector, getTransactionsElement,
  singleTransactionDataSelector,
  singleTransactionFetchingSelector,
  singleTransactionFilesDataSelector,
  singleTransactionFilesFetchingSelector,
  uploadSingleTransactionFilesLoadingSelector,
} from "store/transactions/selectors";
import { getReportTransactionsElement } from "store/reports/selectors";
import {
  editSingleTransactionRequest,
  getSingleTransactionFilesRequest,
  getSingleTransactionRequest
} from "store/transactions/reducers";

import { replaceCommaToDot, replaceDotToComma } from "utils/text";

import TransactionItemCurrencyDropdown from "../../../TransactionItemCurrencyDropdown";
import TransactionEditModalFormSold
  from "../../../TransactionsEditModal/components/TransactionEditModalForm/components/TransactionEditModalFormSold";
import TransactionsEditModalSkeleton from "../../../TransactionsEditModal/components/TransactionsEditModalSkeleton";

import { optionFileNames } from "../../constants";

import TransactionIncomingOperationFiles from "../TransactionIncomingOperationFiles";

import { getEditIncomeTransactionSchema } from "./validation";
import { purposeFieldUpdated } from "./utils";

export type TTransactionIncomingOperationFormValues = {
  new_type?: TNullable<ETransactionsOperationsTypes>;
  external_amount: number | string;
  external_asset?: string;
  files: File[];
  p2p: TNullable<File>,
  purchase_trade: TNullable<File>,
  purchase_payment: TNullable<File>,
  airdrop_address: TNullable<File>;
  airdrop_participation: TNullable<File>;
  fork_occurred: TNullable<File>;
  fork_asset_ownership: TNullable<File>;
  my_transfer_address_ownership: TNullable<File>;
  loan_agreement: TNullable<File>;
}

export type TransactionIncomingOperationFormProps = {
  modalState?: TNullable<TEditModalFormState>;
  id: string;
  type: ETransactionsOperationsTypes;
  closeModalHandler: () => void;
}

const TransactionIncomingOperationForm: FC<TransactionIncomingOperationFormProps> = ({
  modalState, id, type, closeModalHandler
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [oldApiFiles, setOldApiFiles] = useState<TSingleTransactionFilesListData[]>([]);
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);

  const data = useSelector(singleTransactionDataSelector(id));
  const loadingFiles = useSelector(singleTransactionFilesFetchingSelector(id));
  const loadingModal = useSelector(singleTransactionFetchingSelector(id));
  const listFiles = useSelector(singleTransactionFilesDataSelector(id));
  const reportTransactionElement = useSelector(getReportTransactionsElement(id));
  const transactionElement = useSelector(getTransactionsElement(id));
  const { fetching: loading } = useSelector(editSingleTransactionSelector(id)) || {};
  const filesLoading = useSelector(uploadSingleTransactionFilesLoadingSelector);
  const { fetching: filesDeleting } = useSelector(deleteTransactionFilesStateSelector);
  const transaction = reportTransactionElement || transactionElement;
  const formLoading = loading || filesLoading || loadingFiles || loadingModal || filesDeleting;

  const equalIsArrays = () => oldApiFiles.toString() === listFiles?.toString(); // need up and move to utils

  const initialExternalAmount = data?.external_amount ? replaceDotToComma(data.external_amount) :
    modalState?.external_amount ? replaceDotToComma(modalState.external_amount) : "";
  const initialExternalAsset = data?.external_asset ? data.external_asset : ECurrency.rub;

  const initialValues: TTransactionIncomingOperationFormValues  = {
    new_type: type,
    external_amount: initialExternalAmount,
    external_asset: data?.external_asset || ECurrency.rub,
    files: [],

    // file fields
    p2p: null,
    purchase_trade: null,
    purchase_payment: null,
    airdrop_address: null,
    airdrop_participation: null,
    fork_occurred: null,
    fork_asset_ownership: null,
    my_transfer_address_ownership: null,
    loan_agreement: null,
  };

  const options: OptionData[] = [
    {
      label: t("operations.cryptoIncome_full"),
      value: ETransactionsOperationsTypes.cryptoIncome
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomePurchase),
      value: ETransactionsOperationsTypes.cryptoIncomePurchase
    },
    {
      label: t("operations.cryptoIncomePayment_full"),
      value: ETransactionsOperationsTypes.cryptoIncomePayment
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeMining),
      value: ETransactionsOperationsTypes.cryptoIncomeMining
    },
    {
      label: t("operations.cryptoIncomeMyTransfer_full"),
      value: ETransactionsOperationsTypes.cryptoIncomeMyTransfer
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeAirdrop),
      value: ETransactionsOperationsTypes.cryptoIncomeAirdrop
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeFork),
      value: ETransactionsOperationsTypes.cryptoIncomeFork
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeLoan),
      value: ETransactionsOperationsTypes.cryptoIncomeLoan
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeStakingReward),
      value: ETransactionsOperationsTypes.cryptoIncomeStakingReward
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeStakingReturn),
      value: ETransactionsOperationsTypes.cryptoIncomeStakingReturn
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeLendingReward),
      value: ETransactionsOperationsTypes.cryptoIncomeLendingReward
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeLendingReturn),
      value: ETransactionsOperationsTypes.cryptoIncomeLendingReturn
    },
    {
      label: t("operations.cryptoIncomeP2e_full"),
      value: ETransactionsOperationsTypes.cryptoIncomeP2e
    },
    {
      label: t("operations.cryptoIncomeGift_full"),
      value: ETransactionsOperationsTypes.cryptoIncomeGift
    },
    {
      label: t(ETransactionsTypesRu.cryptoIncomeOtherReward),
      value: ETransactionsOperationsTypes.cryptoIncomeOtherReward
    },
  ];

  const onSubmit = (values: TTransactionIncomingOperationFormValues) => {
    if(!id) return;
    const files: ITransactionFilePayload[] = [];
    const purposeKeys = values.new_type ? optionFileNames[values.new_type] : [];

    if (purposeKeys) {
      purposeKeys.forEach(key => {
        const file = (values[key as keyof TTransactionIncomingOperationFormValues]) as File;
        if (file && file instanceof File) {
          const addPurpose = values.new_type !== ETransactionsOperationsTypes.p2pPurchase;
          files.push({
            src: file,
            name: file.name,
            purpose: addPurpose ? key as ETransactionsFilePurpose : null
          });
        }
      });
    }

    const payload: {
      new_type: ETransactionsOperationsTypes;
      external_amount?: TNullable<number>;
      external_asset?: TNullable<string>;

    } = {
      new_type: values.new_type as ETransactionsOperationsTypes,
    };

    if (values.new_type && showExternalAmount(values.new_type)) {
      payload.external_amount = replaceCommaToDot(values.external_amount);
      payload.external_asset = values.external_asset;
    }

    dispatch(editSingleTransactionRequest({
      id, values: payload, files, deleteFiles,
      closeIncomingOperationModal: closeModalHandler
    }));
  };

  const showPreviousSum = (amount: string|number): number|boolean|undefined => {
    const numAmount =  replaceCommaToDot(amount);
    return data?.original_ext_amount && data.original_ext_amount !== numAmount &&
      (type === ETransactionsOperationsTypes.p2pSale || type === ETransactionsOperationsTypes.p2pPurchase);
  };

  const showExternalAmount = ($type: ETransactionsOperationsTypes) => [
    ETransactionsOperationsTypes.cryptoIncomePurchase,
    ETransactionsOperationsTypes.p2pPurchase,
  ].includes($type) ;

  const validationSchema = useMemo(getEditIncomeTransactionSchema, []);

  useEffect(() => {
    if(listFiles && listFiles.length) setOldApiFiles(listFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFiles]);

  useEffect(() => {
    if (id && !modalState?.changeType) {
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
          <Formik<TTransactionIncomingOperationFormValues>
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {
              ({ isValid, dirty, values, setFieldValue }) => (
                <Form className="transaction-edit__form">
                  {transaction && <TransactionEditModalFormSold transaction={transaction} />}
                  {values.new_type !== ETransactionsOperationsTypes.p2pPurchase && <BNSelect
                    info={t("transactionIncomingOperationForm.formTypeTooltip")}
                    label={t("transactionIncomingOperationForm.formTypeLabel")}
                    name="new_type"
                    wrapperClass="transaction-edit__form-type"
                    options={options}
                  />}
                  {showExternalAmount(values.new_type as ETransactionsOperationsTypes) && <>
                    <div className="transaction-edit__form-text-wrapper">
                      <p className="transaction-edit__form-text">{t("transactionEditModalForm.enterExactAmount")}</p>
                    </div>
                    <div className="transaction-edit__form-sum-wrapper">
                      <div className="transaction-edit__form-sum-input">
                        <BNNumericInput
                          name="external_amount"
                          className="transaction-edit__form-sum"
                          widthComma={true}
                          disabled={formLoading}
                        />
                        <TransactionItemCurrencyDropdown
                          defaultValue={values.external_asset}
                          name="external_asset"
                          fiat={true}
                          disabled={formLoading}
                        />
                      </div>
                      {!!showPreviousSum(values.external_amount) && <p className="transaction-edit__form-sum-previous">
                        {t("naming.was")}: <span
                          className="transaction-edit__form-sum-previous-amount"
                          onClick={() => setFieldValue('external_amount', data?.original_ext_amount)}>
                          {data?.original_ext_amount}
                        </span>
                      </p>}
                    </div>
                  </>}
                  {!!listFiles && <TransactionIncomingOperationFiles
                    type={type as ETransactionsOperationsTypes}
                    id={id || ""}
                    fileNames={values.new_type ? optionFileNames[values.new_type] : undefined}
                    disabled={values.new_type === ETransactionsOperationsTypes.cryptoIncome || formLoading}
                    setDeleteFiles={setDeleteFiles}
                    files={values.files}
                    setFieldValue={setFieldValue}
                    showUnknownField={values.new_type === ETransactionsOperationsTypes.cryptoIncome}
                  />}
                  <Button
                    htmlType="submit"
                    title={!!modalState?.changeType
                      ? t("transactionEditModalForm.changeOperationType")
                      : t("naming.save")}
                    className="transaction-edit__form-btn"
                    loading={formLoading}
                    disabled={
                      (
                        !purposeFieldUpdated(values.files)
                        && equalIsArrays()
                        && values.new_type === type
                        && values.external_amount === initialExternalAmount
                        && values.external_asset === initialExternalAsset
                      )
                      || formLoading
                      || !(isValid && dirty)
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


export default TransactionIncomingOperationForm;

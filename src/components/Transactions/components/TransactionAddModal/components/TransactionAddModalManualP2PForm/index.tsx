import { FC, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import omit from "lodash/omit";
import { useTranslation } from "react-i18next";

import { ETransactionsOperationsTypes } from "config/types";

import Button from "components/Buttons/Button";

import {
  createManualTransactionFetchingSelector,
  transactionAddModalTypeSelector
} from "store/transactions/selectors";
import { createManualTransactionRequest } from "store/transactions/reducers";

import { replaceCommaToDot } from "utils/text";
import { handleFileValidate } from "utils/transactionUtils";

import { addTransactionSingleSchema } from "../../../../validation";
import { TManualP2PFormValues, TransactionAddModalProps } from "../../../../types";

import TransactionModalManualP2PFormContent from "./../../../TransactionModalManualP2PFormContent";
import TransactionModalFileContent from "./../../../TransactionModalFileContent";

const TransactionAddModalManualP2PForm: FC<TransactionAddModalProps> = ({ finalCall }) => {
  const { t } = useTranslation();
  const loading = useSelector(createManualTransactionFetchingSelector);
  const type = useSelector(transactionAddModalTypeSelector);

  const saleType = type === ETransactionsOperationsTypes.manualP2pSale;

  const dispatch = useDispatch();

  const initialValues: TManualP2PFormValues = {
    type: type ? type : "",
    date: "",
    fio: "",
    src_asset: saleType? "BTC" : "RUB",
    src_amount: "",
    dst_asset: saleType? "RUB" : "BTC",
    dst_amount: "",
    files: [],
    external_foreign: false,
    external_source_country: "",
    external_destination_country: "",
  };

  const onSubmit = (values: TManualP2PFormValues) => {
    const files = values.files.map(file => ({ src: file, name: file.name, }));
    let payload = omit(values, 'files');

    if(!values.fio) {
      payload = omit(values, "fio");
    }

    payload.src_amount = replaceCommaToDot(payload.src_amount);
    payload.dst_amount = replaceCommaToDot(payload.dst_amount);

    dispatch(createManualTransactionRequest({ values: payload, files, finalCall }));
  };

  return (
    <Fragment>
      {type &&
      <Formik<TManualP2PFormValues>
        initialValues={initialValues}
        validationSchema={addTransactionSingleSchema}
        onSubmit={onSubmit}
      >
        {
          ({ isValid, dirty, values }) => (
            <Form className="transaction-manualP2P__form">
              <TransactionModalManualP2PFormContent />
              <TransactionModalFileContent files={values.files} />
              <Button
                className="transaction-manualP2P__form-btn"
                title={t('action.addOperations')}
                disabled={
                  handleFileValidate(values.files)
                  || !(isValid && dirty)
                  || loading}
                loading={loading}
                htmlType="submit"
              />
            </Form>
          )
        }
      </Formik>
      }
    </Fragment>
  );
};

export default TransactionAddModalManualP2PForm;

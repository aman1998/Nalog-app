import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { useHistory } from "react-router";

import { QUERIES } from "config/constants";

import Button from "components/Buttons/Button";
import BNTextArea from "components/BNTextArea/BNTextarea";
import SimpleSubmitModal from "components/SimpleSubmitModal";

import useQuery from "hooks/useQuery";

import { editTransactionNoteSelector, getTransactionsElement, transactionSelector } from "store/transactions/selectors";
import { editTransactionNoteRequest, getTransactionRequest } from "store/transactions/reducers";
import { closeModal, openModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";
import { modalStateSelector } from "store/modals/selectors";

import { TransactionEditNoteSchema } from "./validation";
import { EditTransactionNoteFormValues } from "./types";

const TransactionEditNoteModal: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();
  const transactionId = query.get(QUERIES.transaction);
  const modal = query.get(QUERIES.modal);
  const { fetching } = useSelector(editTransactionNoteSelector);
  const visible = useSelector(modalStateSelector(EModals.transactionEditNote));
  const transactionFromList = useSelector(getTransactionsElement(transactionId));
  const { data: transactionSingle } = useSelector(transactionSelector);
  const transaction = transactionFromList || transactionSingle;

  const initialValues: EditTransactionNoteFormValues = {
    note: transaction?.note || ""
  };

  const onSubmit = (values: EditTransactionNoteFormValues) => {
    dispatch(editTransactionNoteRequest({
      id: transactionId,
      data: values,
      callOnSuccess: close
    }));
  };

  const close = () => {
    query.delete(QUERIES.transaction);
    query.delete(QUERIES.modal);
    history.replace({
      search: query.toString(),
    });
    dispatch(closeModal(EModals.transactionEditNote));
  };

  useEffect(() => {
    if (!transactionFromList && transactionId) {
      dispatch(getTransactionRequest({
        id: transactionId,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId, transactionFromList]);

  useEffect(() => {
    if (transactionId && modal === EModals.transactionEditNote) {
      dispatch(openModal(EModals.transactionEditNote));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId, modal]);

  return <SimpleSubmitModal
    visible={!!visible}
    onCancel={close}
    title={t("naming.note")}
  >
    <Formik<EditTransactionNoteFormValues>
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={TransactionEditNoteSchema}
    >
      {() => (
        <Form className="simple-submit-modal__body">
          <BNTextArea
            className="name_note"
            name="note"
            maxLength={280}
            showCount={true}
          />
          <div className="simple-submit-modal__footer">
            <Button
              title={t("action.cancel")}
              transparent={true}
              onClick={close}
              disabled={fetching}
            />
            <Button
              htmlType="submit"
              title={t("naming.save")}
              disabled={fetching}
            />
          </div>
        </Form>
      )}
    </Formik>
  </SimpleSubmitModal>;
};

export default TransactionEditNoteModal;
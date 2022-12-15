import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";

import { QUERIES } from "config/constants";

import TagsMultiplier from "components/TagsMultiplier";
import SimpleSubmitModal from "components/SimpleSubmitModal";
import Button from "components/Buttons/Button";

import useQuery from "hooks/useQuery";

import {
  assetsTagsSelector,
  editTransactionTagSelector,
  getTransactionsElement,
  transactionSelector
} from "store/transactions/selectors";
import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import {
  assetsTagsRequest,
  editTransactionTagRequest,
  getTransactionRequest
} from "store/transactions/reducers";
import { closeModal, openModal } from "store/modals/reducers";

export type EditTransactionTagFormValues = {
  tags: { name: string }[];
}

const TransactionEditTagModal: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();
  const transactionId = query.get(QUERIES.transaction);
  const modal = query.get(QUERIES.modal);
  const { fetching } = useSelector(editTransactionTagSelector);
  const visible = useSelector(modalStateSelector(EModals.transactionEditTag));
  const transactionFromList = useSelector(getTransactionsElement(transactionId));
  const { data: transactionSingle } = useSelector(transactionSelector);
  const { data: assetsTags } = useSelector(assetsTagsSelector);
  const transaction = transactionFromList || transactionSingle;
  const formikRef = useRef<FormikProps<EditTransactionTagFormValues>>(null);
  const [name, setName] = useState("");

  const initialValues: EditTransactionTagFormValues = {
    tags: transaction?.tags || []
  };

  const onSubmit = (values: EditTransactionTagFormValues, ) => {
    dispatch(editTransactionTagRequest({
      id: transactionId,
      data: values.tags,
      callOnSuccess: close
    }));
  };

  const close = () => {
    query.delete(QUERIES.transaction);
    query.delete(QUERIES.modal);
    history.replace({
      search: query.toString(),
    });
    dispatch(closeModal(EModals.transactionEditTag));
    if (formikRef.current) {
      formikRef?.current.resetForm();
    }
    setName("");
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
    if (transactionId && modal === EModals.transactionEditTag) {
      dispatch(openModal(EModals.transactionEditTag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId, modal]);

  useEffect(() => {
    dispatch(assetsTagsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SimpleSubmitModal
    visible={!!visible}
    onCancel={close}
    title={t("naming.tags")}
    classContent="transaction-edit-tag-modal"
  >
    <Formik<EditTransactionTagFormValues>
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formikRef}
    >
      {({ values }) => (
        <Form className="simple-submit-modal__body">
          <TagsMultiplier
            fieldName="tags"
            tags={values.tags}
            options={assetsTags || []}
            disabled={fetching}
            name={name}
            setName={setName}
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

export default TransactionEditTagModal;
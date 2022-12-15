import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router";

import { QUERIES } from "config/constants";

import ModalWrapper from "components/ModalWrapper";

import useQuery from "hooks/useQuery";

import { closeModal, openModal } from 'store/modals/reducers';
import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import { getTransactionsElement, transactionSelector } from "store/transactions/selectors";
import { getTransactionRequest } from "store/transactions/reducers";

import TransactionIncomingOperationForm from './components/TransactionIncomingOperationForm';

const TransactionIncomingOperationModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const visible = useSelector(modalStateSelector(EModals.incomingOperation));
  const query = useQuery();
  const transactionId = query.get(QUERIES.transaction);
  const modal = query.get(QUERIES.modal);
  const transactionFromList = useSelector(getTransactionsElement(transactionId));
  const { data: transactionSingle } = useSelector(transactionSelector);
  const transaction = transactionFromList || transactionSingle;

  const {
    datetime,
    type,
    formedInfo
  } = transaction || {};

  const closeModalHandler = () => {
    query.delete(QUERIES.transaction);
    query.delete(QUERIES.modal);
    history.replace({
      search: query.toString(),
    });
    dispatch(closeModal(EModals.incomingOperation));
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
    if (transactionId && formedInfo?.incomingOperation && modal === EModals.incomingOperation) {
      dispatch(openModal(EModals.incomingOperation));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId, transaction, modal]);

  return (
    <ModalWrapper
      title={formedInfo?.modalState?.title || ""}
      visible={!!visible}
      closeModal={closeModalHandler}
      destroyOnClose={true}
      width={606}
      subTitle={moment(datetime).locale("ru").format("HH:mm, DD MMMM YYYY")}
    >
      {transactionId && type && <TransactionIncomingOperationForm
        id={transactionId}
        type={type}
        modalState={formedInfo?.modalState}
        closeModalHandler={closeModalHandler}
      />}
    </ModalWrapper>
  );
};

export default TransactionIncomingOperationModal;
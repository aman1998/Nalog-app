import { FC, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { ETransactionsOperationsTypes } from "config/types";

import ModalWrapper from "components/ModalWrapper";

import {
  transactionEditModalSelector
} from "store/transactions/selectors";
import { closeEditModal } from "store/transactions/reducers";

import TransactionEditModalForm from "./components/TransactionEditModalForm";
import TransactionEditModalManualP2PForm from "./components/TransactionEditModalManualP2PForm";
import { TransactionEditModalProps } from "./types";
import { TransactionEditModalIsReportContext } from "./hooks";

const TransactionEditModal: FC<TransactionEditModalProps> = memo(({ isReport }) => {
  const { isOpen: visible, title, date, type } = useSelector(transactionEditModalSelector);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeEditModal());
  };

  const showP2PForm = type === ETransactionsOperationsTypes.manualP2pPurchase ||
    type === ETransactionsOperationsTypes.manualP2pSale;

  return (
    <ModalWrapper
      visible={!!visible}
      closeModal={closeModal}
      title={title || ''}
      destroyOnClose={true}
      width={606}
      subTitle={moment(date).locale("ru").format("HH:mm, DD MMMM YYYY")}
    >
      <TransactionEditModalIsReportContext.Provider value={isReport}>
        {showP2PForm
          ? <TransactionEditModalManualP2PForm />
          : <TransactionEditModalForm />
        }
      </TransactionEditModalIsReportContext.Provider>
    </ModalWrapper>
  );
});

export default TransactionEditModal;

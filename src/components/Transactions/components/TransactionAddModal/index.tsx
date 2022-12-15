import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioChangeEvent } from "antd";
import { useTranslation } from "react-i18next";

import { ETransactionsOperationsTypes } from "config/types";

import ModalWrapper from "components/ModalWrapper";

import { closeAddModal, addModalType, changeAddModalStep } from "store/transactions/reducers";
import {
  addStepSelector,
  transactionAddModalStateSelector,
  transactionAddModalTypeSelector
} from "store/transactions/selectors";
import { ECreateDocumentSteps } from "store/reports/types";

import { getTransactionName } from "utils/transactionUtils";

import { TransactionAddModalProps } from "../../types";

import { TransactionEditModalIsReportContext } from "../TransactionsEditModal/hooks";

import TransactionAddStepOneModal from "./components/TransactionAddStepOneModal";
import TransactionAddModalManualP2PForm from "./components/TransactionAddModalManualP2PForm";


const TransactionAddModal: FC<TransactionAddModalProps> = ({ finalCall, isReport }) => {
  const { t } = useTranslation(); 
  const visible = useSelector(transactionAddModalStateSelector);
  const type = useSelector(transactionAddModalTypeSelector);
  const step = useSelector(addStepSelector);

  const dispatch = useDispatch();

  const onChange = (event: RadioChangeEvent) => {
    dispatch(addModalType(event.target.value));
  };

  const onClickStepOne = () => {
    dispatch(changeAddModalStep(ECreateDocumentSteps.two));
  };

  const closeModal = () => {
    dispatch(changeAddModalStep(ECreateDocumentSteps.one));
    dispatch(addModalType(ETransactionsOperationsTypes.manualP2pSale));
    dispatch(closeAddModal());
  };

  const handleBack = () => dispatch(changeAddModalStep(ECreateDocumentSteps.one));

  return (
    <ModalWrapper
      visible={visible}
      closeModal={closeModal}
      title={ step === ECreateDocumentSteps.one ? t("operations.addingOperation") : getTransactionName(type)}
      className="transaction-add__modal"
      handleBack={step !== ECreateDocumentSteps.one && handleBack}
      destroyOnClose={true}
      width={606}
    >
      <TransactionEditModalIsReportContext.Provider value={isReport}>
        <div className="transaction-add">
          { step === ECreateDocumentSteps.one ?
            <TransactionAddStepOneModal onChange={onChange} onClick={onClickStepOne} /> :
            <TransactionAddModalManualP2PForm finalCall={finalCall}/>
          }
        </div>
      </TransactionEditModalIsReportContext.Provider>
    </ModalWrapper>
  );
};

export default TransactionAddModal;

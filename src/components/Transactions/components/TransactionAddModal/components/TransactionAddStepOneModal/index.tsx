import { Fragment, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from 'antd';
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { ETransactionsOperationsTypes } from "config/types";

import Button from "components/Buttons/Button";
import NoteIcon from "components/Icons/AssetNoteIcon";

import { transactionAddModalTypeSelector } from "store/transactions/selectors";
import { addModalType } from "store/transactions/reducers";

import { ITransactionStepOneModalProps } from "./types";

const TransactionAddStepOneModal: FC<ITransactionStepOneModalProps> = ({ onChange, onClick }) => {
  const { t } = useTranslation();
  const modalType = useSelector(transactionAddModalTypeSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!modalType) {
      dispatch(addModalType(ETransactionsOperationsTypes.manualP2pSale));
    }
  }, []);

  return (
    <Fragment>
      <Radio.Group onChange={onChange} value={modalType}>
        <Radio value={ETransactionsOperationsTypes.manualP2pSale} className={cn("transaction-add-item", {
          transactionAddItemActive: modalType === ETransactionsOperationsTypes.manualP2pSale
        })}>
          <h3 className="transaction-add-item__title">{t("operations.cryptoSale")}</h3>
          <p className="transaction-add-item__text">{t("transactionAddStepOneModal.cryptoSaleText")}</p>
        </Radio>
        <Radio value={ETransactionsOperationsTypes.manualP2pPurchase} className={cn("transaction-add-item", {
          transactionAddItemActive: modalType === ETransactionsOperationsTypes.manualP2pPurchase
        })}>
          <h3 className="transaction-add-item__title">{t("operations.cryptoPurchase")}</h3>
          <p className="transaction-add-item__text">{t("transactionAddStepOneModal.cryptoPurchaseText")}</p>
        </Radio>
      </Radio.Group>
      <Button
        onClick={onClick}
        className="transaction-add__btn"
        title={t("naming.further")}
      />
      <div className="transaction-add__note">
        <div>
          <NoteIcon fill={"#9E83F8"} />
        </div>
        <p className="transaction-add__note-text">
          {t("transactionAddStepOneModal.note")}
        </p>
      </div>
    </Fragment>
  );
};

export default TransactionAddStepOneModal;

import { useTranslation } from "react-i18next";
import { FC } from "react";

import { ETransactionsOperationsTypes } from "config/types";


import { TransactionEditModalFormSoldProps } from "./types";

const TransactionEditModalFormSold: FC<TransactionEditModalFormSoldProps> = ({ transaction }) => {
  const { t } = useTranslation();

  const getIndividualSold = () => {
    switch (transaction.type) {
    case ETransactionsOperationsTypes.cryptoIncomePurchase:
    case ETransactionsOperationsTypes.p2pPurchase:
    case ETransactionsOperationsTypes.cryptoIncome:
    case ETransactionsOperationsTypes.cryptoIncomeLoan:
    case ETransactionsOperationsTypes.cryptoIncomeAirdrop:
    case ETransactionsOperationsTypes.cryptoIncomeFork:
    case ETransactionsOperationsTypes.cryptoIncomeMyTransfer:
    case ETransactionsOperationsTypes.cryptoIncomePayment:
    case ETransactionsOperationsTypes.cryptoIncomeMining:
      return <>
        {t("transactionEditModalFormSold.wasBought")}: <span className="transaction-edit__form-sold__value">
          {transaction?.dst_amount} {transaction?.dst_asset}
        </span>
      </>;
    case ETransactionsOperationsTypes.cryptoOutcomeSale:
    case ETransactionsOperationsTypes.p2pSale:
      return  <>
        {t("transactionEditModalFormSold.wasSold")}: <span className="transaction-edit__form-sold__value">
          {transaction?.src_amount} {transaction?.src_asset}
        </span>
      </>;
    }
  };

  const showIndividualSold = [
    ETransactionsOperationsTypes.cryptoOutcomeSale,
    ETransactionsOperationsTypes.cryptoIncomePurchase,
    ETransactionsOperationsTypes.cryptoIncome,
    ETransactionsOperationsTypes.cryptoIncomeAirdrop,
    ETransactionsOperationsTypes.cryptoIncomeFork,
    ETransactionsOperationsTypes.cryptoIncomeLoan,
    ETransactionsOperationsTypes.cryptoIncomeMyTransfer,
    ETransactionsOperationsTypes.cryptoIncomePayment,
    ETransactionsOperationsTypes.cryptoIncomeMining,
    ETransactionsOperationsTypes.p2pSale,
    ETransactionsOperationsTypes.p2pPurchase
  ].includes(transaction.type);
  if (!showIndividualSold) return <></>;

  return <div className="transaction-edit__form-sold-wrapper">
    <span className="transaction-edit__form-sold__text">
      {getIndividualSold()}
    </span>
  </div>;
};

export default TransactionEditModalFormSold;

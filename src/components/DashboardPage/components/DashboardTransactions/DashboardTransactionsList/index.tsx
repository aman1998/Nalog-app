import { useSelector } from "react-redux";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";

import TransactionsListItem from "components/Transactions/components/TransactionsListItem";
import TransactionEditModal from "components/Transactions/components/TransactionsEditModal";
import TransactionEditConfirm from "components/Transactions/components/TransactionEditConfirm";
import TransactionAddModal from "components/Transactions/components/TransactionAddModal";
import TransactionIncomingOperationModal from "components/Transactions/components/TransactionIncomingOperationModal";
import TransactionEditNoteModal
  from "components/Transactions/components/TransactionsListItem/components/TransactionEditNoteModal";
import TransactionEditTagModal
  from "components/Transactions/components/TransactionsListItem/components/TransactionEditTagModal";

import { TTransactionResult } from "store/transactions/types";
import { transactionsListDataSelector } from "store/transactions/selectors";

const DashboardTransactionsList: FC = () => {
  const { t } = useTranslation();
  const transactionsList = useSelector(transactionsListDataSelector);
  const history = useHistory();
  
  return (<>
    {transactionsList.slice(0, 3).map(( item: TTransactionResult ) => (
      <TransactionsListItem
        transaction={item}
        key={item.id}
        hideBorder={true}
        isDashboard={true}
      />
    ))}
    <button
      className="dashboard-transactions__btn"
      onClick={() => history.push(paths.TRANSACTIONS)}
    >
      {t('action.goToOperationsPage')}
    </button>
    <TransactionEditModal />
    <TransactionEditConfirm />
    <TransactionAddModal />
    <TransactionIncomingOperationModal />
    <TransactionEditNoteModal />
    <TransactionEditTagModal />
  </>);
};

export default DashboardTransactionsList;
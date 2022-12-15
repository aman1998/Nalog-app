import { FC } from "react";
import { useHistory } from "react-router";

import { QUERIES } from "config/constants";

import NotesIcon from "components/Icons/NotesIcon";

import { EModals } from "store/modals/types";
import { TTransactionResult } from "store/transactions/types";

import { useTransactionsListItem } from "../../hooks";

const TransactionAdditionalInfoBtns: FC = () => {
  const history = useHistory();
  const { transaction } = useTransactionsListItem();
  const { id, note, tags } = transaction as TTransactionResult;
  
  const openEditTransactionNoteModal = () => {
    history.replace({
      search: `?${QUERIES.transaction}=${id}&modal=${EModals.transactionEditNote}`
    });
  };

  const openEditTransactionTagModal = () => {
    history.replace({
      search: `?${QUERIES.transaction}=${id}&modal=${EModals.transactionEditTag}`
    });
  };

  return <div className="transactions-item__additional-info__btns">
    {tags?.length > 0 && (
      <div className="transactions-item__additional-info__btns__tag" onClick={openEditTransactionTagModal}>
        <span>#{tags.length}</span>
      </div>)
    }
    {note && <div className="transactions-item__additional-info__btns__note" onClick={openEditTransactionNoteModal}>
      <NotesIcon/>
    </div>}
  </div>;
};

export default TransactionAdditionalInfoBtns;
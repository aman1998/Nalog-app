import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ConfirmModal from "components/ConfirmModal";
import NoteIcon from "components/Icons/AssetNoteIcon";
import Button from "components/Buttons/Button";

import {
  closeEditConfirm as closeEditConfirmAction,
  editSingleTransactionRequest
} from "store/transactions/reducers";
import {
  transactionEditConfirmTitleSelector,
  transactionEditConfirmIdSelector,
  transactionEditConfirmTypeSelector,
  transactionEditConfirmStateSelector,
  editSingleTransactionSelector
} from "store/transactions/selectors";
import { getFilterTransactionSelector } from "store/filter/selectors";

import { TTransactionEditConfirmProps } from "./types";

const TransactionEditConfirm: FC<TTransactionEditConfirmProps> = ({ getListCallback }) => {
  const { t } = useTranslation();
  const title = useSelector(transactionEditConfirmTitleSelector);
  const filters = useSelector(getFilterTransactionSelector);
  const id = useSelector(transactionEditConfirmIdSelector) || "";
  const type = useSelector(transactionEditConfirmTypeSelector);
  const visible = useSelector(transactionEditConfirmStateSelector);
  const { fetching: loading } = useSelector(editSingleTransactionSelector(id)) || {};

  const dispatch = useDispatch();

  const editTransactionType = () => {
    dispatch(editSingleTransactionRequest({ id, values: { new_type: type }, getListCallback, filters }));
  };

  const closeEditConfirm = () => {
    dispatch(closeEditConfirmAction());
  };

  return (
    <ConfirmModal
      icon={<NoteIcon />}
      className="transaction-edit__confirm-modal"
      btns={
        <>
          <Button title={t("action.cancel")} transparent={true} onClick={closeEditConfirm} />
          <Button
            title={t('action.change')}
            onClick={editTransactionType}
            loading={!!loading}
            disabled={!!loading}
          />
        </>
      }
      title={t("operations.transactionEditConfirmTitle", { title })}
      text={t("operations.transactionEditConfirmText")}
      visible={!!visible}
    />
  );
};

export default TransactionEditConfirm;

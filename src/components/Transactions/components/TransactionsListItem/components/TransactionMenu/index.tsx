import { FC, useState } from 'react';
import { Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import isFunction from "lodash/isFunction";

import { colors, QUERIES } from "config/constants";

import DangerIcon from "components/Icons/DangerIcon";
import Button from "components/Buttons/Button";
import ConfirmModal from "components/ConfirmModal";
import EllipsisVerticalIcon from 'components/Icons/EllipsisVerticalIcon';

import { deleteManualTransactionFetching } from "store/transactions/selectors";
import { deleteManualTransactionRequest } from "store/transactions/reducers";
import { EModals } from "store/modals/types";
import { TTransactionResult } from "store/transactions/types";

import { useTransactionsListItem } from "../../hooks";

import { TransactionMenuProps } from "./types";

const TransactionMenu: FC<TransactionMenuProps> = ({ 
  transactionName, availableDelete, edit, onEdit 
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const { transaction } = useTransactionsListItem();
  const { id } = transaction as TTransactionResult;
  const fetching = useSelector(deleteManualTransactionFetching(id));

  const onDelete = () => {
    dispatch(deleteManualTransactionRequest({ id, callback: () => setVisible(false) }));
  };

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
  
  const menu = (
    <Menu className="transactions-item-right__menu">
      {edit && (
        <Menu.Item
          key="1"
          onClick={() => isFunction(onEdit) && onEdit()}
          className="transactions-item-right__menu_edit"
        >
          {t("action.edit")}
        </Menu.Item>)
      }
      <Menu.Item
        key="2"
        onClick={openEditTransactionNoteModal}
      >
        {t("naming.notes")}
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={openEditTransactionTagModal}
      >
        {t("naming.tags")}
      </Menu.Item>
      {availableDelete && (
        <Menu.Item
          key="4"
          onClick={() => setVisible(true)}
          disabled={fetching}
          className="transactions-item-right__menu_delete"
        >
          {t("action.delete")}
        </Menu.Item>)
      }
    </Menu>
  );

  return <div className="transactions-item-right__dropdown">
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      placement="bottomRight"
      align={{ offset: [-36, -44] }}
    >
      <a onClick={e => e.preventDefault()}>
        <EllipsisVerticalIcon/>
      </a>
    </Dropdown>
    {availableDelete && <ConfirmModal
      icon={<DangerIcon fill={colors.error2}/>}
      title={t("operations.deleteOperationName", { name: transactionName })}
      text={t("operations.deleteOperationNameText")}
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={onDelete}
      btns={
        <>
          <Button title={t("action.cancel")} transparent={true} onClick={() => setVisible(false)} disabled={fetching}/>
          <Button title={t("action.delete")} danger={true} onClick={onDelete} disabled={fetching}/>
        </>
      }
    />}
  </div>;
};

export default TransactionMenu;
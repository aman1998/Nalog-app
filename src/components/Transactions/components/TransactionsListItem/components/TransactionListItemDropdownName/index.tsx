import { FC } from "react";
import { Dropdown, Menu } from "antd";
import cn from "classnames";

import EditIcon from "components/Icons/EditIcon";

import { TTransactionListItemDropdownName } from "./types";


const TransactionListItemDropdownName: FC<TTransactionListItemDropdownName> = (
  { handleTransactionType, transactionName, showBtns, changeTypeList, red }) => {

  const menu = (
    <Menu className="transactions-item__dropdown-menu">
      {
        changeTypeList.map(item => (
          <Menu.Item
            onClick={() => handleTransactionType(item)}
            key={item.value}
            className="transactions-item__dropdown-menu-item"
          >
            {item.label}
            { item.label === transactionName && showBtns && <EditIcon /> }
          </Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} className="transactions-item__dropdown">
      <div>
        <a onClick={e => e.preventDefault()} className={cn("transactions-item__dropdown-name", { red })}>
          {transactionName}
        </a>
        <i className={cn("transactions-item__dropdown-arrow", { red })} />
      </div>
    </Dropdown>
  );
};

export default TransactionListItemDropdownName;


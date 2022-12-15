import { FC } from 'react';
import { Drawer } from "antd";
import { useTranslation } from "react-i18next";

import CloseIcon from "components/Icons/CloseIcon";
import Button from "components/Buttons/Button";

import TransactionsFilter from "../../../TransactionsFilter";

import { TransactionsHeaderMobileFilterProps } from "./types";

const TransactionsHeaderMobileFilter: FC<TransactionsHeaderMobileFilterProps> = 
  ({ visible, toggleDrawer, handleFilter }) =>
  {
    const { t } = useTranslation();
    return (
      <Drawer
        width={"100%"}
        placement="right"
        closable={false}
        visible={visible}
        className="drawer"
      >
        <div className="drawer-header">
          <div className="drawer-closeIcon" onClick={toggleDrawer}>
            <CloseIcon />
          </div>
          <h2 className="drawer-title">{t("naming.filter")}</h2>
        </div>
        <div className="drawer-filter">
          <TransactionsFilter />
          <div className="drawer-filter__btn-wrapper">
            <Button title={t("action.apply")} className="drawer-filter__btn" onClick={handleFilter} />
          </div>
        </div>
      </Drawer>
    );};

export default TransactionsHeaderMobileFilter;
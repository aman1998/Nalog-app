import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import FilterLogo from "components/Icons/FilterIcon";
import CloseIcon from "components/Icons/CloseIcon";
import Button from "components/Buttons/Button";

import { TTransactionsFilterState } from "store/filter/types";
import { getFilterTransactionSelector } from "store/filter/selectors";
import { setFilterTransactions } from "store/filter/reducers";
import { reportTransactionsRequest } from "store/reports/reducers";
import { reportTransactionsTypeSelector } from "store/reports/selectors";
import { EReportTransactionType } from "store/reports/types";

import StepTwoFilter from "../StepTwoFilter";

import StepTwoFilterList from './components/StepTwoFilterList';

const StepTwoMobileHeader: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{id : string}>();
  const [headerFilters, setHeaderFilter] = useState<TTransactionsFilterState>({});
  const filterState = useSelector(getFilterTransactionSelector);
  const type = useSelector(reportTransactionsTypeSelector);

  const [visible, setVisible] = useState(() => (type === EReportTransactionType.filter));

  const dispatch = useDispatch();

  const handleDrawer = () => {
    setVisible(!visible);
  };

  const handleFilter = () => {
    let params = { id, report_type: type };

    if (type === EReportTransactionType.filter) {
      params = { ...filterState, ...params };
      if (filterState.report_type) {
        params.report_type = filterState.report_type;
      }
    }
    dispatch(reportTransactionsRequest(params));
    setVisible(false);
    if (filterState) setHeaderFilter(filterState);
  };

  useEffect(() => {
    dispatch(setFilterTransactions({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="create-document__step-two__header-mobile container">
      <div className="filter-logo-wrapper">
        <div className="filter-logo" onClick={handleDrawer}><FilterLogo /></div>
      </div>
      <StepTwoFilterList visible={visible} headerFilters={headerFilters} setHeaderFilter={setHeaderFilter}/>
      <Drawer
        width={"100%"}
        placement="right"
        closable={false}
        visible={visible}
        className="drawer"
      >
        <div className="drawer-header">
          <div className="drawer-closeIcon" onClick={handleDrawer}>
            <CloseIcon />
          </div>
          <h2 className="drawer-title">{t("naming.filter")}</h2>
        </div>
        <div className="drawer-filter">
          <StepTwoFilter/>
          <div className="drawer-filter__btn-wrapper">
            <Button title={t("action.apply")} className="drawer-filter__btn" onClick={handleFilter} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default StepTwoMobileHeader;
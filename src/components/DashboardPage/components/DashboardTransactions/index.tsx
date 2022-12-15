import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { maxMobileMediaWidth } from "config/constants";

import BNSpinner from "components/BNSpinner";
import List from "components/List";

import { TTransactionResult } from "store/transactions/types";
import {
  transactionsListDataSelector,
  transactionsListFetchingSelector
} from "store/transactions/selectors";
import { getTransactionsListRequest } from "store/transactions/reducers";

import DashboardCard from "../DashboardCard";

import DashboardTransactionsEmpty from "./DashboardTransactionsEmpty";
import DashboardTransactionsList from "./DashboardTransactionsList";

const DashboardTransactions: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const transactionsList = useSelector(transactionsListDataSelector);
  const fetching = useSelector(transactionsListFetchingSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  
  useEffect(
    () => {
      dispatch(getTransactionsListRequest({ size: 3, limit: 3 }));
    }, [dispatch]);

  return (
    <DashboardCard
      title={t('naming.resentOperations')}
      className="dashboard-transactions"
      isEmpty={isMobile && !isEmpty(transactionsList)}
    >
      <List<TTransactionResult>
        component={<DashboardTransactionsList/>}
        loading={fetching && isEmpty(transactionsList)}
        preloader={<DashboardTransactionsEmpty children={
          <div className="dashboard-transactions-empty__spinner"><BNSpinner /></div>}/>}
        emptyText={<DashboardTransactionsEmpty children={t("dashboardTransactionsEmpty.text")}/>}
        data={transactionsList}
      />
    </DashboardCard>
  );
};



export default DashboardTransactions;
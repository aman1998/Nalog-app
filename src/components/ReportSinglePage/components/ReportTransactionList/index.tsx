import { FC, useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { useParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { useMediaQuery } from "react-responsive";

import { mobileMediaWidth } from "config/constants";

import BNSpinner from "components/BNSpinner";
import List from "components/List";
import TransactionEditConfirm from "components/Transactions/components/TransactionEditConfirm";
import TransactionEditModal from "components/Transactions/components/TransactionsEditModal";

import { useScrollEvent } from "hooks/useScrollEvent";

import {
  reportTransactionsSelector,
  reportTransactionsDataSelector,
  reportTransactionsFetchingSelector,
  reportTransactionsTypeSelector,
  reportTransactionsFinishSelector,
  reportTransactionsNextPageSelector,
} from "store/reports/selectors";
import {  reportTransactionsRequest } from "store/reports/reducers";
import { getFilterTransactionSelector } from "store/filter/selectors";
import { EReportTransactionType } from "store/reports/types";
import { clearTransactionsState } from "store/transactions/reducers";

import animateScrollTo from "utils/animateScrollTo";

import ReportsEmptyList from "./components/ReportsEmptyList";
import ReportTransactions from "./components/ReportTransactions";

const ReportTransactionList: FC = () => {
  const { id } = useParams<{id : string}>();
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileMediaWidth}px)` });

  const list = useSelector(reportTransactionsSelector);
  const fetching = useSelector(reportTransactionsFetchingSelector);
  const type = useSelector(reportTransactionsTypeSelector);
  const data = useSelector(reportTransactionsDataSelector);
  const finish = useSelector(reportTransactionsFinishSelector);
  const next = useSelector(reportTransactionsNextPageSelector);
  const filters = useSelector(getFilterTransactionSelector);

  const dispatch = useDispatch();

  const fetchReportTransactionsRequest = (page=1) => {
    let params = { id, report_type: type, page };

    if (type === EReportTransactionType.filter) {
      params = { ...filters, ...params };
      if (filters.report_type) {
        params.report_type = filters.report_type;
      }
    }
    dispatch(reportTransactionsRequest(params));
  };

  useEffect(() => {
    if (!isMobile) {
      dispatch(clearTransactionsState());
      fetchReportTransactionsRequest();
      animateScrollTo(0, 500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, filters, isMobile]);

  useEffect(() => {
    if (isMobile) {
      dispatch(clearTransactionsState());
      fetchReportTransactionsRequest();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useScrollEvent({
    fetching,
    finish,
    fetchList: () => {
      fetchReportTransactionsRequest(next || 1);
    }
  });

  return (
    <div className="container">
      <List
        component={<ReportTransactions/>}
        loading={fetching && isEmpty(list)}
        data={data}
        preloader={<BNSpinner />}
        emptyText={<ReportsEmptyList />}
      />
      <TransactionEditModal isReport={true} />
      <TransactionEditConfirm getListCallback={() => dispatch(reportTransactionsRequest({ id, type }))} />
    </div>
  );
};

export default ReportTransactionList;

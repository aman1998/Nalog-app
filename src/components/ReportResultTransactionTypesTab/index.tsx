import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";

import {
  reportTaxResultTransactionTypesSelector,
} from "store/reports/selectors";
import { changeReportTransactionsType, reportTaxResultTransactionTypesRequest } from "store/reports/reducers";

import TransactionTypesTab from "../TransactionTypesTab";

const ReportResultTransactionTypesTab: FC = () => {
  const { id } = useParams<{ id: string }>();
  const tabsPane = useSelector(reportTaxResultTransactionTypesSelector);

  const dispatch = useDispatch();

  const handleTabs = (key: string) => {
    dispatch(changeReportTransactionsType(key));
  };

  useEffect(() => {
    dispatch(reportTaxResultTransactionTypesRequest(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="create-document__step-two__tabs-wrapper">
    <TransactionTypesTab tabsPane={tabsPane} handleTabs={handleTabs}/>
  </div>;
};

export default ReportResultTransactionTypesTab;
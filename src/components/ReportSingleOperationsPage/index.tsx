import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import ReportOperationsHeader from "./components/ReportOperationsHeader";
import ReportOperationsTransactions from "./components/ReportOperationsTransactions";

const ReportSingleOperationsPage: FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(analyticEvent(EEventType.TAXREPORT_FORMED_TRANSACTIONS_SHOWN));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="report-operations">
      <ReportOperationsHeader />
      <div className="report-operations__content container">
        <ReportOperationsTransactions />
      </div>
    </div>
  );};

export default ReportSingleOperationsPage;

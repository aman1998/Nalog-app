import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { useParams } from "react-router-dom";


import TransactionAddModal from "components/Transactions/components/TransactionAddModal";

import {
  addTransactionToTaxReportRequest,
  reportTaxTransactionTypesRequest,
  reportTransactionsRequest
} from "store/reports/reducers";
import { reportTransactionsTypeSelector } from "store/reports/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

const StepTwoTransactionAddModal: FC = () => {
  const { id } = useParams<{id : string}>();
  const dispatch = useDispatch();
  const type = useSelector(reportTransactionsTypeSelector);

  return <TransactionAddModal
    finalCall={(transactionId: string) => {
      dispatch(addTransactionToTaxReportRequest({ report_id: id, data: { transaction_id: transactionId } }));
      dispatch(reportTransactionsRequest({ id, type }));
      dispatch(reportTaxTransactionTypesRequest(id));
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP2_TRANSACTION_ADDED));
    }}
    isReport={true}
  />;
};

export default StepTwoTransactionAddModal;
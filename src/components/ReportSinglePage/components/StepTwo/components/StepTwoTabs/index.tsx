import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TransactionTypesTab from "components/TransactionTypesTab";

import { changeReportTransactionsType, reportTaxTransactionTypesRequest } from "store/reports/reducers";
import { createDocumentSelector, reportTaxTransactionTypesSelector } from "store/reports/selectors";
import { ECreateDocumentSteps } from "store/reports/types";


const StepTwoTabs: FC = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const tabsPane = useSelector(reportTaxTransactionTypesSelector);
  const { currentStep } = useSelector(createDocumentSelector);
  const dispatch = useDispatch();

  const handleTabs = (key: string) => {
    dispatch(changeReportTransactionsType(key));
  };

  useEffect(() => {
    if(currentStep === ECreateDocumentSteps.two) {
      dispatch(reportTaxTransactionTypesRequest(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="create-document__step-two__tabs-wrapper">
    <TransactionTypesTab tabsPane={tabsPane} handleTabs={handleTabs}/>
    {children}
  </div>;
};

export default StepTwoTabs;
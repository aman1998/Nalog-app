import { FC } from 'react';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { reportTransactionsCountSelector } from "store/reports/selectors";

const StepTwoFilterCounter: FC = () => {
  const { t } = useTranslation();
  const count = useSelector(reportTransactionsCountSelector);
  
  return <p className="create-document__step-two__filter_counter container">
    {t("createReportStepTwo.filterOperationCounter", { count: count || 0 })}
  </p>;
};

export default StepTwoFilterCounter;
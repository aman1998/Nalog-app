import { useSelector } from "react-redux";
import { FC, memo } from "react";

import StepOne from "components/ReportCreatePage/components/StepOne";

import { ECreateDocumentSteps, ESingleTaxReportTransactionStatus } from "store/reports/types";
import { createDocumentSelector, getSingleTaxReportDataSelector } from "store/reports/selectors";

import ReportForming from "../../../ReportFormed/components/ReportForming";

import StepTwo from "../StepTwo";
import StepThree from "../StepThree";

import { ReportStepsProps } from "./types";

const ReportSteps: FC<ReportStepsProps> = memo(({ id, formikRef }) => {
  const taxReportData = useSelector(getSingleTaxReportDataSelector(id));
  const { currentStep } = useSelector(createDocumentSelector);
  
  if (taxReportData?.transactions_status === ESingleTaxReportTransactionStatus.forming) return <ReportForming />;

  switch (currentStep) {
  case ECreateDocumentSteps.one:
    return <StepOne />;
  case ECreateDocumentSteps.two:
    return <StepTwo />;
  case ECreateDocumentSteps.three:
    return <StepThree formikRef={formikRef} />;
  default:
    return <ReportForming />; // status form and error too this element
  }
});

export default ReportSteps;
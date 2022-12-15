import { FC, Fragment, memo } from "react";
import { useSelector } from "react-redux";


import {
  getSingleTaxReportDataSelector,
} from "store/reports/selectors";
import { EReportStatus } from "store/reports/types";

import ReportDraft from "../ReportDraft";
import ReportSingleFormed from "../ReportSingleFormed";

import { ReportContentProps } from "./types";

const ReportContent: FC<ReportContentProps> = memo(({ id }) => {
  const taxReportData = useSelector(getSingleTaxReportDataSelector(id));

  switch (taxReportData?.status) {
  case EReportStatus.forming:
  case EReportStatus.formed:
    return <ReportSingleFormed />;
  case EReportStatus.draft:
  case EReportStatus.error:
    return <ReportDraft id={id}/>;
  default:
    return <Fragment />;
  }
});

export default ReportContent;

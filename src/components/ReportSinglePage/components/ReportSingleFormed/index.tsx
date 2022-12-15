import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { paths } from "config/paths";

import ReportFormed from "components/ReportFormed";
import { TBreadcrumbItem } from "components/BNBreadcrumb/types";

import { EReportStatus } from "store/reports/types";
import { getReportFormedRequest } from "store/reports/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";
import {
  getReportFormedFetchingSelector,
  getReportFormedFilesSelector,
  getSingleTaxReportDataSelector
} from "store/reports/selectors";

import ReportInfo from "../ReportInfo";

const ReportSingleFormed: FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const files = useSelector(getReportFormedFilesSelector);
  const loadingReport = useSelector(getReportFormedFetchingSelector);
  const report = useSelector(getSingleTaxReportDataSelector(id));

  const dispatch = useDispatch();

  const showDate = !loadingReport && report?.status === EReportStatus.formed;

  const breadcrumbItems: TBreadcrumbItem[] = [
    { to: paths.DOCUMENTS, label: t("naming.documents") },
    { label: t("naming.declarationFor", { year: 2021 }) },
  ];

  useEffect(() => {
    if(report?.status === EReportStatus.formed) {
      dispatch(getReportFormedRequest(id));
    }
  }, [id, dispatch, report?.status]);

  useEffect(() => {
    dispatch(analyticEvent(EEventType.DOCS_TAXREPORT_FORMED_OPEN));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <ReportFormed
    title={t("naming.declarationFor", { year: 2021 })}
    breadcrumbItems={breadcrumbItems}
    files={files}
    loading={loadingReport}
    forming={report?.status === EReportStatus.forming}
    showDate={showDate}
    createdAt={moment(report?.updated_at).locale(i18n.language).format("DD.MM.YYYY")}
    rightSide={<ReportInfo />}
  />;  
};

export default ReportSingleFormed;
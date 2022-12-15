import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";
import { QUERIES } from "config/constants";

import ReportEdit from "components/ReportEdit";
import { TBreadcrumbItem } from "components/BNBreadcrumb/types";

import useQuery from "hooks/useQuery";

import { reportSingleRequest, setCreateTransitionExportCurrentStep } from "store/reports/reducers";
import {
  createSourcesExportSelector,
  createTransactionExportSelector,
  getReportSingleFilesSelector,
  getReportSingleSelector,
} from "store/reports/selectors";
import { EReportStatus, TCreateTransitionExportSteps } from "store/reports/types";

import ReportFormed from "../ReportFormed";
import { EDocumentCreateOptions } from 
  "../ReportsPage/components/DocumentCreateModal/components/DocumentCreateModalForm";

export type TransitionExportSinglePageProps = {
  title: string;
  type?: EDocumentCreateOptions
}

const TransitionExportSinglePage: FC<TransitionExportSinglePageProps> = ({
  title
}) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const query = useQuery();
  const fromCreateExport = query.get(QUERIES.fromCreateExport) === "true";
  const dispatch = useDispatch();
  const transactionExport = useSelector(createTransactionExportSelector);
  const sourcesExport = useSelector(createSourcesExportSelector);

  const files = useSelector(getReportSingleFilesSelector);
  const { data: report, fetching, initialLoading } = useSelector(getReportSingleSelector);

  const breadcrumbItems: TBreadcrumbItem[] = [
    { to: paths.DOCUMENTS, label: t("naming.documents") },
    { label: title },
  ];

  const showDate = !(fetching || initialLoading) && report?.status === EReportStatus.formed;

  useEffect(() => {
    if (
      (!transactionExport.fetching && transactionExport.data)
      || (!sourcesExport.fetching && sourcesExport.data)
      || initialLoading
    ) {
      dispatch(reportSingleRequest({
        id,
        callOnError: () => {
          dispatch(setCreateTransitionExportCurrentStep(
            {
              id,
              currentStep: fromCreateExport ? TCreateTransitionExportSteps.three : TCreateTransitionExportSteps.one
            })
          );
          if (fromCreateExport) {
            query.delete(QUERIES.fromCreateExport);
            history.replace({
              search: query.toString(),
            });
          }
        }
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionExport.fetching, sourcesExport.fetching]);

  switch (report?.status) {
  case EReportStatus.forming:
  case EReportStatus.formed:
    return (
      <ReportFormed
        title={title}
        breadcrumbItems={breadcrumbItems}
        files={files}
        showDate={showDate}
        loading={fetching || initialLoading}
        forming={report?.status === EReportStatus.forming}
        createdAt={moment(report?.formed_at).locale(i18n.language).format("DD.MM.YYYY")}
        deleteAll={false}
      />
    );
  case EReportStatus.draft:
  case EReportStatus.error:
    return <ReportEdit report={report} reportId={id}/>;
  default:
    return <Fragment/>;
  }
};

export default TransitionExportSinglePage;
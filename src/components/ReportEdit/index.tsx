import { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import CreateSourcesExportPage from 'components/CreateSourcesExportPage';
import CreateTransactionExportPage from "components/CreateTransactionExportPage";

import { EReportType, TReportSingleData } from "store/reports/types";

import { QUERIES } from "../../config/constants";
import { createTransitionExportInit } from "../../store/reports/reducers";
import { createUploadOperationsSelector } from "../../store/reports/selectors";
import useQuery from "../../hooks/useQuery";

export type ReportEdit = {
  report: TReportSingleData;
  reportId: string;
}

const ReportEdit: FC<ReportEdit> = ({ report, reportId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const fromCreateExport = query.get(QUERIES.fromCreateExport) === "true";
  const createSourceId = query.get(QUERIES.createSourceId) as string;
  const createUploadOperations
    = useSelector(createUploadOperationsSelector(createSourceId));
  
  useEffect(() => {
    const id = fromCreateExport ? createSourceId : reportId;
    history.replace({
      search: `?${QUERIES.createSourceId}=${id}`
    });
    dispatch(createTransitionExportInit({ id: String(id) }));
  }, []);

  if (report.type === EReportType.sources_export) {
    if (!createUploadOperations || !createUploadOperations) {
      return <></>;
    }
    return <CreateSourcesExportPage reportId={reportId}/>;
  } else if (report.type === EReportType.transaction_export) {
    return <CreateTransactionExportPage reportId={reportId}/>;
  }
  return <Fragment/>;
};

export default ReportEdit;
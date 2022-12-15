import { FC } from 'react';

import { TDocument } from "store/reports/types";

import ReportSingleElement from "./ReportSingleElement";


const ReportCardBody:FC<TDocument> = ({
  id,
  doc_type,
  report,
  file,
  name,
  status,
}) => (
  <div className="old-report-card-body">
    <ReportSingleElement
      report={report}
      doc_type={doc_type}
      file={file}
      id={id}
      name={name}
      status={status}
    />
  </div>
);

export default ReportCardBody;

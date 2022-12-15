import { FC } from 'react';
import cn from "classnames";

import { EStatus } from "config/types";

import { TReport } from "store/reports/types";

import ReportCardHeader from "./ReportCardHeader";
import ReportCardBody from "./ReportCardBody";



const ReportCard: FC<TReport> = ({ documents, created_at, name, status, id }) => (

  <div id="report" className={cn("old-report-card", { "disabled":status !== EStatus.formed } )}>
    <ReportCardHeader
      created_at={created_at}
      name={name}
      status={status}
      id={id}
    />
    {documents.map(document =>
      <ReportCardBody
        key={document.id}
        report={document.report}
        doc_type={document.doc_type}
        id={document.id}
        name={document.name}
        file={document.file}
        status={status}
      />)}
  </div>

);


export default ReportCard;
